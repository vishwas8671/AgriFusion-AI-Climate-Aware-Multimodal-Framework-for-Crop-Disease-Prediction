export interface User {
  id: string;
  name: string;
  email: string;
  institution?: string;
  role: 'researcher' | 'agronomist' | 'student' | 'evaluator';
  token?: string;
}

export interface ClassProbability {
  className: string;
  displayName: string;
  probability: number; // 0 to 1
  crop: string;
}

export interface EnvironmentalData {
  latitude: number;
  longitude: number;
  locationName?: string;
  timestamp: string;
  temperature: number; // °C
  relativeHumidity: number; // %
  precipitation: number; // mm
  windSpeed: number; // km/h
  soilMoisture?: number; // m³/m³ or %
  soilPh?: number;
  soilNitrogen?: string;
  soilPhosphorus?: string;
  soilPotassium?: string;
  source: 'Open-Meteo Live API' | 'User Specified' | 'Interpolated / Fallback';
  isLive: boolean;
}

export interface DailyRiskForecast {
  date: string;
  dayName: string;
  temperatureMax: number;
  temperatureMin: number;
  relativeHumidityAvg: number;
  precipitationSum: number;
  riskScore: number; // 0 - 100
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Critical';
  primaryThreat: string;
  favourabilityReason: string;
}

export interface PredictionResult {
  id: string;
  predictedClass: string;
  crop: string;
  diseaseName: string;
  confidence: number; // 0 to 1
  confidenceLevel: 'High' | 'Moderate' | 'Low (Uncertain)';
  isHealthy: boolean;
  severity: {
    estimatedLevel: 'Low' | 'Moderate' | 'High' | 'Unavailable';
    method: string;
    affectedAreaPercentage?: number;
    disclaimer: string;
  };
  topPredictions: ClassProbability[];
  gradCamUrl?: string; // Base64 or URL
  originalImageUrl: string;
  treatmentRecommendations: {
    organic: string[];
    chemical: string[];
    preventive: string[];
  };
  pathogenInfo: {
    type: 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'None (Healthy)';
    scientificName: string;
    optimalTempRange: string;
    optimalHumidityRange: string;
  };
  modelMetadata: {
    modelName: string;
    architecture: string;
    version: string;
    inputResolution: string;
    inferenceTimeMs: number;
  };
  limitationsDisclaimer: string;
  environmentalContext?: EnvironmentalData;
  createdAt: string;
  userId?: string;
  notes?: string;
}

export interface DatasetStatistics {
  name: string;
  totalImages: number;
  numClasses: number;
  trainSplit: number;
  valSplit: number;
  testSplit: number;
  accuracy: number;
  macroF1: number;
  precision: number;
  recall: number;
  source: string;
  license: string;
}
