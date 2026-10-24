# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction and Early Warning System
**Degree**: Final Year B.Tech CSE (Artificial Intelligence & Machine Learning) Major Project  
**Standard**: IEEE 830-1998 Recommended Practice for Software Requirements Specifications  
**Version**: 1.0.0  
**Date**: October 2026  

---

### 1. Introduction

#### 1.1 Purpose
The purpose of this document is to specify the software requirements for **AgriFusion AI**, a multimodal agricultural decision-support system. The platform integrates deep convolutional vision (EfficientNet-B0), visual explainability (Grad-CAM), and live microclimate forecasting (Open-Meteo) to provide crop disease diagnosis and 7-day epidemiological risk warnings.

#### 1.2 Document Conventions
- **FR**: Functional Requirement
- **NFR**: Non-Functional Requirement
- **Priority**: High (Essential for core operation), Medium (Important for extended utility), Low (Future enhancement)

#### 1.3 Intended Audience
- Academic Examination Board and Project Guides
- Agricultural Extension Officers and Agronomists
- Software Engineers and Machine Learning Practitioners

#### 1.4 Project Scope
The system ingests leaf specimen imagery, extracts feature maps via a transfer-learned EfficientNet-B0 backbone, computes Grad-CAM attention heatmaps, and correlates visual symptoms with meteorological favourability indices (temperature, relative humidity, precipitation). It outputs probabilistic diagnosis reports, integrated pest management (IPM) recommendations, and 7-day disease risk forecasts.

---

### 2. Overall Description

#### 2.1 Product Perspective
AgriFusion AI operates as a distributed client-server platform comprising:
1. **Frontend**: Single-Page Application (React 18, TypeScript, Tailwind CSS).
2. **Backend Gateway**: RESTful API server (Node.js, Express.js).
3. **ML Microservice**: Deep learning inference worker (Python 3.13, FastAPI, PyTorch 2.14).
4. **Data Tier**: Document store (MongoDB) with local in-memory fallback.
5. **External Telemetry**: Open-Meteo weather API and ISRIC SoilGrids 250m.

#### 2.2 User Classes & Characteristics
- **Academic Evaluators / Examiners**: Review model benchmarks, Grad-CAM saliency fidelity, and architecture specifications.
- **Agricultural Researchers**: Investigate class distributions, epidemiological correlations, and export diagnostic datasets.
- **Field Agronomists / Farmers**: Upload foliar photographs, review IPM spray protocols, and monitor 7-day infection windows.

#### 2.3 Operating Environment
- **Development Hardware**: Standard laptop with 8 GB RAM, multi-core CPU (Intel i5/i7 or AMD Ryzen).
- **Client OS**: Modern web browsers (Chrome 115+, Firefox 115+, Safari 16+, Edge 115+).
- **Backend Runtimes**: Node.js v20+ / v22+, Python 3.10 - 3.13.

---

### 3. System Features & Functional Requirements

#### 3.1 User Authentication & Session Management
- **FR-1.1 (High)**: System shall support user registration with name, academic email, password, role, and institution.
- **FR-1.2 (High)**: Passwords shall be cryptographically hashed using bcrypt with salt factor >= 10.
- **FR-1.3 (High)**: Authenticated sessions shall be maintained via signed JSON Web Tokens (JWT) with 7-day expiration.
- **FR-1.4 (High)**: System shall provide a 1-click Academic Evaluator demo login mode for examination viva demonstrations.

#### 3.2 Foliar Image Diagnosis & Deep Vision Inference
- **FR-2.1 (High)**: System shall accept user-uploaded leaf photographs in JPEG, PNG, or WebP formats up to 10 MB.
- **FR-2.2 (High)**: Input images shall be validated, checked against corruption, and normalized to 224x224 RGB tensors.
- **FR-2.3 (High)**: The deep learning model shall output top-1 predicted disease class, confidence score, and top-3 candidate probabilities.
- **FR-2.4 (High)**: The system shall distinguish high confidence (>=85%), moderate confidence (55-84%), and out-of-distribution low confidence (<55%) states.

#### 3.3 Grad-CAM Explainable AI (XAI)
- **FR-3.1 (High)**: System shall compute Gradient-weighted Class Activation Mapping (Grad-CAM) over the final convolutional layer (`features.8`).
- **FR-3.2 (High)**: The interface shall render an interactive Grad-CAM viewer with side-by-side, original, and blended overlay modes with an adjustable opacity slider (0% to 100%).
- **FR-3.3 (High)**: Each visualization shall display explicit scientific disclaimers clarifying that heatmaps indicate statistical correlation rather than definitive biological etiology.

#### 3.4 Microclimate Telemetry & 7-Day Risk Forecasting
- **FR-4.1 (High)**: System shall query real-time Open-Meteo meteorological endpoints for coordinates (temperature, relative humidity, precipitation, wind velocity).
- **FR-4.2 (High)**: System shall compute Daily Severity Values (DSVs) based on published Wallin (1962) and TOM-CAST epidemiological criteria.
- **FR-4.3 (High)**: A 7-day risk timeline shall depict daily infection favourability scores (0 - 100%) categorized into Low, Moderate, and High risk.
- **FR-4.4 (Medium)**: System shall display ISRIC SoilGrids 250m estimates (soil pH, moisture capacity, organic carbon).

#### 3.5 Analysis History & Export
- **FR-5.1 (High)**: All diagnostic inferences shall persist with timestamps, crop labels, probabilities, and environmental context.
- **FR-5.2 (High)**: Users shall be able to search, filter by crop or status, inspect individual reports, and delete historical records.
- **FR-5.3 (Medium)**: Historical analysis records shall be exportable as structured CSV and JSON documents.

---

### 4. Non-Functional Requirements (NFR)

- **NFR-1 (Performance)**: CPU inference latency for a 224x224 image shall not exceed 250 ms on an Intel i5 processor.
- **NFR-2 (Memory Footprint)**: Peak RAM consumption of the ML microservice during inference shall remain below 500 MB, fitting comfortably inside an 8 GB RAM laptop.
- **NFR-3 (Security)**: All API routes handling user records shall enforce JWT ownership verification. Passwords and secret keys shall never be exposed in client bundles or logs.
- **NFR-4 (Accessibility & UX)**: The interface shall conform to WCAG 2.1 AA contrast standards, utilizing a restrained scientific agriculture palette (Deep Forest `#173F35`, Primary Green `#287D5A`, Off-white `#F7F8F5`).
- **NFR-5 (Scientific Honesty)**: The application shall never fabricate classification accuracy or claim unrecognized pathogen capabilities. Uncalculated metrics must be marked "Unavailable".
