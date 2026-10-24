import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, ExternalLink, GitBranch, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest text-offwhite border-t border-forest-light/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Project Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-agri flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base">AgriFusion<span className="text-agri-light">AI</span></span>
            </div>
            <p className="text-xs text-sage/80 leading-relaxed">
              Final Year B.Tech CSE (Artificial Intelligence & Machine Learning) Capstone Project.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-sage/70 font-mono">
              <GitBranch className="w-3.5 h-3.5 text-agri-light" />
              <span>PyTorch 2.14 • EfficientNet-B0</span>
            </div>
          </div>

          {/* Col 2: Research Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sage font-mono mb-3">System Modules</h4>
            <ul className="space-y-2 text-xs text-sage/80">
              <li>
                <Link to="/analyze" className="hover:text-white transition-colors">Multimodal Image Classifier</Link>
              </li>
              <li>
                <Link to="/environment" className="hover:text-white transition-colors">Open-Meteo Weather Stream</Link>
              </li>
              <li>
                <Link to="/risk" className="hover:text-white transition-colors">Epidemiological Risk Forecast</Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-white transition-colors">Grad-CAM Saliency Engine</Link>
              </li>
              <li>
                <Link to="/datasets" className="hover:text-white transition-colors">Model Registry & Benchmarks</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Standards & Data Provenance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sage font-mono mb-3">Data Provenance</h4>
            <ul className="space-y-2 text-xs text-sage/80">
              <li className="flex items-center gap-1.5">
                <span>PlantVillage & PlantDoc Datasets</span>
              </li>
              <li className="flex items-center gap-1.5">
                <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  Open-Meteo Weather API <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <span>ISRIC SoilGrids 250m Estimates</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Grad-CAM (Selvaraju et al., 2017)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Scientific Disclaimer */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sage font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-agri-light" />
              Scientific Disclaimer
            </h4>
            <p className="text-[11px] text-sage/70 leading-relaxed">
              AgriFusion AI provides probabilistic decision-support based on convolutional neural activations and meteorological favourability indices. Predictions represent statistical likelihoods and do not constitute absolute phytopathological guarantees.
            </p>
            <div className="pt-2 text-[10px] text-sage/60 font-mono flex items-center gap-1">
              <Terminal className="w-3 h-3 text-agri-light" />
              <span>Evaluation Mode: Academic Defense</span>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-light/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sage/60 gap-4">
          <p>© 2026 AgriFusion AI Project. Final Year B.Tech CSE (AIML) Major Project.</p>
          <div className="flex items-center gap-4">
            <Link to="/research" className="hover:text-white">Methodology</Link>
            <Link to="/about" className="hover:text-white">Project Abstract</Link>
            <Link to="/datasets" className="hover:text-white">Benchmarks</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
