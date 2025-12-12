import React, { useState } from 'react';
import { 
  GEO_BILLBOARDS, TRAFFIC_HEATMAP, HEX_HOTSPOTS, AUDIENCE_FLOW, 
  POI_CLUSTERS, CATCHMENT_ZONES, TOP_INSIGHT, BILLBOARD_DETAIL 
} from '../data/mockData';
import { GeoBillboard, PoiCluster } from '../types';
import { 
  MapContainer, TileLayer, Marker, Circle, Polyline, Polygon, Tooltip as LeafletTooltip
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, Filter, ChevronLeft, Map as MapIcon, Zap, Activity, Navigation, 
  ShoppingBag, Users, X, Eye, TrendingUp, Clock, MapPin, BarChart3, ArrowRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis } from 'recharts';

// --- CUSTOM ICON FACTORIES ---

const createBillboardIcon = (asset: GeoBillboard) => {
  let color = '#ef4444'; // red (low)
  if (asset.performance_level === 'high') color = '#10b981'; // green
  else if (asset.performance_level === 'medium') color = '#f59e0b'; // orange

  const pulseClass = asset.performance_level === 'high' ? 'marker-pulse' : '';

  return new L.DivIcon({
    className: 'billboard-icon-container',
    html: `
      <div class="marker-pin ${pulseClass}" style="
        position: relative;
        width: 24px; 
        height: 24px; 
        background-color: white;
        border-radius: 50%;
        display: flex; 
        align-items: center; 
        justify-content: center;
        border: 2px solid ${color};
      ">
        <div style="
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            border: 1px solid #f5f5f5;
        "></div>
        <div style="
          width: 8px; 
          height: 8px; 
          background-color: ${color}; 
          border-radius: 50%; 
          z-index: 10;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const createPoiIcon = (type: PoiCluster['category']) => {
  let color = '#3b82f6'; // Tech - blue
  let icon = '📍';
  
  if (type === 'Retail') { color = '#8b5cf6'; icon = '🛍️'; } // purple
  if (type === 'Fitness') { color = '#10b981'; icon = '💪'; } // green
  if (type === 'Food') { color = '#f97316'; icon = '🍔'; } // orange
  if (type === 'Grocery') { color = '#eab308'; icon = '🛒'; } // yellow
  if (type === 'Lifestyle') { color = '#14b8a6'; icon = '☕'; } // teal

  return new L.DivIcon({
    className: 'poi-icon',
    html: `<div style="
      background-color: ${color}; 
      color: white;
      width: 20px; 
      height: 20px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-size: 10px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      border: 1.5px solid white;
      opacity: 0.9;
    ">
      ${icon}
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const getHexagonCoords = (lat: number, lon: number, r: number = 0.003) => {
  const coords: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle_deg = 60 * i;
    const angle_rad = Math.PI / 180 * angle_deg;
    const dLat = r * Math.cos(angle_rad);
    const dLon = r * Math.sin(angle_rad); 
    coords.push([lat + dLat, lon + dLon]);
  }
  return coords;
};

const MiniSparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((d - min) / (max - min)) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height="24" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polyline points={points} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const MapPage: React.FC = () => {
  const [layers, setLayers] = useState({
    billboards: true,
    trafficHeatmap: false,
    exposureHotspots: false,
    audienceFlow: false,
    poiClusters: false,
    catchmentZones: true,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedAssetData = selectedAssetId ? GEO_BILLBOARDS.find(b => b.id === selectedAssetId) : null;
  const drawerDetails = selectedAssetData ? BILLBOARD_DETAIL : null;

  return (
    // Fixed height container for mobile to prevent overflow glitches
    <div className="relative w-full bg-neutral-100 overflow-hidden font-sans isolate" style={{ height: 'calc(100vh - 64px)' }}>
      
      {/* 1. TOP INSIGHT BAR (Floating) - Z-Index 400 to sit above map but below TopBar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[400] w-[95%] md:w-[90%] max-w-4xl animate-slide-in-top pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xl rounded-lg p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 transition-all hover:shadow-2xl pointer-events-auto">
           <div className="flex items-center gap-4 md:border-r border-neutral-200 pr-6 flex-1 w-full">
               <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md shadow-sm hidden md:block">
                   <Activity size={20} />
               </div>
               <div>
                   <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5 font-heading">Top Insight</p>
                   <p className="text-sm font-bold text-black leading-tight">{TOP_INSIGHT.headline}</p>
               </div>
           </div>
           
           <div className="flex justify-between w-full md:w-auto gap-4 md:gap-8 text-xs flex-shrink-0">
               <div className="text-center">
                    <p className="text-neutral-400 font-medium mb-1">Avg Daily Exposure</p>
                    <p className="font-bold text-black text-base font-heading">{(TOP_INSIGHT.avg_daily_exposure / 1000).toFixed(1)}k</p>
               </div>
               <div className="text-center">
                    <p className="text-neutral-400 font-medium mb-1">Top POI</p>
                    <div className="flex items-center justify-center gap-1 font-bold text-black text-base font-heading">
                       <span style={{color: TOP_INSIGHT.poi_color}}>●</span> {TOP_INSIGHT.top_poi_category}
                    </div>
               </div>
                <div className="text-center hidden md:block">
                   <button className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors">
                       View Analysis <ArrowRight size={12} />
                   </button>
               </div>
           </div>
        </div>
      </div>

      {/* 2. LEFT SIDEBAR (Layers & Filters) - Positioned lower on mobile to avoid overlap */}
      <div className={`absolute top-[240px] md:top-32 left-4 z-[500] transition-all duration-300 ${sidebarOpen ? 'w-64 md:w-72' : 'w-10 md:w-12'} bg-white border border-neutral-200 shadow-xl rounded-lg overflow-hidden flex flex-col max-h-[50vh] md:max-h-[calc(100vh-140px)]`}>
          <div 
              className="p-3 md:p-4 bg-white border-b border-neutral-100 flex justify-between items-center cursor-pointer hover:bg-neutral-50"
              onClick={() => setSidebarOpen(!sidebarOpen)}
          >
              {sidebarOpen ? (
                  <>
                      <div className="flex items-center gap-2">
                          <Layers size={18} className="text-black"/>
                          <span className="text-sm font-bold text-black uppercase tracking-wide font-heading">Intelligence Layers</span>
                      </div>
                      <ChevronLeft size={16} className="text-neutral-400"/>
                  </>
              ) : (
                  <Layers size={20} className="mx-auto text-black"/>
              )}
          </div>

          {sidebarOpen && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Layer Toggles with Microcopy */}
                  <div className="space-y-4">
                      {[
                        { key: 'billboards', label: 'Billboards', icon: MapIcon, desc: 'Live performance-coded campaign assets.', color: 'bg-black' },
                        { key: 'trafficHeatmap', label: 'Traffic Heatmap', icon: Zap, desc: 'Aggregated vehicular & pedestrian density.', color: 'bg-orange-500' },
                        { key: 'exposureHotspots', label: 'Exposure Hotspots', icon: Activity, desc: 'Hex-based intensity derived from mobility scores.', color: 'bg-red-500' },
                        { key: 'audienceFlow', label: 'Audience Flow', icon: Navigation, desc: 'Dominant commute corridors & travel paths.', color: 'bg-blue-500' },
                        { key: 'poiClusters', label: 'POI Clusters', icon: ShoppingBag, desc: 'Contextual relevance groups (Retail, Food).', color: 'bg-purple-500' },
                        { key: 'catchmentZones', label: 'Catchment Zones', icon: Users, desc: 'Estimated true-view radius & overlap.', color: 'bg-teal-600' },
                      ].map((layer) => (
                        <div key={layer.key} className="flex items-start justify-between group cursor-pointer" onClick={() => toggleLayer(layer.key as any)}>
                           <div className="flex items-start gap-3">
                               <layer.icon size={16} className="text-neutral-400 mt-0.5 group-hover:text-black transition-colors flex-shrink-0"/>
                               <div>
                                   <span className="text-sm font-bold text-neutral-800 block group-hover:text-blue-600 transition-colors font-heading">{layer.label}</span>
                                   <span className="text-[10px] text-neutral-500 leading-tight block mt-0.5 hidden md:block">{layer.desc}</span>
                               </div>
                           </div>
                           <div className={`w-8 h-4 rounded-full p-0.5 transition-colors mt-1 ${layers[layer.key as keyof typeof layers] ? layer.color : 'bg-neutral-200'}`}>
                               <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${layers[layer.key as keyof typeof layers] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                           </div>
                       </div>
                      ))}
                  </div>

                  <div className="h-px bg-neutral-100 w-full"></div>

                  {/* Filters */}
                  <div>
                      <div className="flex items-center gap-2 mb-3">
                          <Filter size={14} className="text-neutral-400"/>
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-heading">Filters</span>
                      </div>
                      <div className="space-y-3">
                          <div>
                              <label className="text-[10px] font-bold text-neutral-500 mb-1 block">Asset Type</label>
                              <select className="w-full text-xs p-2 border border-neutral-200 rounded bg-neutral-50 focus:outline-none focus:border-black">
                                  <option>All Asset Types</option>
                                  <option>Digital</option>
                                  <option>Static</option>
                              </select>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* 3. MAP CANVAS */}
      <MapContainer 
        center={[19.0760, 72.8777]} 
        zoom={13} 
        style={{ height: "100%", width: "100%", zIndex: 0 }} 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* LAYER: Traffic Heatmap (Low Opacity) */}
        {layers.trafficHeatmap && TRAFFIC_HEATMAP.map((pt, idx) => {
            let color = '#22c55e';
            if (pt.intensity > 0.75) color = '#ef4444';
            else if (pt.intensity > 0.5) color = '#f97316';
            else if (pt.intensity > 0.25) color = '#eab308';

            return (
                <Circle 
                    key={`heat-${idx}`}
                    center={[pt.lat, pt.lon]}
                    radius={200}
                    pathOptions={{ stroke: false, fillColor: color, fillOpacity: 0.15 + (pt.intensity * 0.1) }}
                />
            );
        })}

        {/* LAYER: Exposure Hotspots (Hex - Reduced Opacity) */}
        {layers.exposureHotspots && HEX_HOTSPOTS.map((hex) => {
             let color = '#3b82f6';
             if (hex.exposure_intensity > 0.8) color = '#ef4444';
             else if (hex.exposure_intensity > 0.6) color = '#a855f7';
             
             return (
                 <Polygon
                    key={hex.hex_id}
                    positions={getHexagonCoords(hex.center_lat, hex.center_lon)}
                    pathOptions={{ color: color, weight: 1, fillColor: color, fillOpacity: 0.2 }}
                 >
                     <LeafletTooltip direction="top" opacity={1} sticky>
                        <div className="px-2 py-1">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 mb-1 font-heading">Hex Intelligence</p>
                            <p className="font-bold text-xs">Exposure Score: {Math.round(hex.exposure_intensity * 100)}</p>
                            <div className="flex justify-between items-center text-[10px] gap-4 mt-1">
                                <span>Audience: <strong>{hex.dominant_audience}</strong></span>
                                <span>Assets Nearby: <strong>2</strong></span>
                            </div>
                        </div>
                    </LeafletTooltip>
                 </Polygon>
             )
        })}

        {/* LAYER: Catchment Zones (Faint) */}
        {layers.catchmentZones && CATCHMENT_ZONES.map((zone, idx) => (
             <React.Fragment key={`catchment-${idx}`}>
                 <Circle 
                    center={[zone.center_lat, zone.center_lon]}
                    radius={zone.radius_meters}
                    pathOptions={{ stroke: true, color: '#0d9488', weight: 1, dashArray: '4,6', fillColor: '#0d9488', fillOpacity: 0.05 }}
                 >
                    <LeafletTooltip direction="bottom" sticky>
                        <div className="text-[10px] font-bold px-1">Est. Catchment Radius</div>
                    </LeafletTooltip>
                 </Circle>
             </React.Fragment>
        ))}

        {/* LAYER: Audience Flow (Curved Lines) */}
        {layers.audienceFlow && AUDIENCE_FLOW.map((flow) => (
            <Polyline
                key={flow.id}
                positions={flow.path}
                pathOptions={{ 
                    color: '#3b82f6', 
                    weight: 4 + (flow.volume * 4), 
                    opacity: 0.5,
                    lineCap: 'round',
                    dashArray: '1, 8'
                }}
            >
                <LeafletTooltip sticky>
                     <div className="px-2 py-1">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600 mb-1 font-heading">Audience Flow</p>
                        <p className="font-bold text-xs">{flow.description}</p>
                        <p className="text-[10px] mt-1">Confidence Score: {Math.round(flow.confidence * 100)}%</p>
                    </div>
                </LeafletTooltip>
            </Polyline>
        ))}

        {/* LAYER: POI Clusters (Semi-Transparent) */}
        {layers.poiClusters && POI_CLUSTERS.map((poi, idx) => (
            <Marker key={`poi-${idx}`} position={[poi.lat, poi.lon]} icon={createPoiIcon(poi.category)}>
                 <LeafletTooltip direction="top" offset={[0, -10]}>
                    <div className="text-xs font-bold px-1">
                        <span className="block font-heading">{poi.category} Cluster</span>
                        <span className="font-normal text-neutral-500">{poi.count} Locations</span>
                    </div>
                 </LeafletTooltip>
            </Marker>
        ))}

        {/* LAYER: Billboards (Primary - Full Opacity) */}
        {layers.billboards && GEO_BILLBOARDS.map((asset) => (
            <Marker 
                key={asset.id} 
                position={[asset.lat, asset.lon]} 
                icon={createBillboardIcon(asset)}
                eventHandlers={{
                    click: () => setSelectedAssetId(asset.id),
                }}
            >
                <LeafletTooltip direction="top" offset={[0, -20]} opacity={1} className="custom-tooltip">
                    <div className="w-56 bg-white p-3 rounded shadow-lg border border-neutral-100">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-bold text-sm text-black font-heading">{asset.name}</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1">
                                    <TrendingUp size={10} /> {asset.performance_level} Performance
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3 text-[10px] text-neutral-500 border-t border-neutral-100 pt-2">
                             <div>
                                 <span className="block uppercase tracking-wider text-[9px]">Daily Exp</span>
                                 <span className="text-black font-bold text-xs">{(asset.daily_impressions/1000).toFixed(0)}k</span>
                             </div>
                             <div>
                                 <span className="block uppercase tracking-wider text-[9px]">Visibility</span>
                                 <span className="text-black font-bold text-xs">{asset.visibility_score}/100</span>
                             </div>
                        </div>
                        <div className="text-[10px] text-black h-8 opacity-70">
                           <MiniSparkline data={asset.trend_7d} />
                        </div>
                        <p className="text-[9px] text-neutral-400 mt-1 text-center">Click to view deep analysis</p>
                    </div>
                </LeafletTooltip>
            </Marker>
        ))}
      </MapContainer>

      {/* 4. LEGEND (Hidden on small mobile) */}
      <div className="absolute bottom-6 right-6 z-[400] bg-white/95 backdrop-blur border border-neutral-200 p-4 rounded-lg shadow-lg w-56 hidden md:block">
          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 font-heading">Geo Intelligence Legend</h4>
          <div className="space-y-4">
              <div>
                  <p className="text-[10px] font-bold mb-1">Performance (Inner)</p>
                  <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-[10px]">High</span>
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span><span className="text-[10px]">Med</span>
                      <span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-[10px]">Low</span>
                  </div>
              </div>
              <div>
                   <p className="text-[10px] font-bold mb-1">Exposure Vol (Outer Ring)</p>
                   <div className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full border-2 border-neutral-400"></div>
                       <span className="text-[10px]">Thickness = Volume</span>
                   </div>
              </div>
          </div>
      </div>

      {/* 5. UNIFIED BOTTOM DRAWER */}
      {selectedAssetId && drawerDetails && (
        <div className="fixed inset-0 z-[3000] flex justify-end pointer-events-none">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity pointer-events-auto" onClick={() => setSelectedAssetId(null)}></div>
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto animate-slide-in border-l border-neutral-200 pointer-events-auto">
             {/* Drawer Header */}
             <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-neutral-200 p-4 md:p-6 flex justify-between items-start shadow-sm">
                <div className="max-w-md pr-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider">Live Asset</span>
                        <span className="text-xs text-neutral-500 font-mono font-bold">{drawerDetails.asset_id}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-black leading-tight mb-2 font-heading">{drawerDetails.name}</h2>
                    <p className="text-sm font-medium text-neutral-600 leading-relaxed border-l-2 border-indigo-500 pl-3">
                        High dwell time corridor near dense commercial zone. Strong alignment with fitness affinity groups.
                    </p>
                </div>
                <button 
                    onClick={() => setSelectedAssetId(null)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors absolute top-2 right-2 md:relative md:top-auto md:right-auto"
                >
                    <X size={24} className="text-neutral-500" />
                </button>
            </div>

            <div className="p-4 md:p-6 space-y-8">
                 {/* Geo Summary Block */}
                 <div className="bg-neutral-50 border border-neutral-100 p-4 md:p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2 font-heading">
                        <MapPin size={14} /> Geo Intelligence Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-start gap-3">
                            <Activity size={18} className="text-emerald-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-black">High POI Density</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Surrounded by Retail & Fitness clusters.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Layers size={18} className="text-blue-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-black">Asset Overlap</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Overlaps with 2 nearby screens.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock size={18} className="text-orange-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-black">Peak Exposure</p>
                                <p className="text-xs text-neutral-500 mt-0.5">17:00 - 19:00 (Evening Commute)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users size={18} className="text-purple-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-black">Audience Dominance</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Strongest segment: {drawerDetails.audience_dominance}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Chart */}
                <div>
                     <h3 className="font-bold text-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wide font-heading">
                         <TrendingUp size={16} className="text-neutral-400"/> Daily Performance Trend
                    </h3>
                    <div className="h-40 md:h-48 bg-white border border-neutral-200 p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={drawerDetails.trend_14d.map((val, i) => ({ day: i, val }))}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5"/>
                                <XAxis dataKey="day" hide />
                                <Tooltip contentStyle={{border: '1px solid #e5e5e5', fontSize: '12px'}}/>
                                <Area type="monotone" dataKey="val" stroke="#000" fill="#f5f5f5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                 {/* POI Context Block */}
                 <div>
                    <h3 className="font-bold text-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wide font-heading">
                         <MapPin size={16} className="text-neutral-400"/> Local POI Context
                    </h3>
                    <div className="space-y-4">
                        {drawerDetails.local_pois.map((poi, idx) => {
                            const percentage = Math.min(100, (poi.count / 20) * 100);
                            return (
                            <div key={idx}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="font-bold text-neutral-700">{poi.category}</span>
                                    <span className="font-bold text-black">{poi.count}</span>
                                </div>
                                <div className="w-full bg-neutral-100 h-2 rounded-sm overflow-hidden">
                                    <div 
                                        className={`h-full ${poi.category === 'Retail' ? 'bg-purple-500' : poi.category === 'Fitness' ? 'bg-emerald-500' : 'bg-orange-500'}`} 
                                        style={{width: `${percentage}%`}}
                                    ></div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>

                <div className="bg-neutral-50 p-4 border border-neutral-100 text-center">
                    <button className="text-xs font-bold text-black uppercase tracking-widest flex items-center justify-center gap-2 hover:underline">
                        View Full Asset Profile <ArrowRight size={12} />
                    </button>
                </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;