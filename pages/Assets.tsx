import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { Asset } from '../types';
import { 
    BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid 
} from 'recharts';
import { 
    MapPin, Eye, Users, X, ArrowRight, Sparkles, BarChart2, Trophy, 
    TrendingUp, Activity, Layers, Clock, Zap 
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const Assets: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="p-4 md:p-8 relative h-full flex flex-col bg-white">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black pb-4 gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight font-heading">Live Assets</h1>
            <p className="text-neutral-500 mt-1 text-sm">Inventory performance and contextual intelligence.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <select className="border border-neutral-300 rounded-none px-4 py-2 text-sm bg-white focus:outline-none focus:border-black font-medium w-full md:w-auto">
                <option>All Assets</option>
                <option>High Impact</option>
                <option>Top Visibility</option>
            </select>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-6">
        {ASSETS.map((asset, idx) => {
          const isHighPerf = asset.visibilityScore >= 85;
          const isMedPerf = asset.visibilityScore >= 75 && asset.visibilityScore < 85;
          
          let perfBorderColor = 'border-t-red-500';
          let perfGlow = 'hover:shadow-red-100/50';
          if (isHighPerf) {
             perfBorderColor = 'border-t-green-500';
             perfGlow = 'hover:shadow-green-100/50';
          } else if (isMedPerf) {
             perfBorderColor = 'border-t-yellow-500';
             perfGlow = 'hover:shadow-yellow-100/50';
          }

          return (
          <div 
            key={asset.id} 
            className={`group bg-white border border-neutral-200 border-t-[4px] ${perfBorderColor} ${perfGlow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden rounded-sm`}
            onClick={() => setSelectedAsset(asset)}
          >
            {/* Image Section */}
            <div className="relative h-48 md:h-56 overflow-hidden border-b border-neutral-100">
              <img src={asset.image} alt={asset.location} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                 <div className="flex items-center gap-2 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 shadow-md rounded-sm border border-blue-500 backdrop-blur-md bg-opacity-95">
                    <Eye size={12} strokeWidth={3} /> <span>VIS {asset.visibilityScore}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-purple-600 text-white text-[10px] font-bold px-2.5 py-1.5 shadow-md rounded-sm border border-purple-500 backdrop-blur-md bg-opacity-95">
                    <MapPin size={12} strokeWidth={3} /> <span>CTX {asset.contextScore}</span>
                 </div>
              </div>

              <div className="absolute top-3 right-3 bg-white text-black pl-2 pr-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-neutral-200">
                  <div className="bg-yellow-400 rounded-full p-1 text-black">
                    <Trophy size={10} fill="black" strokeWidth={0} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide">Rank {idx + 1}</span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-4 md:p-5 flex-1 flex flex-col">
              <div className="mb-4">
                  <h3 className="font-bold text-lg text-black leading-tight group-hover:underline decoration-2 underline-offset-4 mb-2 font-heading">{asset.location}</h3>
                  <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded tracking-wide font-mono">{asset.id}</span>
              </div>
              
              <p className="text-xs text-neutral-600 mb-6 leading-relaxed line-clamp-2 min-h-[2.5em]">
                 {asset.description}
              </p>

              <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-t border-neutral-100 pt-5 mt-auto">
                 <div>
                    <p className="flex items-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">
                        <BarChart2 size={12} /> Daily Imp
                    </p>
                    <p className="text-sm font-bold text-black">{(asset.dailyImpressions / 1000).toFixed(0)}k</p>
                 </div>
                 <div>
                    <p className="flex items-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">
                        <Layers size={12} /> Context
                    </p>
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-black w-6">{asset.contextScore}</span>
                       <div className="h-2 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{width: `${asset.contextScore}%`}}></div>
                       </div>
                    </div>
                 </div>
                 <div>
                    <p className="flex items-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">
                        <Eye size={12} /> Visibility
                    </p>
                    <span className="text-sm font-bold text-black">{asset.visibilityScore}</span>
                 </div>
                 <div>
                    <p className="flex items-center gap-1.5 text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">
                        <Users size={12} /> Audience Fit
                    </p>
                     <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-black w-6">{asset.audienceFit}</span>
                       <div className="h-2 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{width: `${asset.audienceFit}%`}}></div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-start gap-3">
                  <div className="bg-indigo-50 p-2 rounded-full">
                     <Sparkles size={20} className="text-indigo-600 flex-shrink-0" fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-700 leading-snug mt-1">
                    <span className="font-bold text-indigo-900 mr-1 font-heading">AI Insight:</span>
                    {asset.aiInsight}
                  </span>
              </div>
            </div>

            <div className="bg-neutral-50 p-3 border-t border-neutral-200 flex justify-between items-center group-hover:bg-black group-hover:text-white transition-colors duration-200">
                <span className="text-[10px] font-bold uppercase tracking-widest pl-2">View Analysis</span>
                <ArrowRight size={14} className="mr-1"/>
            </div>
          </div>
        )})}
      </div>

      {/* Detail Drawer */}
      {selectedAsset && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[1900] flex justify-end isolate">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedAsset(null)}></div>
          
          {/* Drawer Content */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-slide-in border-l border-neutral-200 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-neutral-200 p-4 md:p-6 flex justify-between items-start shadow-sm shrink-0">
                <div className="max-w-md pr-8 md:pr-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider">Live Asset</span>
                        <span className="text-xs text-neutral-500 font-mono font-bold">{selectedAsset.id}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-black leading-tight mb-2 font-heading">{selectedAsset.location}</h2>
                    <p className="text-xs md:text-sm font-medium text-neutral-600 leading-relaxed border-l-2 border-indigo-500 pl-3">
                        {selectedAsset.description} {selectedAsset.aiInsight}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                    <button className="hidden md:flex px-3 py-1.5 border border-neutral-200 text-xs font-bold uppercase hover:bg-neutral-50 rounded transition-colors items-center gap-2">
                        <Layers size={14} /> Compare
                    </button>
                    <button 
                        onClick={() => setSelectedAsset(null)}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors absolute top-2 right-2 md:relative md:top-auto md:right-auto"
                    >
                        <X size={24} className="text-neutral-500" />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-6 space-y-6 md:space-y-8 flex-1">
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
                                <p className="text-xs text-neutral-500 mt-0.5">Strongest segment: 25-34.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real Map Integration */}
                <div className="relative w-full h-48 md:h-64 bg-neutral-100 border border-neutral-200 rounded-sm overflow-hidden group z-0">
                    <MapContainer 
                        key={selectedAsset.id}
                        center={[selectedAsset.coordinates.lat, selectedAsset.coordinates.lng]} 
                        zoom={15} 
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <CircleMarker 
                            center={[selectedAsset.coordinates.lat, selectedAsset.coordinates.lng]}
                            radius={8}
                            pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 0.8, weight: 2 }}
                        >
                            <Popup>{selectedAsset.location}</Popup>
                        </CircleMarker>
                    </MapContainer>
                    <div className="absolute bottom-2 right-2 bg-white px-2 py-1 text-[10px] font-bold border border-neutral-200 z-[1000] pointer-events-none">
                        Live Catchment View
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-white p-3 md:p-4 border border-neutral-200 shadow-sm">
                        <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wide font-bold">Avg Daily Exposure</p>
                        <p className="text-lg md:text-2xl font-bold text-black font-heading">{(selectedAsset.dailyImpressions/1000).toFixed(1)}k</p>
                        <p className="text-[10px] text-green-600 font-bold mt-1">+12% vs avg</p>
                    </div>
                    <div className="bg-white p-3 md:p-4 border border-neutral-200 shadow-sm">
                        <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wide font-bold">Visibility Index</p>
                        <p className="text-lg md:text-2xl font-bold text-black font-heading">{selectedAsset.visibilityScore}</p>
                        <p className="text-[10px] text-neutral-400 font-bold mt-1">out of 100</p>
                    </div>
                    <div className="bg-white p-3 md:p-4 border border-neutral-200 shadow-sm">
                        <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wide font-bold">Audience Fit</p>
                        <p className="text-lg md:text-2xl font-bold text-black font-heading">{selectedAsset.audienceFit}%</p>
                        <p className="text-[10px] text-neutral-400 font-bold mt-1">Target Match</p>
                    </div>
                </div>

                {/* Daily Exposure Line Chart */}
                {selectedAsset.dailyExposure && selectedAsset.dailyExposure.length > 0 && (
                    <div>
                        <h3 className="font-bold text-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wide font-heading">
                             <TrendingUp size={16} className="text-neutral-400"/> Daily Performance Trend
                        </h3>
                        <div className="h-40 md:h-48 bg-white border border-neutral-200 p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={selectedAsset.dailyExposure}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5"/>
                                    <XAxis dataKey="date" tick={{fontSize: 11, fill: '#666'}} axisLine={false} tickLine={false} dy={10} />
                                    <Tooltip contentStyle={{border: '1px solid #e5e5e5', fontSize: '12px'}}/>
                                    <Line type="monotone" dataKey="actual" stroke="#000000" strokeWidth={3} dot={{r: 4, fill: 'black', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                                    <Line type="monotone" dataKey="baseline" stroke="#d4d4d4" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Context & Creative Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* POI Context Block */}
                    <div>
                        <h3 className="font-bold text-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wide font-heading">
                             <MapPin size={16} className="text-neutral-400"/> POI Context
                        </h3>
                        <div className="space-y-4">
                            {selectedAsset.poiNearby?.map((poi, idx) => {
                                const percentage = Math.min(100, (poi.count / 20) * 100);
                                return (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-bold text-neutral-700">{poi.category}</span>
                                        <span className="font-bold text-black">{poi.count}</span>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-2 rounded-sm overflow-hidden">
                                        <div 
                                            className={`h-full ${poi.category === 'Food' ? 'bg-orange-500' : poi.category === 'Fitness' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                            style={{width: `${percentage}%`}}
                                        ></div>
                                    </div>
                                </div>
                            )})}
                             {(!selectedAsset.poiNearby || selectedAsset.poiNearby.length === 0) && (
                                <div className="text-xs text-neutral-400 italic">No POI data available.</div>
                            )}
                        </div>
                    </div>

                    {/* Creative Metrics */}
                    <div>
                        <h3 className="font-bold text-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wide font-heading">
                             <Zap size={16} className="text-neutral-400"/> Creative Vision
                        </h3>
                        {selectedAsset.creativeMetrics && (
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Visibility</span>
                                        <span className="font-bold">{selectedAsset.creativeMetrics.visibility}%</span>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-1.5 mb-1">
                                        <div className="bg-black h-1.5" style={{width: `${selectedAsset.creativeMetrics.visibility}%`}}></div>
                                    </div>
                                    <p className="text-[10px] text-neutral-500 leading-tight">Excellent readability from primary traffic lanes.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Contrast</span>
                                        <span className="font-bold">{selectedAsset.creativeMetrics.contrast}%</span>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-1.5 mb-1">
                                        <div className="bg-neutral-600 h-1.5" style={{width: `${selectedAsset.creativeMetrics.contrast}%`}}></div>
                                    </div>
                                    <p className="text-[10px] text-neutral-500 leading-tight">Good distinction between foreground and background.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>Obstruction Risk</span>
                                        <span className="font-bold">{selectedAsset.creativeMetrics.obstruction}%</span>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-1.5 mb-1">
                                        <div className="bg-neutral-300 h-1.5" style={{width: `${selectedAsset.creativeMetrics.obstruction}%`}}></div>
                                    </div>
                                     <p className="text-[10px] text-neutral-500 leading-tight">Minimal vegetative blockage projected.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;