import { Asset, CampaignSummary, ChartDataPoint, CreativeData, ExposureData, UpliftData, ReportData, GeoBillboard, TrafficPoint, HexHotspot, AudienceCorridor, PoiCluster, CatchmentZone, MapInsight, BillboardDetail } from '../types';

// DATASET 1: Overview
export const CAMPAIGN_SUMMARY: CampaignSummary = {
  name: "FitIndia New Year Campaign",
  startDate: "2025-01-01",
  endDate: "2025-01-30",
  daysRunning: 12,
  estimatedImpressions: 18600000,
  activeBillboards: 42,
  estimatedAudienceReached: 3200000
};

export const OVERVIEW_EXPOSURE: ExposureData[] = [
  { date: "Jan 01", actual: 400000, baseline: 380000 },
  { date: "Jan 02", actual: 450000, baseline: 390000 },
  { date: "Jan 03", actual: 470000, baseline: 410000 },
  { date: "Jan 04", actual: 520000, baseline: 430000 },
  { date: "Jan 05", actual: 510000, baseline: 425000 },
  { date: "Jan 06", actual: 560000, baseline: 440000 },
  { date: "Jan 07", actual: 590000, baseline: 450000 },
  { date: "Jan 08", actual: 610000, baseline: 460000 },
  { date: "Jan 09", actual: 580000, baseline: 450000 },
  { date: "Jan 10", actual: 630000, baseline: 470000 },
  { date: "Jan 11", actual: 680000, baseline: 480000 },
  { date: "Jan 12", actual: 700000, baseline: 490000 }
];

export const AUDIENCE_AGE: ChartDataPoint[] = [
  { name: '18-24', value: 21, fill: '#000000' },
  { name: '25-34', value: 38, fill: '#404040' }, 
  { name: '35-44', value: 27, fill: '#a3a3a3' }, 
  { name: '45+', value: 14, fill: '#e5e5e5' }   
];

export const AUDIENCE_INCOME: ChartDataPoint[] = [
  { name: 'Low', value: 22, fill: '#e5e5e5' },   
  { name: 'Mid', value: 48, fill: '#000000' },   
  { name: 'High', value: 30, fill: '#525252' }   
];

export const POI_RELEVANCE: ChartDataPoint[] = [
  { name: 'Food', value: 82 },
  { name: 'Fitness', value: 76 },
  { name: 'Grocery', value: 61 },
  { name: 'Lifestyle', value: 54 }
];

export const ASSETS: Asset[] = [
  {
    id: "MUM-2041",
    location: "Bandra Kurla Complex",
    image: "/images/1.jpg",
    description: "High dwell time corridor near dense commercial zone and premium shopping areas.",
    aiInsight: "Strong alignment with fitness affinity groups and working professionals.",
    dailyImpressions: 128000,
    visibilityScore: 87,
    audienceFit: 74,
    contextScore: 81,
    coordinates: { lat: 19.0596, lng: 72.8656 },
    dailyExposure: [
      { date: "Jan 01", actual: 128000, baseline: 110000 },
      { date: "Jan 02", actual: 130000, baseline: 112000 },
      { date: "Jan 03", actual: 126000, baseline: 115000 },
      { date: "Jan 04", actual: 135000, baseline: 118000 },
      { date: "Jan 05", actual: 140000, baseline: 120000 }
    ],
    hourlyHeatmap: [
      { hour: 6, value: 18000 }, { hour: 7, value: 24000 }, { hour: 8, value: 31000 },
      { hour: 9, value: 28000 }, { hour: 10, value: 22000 }, { hour: 11, value: 19000 },
      { hour: 12, value: 25000 }, { hour: 13, value: 26000 }, { hour: 14, value: 24000 },
      { hour: 15, value: 28000 }, { hour: 16, value: 35000 }, { hour: 17, value: 42000 },
      { hour: 18, value: 45000 }, { hour: 19, value: 38000 }, { hour: 20, value: 30000 }
    ],
    audience: [
       { name: '18-24', value: 19, fill: '#000000' },
       { name: '25-34', value: 41, fill: '#374151' },
       { name: '35-44', value: 28, fill: '#9ca3af' },
       { name: '45+', value: 12, fill: '#d1d5db' }
    ],
    poiNearby: [
      { category: "Food", count: 14 },
      { category: "Fitness", count: 5 },
      { category: "Mall", count: 2 }
    ],
    creativeMetrics: { visibility: 87, contrast: 74, obstruction: 9, lighting: 83 }
  },
  {
    id: "MUM-2049",
    location: "Andheri Link Road",
    image: "/images/2.jpg",
    description: "Major arterial intersection with heavy commuter traffic flow from suburbs.",
    aiInsight: "Optimal for morning commute targeting and office-goers.",
    dailyImpressions: 118000,
    visibilityScore: 81,
    audienceFit: 78,
    contextScore: 79,
    coordinates: { lat: 19.1136, lng: 72.8697 },
    dailyExposure: [
      { date: "Jan 01", actual: 110000, baseline: 90000 },
      { date: "Jan 02", actual: 115000, baseline: 95000 },
      { date: "Jan 03", actual: 118000, baseline: 92000 }
    ],
    hourlyHeatmap: [
      { hour: 6, value: 10000 }, { hour: 7, value: 15000 }, { hour: 8, value: 45000 },
      { hour: 9, value: 40000 }, { hour: 17, value: 48000 }, { hour: 18, value: 50000 }
    ],
    audience: [
       { name: '18-24', value: 25, fill: '#000000' },
       { name: '25-34', value: 35, fill: '#374151' },
       { name: '35-44', value: 25, fill: '#9ca3af' },
       { name: '45+', value: 15, fill: '#d1d5db' }
    ],
    poiNearby: [
      { category: "Transport", count: 8 },
      { category: "Hotel", count: 4 }
    ],
    creativeMetrics: { visibility: 81, contrast: 80, obstruction: 5, lighting: 90 }
  },
  {
    id: "MUM-3012",
    location: "Linking Road, Bandra",
    image: "/images/3.jpg",
    description: "Vibrant shopping street with high pedestrian footfall and evening activity.",
    aiInsight: "High engagement from younger demographics and college students.",
    dailyImpressions: 95000,
    visibilityScore: 92,
    audienceFit: 65,
    contextScore: 88,
    coordinates: { lat: 19.0544, lng: 72.8320 },
     dailyExposure: [
      { date: "Jan 01", actual: 95000, baseline: 80000 },
      { date: "Jan 02", actual: 98000, baseline: 82000 }
    ],
    hourlyHeatmap: Array.from({length: 15}, (_, i) => ({ hour: i+6, value: Math.floor(Math.random()*20000)+10000 })),
    audience: [],
    poiNearby: [],
    creativeMetrics: { visibility: 92, contrast: 85, obstruction: 2, lighting: 95 }
  },
  {
    id: "MUM-1055",
    location: "Powai IT Hub",
    image: "/images/4.jpg",
    description: "Tech corridor proximity with consistent daytime business traffic from IT companies.",
    aiInsight: "Excellent B2B crossover potential with tech professionals.",
    dailyImpressions: 88000,
    visibilityScore: 75,
    audienceFit: 85,
    contextScore: 92,
    coordinates: { lat: 19.1197, lng: 72.9089 },
    dailyExposure: [], hourlyHeatmap: [], audience: [], poiNearby: [], creativeMetrics: { visibility: 75, contrast: 70, obstruction: 12, lighting: 78 }
  }
];

export const CREATIVE_INSIGHTS: CreativeData = {
  image: "/images/5.jpg",
  aiSummary: "The creative demonstrates strong readability and clear subject focus, achieving a **78% effectiveness score**. While text legibility is excellent for high-speed traffic, the CTA contrast falls below optimal thresholds for evening viewing. Eye-tracking simulation suggests rapid fixation on the central subject, but delayed discovery of the brand logo.",
  scores: {
    readability: 0.92,
    contrast: 0.71,
    angleSuitability: 0.65,
    obstructionRisk: 0.11,
    lighting: 0.84
  },
  advancedMetrics: {
    firstFixation: "0.8s",
    expectedReadTime: "2.4s",
    recallUplift: 18,
    brandSafetyScore: 99,
    colorHarmony: 82
  },
  radar: [
    { name: "Legibility", value: 92, fullMark: 100 },
    { name: "Contrast", value: 71, fullMark: 100 },
    { name: "Impact", value: 85, fullMark: 100 },
    { name: "Recall", value: 78, fullMark: 100 },
    { name: "Safe Zone", value: 95, fullMark: 100 }
  ],
  obstructionSegments: [
    { name: "Clear View", value: 78, color: "#10b981" }, // green
    { name: "Partial", value: 18, color: "#f59e0b" },    // orange
    { name: "Blocked", value: 4, color: "#ef4444" }     // red
  ],
  recommendations: [
    { text: "Increase headline font size by 18% for long-distance readability.", impact: "High" },
    { text: "Boost background blur behind CTA to raise contrast by 12%.", impact: "Medium" },
    { text: "Shift brand logo 40px left to enter the primary fixation cluster.", impact: "High" },
    { text: "Reduce secondary text density to maintain focus on primary message.", impact: "Low" }
  ]
};

export const UPLIFT_DATA: UpliftData = {
  baselineVsActual: [
    { date: "Jan 01", baseline: 10000, actual: 11400 },
    { date: "Jan 02", baseline: 10200, actual: 12000 },
    { date: "Jan 03", baseline: 10100, actual: 11900 },
    { date: "Jan 04", baseline: 10500, actual: 12500 },
    { date: "Jan 05", baseline: 10300, actual: 12100 },
    { date: "Jan 06", baseline: 10800, actual: 13000 },
    { date: "Jan 07", baseline: 11000, actual: 13500 }
  ],
  channelContribution: [
    { name: 'Week 1', search: 32, social: 24, email: 5, other: 18, offlineResidual: 21 },
    { name: 'Week 2', search: 30, social: 22, email: 6, other: 17, offlineResidual: 25 },
  ],
  incrementalLift: {
    value: 17,
    estimatedConversions: 4800
  },
  dataQuality: {
    score: 82,
    missing: ["CRM dataset", "Push notification logs"]
  },
  aiSummary: "The campaign outperformed expectations by **17%**, primarily driven by strong visibility in retail clusters and high-performing creatives. Offline impressions contributed to **21%** of total conversions, effectively reducing the overall Cost Per Acquisition by blending with lower efficiency digital channels.",
  drivers: [
    { name: "High performing assets", value: 12 },
    { name: "Retail cluster exposure", value: 7 },
    { name: "Creative clarity score", value: 4 },
    { name: "Dwell time targeting", value: 3 }
  ],
  monetary: {
    spend: 1200000,
    cpa: 250,
    cpmDiff: -14,
    roasUplift: 22
  },
  synergy: {
    searchLift: 9,
    footfallLift: 6,
    webLift: 12
  },
  assetPerformance: [
    { id: "MUM-2041", uplift: 12, share: 31, efficiency: 'High' },
    { id: "MUM-3012", uplift: 9, share: 22, efficiency: 'Medium' },
    { id: "MUM-1055", uplift: 4, share: 11, efficiency: 'Low' }
  ]
};

export const REPORT_DATA: ReportData = {
  summary: {
    totalImpressions: 18600000,
    audienceReached: 3200000,
    topAsset: "MUM-2041"
  },
  topAssets: [
    { id: "MUM-2041", score: 91 },
    { id: "MUM-2049", score: 87 }
  ],
  recommendations: [
    "Increase asset focus around fitness clusters and gyms",
    "Shift creatives toward higher color contrast for monsoon visibility",
    "Activate second wave of assets near shopping malls and multiplexes"
  ]
};

// --- NEW GEO DATA MOCKS ---

export const GEO_BILLBOARDS: GeoBillboard[] = [
  {
    id: "MUM-2041",
    name: "Bandra Kurla Complex",
    lat: 19.0596,
    lon: 72.8656,
    daily_impressions: 128000,
    performance_level: "high",
    exposure_volume: 0.91,
    visibility_score: 87,
    context_score: 81,
    audience_fit: 74,
    trend_7d: [118000, 121000, 123000, 126000, 127000, 128000, 130000],
    dominant_audience: "25-34"
  },
  {
    id: "MUM-2049",
    name: "Andheri Link Road",
    lat: 19.1136,
    lon: 72.8697,
    daily_impressions: 118000,
    performance_level: "medium",
    exposure_volume: 0.78,
    visibility_score: 81,
    context_score: 79,
    audience_fit: 78,
    trend_7d: [110000, 112000, 115000, 116000, 118000, 118000, 117000],
    dominant_audience: "18-24"
  },
  {
    id: "MUM-3012",
    name: "Linking Road, Bandra",
    lat: 19.0544,
    lon: 72.8320,
    daily_impressions: 95000,
    performance_level: "high",
    exposure_volume: 0.86,
    visibility_score: 92,
    context_score: 88,
    audience_fit: 65,
    trend_7d: [89000, 92000, 93000, 95000, 96000, 97000, 95000],
    dominant_audience: "18-24"
  },
  {
    id: "MUM-1055",
    name: "Powai IT Hub",
    lat: 19.1197,
    lon: 72.9089,
    daily_impressions: 88000,
    performance_level: "low",
    exposure_volume: 0.61,
    visibility_score: 75,
    context_score: 92,
    audience_fit: 85,
    trend_7d: [80000, 81000, 83000, 84000, 85000, 86000, 88000],
    dominant_audience: "35-44"
  }
];

export const TRAFFIC_HEATMAP: TrafficPoint[] = [
  { lat: 19.060, lon: 72.866, intensity: 0.92 },
  { lat: 19.114, lon: 72.870, intensity: 0.78 },
  { lat: 19.054, lon: 72.832, intensity: 0.85 },
  { lat: 19.120, lon: 72.909, intensity: 0.62 },
  { lat: 19.076, lon: 72.877, intensity: 0.71 },
  { lat: 19.017, lon: 72.856, intensity: 0.55 },
  // Adding more random points to flesh out the map
  { lat: 19.065, lon: 72.860, intensity: 0.88 },
  { lat: 19.108, lon: 72.875, intensity: 0.75 },
  { lat: 19.045, lon: 72.825, intensity: 0.65 },
  { lat: 19.025, lon: 72.840, intensity: 0.50 },
  { lat: 19.125, lon: 72.915, intensity: 0.80 },
];

export const HEX_HOTSPOTS: HexHotspot[] = [
  {
    hex_id: "8a2a1070b59ffff",
    center_lat: 19.060,
    center_lon: 72.866,
    exposure_intensity: 0.88,
    dominant_audience: "25-34"
  },
  {
    hex_id: "8a2a1070b597fff",
    center_lat: 19.054,
    center_lon: 72.832,
    exposure_intensity: 0.72,
    dominant_audience: "18-24"
  },
  {
    hex_id: "8a2a1070b593fff",
    center_lat: 19.120,
    center_lon: 72.909,
    exposure_intensity: 0.65,
    dominant_audience: "35-44"
  },
   // Extra hexes
  { hex_id: "hex-4", center_lat: 19.114, center_lon: 72.870, exposure_intensity: 0.55, dominant_audience: "45+" },
  { hex_id: "hex-5", center_lat: 19.076, center_lon: 72.877, exposure_intensity: 0.78, dominant_audience: "18-24" },
];

export const AUDIENCE_FLOW: AudienceCorridor[] = [
  {
    id: "flow-001",
    path: [
      [19.125, 72.915],
      [19.060, 72.866],
      [19.054, 72.832]
    ],
    volume: 0.82,
    confidence: 0.91,
    description: "Dominant evening commute corridor from IT hubs to residential areas"
  },
  {
    id: "flow-002",
    path: [
      [19.076, 72.877],
      [19.065, 72.860],
      [19.054, 72.832]
    ],
    volume: 0.68,
    confidence: 0.83,
    description: "Midday shopping and retail footfall corridor"
  }
];

export const POI_CLUSTERS: PoiCluster[] = [
  {
    lat: 19.060,
    lon: 72.866,
    category: "Retail",
    count: 14,
    score: 0.82
  },
  {
    lat: 19.054,
    lon: 72.832,
    category: "Fitness",
    count: 7,
    score: 0.76
  },
  {
    lat: 19.076,
    lon: 72.877,
    category: "Food",
    count: 11,
    score: 0.64
  },
  { lat: 19.120, lon: 72.909, category: "Tech", count: 8, score: 0.70 },
  { lat: 19.114, lon: 72.870, category: "Lifestyle", count: 12, score: 0.79 },
];

export const CATCHMENT_ZONES: CatchmentZone[] = [
  {
    asset_id: "MUM-2041",
    center_lat: 19.0596,
    center_lon: 72.8656,
    radius_meters: 500,
    intensity: 0.84,
    overlap_with: ["MUM-2049"]
  },
  {
    asset_id: "MUM-2049",
    center_lat: 19.1136,
    center_lon: 72.8697,
    radius_meters: 500,
    intensity: 0.72,
    overlap_with: []
  },
  // Adding for others
  { asset_id: "MUM-3012", center_lat: 19.0544, center_lon: 72.8320, radius_meters: 400, intensity: 0.75, overlap_with: [] },
  { asset_id: "MUM-1055", center_lat: 19.1197, center_lon: 72.9089, radius_meters: 600, intensity: 0.65, overlap_with: [] },
];

export const TOP_INSIGHT: MapInsight = {
  headline: "BKC business district shows 42 percent higher exposure than expected.",
  avg_daily_exposure: 105400,
  top_poi_category: "Retail",
  poi_color: "#8b5cf6", // purple-500
  active_hotspots: 3
};

export const BILLBOARD_DETAIL: BillboardDetail = {
  asset_id: "MUM-2041",
  name: "Bandra Kurla Complex",
  location: "BKC, Mumbai Business District",
  daily_impressions: 128000,
  baseline_deviation: "+18 percent",
  context_alignment: 81,
  audience_dominance: "25-34 (42 percent)",
  overlapping_assets: ["MUM-2049"],
  local_pois: [
    { category: "Retail", count: 14 },
    { category: "Fitness", count: 5 },
    { category: "Food", count: 9 }
  ],
  visibility_profile: {
    lighting: "Good",
    angle: "Excellent",
    obstruction: "Low"
  },
  trend_14d: [118000, 119000, 120000, 122000, 123000, 123000, 124000, 125000, 126000, 127000, 128000, 129000, 130000, 130000]
};