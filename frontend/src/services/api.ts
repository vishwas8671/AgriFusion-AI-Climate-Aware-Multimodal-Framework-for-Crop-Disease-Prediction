import { PredictionResult, EnvironmentalData, DailyRiskForecast, User } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('agrifusion_token');
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(err.message || 'Authentication error');
    }
    return res.json();
  },

  async register(data: { name: string; email: string; password: string; role?: string; institution?: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(err.message || 'Registration error');
    }
    return res.json();
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('agrifusion_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        localStorage.removeItem('agrifusion_token');
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  // Disease Prediction (Multimodal Image + Environmental)
  async analyzeCropDisease(
    file: File,
    cropType: string,
    environmentalData?: Partial<EnvironmentalData>
  ): Promise<PredictionResult> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cropType', cropType);
    if (environmentalData) {
      formData.append('environmentalContext', JSON.stringify(environmentalData));
    }

    const res = await fetch(`${API_BASE}/predictions/classify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Analysis failed' }));
      throw new Error(err.message || 'Model inference failed');
    }
    return res.json();
  },

  // Environmental Weather Fetch (Open-Meteo Proxy)
  async getEnvironmentalData(latitude: number, longitude: number): Promise<EnvironmentalData> {
    const res = await fetch(`${API_BASE}/environment/weather?lat=${latitude}&lon=${longitude}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Weather data retrieval failed' }));
      throw new Error(err.message || 'Weather service unavailable');
    }
    return res.json();
  },

  // 7-Day Disease Risk Forecast
  async getRiskForecast(latitude: number, longitude: number, crop: string): Promise<{
    location: string;
    coordinates: { lat: number; lon: number };
    forecast: DailyRiskForecast[];
    modelBasis: string;
    agronomicDisclaimer: string;
  }> {
    const res = await fetch(`${API_BASE}/risk/forecast?lat=${latitude}&lon=${longitude}&crop=${encodeURIComponent(crop)}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Risk forecast retrieval failed' }));
      throw new Error(err.message || 'Risk forecast failed');
    }
    return res.json();
  },

  // Analysis History
  async getAnalyses(filter?: { crop?: string; search?: string }): Promise<PredictionResult[]> {
    const query = new URLSearchParams();
    if (filter?.crop) query.append('crop', filter.crop);
    if (filter?.search) query.append('search', filter.search);

    const res = await fetch(`${API_BASE}/analyses?${query.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch analysis history');
    }
    return res.json();
  },

  async getAnalysisById(id: string): Promise<PredictionResult> {
    const res = await fetch(`${API_BASE}/analyses/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error('Analysis record not found');
    }
    return res.json();
  },

  async deleteAnalysis(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/analyses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to delete analysis');
    }
  },

  // Health check
  async checkHealth(): Promise<{ status: string; mlService: string; timestamp: string }> {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  }
};
