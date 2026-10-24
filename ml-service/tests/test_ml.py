import os
import sys
import pytest
import torch
import numpy as np
from PIL import Image

# Ensure ml-service root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.classifier import CropDiseaseClassifier
from app.models.agronomic_risk import AgronomicRiskModel
from explainability.gradcam import GradCAM

@pytest.fixture(scope="session")
def classifier():
    return CropDiseaseClassifier()

def test_classifier_initialization(classifier):
    """Verifies that the EfficientNet-B0 model initialized with the correct class mapping."""
    assert classifier is not None
    assert classifier.num_classes == 28
    assert "Tomato___Early_blight" in classifier.classes
    assert "Potato___Late_blight" in classifier.classes
    assert classifier.model is not None

def test_input_preprocessing_pipeline(classifier):
    """Verifies image transformation to 224x224 RGB tensor with ImageNet normalization."""
    dummy_img = Image.new("RGB", (300, 400), color=(100, 150, 200))
    tensor = classifier.transform(dummy_img)
    assert tensor.shape == (3, 224, 224)
    assert isinstance(tensor, torch.Tensor)

def test_inference_and_prediction_output(classifier):
    """Verifies forward pass returns expected keys and valid probabilities."""
    dummy_img = Image.new("RGB", (224, 224), color=(60, 140, 70))
    result = classifier.predict(dummy_img, crop_filter="Tomato")

    assert "predictedClass" in result
    assert "confidence" in result
    assert 0.0 <= result["confidence"] <= 1.0
    assert "topPredictions" in result
    assert len(result["topPredictions"]) <= 3
    assert "severity" in result
    assert "pathogenInfo" in result
    assert "modelMetadata" in result
    assert result["modelMetadata"]["architecture"] == "EfficientNet-B0 (PyTorch 2.14)"

def test_gradcam_saliency_generation(classifier):
    """Verifies Grad-CAM hooks compute a 2D heatmap bounded in [0, 1]."""
    dummy_img = Image.new("RGB", (224, 224), color=(50, 120, 60))
    input_tensor = classifier.transform(dummy_img).unsqueeze(0).to(classifier.device)

    heatmap = classifier.grad_cam.generate(input_tensor, class_idx=0)
    assert isinstance(heatmap, np.ndarray)
    assert heatmap.ndim == 2
    assert np.min(heatmap) >= 0.0
    assert np.max(heatmap) <= 1.0

def test_agronomic_wallin_dsv_high_risk():
    """Verifies Wallin criteria flags High Risk when temp is 18°C and humidity >= 88%."""
    eval_result = AgronomicRiskModel.calculate_wallin_dsv(temp_c=18.5, humidity_pct=92.0, rainfall_mm=8.0)
    assert eval_result["category"] == "High"
    assert eval_result["risk_score"] >= 75
    assert "Wallin" in eval_result["model_reference"]

def test_agronomic_wallin_dsv_low_risk():
    """Verifies Wallin criteria flags Low Risk during dry conditions (humidity 45%)."""
    eval_result = AgronomicRiskModel.calculate_wallin_dsv(temp_c=32.0, humidity_pct=45.0, rainfall_mm=0.0)
    assert eval_result["category"] == "Low"
    assert eval_result["risk_score"] < 50

def test_7day_epidemiological_forecast_structure():
    """Verifies 7-day forecast pipeline returns 7 evaluated days."""
    sample_days = [
        {"date": f"2026-10-{25+i:02d}", "temperature_2m_max": 25.0, "temperature_2m_min": 17.0, "relative_humidity_2m_mean": 80.0, "precipitation_sum": 2.0}
        for i in range(7)
    ]
    forecast = AgronomicRiskModel.evaluate_7day_forecast(sample_days, crop="Potato")
    assert len(forecast) == 7
    for day in forecast:
        assert "riskScore" in day
        assert "riskCategory" in day
        assert "favourabilityReason" in day
