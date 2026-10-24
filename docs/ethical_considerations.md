# ETHICAL CONSIDERATIONS, LIMITATIONS & RESPONSIBLE AI
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction and Early Warning System

---

### 1. Responsible AI in Agricultural Decision-Support

Artificial Intelligence applied to agronomy carries direct environmental and economic consequences:
- An incorrect fungal diagnosis can prompt unwarranted broad-spectrum chemical fungicidal sprays, leading to groundwater contamination, non-target beneficial insect mortality, and pathogen resistance.
- Conversely, a false negative can cause total harvest loss for smallholder farmers.

Therefore, **AgriFusion AI** adheres strictly to the following principles:

#### 1.1 Non-Guaranteed Phytopathological Diagnosis
Neural networks compute statistical likelihoods ($\hat{y} \in [0, 1]$) based on learned patterns in RGB pixel arrays. These outputs do **not** constitute a biological guarantee of infection. The platform explicitly prompts users to view predictions as advisory indicators that must be corroborated with physical field scouting and agricultural extension officers.

#### 1.2 Promotion of Integrated Pest Management (IPM)
Rather than solely offering chemical chemical interventions, every diagnosis prioritizes:
1. **Biological and organic countermeasures** (e.g. *Bacillus subtilis*, copper soaps, sulfur dusts).
2. **Cultural sanitation** (drip irrigation, row spacing, pruning blighted lower foliage).
3. **Chemical intervention only as a measured escalation**, specifying Pre-Harvest Intervals (PHI) and FRAC rotation to prevent pathogen resistance.

---

### 2. Known Scientific & Empirical Limitations

#### 2.1 Controlled-Environment Domain Bias
The primary benchmark corpus (PlantVillage) features leaf specimens excised from the plant and imaged against uniform grey, black, or white backgrounds under controlled studio illumination. In real-world field settings, performance can degrade due to:
- Complex soil or weed backgrounds.
- High-contrast shadows and direct sunlight reflections.
- Multiple simultaneous disease lesions on the same leaf blade.

To mitigate this, the architecture supports crop conditioning (constraining candidate class logits by host species) and highlights out-of-distribution alerts when classification entropy is high.

#### 2.2 Saliency Map Interpretability Boundaries
Grad-CAM heatmaps highlight pixels that maximize the target class activation score. However:
- A highlighted region indicates **feature importance to the network**, not biological etiology.
- The network may attend to coincident artifacts (e.g., a necrotic leaf tip caused by drought rather than a fungal pathogen).
- Heatmaps must never be treated as physical spore density maps.

#### 2.3 Epidemiological Favourability vs Infection Reality
The 7-day risk forecasting module calculates atmospheric favourability based on ambient weather forecasts. Favourable atmospheric conditions (e.g. temperature 18°C, relative humidity 90%) do **not** imply that a crop will develop disease unless:
- Viable pathogen inoculum (spores) is present in the surrounding ecosystem.
- The host plant is at a susceptible growth stage.
- Prolonged free water is maintained on the leaf surface.

AgriFusion AI prominently labels 7-day risk ratings as **"Epidemiological Favourability Indices"** rather than "Guaranteed Disease Forecasts."
