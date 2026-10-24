# USER MANUAL & EVALUATOR WALKTHROUGH GUIDE
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction and Early Warning System

Welcome to AgriFusion AI. This guide provides a step-by-step walkthrough for academic examiners, researchers, and agricultural evaluators.

---

### 1. Quick Start for University Defense & Viva Examination

For academic evaluators wishing to test the platform immediately without entering credentials:
1. Open the application at `http://localhost:5173`.
2. Click **"Sign In"** in the top navigation bar.
3. Click the button labeled **"1-Click Academic Evaluator Access"**.
4. You are instantly logged in as the *Academic Review Committee* with full privileges.

---

### 2. Step-by-Step Diagnostic Workflow

#### Step 1: Navigating to Disease Analysis
- Click **"Disease Analysis"** in the navigation header or **"Launch Disease Analysis"** on the landing page.

#### Step 2: Selecting or Loading a Specimen
- **Option A (Instant Test)**: In the **"Quick Test Specimens"** panel at the top, click any preset:
  - *Tomato Early Blight*
  - *Potato Late Blight*
  - *Corn Common Rust*
  - *Healthy Tomato Folium*
- **Option B (Custom Upload)**: Drag and drop any `.jpg`, `.png`, or `.webp` plant leaf photograph into the dashed dropzone.

#### Step 3: Specifying Botanical & Microclimate Context
- Under **Botanical Crop Species**, select the host plant (Tomato, Potato, Corn, Rice, etc.).
- Ensure **"Climate Context"** is toggled ON to pull ambient weather telemetry for your station coordinates. Click **"Auto GPS"** to detect device coordinates or leave default research station coordinates.

#### Step 4: Executing Multimodal Inference
- Click **"Run Multimodal Diagnosis"**.
- Watch the 4-step progress tracker:
  1. *Preprocessing & validating specimen resolution*
  2. *Forward pass through PyTorch EfficientNet-B0 backbone*
  3. *Generating Grad-CAM activation maps on features.8*
  4. *Synthesizing Open-Meteo microclimate risk index*

---

### 3. Interpreting the Diagnostic Inspection Report

Once inference completes, you are directed to `/results/:id`:
1. **Diagnosis Header**: Displays the primary predicted disease, taxonomic pathogen name, and softmax confidence score.
2. **Grad-CAM Saliency Viewer**:
   - **Blended Overlay**: Shows activation heatmap overlaid on the leaf image. Use the **Heatmap Intensity slider** to vary opacity from 0% to 100%.
   - **Side-by-Side**: Places the unblemished input leaf alongside the raw thermal heatmap.
   - **Original**: Displays original specimen without overlay.
3. **Candidate Probability Hierarchy**: View top-3 softmax probabilities with visual progress meters.
4. **Severity Estimation**: Displays computed lesion surface coverage and severity category (Low, Moderate, High).
5. **Integrated Pest Management (IPM)**: Detailed 3-part intervention protocol (Biological, Chemical, and Cultural Sanitation).
6. **Actions**: Click **"Print Report"** to print or save a clean presentation PDF, or **"Export JSON"** to download raw data.

---

### 4. Exploring the 7-Day Disease Risk Forecast

1. Click **"Risk Forecast"** in the top navbar.
2. Select your crop (e.g. `Tomato`) and target pathogen (e.g. `Late Blight`).
3. Examine the 7-day infection favourability bar chart:
   - **Green (<60%)**: Low infection risk.
   - **Amber (60-79%)**: Moderate favourability; scouting advised.
   - **Red (>=80%)**: High risk; Wallin sporulation criteria satisfied (RH > 85% + rainfall).
4. Review the daily weather breakdown (min/max temperature, humidity, rainfall) and automated IPM spray advisory.

---

### 5. Managing Diagnostic History

1. Click **"History"** in the top navbar.
2. Use the search bar to find diagnoses by pathogen name or ID.
3. Filter by crop species or diagnostic status (Healthy vs Diseased).
4. Click **"Export CSV"** to generate a timestamped spreadsheet for research records.
