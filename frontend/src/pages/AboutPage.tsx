import React from 'react';
import {
  Sprout,
  GraduationCap,
  Award,
  Layers,
  BookOpen,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const references = [
    {
      author: 'Tan, M., & Le, Q. V.',
      year: '2019',
      title: 'EfficientNet: Rethinking model scaling for convolutional neural networks',
      venue: 'International Conference on Machine Learning (ICML)',
      link: 'https://arxiv.org/abs/1905.11946'
    },
    {
      author: 'Selvaraju, R. R., Cogswell, M., Das, A., Vedaldi, A., Parikh, D., & Batra, D.',
      year: '2017',
      title: 'Grad-CAM: Visual explanations from deep networks via gradient-based localization',
      venue: 'IEEE International Conference on Computer Vision (ICCV)',
      link: 'https://arxiv.org/abs/1610.02391'
    },
    {
      author: 'Hughes, D. P., & Salathé, M.',
      year: '2015',
      title: 'An open access repository of images on plant health to enable the development of mobile disease diagnostics',
      venue: 'arXiv preprint arXiv:1511.08060',
      link: 'https://arxiv.org/abs/1511.08060'
    },
    {
      author: 'Wallin, J. R.',
      year: '1962',
      title: 'Summary of recent progress in predicting late blight epidemics in Wisconsin and Minnesota',
      venue: 'Plant Disease Reporter, 46(8), 587-590',
      link: 'https://www.apsnet.org/'
    },
    {
      author: 'Lundberg, S. M., & Lee, S. I.',
      year: '2017',
      title: 'A unified approach to interpreting model predictions',
      venue: 'Advances in Neural Information Processing Systems (NeurIPS 30)',
      link: 'https://arxiv.org/abs/1705.07874'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="pb-4 border-b border-neutralgrey-border/60">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-forest">About AgriFusion AI</h1>
          <span className="badge-scientific bg-agri-subtle text-agri border-agri/30">
            Final Year B.Tech Capstone Project
          </span>
        </div>
        <p className="text-xs text-neutralgrey mt-1">
          Department of Computer Science & Engineering (Artificial Intelligence and Machine Learning).
        </p>
      </div>

      {/* Academic Project Abstract Card */}
      <div className="card-scientific space-y-3 bg-gradient-to-r from-sage/30 via-white to-white p-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-agri font-bold">
          <BookOpen className="w-4 h-4" />
          Project Abstract
        </div>
        <h2 className="text-xl font-bold text-forest">
          Climate-Aware Multimodal Crop Disease Prediction and Early Warning System
        </h2>
        <p className="text-xs text-charcoal/90 leading-relaxed">
          Crop leaf fungal, bacterial, and viral pathologies cause an estimated 20% to 40% loss of global agricultural yield annually. While modern deep learning vision models achieve high benchmark accuracy under controlled illumination, single-modality vision models operate in an agronomic vacuum, detached from the atmospheric drivers that facilitate spore germination.
        </p>
        <p className="text-xs text-charcoal/90 leading-relaxed">
          <strong>AgriFusion AI</strong> proposes an end-to-end multimodal architecture coupling transfer-learned <strong>EfficientNet-B0</strong> convolutional vision, <strong>Grad-CAM</strong> interpretability, and <strong>Open-Meteo</strong> microclimate risk modeling. By examining ambient diurnal temperature, relative humidity (&gt;85%), and precipitation patterns through validated Wallin and Hyre epidemiological infection criteria, the system delivers actionable 7-day risk forecasts alongside specimen diagnoses while maintaining scientific honesty through transparent uncertainty boundaries.
        </p>
      </div>

      {/* Project Objectives */}
      <div className="card-scientific space-y-4">
        <div className="border-b border-neutralgrey-border/50 pb-2">
          <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
            <Award className="w-4 h-4 text-agri" />
            Key Research Objectives
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-sage/40 rounded-lg border border-neutralgrey-border/50 space-y-1">
            <span className="font-bold text-forest block">1. Resource-Efficient Convolutional Vision</span>
            <p className="text-neutralgrey leading-relaxed text-[11px]">
              Implement an EfficientNet-B0 transfer-learning baseline fine-tuned on PlantVillage and PlantDoc datasets, achieving &gt;95% top-1 accuracy on CPU-limited laptops (8 GB RAM).
            </p>
          </div>

          <div className="p-3 bg-sage/40 rounded-lg border border-neutralgrey-border/50 space-y-1">
            <span className="font-bold text-forest block">2. Spatial Explainability via Grad-CAM</span>
            <p className="text-neutralgrey leading-relaxed text-[11px]">
              Extract activation gradients from the final convolutional layer (features.8) to project spatial attention heatmaps over necrotic foliar regions, assisting agronomic verification.
            </p>
          </div>

          <div className="p-3 bg-sage/40 rounded-lg border border-neutralgrey-border/50 space-y-1">
            <span className="font-bold text-forest block">3. Microclimate Epidemiological Alignment</span>
            <p className="text-neutralgrey leading-relaxed text-[11px]">
              Integrate live Open-Meteo atmospheric telemetry to calculate pathogen germination favourability windows, transforming post-hoc leaf diagnosis into preventive 7-day early warning.
            </p>
          </div>

          <div className="p-3 bg-sage/40 rounded-lg border border-neutralgrey-border/50 space-y-1">
            <span className="font-bold text-forest block">4. Scientific Rigor & Transparent Uncertainty</span>
            <p className="text-neutralgrey leading-relaxed text-[11px]">
              Abstain from hallucinated accuracy metrics or fabricated severity claims. Display honest statistical boundaries and out-of-distribution alerts for unsupported crops.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="card-scientific space-y-4">
        <div className="border-b border-neutralgrey-border/50 pb-2">
          <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-agri" />
            Engineering & Technology Architecture
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-sage/30 border border-neutralgrey-border/60 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-agri">Frontend Web App</span>
            <ul className="text-[11px] text-charcoal/90 space-y-0.5">
              <li>• React 18 & TypeScript</li>
              <li>• Vite Build Pipeline</li>
              <li>• Tailwind CSS (Scientific Theme)</li>
              <li>• Recharts & Lucide Icons</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-sage/30 border border-neutralgrey-border/60 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-agri">Application Backend</span>
            <ul className="text-[11px] text-charcoal/90 space-y-0.5">
              <li>• Node.js & Express.js</li>
              <li>• JWT Token Authentication</li>
              <li>• Multer Stream Processing</li>
              <li>• MongoDB / Memory Fallback</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-sage/30 border border-neutralgrey-border/60 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-agri">Machine Learning Core</span>
            <ul className="text-[11px] text-charcoal/90 space-y-0.5">
              <li>• Python 3.13 & FastAPI</li>
              <li>• PyTorch 2.14 & torchvision</li>
              <li>• EfficientNet-B0 Backbone</li>
              <li>• PyTorch Grad-CAM Hook Engine</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-sage/30 border border-neutralgrey-border/60 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-agri">Spatial Telemetry</span>
            <ul className="text-[11px] text-charcoal/90 space-y-0.5">
              <li>• Open-Meteo Weather API</li>
              <li>• ECMWF 9km Global Forecast</li>
              <li>• ISRIC SoilGrids 250m</li>
              <li>• Wallin-Hyre Blight Models</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Academic Literature Review References */}
      <div className="card-scientific space-y-4">
        <div className="border-b border-neutralgrey-border/50 pb-2">
          <h3 className="text-sm font-bold text-forest uppercase tracking-wide flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-agri" />
            Key Academic References & Literature
          </h3>
        </div>

        <ol className="divide-y divide-neutralgrey-border/40 text-xs text-charcoal">
          {references.map((ref, idx) => (
            <li key={idx} className="py-2.5 flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-semibold text-forest">
                  [{idx + 1}] {ref.author} ({ref.year}).
                </span>{' '}
                <span className="italic">"{ref.title}."</span> {ref.venue}.
              </div>
              <a
                href={ref.link}
                target="_blank"
                rel="noreferrer"
                className="text-agri hover:text-agri-hover shrink-0 p-1"
                title="View Paper"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* University Capstone Signature Notice */}
      <div className="card-scientific p-5 bg-forest text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-agri-light font-bold">University Project Record</span>
          <h4 className="text-sm font-bold">Department of Computer Science & Engineering (AI & ML)</h4>
          <p className="text-xs text-sage/80">Major Project Dissertation • Academic Evaluation Committee 2026</p>
        </div>
        <div className="px-3 py-1.5 rounded bg-forest-light/60 border border-forest-light text-xs font-mono text-sage">
          Status: Ready for University Viva Defense
        </div>
      </div>
    </div>
  );
};
