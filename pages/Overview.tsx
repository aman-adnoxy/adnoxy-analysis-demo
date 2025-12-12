import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar, LabelList 
} from 'recharts';
import { 
  Users, Eye, Map, Clock, Download, Share2, 
  TrendingUp, ArrowUp, Utensils, Dumbbell, ShoppingCart, Coffee, ArrowRight
} from 'lucide-react';
import { 
  CAMPAIGN_SUMMARY, OVERVIEW_EXPOSURE, AUDIENCE_INCOME, 
  POI_RELEVANCE, ASSETS 
} from '../data/mockData';

// Enhanced vibrant colors for charts
const AUDIENCE_AGE_COLORS = [
  { name: '18-24', value: 21, fill: '#6366f1' }, // Indigo
  { name: '25-34', value: 38, fill: '#10b981' }, // Emerald
  { name: '35-44', value: 27, fill: '#f59e0b' }, // Amber
  { name: '45+', value: 14, fill: '#3b82f6' }    // Blue
];

// Component for KPI Tiles
const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType }> = ({ 
  title, value, icon: Icon 
}) => (
  <div className="bg-white p-4 border border-neutral-200 shadow-sm flex flex-col justify-between h-28 hover:border-neutral-300 transition-colors group relative">
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest font-heading">{title}</h3>
      <Icon size={18} className="text-neutral-300 group-hover:text-black transition-colors" />
    </div>
    <div>
        <p className="text-3xl font-bold text-black tracking-tighter leading-none mb-1 font-heading">{value}</p>
        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
            <TrendingUp size={10} />
            <span>+2.4% vs baseline</span>
        </div>
    </div>
  </div>
);

// Helper for POI Icons
const getPoiIcon = (name: string) => {
    switch(name) {
        case 'Food': return <Utensils size={14} />;
        case 'Fitness': return <Dumbbell size={14} />;
        case 'Grocery': return <ShoppingCart size={14} />;
        case 'Lifestyle': return <Coffee size={14} />;
        default: return <Map size={14} />;
    }
};

const Overview: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-white min-h-full font-sans">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black pb-6">
        <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-2 font-heading">Campaign Overview</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-bold text-black">{CAMPAIGN_SUMMARY.name}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-black text-white border border-black">
                        LIVE
                    </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200 text-xs md:text-sm w-fit">
                    <Clock size={14} />
                    <span className="font-medium whitespace-nowrap">{CAMPAIGN_SUMMARY.startDate} - {CAMPAIGN_SUMMARY.endDate}</span>
                </div>
            </div>
            <p className="text-neutral-600 text-sm md:text-lg max-w-3xl leading-snug">
                Live exposure, audience composition, contextual drivers, and asset performance for your running offline campaign.
            </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-600 font-medium hover:bg-neutral-50 hover:text-black hover:border-neutral-300 transition-all text-sm rounded-sm">
                <Share2 size={16} />
                Share
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-medium hover:bg-neutral-800 transition-all text-sm shadow-sm rounded-sm">
                <Download size={16} />
                Export Data
            </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Est. Impressions" 
          value={(CAMPAIGN_SUMMARY.estimatedImpressions / 1000000).toFixed(1) + 'M'} 
          icon={Eye} 
        />
        <StatCard 
          title="Active Billboards" 
          value={CAMPAIGN_SUMMARY.activeBillboards.toString()} 
          icon={Map} 
        />
        <StatCard 
          title="Days Running" 
          value={CAMPAIGN_SUMMARY.daysRunning.toString()} 
          icon={Clock} 
        />
        <StatCard 
          title="Audience Reached" 
          value={(CAMPAIGN_SUMMARY.estimatedAudienceReached / 1000000).toFixed(1) + 'M'} 
          icon={Users} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Exposure Timeline - Spans 2 Columns */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider font-heading">Exposure Timeline</h3>
            <div className="flex gap-6 text-xs font-medium">
               <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-black"></div>
                   <span className="text-neutral-900">Actual</span>
               </div>
               <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-neutral-300"></div>
                   <span className="text-neutral-500">Baseline Model</span>
               </div>
            </div>
          </div>
          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={OVERVIEW_EXPOSURE} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#737373', fontSize: 10}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#737373', fontSize: 10}}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                    cursor={{ stroke: '#000', strokeWidth: 1 }}
                    contentStyle={{border: '1px solid #e5e5e5', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', padding: '8px 12px'}}
                    labelStyle={{ fontSize: '11px', fontWeight: '600', color: '#000', marginBottom: '2px', fontFamily: 'Plus Jakarta Sans' }}
                    itemStyle={{ fontSize: '11px', color: '#525252', fontFamily: 'Poppins' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#d4d4d4" 
                  strokeWidth={2} 
                  fill="transparent" 
                  strokeDasharray="4 4"
                  activeDot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#000000" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorImp)" 
                  activeDot={{ r: 5, fill: 'black', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Performance Table - Spans 1 Column */}
        <div className="lg:col-span-1 bg-white border border-neutral-200 shadow-sm p-4 md:p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-sm font-bold text-black uppercase tracking-wider font-heading">Asset Performance</h3>
                    <p className="text-xs text-neutral-500 mt-1.5 leading-snug">Top performing billboards based on daily impressions and visibility metrics.</p>
                 </div>
                 <button className="flex items-center gap-1 text-[10px] font-bold border border-neutral-200 px-2 py-1 hover:bg-neutral-50 hover:border-black transition-colors flex-shrink-0">
                    VIEW ALL <ArrowRight size={10} />
                 </button>
            </div>
            
            <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black">
                            <th className="py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-wide w-8">#</th>
                            <th className="py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-wide">ID</th>
                            <th className="py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-wide text-right">Imp.</th>
                            <th className="py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-wide text-right w-20">Vis %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ASSETS.map((asset, idx) => (
                            <tr key={asset.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 group transition-colors">
                                <td className="py-3 font-medium text-neutral-400 text-xs">{idx + 1}</td>
                                <td className="py-3 font-bold text-black text-xs group-hover:underline cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        {asset.id}
                                        {idx < 2 && <ArrowUp size={10} className="text-green-600" />}
                                    </div>
                                </td>
                                <td className="py-3 text-right font-medium text-neutral-700 text-xs">{(asset.dailyImpressions / 1000).toFixed(0)}k</td>
                                <td className="py-3 text-right pl-4">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold">{asset.visibilityScore}</span>
                                        <div className="w-14 h-1 bg-neutral-100">
                                            <div className="h-full bg-black" style={{width: `${asset.visibilityScore}%`}}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Bottom Row Insights */}
        
        {/* Audience Age - Fixed Height and Alignment */}
        <div className="bg-white border border-neutral-200 shadow-sm p-4 md:p-6 overflow-hidden">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6 font-heading">Age Demographics</h3>
          <div className="h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={AUDIENCE_AGE_COLORS}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {AUDIENCE_AGE_COLORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle" 
                  iconSize={8} 
                  wrapperStyle={{fontSize: '11px', fontFamily: 'Poppins', paddingTop: '10px'}}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                 <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Age Mix</span>
                 <span className="text-3xl font-bold text-black leading-none my-1 font-heading">25-34</span>
                 <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Dominant</span>
            </div>
          </div>
        </div>

        {/* Income Breakdown */}
        <div className="bg-white border border-neutral-200 shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-bold text-black uppercase tracking-wider font-heading">Income Brackets</h3>
                 <span className="text-xs text-neutral-400 font-medium">Household</span>
            </div>
            <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={AUDIENCE_INCOME} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#171717', fontWeight: 600}} dy={5} />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{border: '1px solid #e5e5e5'}} />
                  <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                    {AUDIENCE_INCOME.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList dataKey="value" position="top" formatter={(val: number) => `${val}%`} style={{fontSize: '11px', fontWeight: 'bold', fill: '#000'}} />
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
            </div>
        </div>
        
        {/* POI Relevance */}
        <div className="bg-white border border-neutral-200 shadow-sm p-4 md:p-6">
           <div className="mb-6">
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-1 font-heading">Context Drivers</h3>
                <p className="text-xs text-neutral-500">Top POI categories near high-performing assets.</p>
           </div>
           
           <div className="space-y-5">
             {POI_RELEVANCE.map((poi, idx) => (
                 <div key={idx} className="group">
                     <div className="flex justify-between items-center mb-1">
                         <div className="flex items-center gap-4">
                             <div className="flex items-center justify-center w-6 h-6 bg-neutral-100 text-black rounded-sm group-hover:bg-black group-hover:text-white transition-colors">
                                 {getPoiIcon(poi.name)}
                             </div>
                             <span className="text-sm font-bold text-neutral-800">{poi.name}</span>
                         </div>
                         <span className="text-sm font-bold text-black">{poi.value}</span>
                     </div>
                     <div className="w-full bg-neutral-100 h-1.5 mt-1">
                         <div className="h-full bg-neutral-800" style={{width: `${poi.value}%`}}></div>
                     </div>
                 </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;