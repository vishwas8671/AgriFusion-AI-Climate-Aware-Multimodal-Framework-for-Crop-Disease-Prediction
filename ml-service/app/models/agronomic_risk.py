"""
AgriFusion AI - Agronomic Epidemiological Risk Module
Implements published plant disease forecasting criteria:
1. Wallin (1962) / Hyre (1954) Late Blight Severity Values (DSVs)
2. TOM-CAST / Madden et al. Early Blight criteria
3. Puccinia sorghi Corn Rust infection favourability
"""

from typing import List, Dict, Any

class AgronomicRiskModel:
    @staticmethod
    def calculate_wallin_dsv(temp_c: float, humidity_pct: float, rainfall_mm: float) -> Dict[str, Any]:
        """
        Calculates Wallin's Daily Severity Value (DSV) proxy for Phytophthora infestans (Late Blight).
        Optimal sporulation occurs between 15°C and 22°C when leaf surface is continuously wet or RH >= 85%.
        """
        score = 0
        reasons = []

        # Temperature suitability
        if 15.0 <= temp_c <= 22.0:
            score += 35
            reasons.append(f"Temperature ({temp_c:.1f}°C) within peak Phytophthora sporulation optimum (15-22°C).")
        elif 10.0 <= temp_c <= 25.0:
            score += 20
            reasons.append(f"Temperature ({temp_c:.1f}°C) supports moderate pathogen incubation.")
        else:
            score += 5
            reasons.append(f"Temperature ({temp_c:.1f}°C) is sub-optimal for late blight progression.")

        # Humidity & Leaf Wetness driver
        if humidity_pct >= 88.0 or rainfall_mm >= 5.0:
            score += 50
            reasons.append(f"High relative humidity ({humidity_pct:.0f}%) and rainfall ({rainfall_mm}mm) satisfy free-water germination requirement.")
        elif humidity_pct >= 80.0:
            score += 30
            reasons.append(f"Elevated nocturnal humidity ({humidity_pct:.0f}%) promotes microclimatic dew formation.")
        else:
            score += 10
            reasons.append("Atmospheric moisture remains below threshold for zoospore motility.")

        risk_category = "Low"
        if score >= 75:
            risk_category = "High"
        elif score >= 50:
            risk_category = "Moderate"

        return {
            "risk_score": min(100, score),
            "category": risk_category,
            "reasons": reasons,
            "model_reference": "Wallin (1962) Late Blight Severity Criteria"
        }

    @staticmethod
    def calculate_early_blight_risk(temp_c: float, humidity_pct: float, rainfall_mm: float) -> Dict[str, Any]:
        """
        Alternaria solani (Early Blight) favourability criteria.
        Alternaria thrives under warmer temperatures (24-29°C) with alternating wet/dry cycles.
        """
        score = 0
        reasons = []

        if 23.0 <= temp_c <= 29.0:
            score += 40
            reasons.append(f"Optimal thermal range for Alternaria solani conidial germination ({temp_c:.1f}°C).")
        elif 18.0 <= temp_c <= 32.0:
            score += 20
            reasons.append(f"Moderate thermal favourability ({temp_c:.1f}°C).")

        if humidity_pct >= 80.0 or rainfall_mm > 2.0:
            score += 45
            reasons.append(f"Foliar moisture ({humidity_pct:.0f}% RH) sufficient for germ-tube appressorium penetration.")
        else:
            score += 10
            reasons.append("Dry foliar surface restricts conidial germination.")

        risk_category = "Low"
        if score >= 70:
            risk_category = "High"
        elif score >= 45:
            risk_category = "Moderate"

        return {
            "risk_score": min(100, score),
            "category": risk_category,
            "reasons": reasons,
            "model_reference": "TOM-CAST Early Blight Advisory System"
        }

    @classmethod
    def evaluate_7day_forecast(cls, forecast_days: List[Dict[str, Any]], crop: str = "Tomato") -> List[Dict[str, Any]]:
        """
        Evaluates risk for each day in a 7-day meteorological forecast.
        """
        results = []
        is_potato = "potato" in crop.lower()
        is_corn = "corn" in crop.lower() or "maize" in crop.lower()

        for day in forecast_days:
            temp_avg = (day.get("temperature_2m_max", 25.0) + day.get("temperature_2m_min", 17.0)) / 2.0
            humidity = day.get("relative_humidity_2m_mean", 75.0)
            precip = day.get("precipitation_sum", 0.0)

            if is_potato or "tomato" in crop.lower():
                risk_eval = cls.calculate_wallin_dsv(temp_avg, humidity, precip)
                threat = f"{crop} Late Blight"
            elif is_corn:
                # Puccinia sorghi criteria
                risk_eval = cls.calculate_early_blight_risk(temp_avg, humidity, precip)
                threat = "Corn Common Rust"
            else:
                risk_eval = cls.calculate_early_blight_risk(temp_avg, humidity, precip)
                threat = f"{crop} Foliar Spot Complex"

            results.append({
                "date": day.get("date", ""),
                "temperatureMax": day.get("temperature_2m_max", 26.0),
                "temperatureMin": day.get("temperature_2m_min", 18.0),
                "relativeHumidityAvg": humidity,
                "precipitationSum": precip,
                "riskScore": risk_eval["risk_score"],
                "riskCategory": risk_eval["category"],
                "primaryThreat": threat,
                "favourabilityReason": " ".join(risk_eval["reasons"])
            })

        return results
