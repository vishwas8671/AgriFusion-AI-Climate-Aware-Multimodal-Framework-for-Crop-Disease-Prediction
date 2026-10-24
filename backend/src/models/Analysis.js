const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  predictedClass: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  confidenceLevel: {
    type: String,
    enum: ['High', 'Moderate', 'Low (Uncertain)'],
    default: 'High'
  },
  isHealthy: {
    type: Boolean,
    default: false
  },
  severity: {
    estimatedLevel: String,
    method: String,
    affectedAreaPercentage: Number,
    disclaimer: String
  },
  topPredictions: [{
    className: String,
    displayName: String,
    probability: Number,
    crop: String
  }],
  gradCamUrl: String,
  originalImageUrl: String,
  treatmentRecommendations: {
    organic: [String],
    chemical: [String],
    preventive: [String]
  },
  pathogenInfo: {
    type: { type: String },
    scientificName: String,
    optimalTempRange: String,
    optimalHumidityRange: String
  },
  modelMetadata: {
    modelName: String,
    architecture: String,
    version: String,
    inputResolution: String,
    inferenceTimeMs: Number
  },
  limitationsDisclaimer: String,
  environmentalContext: {
    latitude: Number,
    longitude: Number,
    locationName: String,
    timestamp: String,
    temperature: Number,
    relativeHumidity: Number,
    precipitation: Number,
    windSpeed: Number,
    soilMoisture: Number,
    soilPh: Number,
    source: String,
    isLive: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
