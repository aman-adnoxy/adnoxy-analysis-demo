import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CREATIVE_INSIGHTS } from '../data/mockData';
import { 
    Sparkles, Crosshair, Grid, Eye, Lightbulb, Zap, MousePointer2, Shield, ScanLine, Activity 
} from 'lucide-react';

const CreativeInsights: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'heatmap' | 'segments' | 'safezones' | 'gaze'>('heatmap');
  const [isScanning, setIsScanning] = useState(true);

  // Simulate AI Scanning Effect
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-white h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8 border-b border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center gap-2 font-heading tracking-tight">
                <Sparkles className="text-black" strokeWidth={2.5} />
                Creative AI Vision
            </h1>
            <p className="text-neutral-500 mt-1 text-sm md:text-base">Computer vision analysis for outdoor readability and impact.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-orange-500 animate-ping' : 'bg-green-500'}`}></div>
            <span className="uppercase tracking-widest font-bold text-neutral-500">
                {isScanning ? 'PROCESSING...' : 'ANALYSIS COMPLETE'}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: VISUALIZER ENGINE --- */}
        <div className="lg:col-span-7 space-y-4">
            
            {/* Main Canvas */}
            <div className="relative rounded-sm overflow-hidden border border-neutral-200 bg-neutral-900 group shadow-lg z-0">
                
                {/* Image Base */}
                <img 
                    src={CREATIVE_INSIGHTS.image} 
                    alt="Analyzed Creative" 
                    className={`w-full h-auto transition-opacity duration-1000 ${isScanning ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`} 
                />

                {/* SCANNING OVERLAY (Initial State) - z-10 ensures it stays below sidebar (z-3000) */}
                {isScanning && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="w-full h-1 bg-green-400 absolute top-0 shadow-[0_0_20px_#4ade80] animate-[scan_2s_ease-in-out_infinite]"></div>
                        <div className="font-mono text-green-400 text-xs md:text-sm bg-black/80 px-4 py-2 rounded border border-green-500/50">
                            DETECTING LAYOUT...
                        </div>
                    </div>
                )}

                {/* VISUALIZATION LAYERS (Revealed after scan) */}
                {!isScanning && (
                    <>
                        {/* LAYER 1: HEATMAP (CSS Gradient) */}
                        {activeLayer === 'heatmap' && (
                             <div className="absolute inset-0 animate-fade-in" style={{
                                background: 'radial-gradient(circle at 35% 45%, rgba(255, 0, 0, 0.9) 0%, rgba(255, 140, 0, 0.7) 30%, rgba(255, 255, 0, 0.4) 55%, transparent 75%), radial-gradient(circle at 75% 25%, rgba(0, 255, 100, 0.7) 0%, transparent 45%)',
                                mixBlendMode: 'hard-light',
                                opacity: 0.8
                            }}></div>
                        )}

                        {/* LAYER 2: OBJECT SEGMENTS (Tech Brackets) */}
                        {activeLayer === 'segments' && (
                            <div className="absolute inset-0 animate-fade-in">
                                {/* Headline Box */}
                                <div className="absolute top-[15%] left-[10%] w-[40%] h-[15%] border-2 border-yellow-400/80 bg-yellow-400/10">
                                    <div className="absolute -top-3 left-0 bg-yellow-400 text-black text-[9px] font-bold px-1 font-mono">HEADLINE</div>
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-yellow-400"></div>
                                    <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-yellow-400"></div>
                                </div>
                                {/* CTA Box */}
                                <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[10%] border-2 border-cyan-400/80 bg-cyan-400/10">
                                    <div className="absolute -top-3 right-0 bg-cyan-400 text-black text-[9px] font-bold px-1 font-mono">CTA</div>
                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-cyan-400"></div>
                                    <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-cyan-400"></div>
                                </div>
                                 {/* Low Contrast Warning */}
                                <div className="absolute top-[10%] right-[10%] w-[20%] h-[20%] border border-dashed border-red-500/60 bg-red-500/10 flex items-center justify-center">
                                     <span className="text-red-200 text-[9px] font-mono bg-red-900/80 px-1">LOW CONTRAST</span>
                                </div>
                            </div>
                        )}

                        {/* LAYER 3: SAFE ZONES (Grid) */}
                        {activeLayer === 'safezones' && (
                             <div className="absolute inset-0 animate-fade-in">
                                 {/* Outer Safety Margin */}
                                 <div className="absolute inset-0 border-[20px] border-red-500/20 pointer-events-none"></div>
                                 <div className="absolute inset-[20px] border border-dashed border-green-400/50">
                                     <div className="absolute top-2 left-2 text-[9px] text-green-400 font-mono bg-black/50 px-1">SAFE ZONE</div>
                                 </div>
                                 {/* Center Guides */}
                                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30"></div>
                                 <div className="absolute left-0 right-0 top-1/2 h-px bg-white/30"></div>
                             </div>
                        )}

                         {/* LAYER 4: GAZE PLOT (SVG) */}
                        {activeLayer === 'gaze' && (
                             <svg className="absolute inset-0 w-full h-full animate-fade-in pointer-events-none">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                                    </filter>
                                </defs>
                                <path d="M 280 200 L 450 150 L 550 400" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" filter="url(#glow)" />
                                <circle cx="280" cy="200" r="15" fill="#ec4899" opacity="0.6" />
                                <text x="280" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
                                <circle cx="450" cy="150" r="10" fill="#ec4899" opacity="0.6" />
                                <text x="450" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>
                                <circle cx="550" cy="400" r="25" fill="#ec4899" opacity="0.6" />
                                <text x="550" y="405" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
                             </svg>
                        )}
                    </>
                )}
            </div>

            {/* Layer Controls */}
            <div className="grid grid-cols-4 gap-2">
                {[
                    { id: 'heatmap', label: 'Heatmap', icon: Activity },
                    { id: 'segments', label: 'Segments', icon: Crosshair },
                    { id: 'safezones', label: 'Safe Zones', icon: Grid },
                    { id: 'gaze', label: 'Gaze Plot', icon: Eye },
                ].map((btn) => (
                    <button 
                        key={btn.id}
                        onClick={() => setActiveLayer(btn.id as any)}
                        disabled={isScanning}
                        className={`
                            flex items-center justify-center gap-2 py-3 px-2 rounded-sm text-xs font-bold uppercase transition-all
                            ${activeLayer === btn.id 
                                ? 'bg-black text-white shadow-md border-black' 
                                : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'}
                            ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <btn.icon size={14} className="hidden md:block"/> <span className="text-[10px] md:text-xs">{btn.label}</span>
                    </button>
                ))}
            </div>

            {/* AI Summary Panel */}
             <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                <h3 className="font-bold text-black flex items-center gap-2 mb-3 text-sm uppercase tracking-wide font-heading">
                    <Zap size={16} className="text-indigo-600" /> AI Diagnostic Summary
                </h3>
                <p className="text-neutral-700 text-sm leading-relaxed">
                    {isScanning ? (
                        <span className="animate-pulse bg-neutral-200 text-transparent rounded">Loading summary text placeholder...</span>
                    ) : (
                        <>
                            The creative demonstrates strong readability with a <strong className="text-black">78% effectiveness score</strong>. 
                            Eye-tracking simulation indicates rapid fixation (0.8s) on the central subject, 
                            though brand logo discovery is delayed.
                            <br/><br/>
                            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded inline-block">Suggestion:</span> Increase contrast in the lower-right quadrant to improve CTA visibility for evening audiences.
                        </>
                    )}
                </p>
             </div>
        </div>

        {/* --- RIGHT COLUMN: ANALYTICS --- */}
        <div className={`lg:col-span-5 space-y-6 transition-all duration-1000 ${isScanning ? 'opacity-50 blur-[2px]' : 'opacity-100 blur-0'}`}>
            
            {/* Smart Radar */}
            <div className="bg-white border border-neutral-200 p-6 flex flex-col items-center gap-6">
                 <div className="w-full h-48 md:w-64 md:h-64 flex-shrink-0 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CREATIVE_INSIGHTS.radar}>
                            <PolarGrid stroke="#e5e5e5" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#000000', fontSize: 10, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Score" dataKey="value" stroke="#000000" strokeWidth={2} fill="#000000" fillOpacity={0.1} />
                        </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-full space-y-3">
                     <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-1">
                         <span className="text-neutral-500 font-medium">Text Legibility</span>
                         <span className="font-bold text-black">92% <span className="text-[10px] font-normal text-neutral-400">Excellent</span></span>
                     </div>
                     <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-1">
                         <span className="text-neutral-500 font-medium">Color Contrast</span>
                         <span className="font-bold text-orange-600">71% <span className="text-[10px] font-normal text-neutral-400">Medium</span></span>
                     </div>
                     <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-1">
                         <span className="text-neutral-500 font-medium">Viewing Angle</span>
                         <span className="font-bold text-red-600">65% <span className="text-[10px] font-normal text-neutral-400">Low</span></span>
                     </div>
                 </div>
            </div>

            {/* Deep Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-neutral-50 p-4 border border-neutral-200">
                     <div className="flex items-center gap-2 mb-2">
                         <MousePointer2 size={14} className="text-neutral-400" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-heading">First Fixation</span>
                     </div>
                     <p className="text-xl md:text-2xl font-bold text-black font-heading">{CREATIVE_INSIGHTS.advancedMetrics.firstFixation}</p>
                     <p className="text-[10px] text-green-600 font-bold mt-1">Faster than avg (1.2s)</p>
                 </div>
                 <div className="bg-neutral-50 p-4 border border-neutral-200">
                     <div className="flex items-center gap-2 mb-2">
                         <Shield size={14} className="text-neutral-400" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-heading">Brand Safety</span>
                     </div>
                     <p className="text-xl md:text-2xl font-bold text-black font-heading">{CREATIVE_INSIGHTS.advancedMetrics.brandSafetyScore}/100</p>
                     <p className="text-[10px] text-neutral-400 font-bold mt-1">No violations detected</p>
                 </div>
                 <div className="bg-neutral-50 p-4 border border-neutral-200">
                     <div className="flex items-center gap-2 mb-2">
                         <Zap size={14} className="text-neutral-400" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-heading">Recall Uplift</span>
                     </div>
                     <p className="text-xl md:text-2xl font-bold text-black font-heading">+{CREATIVE_INSIGHTS.advancedMetrics.recallUplift}%</p>
                     <p className="text-[10px] text-neutral-400 font-bold mt-1">Predicted impact</p>
                 </div>
                 <div className="bg-neutral-50 p-4 border border-neutral-200">
                     <div className="flex items-center gap-2 mb-2">
                         <ScanLine size={14} className="text-neutral-400" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-heading">Read Time</span>
                     </div>
                     <p className="text-xl md:text-2xl font-bold text-black font-heading">{CREATIVE_INSIGHTS.advancedMetrics.expectedReadTime}</p>
                     <p className="text-[10px] text-neutral-400 font-bold mt-1">Ideal for arterial roads</p>
                 </div>
            </div>

            {/* Obstruction Bar */}
             <div className="bg-white p-6 border border-neutral-200">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-black uppercase tracking-wide text-sm font-heading">Obstruction Risk</h3>
                     <span className="text-xs text-neutral-500">Visibility blockage analysis</span>
                </div>
                <div className="w-full h-4 rounded-full flex overflow-hidden mb-3">
                    {CREATIVE_INSIGHTS.obstructionSegments.map((seg, idx) => (
                        <div key={idx} style={{ width: `${seg.value}%`, backgroundColor: seg.color }}></div>
                    ))}
                </div>
                <div className="flex justify-between text-[10px] font-medium text-neutral-600">
                     {CREATIVE_INSIGHTS.obstructionSegments.map((seg, idx) => (
                         <div key={idx} className="flex items-center gap-1">
                             <div className="w-2 h-2 rounded-full" style={{backgroundColor: seg.color}}></div>
                             {seg.name} ({seg.value}%)
                         </div>
                     ))}
                </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white p-6 border border-neutral-200">
                <h3 className="font-bold text-black mb-4 uppercase tracking-wide text-sm flex items-center gap-2 font-heading">
                    <Lightbulb size={16} className="text-yellow-500" /> Optimization Suggestions
                </h3>
                <div className="space-y-4">
                    {CREATIVE_INSIGHTS.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex gap-3 group">
                             <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5
                                ${rec.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-neutral-100 text-neutral-600'}
                             `}>
                                 {rec.impact === 'High' ? '!' : idx + 1}
                             </div>
                             <div>
                                 <p className="text-sm text-neutral-800 font-medium leading-snug">{rec.text}</p>
                                 <span className={`text-[10px] font-bold uppercase tracking-wider ${rec.impact === 'High' ? 'text-red-600' : 'text-neutral-400'}`}>
                                     {rec.impact} Impact
                                 </span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default CreativeInsights;