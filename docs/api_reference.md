# REST API REFERENCE MANUAL
## AgriFusion AI Application Gateway & Inference Microservice

**Base Gateway URL**: `http://localhost:5000/api`  
**ML Microservice URL**: `http://localhost:8000`  
**Authentication Scheme**: Bearer Token (`Authorization: Bearer <JWT>`)  

---

### 1. Authentication Endpoints

#### 1.1 User Registration
- **Route**: `POST /api/auth/register`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "name": "Dr. Jane Doe",
  "email": "jane.doe@university.edu",
  "password": "SecurePassword123",
  "role": "researcher",
  "institution": "Dept of Agriculture & CSE"
}
```
- **Responses**:
  - `201 Created`: Returns `{ "user": { ... }, "token": "<JWT>" }`
  - `400 Bad Request`: Missing mandatory fields
  - `409 Conflict`: Email already exists

#### 1.2 User Login
- **Route**: `POST /api/auth/login`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "email": "evaluator@university.edu",
  "password": "AgriFusion@2026"
}
```
- **Responses**:
  - `200 OK`: Returns authenticated user profile and JWT
  - `401 Unauthorized`: Invalid credentials

#### 1.3 Get Current User Profile
- **Route**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <JWT>`
- **Response**: `200 OK` with user details.

---

### 2. Diagnosis & Inference Endpoints

#### 2.1 Multimodal Crop Disease Classification
- **Route**: `POST /api/predictions/classify`
- **Content-Type**: `multipart/form-data`
- **Form Fields**:
  - `image` (File, required): Foliar leaf photograph (JPEG/PNG/WebP, max 10MB)
  - `cropType` (String, optional): Host botanical species (e.g. `Tomato`, `Potato`, `Corn`)
  - `environmentalContext` (JSON string, optional): `{ "latitude": 28.61, "longitude": 77.20 }`
- **Response `200 OK`**:
```json
{
  "id": "diag_a8c2f10b",
  "predictedClass": "Tomato___Early_blight",
  "crop": "Tomato",
  "diseaseName": "Tomato Early Blight (Alternaria solani)",
  "confidence": 0.954,
  "confidenceLevel": "High",
  "isHealthy": false,
  "severity": {
    "estimatedLevel": "Moderate",
    "method": "Grad-CAM saliency thresholding over foliar tissue",
    "affectedAreaPercentage": 16.4,
    "disclaimer": "Statistical approximation based on convolutional activation contours."
  },
  "topPredictions": [
    {
      "className": "Tomato___Early_blight",
      "displayName": "Tomato Early Blight",
      "probability": 0.954,
      "crop": "Tomato"
    }
  ],
  "gradCamUrl": "data:image/jpeg;base64,...",
  "originalImageUrl": "data:image/jpeg;base64,...",
  "treatmentRecommendations": {
    "organic": ["Apply copper octanoate spray."],
    "chemical": ["Chlorothalonil application before rain."],
    "preventive": ["3-year crop rotation."]
  },
  "pathogenInfo": {
    "type": "Fungal",
    "scientificName": "Alternaria solani Sorauer",
    "optimalTempRange": "24°C - 29°C",
    "optimalHumidityRange": ">80% RH or dew periods"
  },
  "modelMetadata": {
    "modelName": "AgriFusion-B0-PlantVillage",
    "architecture": "EfficientNet-B0 (PyTorch 2.14)",
    "version": "v1.0.4",
    "inferenceTimeMs": 114
  },
  "createdAt": "2026-10-24T22:30:00.000Z"
}
```

---

### 3. Environmental & Telemetry Endpoints

#### 3.1 Get Weather Telemetry
- **Route**: `GET /api/environment/weather`
- **Query Parameters**:
  - `lat` (Float, optional, default: `28.6139`)
  - `lon` (Float, optional, default: `77.2090`)
- **Response `200 OK`**:
```json
{
  "latitude": 28.6139,
  "longitude": 77.209,
  "locationName": "Field Station (28.6139°N, 77.2090°E)",
  "timestamp": "2026-10-24T22:30:00Z",
  "temperature": 24.8,
  "relativeHumidity": 76,
  "precipitation": 1.4,
  "windSpeed": 11.2,
  "source": "Open-Meteo Live API",
  "isLive": true
}
```

#### 3.2 Get ISRIC Soil Profile
- **Route**: `GET /api/environment/soil`
- **Query Parameters**: `lat`, `lon`
- **Response `200 OK`**: ISRIC SoilGrids 250m estimates (pH, moisture, organic carbon).

---

### 4. Disease Risk Early Warning Endpoints

#### 4.1 Get 7-Day Disease Risk Forecast
- **Route**: `GET /api/risk/forecast`
- **Query Parameters**:
  - `lat` (Float): Field latitude
  - `lon` (Float): Field longitude
  - `crop` (String): Target crop (`Tomato`, `Potato`, `Corn`, `Rice`)
- **Response `200 OK`**:
```json
{
  "location": "Coordinates (28.6139°N, 77.2090°E)",
  "coordinates": { "lat": 28.6139, "lon": 77.209 },
  "forecast": [
    {
      "date": "2026-10-25",
      "dayName": "Today",
      "temperatureMax": 27.2,
      "temperatureMin": 18.0,
      "relativeHumidityAvg": 76,
      "precipitationSum": 0.0,
      "riskScore": 35,
      "riskCategory": "Low",
      "primaryThreat": "Tomato Late Blight",
      "favourabilityReason": "Atmospheric conditions remain below continuous leaf-wetness threshold."
    }
  ],
  "modelBasis": "Wallin (1962) / TOM-CAST Epidemiological Infection Indices",
  "agronomicDisclaimer": "Depicts microclimate favourability for spore germination."
}
```

---

### 5. Analysis History Endpoints

- **`GET /api/analyses`**: Lists historical diagnostic records. Supports `?crop=Tomato&search=Early` query filters.
- **`GET /api/analyses/:id`**: Retrieves a single diagnosis by its unique ID.
- **`DELETE /api/analyses/:id`**: Removes record from persistent database.
- **`GET /api/health`**: Gateway and ML microservice operational status.
