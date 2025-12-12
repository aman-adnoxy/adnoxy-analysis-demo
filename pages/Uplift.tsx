import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { UPLIFT_DATA } from '../data/mockData';
import { 
    TrendingUp, ArrowUpRight, BarChart3, ShieldCheck, 
    Percent, ArrowUp, Activity, Search, Globe, Footprints, Zap, Download, Info, FileText 
} from 'lucide-react';

const Uplift: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="p-4 md:p-8 bg-white h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8 border-b border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black font-heading">Incremental Uplift</h1>
            <p className="text-neutral-500 mt-1 text-sm md:text-base">Measured impact, ROI attribution, and channel synergy.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm w-full md:w-auto justify-center rounded-sm">
            <Download size={16} /> Download Analysis
        </button>
      </div>

      {/* 1. NARRATIVE AI SUMMARY BLOCK */}
      <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm mb-8 relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
        <h3 className="flex items-center gap-2 font-bold text-black uppercase tracking-wide text-xs mb-2 font-heading">
            <Zap size={14} className="text-black" /> Executive AI Summary
        </h3>
        <p className="text-neutral-800 text-sm leading-relaxed max-w-4xl">
             The campaign outperformed expectations by <strong className="text-black">17%</strong>, primarily driven by strong visibility in retail clusters and high-performing creatives. Offline impressions contributed to <strong className="text-black">21%</strong> of total conversions, effectively reducing the overall Cost Per Acquisition by blending with lower efficiency digital channels.
        </p>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* ENHANCED: Incremental Lift Card */}
        <div className="bg-black text-white p-6 relative overflow-hidden shadow-lg group flex flex-col justify-between rounded-sm">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 opacity-80">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} />
                        <span className="text-sm font-medium uppercase tracking-wide font-heading">Incremental Lift</span>
                    </div>
                    <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/30">
                        CONFIRMED
                    </span>
                </div>
                <div className="flex items-baseline gap-3 mb-6">
                    <p className="text-5xl font-bold font-heading">+{UPLIFT_DATA.incrementalLift.value}%</p>
                    <span className="text-sm text-neutral-400 font-medium">vs baseline</span>
                </div>
                
                {/* Micro-Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold">Baseline</p>
                        <p className="text-sm font-mono font-bold">11,200</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold">Actual</p>
                        <p className="text-sm font-mono font-bold text-green-400">13,104</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase font-bold">Model Var</p>
                        <p className="text-sm font-mono font-bold text-neutral-300">±4.2%</p>
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute right-[-20px] bottom-[-30px] opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={140} />
            </div>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-center rounded-sm">
             <div className="flex items-center gap-2 mb-3 text-neutral-500">
                <ArrowUpRight size={20} />
                <span className="text-sm font-medium uppercase tracking-wide font-heading">Est. Conversions</span>
            </div>
            <p className="text-5xl font-bold text-black mb-2 tracking-tight font-heading">{UPLIFT_DATA.incrementalLift.estimatedConversions.toLocaleString()}</p>
            <div className="inline-flex items-center gap-2 bg-neutral-100 px-3 py-1 self-start rounded-full">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <p className="text-xs text-black font-bold">+8.4% attributed to OOH</p>
            </div>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between rounded-sm">
            <div>
                 <div className="flex items-center gap-2 mb-2 text-neutral-500">
                    <Percent size={20} />
                    <span className="text-sm font-medium uppercase tracking-wide font-heading">ROAS Uplift</span>
                </div>
                 <p className="text-5xl font-bold text-green-600 mb-1 font-heading">+{UPLIFT_DATA.monetary.roasUplift}%</p>
                 <p className="text-xs text-neutral-400 mt-1">Return on Ad Spend efficiency gain</p>
            </div>
             <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-4">
                 <div className="bg-green-600 h-full" style={{width: '65%'}}></div>
            </div>
        </div>
      </div>

      {/* 3. FINANCIAL INTELLIGENCE STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-neutral-50 p-4 border border-neutral-200 rounded-sm">
          <div className="md:border-r border-neutral-200 pr-4">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Spend</p>
              <p className="text-lg font-bold text-black font-mono">₹{UPLIFT_DATA.monetary.spend.toLocaleString()}</p>
          </div>
          <div className="md:border-r border-neutral-200 pr-4">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Cost Per Conv.</p>
               <p className="text-lg font-bold text-black font-mono">₹{UPLIFT_DATA.monetary.cpa}</p>
          </div>
          <div className="md:border-r border-neutral-200 pr-4">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">CPM Variance</p>
              <p className="text-lg font-bold text-green-600 font-mono">{UPLIFT_DATA.monetary.cpmDiff}%</p>
          </div>
           <div className="pl-0 md:pl-2">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Data Confidence</p>
              <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-black">{UPLIFT_DATA.dataQuality.score}/100</span>
                  <ShieldCheck size={16} className="text-green-600" />
              </div>
          </div>
      </div>

      {/* 4. DRIVERS & SYNERGY ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left: Drivers of Uplift */}
          <div className="bg-white p-6 border border-neutral-200 rounded-sm">
               <h3 className="font-bold text-black uppercase tracking-wide text-sm mb-6 flex items-center gap-2 font-heading">
                   <Activity size={16} /> Drivers of Uplift
               </h3>
               <div className="space-y-4">
                   {UPLIFT_DATA.drivers.map((driver, idx) => (
                       <div key={idx} className="flex items-center justify-between group">
                           <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
                                   <ArrowUp size={16} strokeWidth={3} />
                               </div>
                               <span className="text-sm font-medium text-neutral-700">{driver.name}</span>
                           </div>
                           <div className="flex items-center gap-2">
                               <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-green-500 group-hover:bg-green-600 transition-colors" style={{width: `${driver.value * 5}%`}}></div>
                               </div>
                               <span className="text-sm font-bold text-black w-12 text-right">+{driver.value}%</span>
                           </div>
                       </div>
                   ))}
               </div>
          </div>

          {/* Right: Channel Synergy */}
          <div className="bg-white p-6 border border-neutral-200 rounded-sm">
               <h3 className="font-bold text-black uppercase tracking-wide text-sm mb-6 flex items-center gap-2 font-heading">
                   <Globe size={16} /> Channel Synergy Impact
               </h3>
               <div className="grid grid-cols-3 gap-2 md:gap-4 h-full">
                    <div className="bg-neutral-50 p-2 md:p-4 border border-neutral-100 text-center flex flex-col justify-center items-center hover:shadow-md transition-shadow group cursor-default">
                        <Search size={24} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xl md:text-2xl font-bold text-black">+{UPLIFT_DATA.synergy.searchLift}%</p>
                        <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Search Lift</p>
                    </div>
                    <div className="bg-neutral-50 p-2 md:p-4 border border-neutral-100 text-center flex flex-col justify-center items-center hover:shadow-md transition-shadow group cursor-default">
                        <Footprints size={24} className="text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xl md:text-2xl font-bold text-black">+{UPLIFT_DATA.synergy.footfallLift}%</p>
                        <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Retail Visits</p>
                    </div>
                    <div className="bg-neutral-50 p-2 md:p-4 border border-neutral-100 text-center flex flex-col justify-center items-center hover:shadow-md transition-shadow group cursor-default">
                        <Globe size={24} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xl md:text-2xl font-bold text-black">+{UPLIFT_DATA.synergy.webLift}%</p>
                        <p className="text-[10px] uppercase font-bold text-neutral-400 mt-1">Direct Traffic</p>
                    </div>
               </div>
          </div>
      </div>

      {/* 5. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Baseline Chart */}
        <div className="bg-white p-6 border border-neutral-200 rounded-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-black uppercase tracking-wide text-sm font-heading">Baseline vs. Actual Exposure</h3>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={UPLIFT_DATA.baselineVsActual}>
                        <defs>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 11}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 11}} />
                        <Tooltip contentStyle={{border: '1px solid #e5e5e5', fontSize: '12px'}}/>
                        <Area type="monotone" dataKey="baseline" stroke="#a3a3a3" strokeDasharray="5 5" fill="transparent" strokeWidth={2} name="Baseline" />
                        <Area type="monotone" dataKey="actual" stroke="#000000" fill="url(#colorActual)" strokeWidth={3} name="Actual" />
                        <Legend wrapperStyle={{paddingTop: '20px', fontSize: '12px'}}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Channel Contribution Stacked Bar */}
        <div className="bg-white p-6 border border-neutral-200 rounded-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-black uppercase tracking-wide text-sm font-heading">Media Channel Decomposition</h3>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={UPLIFT_DATA.channelContribution} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
                         <XAxis type="number" hide/>
                         <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} />
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{border: '1px solid #e5e5e5', fontSize: '12px'}}/>
                         <Legend wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                         <Bar dataKey="search" stackId="a" fill="#94a3b8" name="Search" barSize={32} radius={[0,0,0,0]} />
                         <Bar dataKey="social" stackId="a" fill="#64748b" name="Social" barSize={32} radius={[0,0,0,0]} />
                         <Bar dataKey="offlineResidual" stackId="a" fill="#0f172a" name="Offline (OOH)" barSize={32} radius={[0,4,4,0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* 6. ASSET PERFORMANCE TABLE */}
      <div className="bg-white p-6 border border-neutral-200 mb-8 rounded-sm">
           <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-black uppercase tracking-wide text-sm font-heading">Asset-Level Uplift Attribution</h3>
               <button className="text-xs font-bold text-neutral-400 hover:text-black transition-colors uppercase flex items-center gap-1">
                   View Full Report <ArrowUpRight size={12} />
               </button>
           </div>
           <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                   <thead className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider border-b border-black">
                       <tr>
                           <th className="py-3">Asset ID</th>
                           <th className="py-3">Uplift Contribution</th>
                           <th className="py-3">Conversion Share</th>
                           <th className="py-3">Efficiency Rating</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-neutral-100">
                       {UPLIFT_DATA.assetPerformance.map((asset) => (
                           <tr key={asset.id} className="hover:bg-neutral-50 transition-colors">
                               <td className="py-3 font-bold text-black">{asset.id}</td>
                               <td className="py-3 text-green-600 font-bold">+{asset.uplift}%</td>
                               <td className="py-3 font-medium">{asset.share}%</td>
                               <td className="py-3">
                                   <span className={`
                                        text-[10px] font-bold px-2 py-1 rounded
                                        ${asset.efficiency === 'High' ? 'bg-green-100 text-green-800' : ''}
                                        ${asset.efficiency === 'Medium' ? 'bg-orange-100 text-orange-800' : ''}
                                        ${asset.efficiency === 'Low' ? 'bg-red-100 text-red-800' : ''}
                                   `}>
                                       {asset.efficiency.toUpperCase()}
                                   </span>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
      </div>

      {/* 7. METHODOLOGY & STRATEGIC FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Methodology Block */}
          <div className="p-5 bg-neutral-100 border border-neutral-200 rounded-sm relative group">
                <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <BarChart3 className="text-black" size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-black text-sm font-heading">Methodology & Confidence</h4>
                            <Info size={14} className="text-neutral-400 cursor-help" />
                        </div>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                            Incremental lift estimated using time series forecasting, mobility-adjusted exposure baselines, and multi-channel attribution blending mobile latency signals with POS conversions.
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-600"/> 95% Confidence</span>
                            <span className="flex items-center gap-1"><FileText size={12} /> POS Integrated</span>
                        </div>
                    </div>
                </div>
          </div>

          {/* Strategic Takeaway (Bottom AI Narrative) */}
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-sm flex items-start gap-3">
               <div className="bg-indigo-100 p-2 rounded-full shadow-sm">
                   <Zap className="text-indigo-700" size={20} fill="currentColor" fillOpacity={0.2} />
               </div>
               <div>
                   <h4 className="font-bold text-indigo-900 text-sm mb-1 font-heading">Strategic Takeaway</h4>
                   <p className="text-indigo-800 text-xs leading-relaxed">
                       Your offline strategy is driving meaningful cross-channel effects. High visibility retail assets are responsible for most of the incremental conversions. <strong className="font-semibold">Recommendation:</strong> Reallocate 10% of social spend to key OOH corridors to maximize the efficiency observed in Week 2.
                   </p>
               </div>
          </div>
      </div>
      
      {/* Spacer */}
      <div className="h-8"></div>
    </div>
  );
};

export default Uplift;