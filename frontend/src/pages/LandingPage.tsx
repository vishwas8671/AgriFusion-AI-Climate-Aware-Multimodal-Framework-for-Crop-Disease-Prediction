import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Microscope,
  CloudSun,
  ShieldCheck,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage/40 via-offwhite to-offwhite pt-12 pb-16 border-b border-neutralgrey-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* University & Degree Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-white text-xs font-mono font-medium shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-agri-light animate-pulse"></span>
              Final Year B.Tech CSE (AIML) Major Project • Academic Conference Edition
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest tracking-tight leading-tight">
              AgriFusion AI: <span className="text-agri">Climate-Aware Multimodal</span> Crop Disease Prediction & Early Warning
            </h1>

            <p className="text-base sm:text-lg text-neutralgrey leading-relaxed max-w-2xl">
              An intelligent crop-health platform uniting deep convolutional vision (<span className="text-forest font-medium">EfficientNet-B0</span>), <span className="text-forest font-medium">Grad-CAM</span> visual saliency, and <span className="text-forest font-medium">Open-Meteo</span> microclimate risk modelling for transparent agronomic decision-support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/analyze" className="btn-primary text-sm px-6 py-3">
                <Microscope className="w-4 h-4" />
                Launch Disease Analysis
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link to="/research" className="btn-secondary text-sm px-5 py-3">
                <BookOpen className="w-4 h-4" />
                View Methodology & Metrics
              </Link>
              <Link to="/risk" className="btn-outline text-sm px-5 py-3">
                <CloudSun className="w-4 h-4" />
                7-Day Risk Forecast
              </Link>
            </div>

            {/* Scientific Standards Pill */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-neutralgrey font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-agri" />
                Zero Hallucinated Metrics
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-agri" />
                Multimodal Context
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-agri" />
                Grad-CAM Explainable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-mono text-agri font-bold">System Architecture</h2>
          <p className="text-2xl font-bold text-forest">Engineered for Rigorous Phytopathological Decision-Support</p>
          <p className="text-sm text-neutralgrey">
            Unlike black-box models, AgriFusion AI pairs transfer-learned feature activations with microclimate context and explicit uncertainty boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="card-scientific space-y-3">
            <div className="w-10 h-10 rounded-lg bg-agri-subtle text-agri flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-forest text-base">Lightweight Vision Classifier</h3>
            <p className="text-xs text-neutralgrey leading-relaxed">
              Fine-tuned EfficientNet-B0 architecture achieving high top-1 precision on PlantVillage and PlantDoc crop disease classes with CPU-friendly inference times (~120ms).
            </p>
            <ul className="text-xs text-charcoal/80 space-y-1 font-mono pt-2 border-t border-neutralgrey-border/50">
              <li>• Parameter count: ~4.0M (EfficientNet-B0)</li>
              <li>• Class mapping & Top-3 probabilities</li>
              <li>• Low-confidence / OOD alerting</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="card-scientific space-y-3">
            <div className="w-10 h-10 rounded-lg bg-agri-subtle text-agri flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-forest text-base">Grad-CAM Explainability</h3>
            <p className="text-xs text-neutralgrey leading-relaxed">
              Gradient-weighted Class Activation Mapping computes spatial saliency over the final convolutional layer, ensuring agronomic visual verification before taking field actions.
            </p>
            <ul className="text-xs text-charcoal/80 space-y-1 font-mono pt-2 border-t border-neutralgrey-border/50">
              <li>• Visual attention heatmaps</li>
              <li>• Interactive blend & opacity slider</li>
              <li>• Correlation vs causality disclaimers</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="card-scientific space-y-3">
            <div className="w-10 h-10 rounded-lg bg-agri-subtle text-agri flex items-center justify-center font-bold">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-forest text-base">7-Day Microclimate Risk Early Warning</h3>
            <p className="text-xs text-neutralgrey leading-relaxed">
              Synthesizes real-time Open-Meteo weather forecasts and ISRIC soil properties using documented epidemiological favourability curves (temperature, RH &gt; 85%, rain leaf wetness).
            </p>
            <ul className="text-xs text-charcoal/80 space-y-1 font-mono pt-2 border-t border-neutralgrey-border/50">
              <li>• Live Open-Meteo coordinates API</li>
              <li>• Agronomic infection thresholds</li>
              <li>• Daily severity trends & preventive alerts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Multimodal Data-Flow Workflow */}
      <section className="bg-sage/30 border-y border-neutralgrey-border/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-mono text-agri font-bold">End-to-End Pipeline</h2>
            <p className="text-xl font-bold text-forest">From Leaf Specimen to Agronomic Recommendation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-scientific bg-white relative">
              <div className="absolute top-3 right-3 text-xs font-mono font-bold text-agri/70">01</div>
              <h4 className="text-xs font-bold text-forest uppercase mb-1">Image Ingestion</h4>
              <p className="text-xs text-neutralgrey">
                User uploads specimen image with automated format checking, dimension validation, and normalization to 224x224 RGB.
              </p>
            </div>

            <div className="card-scientific bg-white relative">
              <div className="absolute top-3 right-3 text-xs font-mono font-bold text-agri/70">02</div>
              <h4 className="text-xs font-bold text-forest uppercase mb-1">Deep Vision Inference</h4>
              <p className="text-xs text-neutralgrey">
                EfficientNet-B0 backbone extracts feature maps; softmax classifier computes class probabilities and extracts Grad-CAM gradients.
              </p>
            </div>

            <div className="card-scientific bg-white relative">
              <div className="absolute top-3 right-3 text-xs font-mono font-bold text-agri/70">03</div>
              <h4 className="text-xs font-bold text-forest uppercase mb-1">Climate Contextualization</h4>
              <p className="text-xs text-neutralgrey">
                Open-Meteo microclimate stream evaluates whether temperature, relative humidity, and rainfall support pathogen proliferation.
              </p>
            </div>

            <div className="card-scientific bg-white relative">
              <div className="absolute top-3 right-3 text-xs font-mono font-bold text-agri/70">04</div>
              <h4 className="text-xs font-bold text-forest uppercase mb-1">Integrated Report</h4>
              <p className="text-xs text-neutralgrey">
                Synthesized diagnostic dashboard with organic and chemical interventions, 7-day risk timeline, and exportable report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-scientific p-6 sm:p-8 bg-forest text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-agri-light font-semibold">
                Evaluation Benchmark Coverage
              </span>
              <h3 className="text-2xl font-bold">Tested Across Multiple Critical Food Crops</h3>
              <p className="text-xs text-sage/80 leading-relaxed">
                Trained and evaluated on validated benchmark categories: Tomato (Late Blight, Early Blight, Yellow Leaf Curl, Healthy), Potato (Early Blight, Late Blight, Healthy), Corn (Common Rust, Northern Leaf Blight, Healthy), Rice (Bacterial Blight, Brown Spot), and Pepper Bell.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Tomato', 'Potato', 'Corn (Maize)', 'Rice', 'Apple', 'Grape', 'Bell Pepper'].map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded bg-forest-light/60 text-xs text-sage font-medium border border-forest-light">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 justify-center items-start lg:items-end">
              <Link to="/analyze" className="btn-primary bg-agri hover:bg-agri-light text-white text-xs px-5 py-3 w-full sm:w-auto text-center">
                Test a Leaf Image Now
              </Link>
              <Link to="/datasets" className="text-xs text-sage hover:text-white flex items-center gap-1">
                View Confusion Matrix & Metrics <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
