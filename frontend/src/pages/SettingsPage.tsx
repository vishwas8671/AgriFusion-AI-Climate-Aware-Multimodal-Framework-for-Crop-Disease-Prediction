import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import {
  Settings,
  User as UserIcon,
  Compass,
  Server,
  Save,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [defaultLat, setDefaultLat] = useState<number>(28.6139);
  const [defaultLon, setDefaultLon] = useState<number>(77.2090);
  const [stationName, setStationName] = useState<string>('Indo-Gangetic Agronomic Zone');
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:5000/api');

  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [testingApi, setTestingApi] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('agrifusion_settings', JSON.stringify({ unit, defaultLat, defaultLon, stationName, apiUrl }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestApi = async () => {
    setTestingApi(true);
    setApiStatus(null);
    try {
      const res = await apiService.checkHealth();
      setApiStatus(`Connected: Status ${res.status || 'OK'} • ML Service: ${res.mlService || 'Ready'}`);
    } catch {
      setApiStatus('Direct API offline. Running in Autonomous Academic Client Mode.');
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-neutralgrey-border/60">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-forest">System Settings & Profile Preferences</h1>
          <span className="badge-scientific bg-agri-subtle text-agri border-agri/30">
            Configuration
          </span>
        </div>
        <p className="text-xs text-neutralgrey mt-1">
          Customize agronomic measurement units, telemetry coordinates, and diagnostic API endpoints.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>System configuration and telemetry preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Overview */}
        <div className="card-scientific space-y-4">
          <div className="border-b border-neutralgrey-border/50 pb-2">
            <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-agri" />
              User Profile & Academic Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] text-neutralgrey uppercase font-mono block">Active Investigator</label>
              <div className="font-semibold text-charcoal text-sm">{user?.name || 'Evaluator Guest'}</div>
            </div>

            <div>
              <label className="text-[10px] text-neutralgrey uppercase font-mono block">Registered Email</label>
              <div className="font-mono text-neutralgrey">{user?.email || 'evaluator@university.edu'}</div>
            </div>

            <div>
              <label className="text-[10px] text-neutralgrey uppercase font-mono block">System Role</label>
              <div className="font-medium text-forest capitalize">{user?.role || 'Academic Reviewer'}</div>
            </div>

            <div>
              <label className="text-[10px] text-neutralgrey uppercase font-mono block">Department / Affiliation</label>
              <div className="text-neutralgrey">{user?.institution || 'Dept of CSE (Artificial Intelligence & ML)'}</div>
            </div>
          </div>
        </div>

        {/* Agronomic Units & Preferences */}
        <div className="card-scientific space-y-4">
          <div className="border-b border-neutralgrey-border/50 pb-2">
            <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-agri" />
              Agronomic Units & Default Field Station
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">Temperature Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="input-field text-xs cursor-pointer"
              >
                <option value="celsius">Celsius (°C) — Standard</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">Default Latitude (°N)</label>
              <input
                type="number"
                step="0.0001"
                value={defaultLat}
                onChange={(e) => setDefaultLat(parseFloat(e.target.value))}
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">Default Longitude (°E)</label>
              <input
                type="number"
                step="0.0001"
                value={defaultLon}
                onChange={(e) => setDefaultLon(parseFloat(e.target.value))}
                className="input-field text-xs"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-semibold text-charcoal block mb-1">Field Station Designation</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="input-field text-xs"
              />
            </div>
          </div>
        </div>

        {/* Backend & ML Microservice Endpoints */}
        <div className="card-scientific space-y-4">
          <div className="border-b border-neutralgrey-border/50 pb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
              <Server className="w-4 h-4 text-agri" />
              Application API & Inference Gateway
            </h3>
            <button
              type="button"
              onClick={handleTestApi}
              disabled={testingApi}
              className="text-xs text-agri hover:underline flex items-center gap-1 font-medium"
            >
              <Activity className="w-3.5 h-3.5" />
              {testingApi ? 'Pinging Gateway...' : 'Test Connection'}
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">API Base URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="input-field text-xs font-mono"
              />
              <p className="text-[10px] text-neutralgrey mt-1">
                Standard local route: http://localhost:5000/api (routes directly to Node Express proxy & FastAPI ML worker).
              </p>
            </div>

            {apiStatus && (
              <div className="p-2.5 rounded bg-sage/50 text-[11px] font-mono text-forest border border-neutralgrey-border/50">
                {apiStatus}
              </div>
            )}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="btn-primary text-xs py-2.5 px-6 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
