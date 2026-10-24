import React, { useState } from 'react';
import { Eye, Layers, Sliders, Info, ShieldAlert, Sparkles } from 'lucide-react';

interface GradCamViewerProps {
  originalImageUrl: string;
  gradCamUrl?: string;
  predictedClass: string;
  modelArchitecture?: string;
}

export const GradCamViewer: React.FC<GradCamViewerProps> = ({
  originalImageUrl,
  gradCamUrl,
  predictedClass,
  modelArchitecture = 'EfficientNet-B0 (features.8)',
}) => {
  const [viewMode, setViewMode] = useState<'blended' | 'side-by-side' | 'original'>('blended');
  const [opacity, setOpacity] = useState<number>(0.65);

  return (
    <div className="card-scientific space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutralgrey-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-agri" />
              Grad-CAM Visual Explainability
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage text-forest font-semibold border border-neutralgrey-border/60">
              {modelArchitecture}
            </span>
          </div>
          <p className="text-xs text-neutralgrey mt-0.5">
            Target Class Activation Saliency: <span className="font-semibold text-charcoal">{predictedClass}</span>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-sage/60 p-1 rounded-md border border-neutralgrey-border/60 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('blended')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'blended' ? 'bg-white text-forest shadow-subtle' : 'text-neutralgrey hover:text-charcoal'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Blended Overlay
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'side-by-side' ? 'bg-white text-forest shadow-subtle' : 'text-neutralgrey hover:text-charcoal'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'original' ? 'bg-white text-forest shadow-subtle' : 'text-neutralgrey hover:text-charcoal'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Original
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-neutralgrey-border flex items-center justify-center min-h-[320px]">
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 w-full h-full">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-300 px-2 py-0.5 rounded bg-black/60 inline-block">
                Original Input Leaf Image
              </span>
              <img
                src={originalImageUrl}
                alt="Original crop leaf"
                className="w-full h-72 object-contain rounded bg-slate-950"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-300 px-2 py-0.5 rounded bg-black/60 inline-block">
                Grad-CAM Activation Heatmap
              </span>
              {gradCamUrl ? (
                <img
                  src={gradCamUrl}
                  alt="Grad-CAM activation heatmap"
                  className="w-full h-72 object-contain rounded bg-slate-950"
                />
              ) : (
                <div className="w-full h-72 flex flex-col items-center justify-center text-slate-400 bg-slate-950 text-xs">
                  <span>Grad-CAM generation pending...</span>
                </div>
              )}
            </div>
          </div>
        ) : viewMode === 'blended' ? (
          <div className="relative w-full max-w-md h-80 flex items-center justify-center p-2">
            {/* Base Image */}
            <img
              src={originalImageUrl}
              alt="Base crop leaf"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Grad-CAM Layer with adjustable opacity */}
            {gradCamUrl ? (
              <img
                src={gradCamUrl}
                alt="Grad-CAM activation overlay"
                style={{ opacity: opacity }}
                className="absolute inset-0 w-full h-full object-contain mix-blend-screen transition-opacity"
              />
            ) : null}

            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-[11px] text-white font-mono">
              Overlay Opacity: {Math.round(opacity * 100)}%
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md h-80 flex items-center justify-center p-2">
            <img
              src={originalImageUrl}
              alt="Original crop leaf"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Heatmap Opacity Slider (when in blended mode) */}
      {viewMode === 'blended' && gradCamUrl && (
        <div className="flex items-center gap-4 px-2 py-1 bg-sage/40 rounded-md border border-neutralgrey-border/50 text-xs">
          <span className="font-medium text-forest text-xs whitespace-nowrap">Heatmap Intensity:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full accent-agri cursor-pointer"
          />
          <span className="font-mono text-xs text-charcoal w-12 text-right">{Math.round(opacity * 100)}%</span>
        </div>
      )}

      {/* Scientific Interpretability Note & Academic Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-3 rounded-md bg-sage/50 border border-neutralgrey-border/60 space-y-1">
          <h4 className="font-semibold text-forest flex items-center gap-1.5 text-xs">
            <Info className="w-3.5 h-3.5 text-agri" />
            What this visualization shows
          </h4>
          <p className="text-neutralgrey leading-relaxed text-[11px]">
            Grad-CAM computes the gradients of the target class score with respect to feature activation maps of the final convolutional stage. Warmer regions (red/yellow) indicate spatial patterns that contributed most heavily toward predicting <span className="font-semibold text-charcoal">{predictedClass}</span>.
          </p>
        </div>

        <div className="p-3 rounded-md bg-amber-50/70 border border-amber-200 space-y-1">
          <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-agriamber" />
            Academic & Clinical Limitations
          </h4>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            Saliency maps illustrate statistical correlations in neural weights, not biological causality. A highlighted region does not prove the presence of pathogen spores and should be evaluated alongside field inspections.
          </p>
        </div>
      </div>
    </div>
  );
};
