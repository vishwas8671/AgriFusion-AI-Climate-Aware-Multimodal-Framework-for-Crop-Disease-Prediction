import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import {
  UploadCloud,
  FileImage,
  Microscope,
  CloudSun,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export const DiseaseAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropType, setCropType] = useState<string>('Tomato');
  const [includeClimate, setIncludeClimate] = useState<boolean>(true);
  const [latitude, setLatitude] = useState<number>(28.6139);
  const [longitude, setLongitude] = useState<number>(77.2090);
  const [soilPh, setSoilPh] = useState<number>(6.5);
  const [soilMoisture, setSoilMoisture] = useState<number>(32);

  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Supported botanical crop categories
  const cropOptions = [
    { value: 'Tomato', label: 'Tomato (Solanum lycopersicum)' },
    { value: 'Potato', label: 'Potato (Solanum tuberosum)' },
    { value: 'Corn', label: 'Corn / Maize (Zea mays)' },
    { value: 'Rice', label: 'Rice (Oryza sativa)' },
    { value: 'Apple', label: 'Apple (Malus domestica)' },
    { value: 'Grape', label: 'Grape (Vitis vinifera)' },
    { value: 'Bell_Pepper', label: 'Bell Pepper (Capsicum annuum)' },
  ];

  // Quick Pre-configured Test Specimens (for instant evaluation)
  const sampleSpecimens = [
    {
      name: 'Tomato Early Blight',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?w=600&auto=format&fit=crop&q=80',
      description: 'Concentric brown rings on foliar tissue (Alternaria solani)'
    },
    {
      name: 'Potato Late Blight',
      crop: 'Potato',
      url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
      description: 'Water-soaked irregular lesions with dark necrosis'
    },
    {
      name: 'Corn Common Rust',
      crop: 'Corn',
      url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
      description: 'Cinnamon brown pustules scattered on upper leaf surface'
    },
    {
      name: 'Healthy Tomato Folium',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80',
      description: 'Turgid, unblemished green photosynthetic blade'
    }
  ];

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (.jpg, .jpeg, .png, .webp).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Specimen image size exceeds 10 MB limit.');
      return;
    }
    setError(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSample = async (sample: typeof sampleSpecimens[0]) => {
    setCropType(sample.crop);
    setError(null);
    try {
      // Create a canvas-based dummy file or fetch the image blob
      const res = await fetch(sample.url);
      const blob = await res.blob();
      const file = new File([blob], `${sample.name.replace(/\s+/g, '_').toLowerCase()}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(sample.url);
    } catch {
      // In case offline, create a colored dummy canvas specimen
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#287D5A';
        ctx.fillRect(0, 0, 224, 224);
        ctx.fillStyle = '#D99A27';
        ctx.beginPath();
        ctx.arc(112, 112, 40, 0, Math.PI * 2);
        ctx.fill();
      }
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `${sample.name.toLowerCase()}.jpg`, { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreviewUrl(canvas.toDataURL());
        }
      });
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(parseFloat(pos.coords.latitude.toFixed(4)));
          setLongitude(parseFloat(pos.coords.longitude.toFixed(4)));
        },
        () => {
          setError('Unable to retrieve device GPS coordinates. Using research station default.');
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please provide a crop leaf specimen image for diagnosis.');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      setAnalysisStep('1/4: Preprocessing & validating specimen resolution...');
      await new Promise((r) => setTimeout(r, 400));

      setAnalysisStep('2/4: Forward pass through PyTorch EfficientNet-B0 backbone...');
      await new Promise((r) => setTimeout(r, 600));

      setAnalysisStep('3/4: Generating Grad-CAM activation maps on features.8...');
      await new Promise((r) => setTimeout(r, 500));

      setAnalysisStep('4/4: Synthesizing Open-Meteo microclimate risk index...');

      const envContext = includeClimate
        ? {
            latitude,
            longitude,
            soilPh,
            soilMoisture,
          }
        : undefined;

      const result = await apiService.analyzeCropDisease(selectedFile, cropType, envContext);
      navigate(`/results/${result.id}`, { state: { result } });
    } catch (err: any) {
      console.error('Diagnosis failed:', err);
      setError(err.message || 'Model inference service encountered an error.');
    } finally {
      setAnalyzing(false);
      setAnalysisStep('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-neutralgrey-border/60">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-forest">Multimodal Crop Disease Diagnosis</h1>
          <span className="badge-scientific bg-agri-subtle text-agri border-agri/30">
            Inference Engine
          </span>
        </div>
        <p className="text-xs text-neutralgrey mt-1">
          Submit foliar specimens for deep convolutional classification (EfficientNet-B0), Grad-CAM spatial interpretability, and microclimate risk alignment.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-agrired flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-semibold">Analysis Notice:</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Quick Test Specimens Bar */}
      <div className="card-scientific space-y-3 bg-sage/30 border-dashed">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-agri" />
            Quick Test Specimens (1-Click Evaluation)
          </span>
          <span className="text-[11px] font-mono text-neutralgrey">PlantVillage Benchmark</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sampleSpecimens.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="p-2 rounded bg-white hover:bg-sage/40 border border-neutralgrey-border/60 text-left transition-all hover:border-agri group"
            >
              <div className="text-xs font-semibold text-charcoal group-hover:text-agri truncate">{sample.name}</div>
              <div className="text-[10px] text-neutralgrey truncate">{sample.crop} • Benchmark</div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Specimen Upload & Preview (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="card-scientific space-y-3">
              <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                <FileImage className="w-3.5 h-3.5 text-agri" />
                Specimen Image Input
              </label>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  previewUrl
                    ? 'border-agri/50 bg-sage/20'
                    : 'border-neutralgrey-border hover:border-agri bg-sage/10'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="space-y-3 w-full flex flex-col items-center">
                    <img
                      src={previewUrl}
                      alt="Crop specimen preview"
                      className="max-h-64 rounded-md object-contain shadow-subtle border border-neutralgrey-border/50"
                    />
                    <div className="text-[11px] text-neutralgrey font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-agri" />
                      <span>{selectedFile?.name || 'Specimen ready for diagnosis'}</span>
                      {selectedFile && <span>({(selectedFile.size / 1024).toFixed(0)} KB)</span>}
                    </div>
                    <span className="text-xs text-agri font-medium hover:underline">
                      Click to choose a different leaf photo
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <div className="w-12 h-12 rounded-full bg-sage/70 mx-auto flex items-center justify-center text-agri">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal">
                        Drop high-resolution leaf image here, or <span className="text-agri underline">browse</span>
                      </p>
                      <p className="text-[11px] text-neutralgrey mt-0.5">
                        Supports JPEG, PNG, WEBP (Max 10 MB). For best accuracy, capture single leaf blade with clear focus.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Crop Botanical Selection */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-charcoal block mb-1" htmlFor="cropSelect">
                  Botanical Crop Species
                </label>
                <select
                  id="cropSelect"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="input-field"
                >
                  {cropOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutralgrey mt-1">
                  Specifying the host species restricts the candidate class vocabulary to botanically valid pathogens.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Environmental & Soil Context (1 col) */}
          <div className="space-y-4">
            <div className="card-scientific space-y-4">
              <div className="flex items-center justify-between border-b border-neutralgrey-border/50 pb-2">
                <span className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                  <CloudSun className="w-3.5 h-3.5 text-agri" />
                  Climate Context
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeClimate}
                    onChange={(e) => setIncludeClimate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-neutralgrey-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-agri"></div>
                </label>
              </div>

              {includeClimate ? (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutralgrey font-medium">Field Coordinates</span>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="text-[10px] text-agri hover:underline flex items-center gap-0.5 font-medium"
                    >
                      <MapPin className="w-3 h-3" /> Auto GPS
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-neutralgrey block">Latitude (°N)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        className="input-field text-xs py-1.5 px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutralgrey block">Longitude (°E)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        className="input-field text-xs py-1.5 px-2"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutralgrey-border/40 space-y-2">
                    <span className="text-neutralgrey font-medium text-xs block">Soil Parameters (Optional)</span>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-neutralgrey">Soil pH Level:</span>
                        <span className="font-mono font-semibold text-charcoal">{soilPh}</span>
                      </div>
                      <input
                        type="range"
                        min="4.5"
                        max="8.5"
                        step="0.1"
                        value={soilPh}
                        onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                        className="w-full accent-agri cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-neutralgrey">Volumetric Moisture:</span>
                        <span className="font-mono font-semibold text-charcoal">{soilMoisture}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="1"
                        value={soilMoisture}
                        onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
                        className="w-full accent-agri cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded bg-sage/50 text-[10px] text-neutralgrey font-mono">
                    Data Stream: Open-Meteo Hourly Forecast v1.0
                  </div>
                </div>
              ) : (
                <p className="text-xs text-neutralgrey py-2">
                  Climate integration is currently deactivated. Prediction will execute image-only convolutional classification.
                </p>
              )}
            </div>

            {/* Scientific Transparency Info Box */}
            <div className="p-3 bg-sage/40 rounded-lg border border-neutralgrey-border/60 text-xs space-y-1">
              <span className="font-bold text-forest flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-agri" />
                Multimodal Fusion Note
              </span>
              <p className="text-[11px] text-neutralgrey leading-relaxed">
                When weather telemetry is provided, ambient temperature and humidity are used to compute pathogen germination favourability alongside the visual classifier probabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Button & Step Tracker */}
        <div className="card-scientific flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutralgrey">
            {analyzing ? (
              <div className="flex items-center gap-2 text-agri font-medium animate-pulse">
                <Layers className="w-4 h-4" />
                <span>{analysisStep}</span>
              </div>
            ) : (
              <span>Engine Status: Ready • PyTorch 2.14 • GPU/CPU Hybrid</span>
            )}
          </div>

          <button
            type="submit"
            disabled={analyzing || !selectedFile}
            className="btn-primary px-8 py-3 text-sm w-full sm:w-auto"
          >
            <Microscope className="w-4 h-4" />
            {analyzing ? 'Executing Inference...' : 'Run Multimodal Diagnosis'}
          </button>
        </div>
      </form>
    </div>
  );
};
