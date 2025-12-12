export interface CampaignSummary {
  name: string;
  startDate: string;
  endDate: string;
  daysRunning: number;
  estimatedImpressions: number;
  activeBillboards: number;
  estimatedAudienceReached: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fullMark?: number;
  fill?: string;
  [key: string]: any;
}

export interface ExposureData {
  date: string;
  actual: number;
  baseline: number;
}

export interface BillboardSnapshot {
  id: string;
  dailyImpressions: number;
  visibility: number;
  audienceFit: number;
}

export interface Asset {
  id: string;
  location: string;
  image: string;
  description: string;
  aiInsight: string;
  dailyImpressions: number;
  visibilityScore: number;
  audienceFit: number;
  contextScore: number;
  dailyExposure?: ExposureData[];
  hourlyHeatmap?: { hour: number; value: number }[];
  audience?: ChartDataPoint[];
  poiNearby?: { category: string; count: number }[];
  creativeMetrics?: {
    visibility: number;
    contrast: number;
    obstruction: number;
    lighting: number;
  };
  coordinates: { lat: number; lng: number }; 
}

// --- NEW GEO TYPES ---

export interface GeoBillboard {
  id: string;
  name: string;
  lat: number;
  lon: number;
  daily_impressions: number;
  performance_level: 'high' | 'medium' | 'low';
  exposure_volume: number; // 0.0 to 1.0 (determines ring thickness)
  visibility_score: number;
  context_score: number;
  audience_fit: number;
  trend_7d: number[]; 
  dominant_audience: string;
}

export interface TrafficPoint {
  lat: number;
  lon: number;
  intensity: number;
}

export interface HexHotspot {
  hex_id: string;
  center_lat: number;
  center_lon: number;
  exposure_intensity: number;
  dominant_audience: string;
}

export interface AudienceCorridor {
  id: string;
  path: [number, number][]; 
  volume: number;
  confidence: number;
  description: string;
}

export interface PoiCluster {
  lat: number;
  lon: number;
  category: 'Retail' | 'Fitness' | 'Food' | 'Grocery' | 'Lifestyle' | 'Tech';
  count: number;
  score: number;
}

export interface CatchmentZone {
  asset_id: string;
  center_lat: number;
  center_lon: number;
  radius_meters: number;
  intensity: number;
  overlap_with: string[];
}

export interface MapInsight {
  headline: string;
  avg_daily_exposure: number;
  top_poi_category: string;
  poi_color: string;
  active_hotspots: number;
}

export interface BillboardDetail {
  asset_id: string;
  name: string;
  location: string;
  daily_impressions: number;
  baseline_deviation: string;
  context_alignment: number;
  audience_dominance: string;
  overlapping_assets: string[];
  local_pois: { category: string; count: number }[];
  visibility_profile: {
    lighting: string;
    angle: string;
    obstruction: string;
  };
  trend_14d: number[];
}

export interface CreativeData {
  image: string;
  aiSummary: string;
  scores: {
    readability: number;
    contrast: number;
    angleSuitability: number;
    obstructionRisk: number;
    lighting: number;
  };
  advancedMetrics: {
    firstFixation: string;
    expectedReadTime: string;
    recallUplift: number;
    brandSafetyScore: number;
    colorHarmony: number;
  };
  radar: ChartDataPoint[];
  obstructionSegments: { name: string; value: number; color: string }[];
  recommendations: { text: string; impact: string }[];
}

export interface UpliftData {
  baselineVsActual: ExposureData[];
  channelContribution: {
    name: string;
    search: number;
    social: number;
    email: number;
    other: number;
    offlineResidual: number;
  }[];
  incrementalLift: {
    value: number;
    estimatedConversions: number;
  };
  dataQuality: {
    score: number;
    missing: string[];
  };
  // New Intelligence Fields
  aiSummary: string;
  drivers: { name: string; value: number }[];
  monetary: {
    spend: number;
    cpa: number;
    cpmDiff: number;
    roasUplift: number;
  };
  synergy: {
    searchLift: number;
    footfallLift: number;
    webLift: number;
  };
  assetPerformance: {
    id: string;
    uplift: number;
    share: number;
    efficiency: 'High' | 'Medium' | 'Low';
  }[];
}

export interface ReportData {
  summary: {
    totalImpressions: number;
    audienceReached: number;
    topAsset: string;
  };
  topAssets: { id: string; score: number }[];
  recommendations: string[];
}