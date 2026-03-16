from flask import Blueprint, jsonify, request
import os
import requests
from datetime import datetime
from zoneinfo import ZoneInfo

uv_bp = Blueprint("uv", __name__)

MELBOURNE_LAT = -37.8136
MELBOURNE_LON = 144.9631
MELBOURNE_TZ = ZoneInfo("Australia/Melbourne")


def uv_details(uv):
    if uv <= 2:
        return {
            "level": "Low",
            "color": "green",
            "warning_sign": "☀️",
            "warning_message": "Minimal danger from sun exposure",
            "recommended_clothing": [
                "T-shirt",
                "Shorts",
                "Cap optional",
                "Sunglasses optional"
            ]
        }
    elif uv <= 5:
        return {
            "level": "Moderate",
            "color": "yellow",
            "warning_sign": "🧴",
            "warning_message": "Protection needed if outside for long",
            "recommended_clothing": [
                "T-shirt",
                "Hat or cap",
                "Sunglasses",
                "Breathable clothes",
                "Sunscreen"
            ]
        }
    elif uv <= 7:
        return {
            "level": "High",
            "color": "orange",
            "warning_sign": "⚠️",
            "warning_message": "Skin can burn without protection",
            "recommended_clothing": [
                "Long-sleeve shirt",
                "Wide-brim hat",
                "UV sunglasses",
                "Covered shoulders",
                "SPF50+ sunscreen"
            ]
        }
    elif uv <= 10:
        return {
            "level": "Very High",
            "color": "red",
            "warning_sign": "🧢",
            "warning_message": "Very high danger. Skin damage can happen quickly",
            "recommended_clothing": [
                "Long sleeves",
                "Collared shirt",
                "Wide-brim hat",
                "Sunglasses",
                "More skin coverage",
                "SPF50+ sunscreen"
            ]
        }
    else:
        return {
            "level": "Extreme",
            "color": "purple",
            "warning_sign": "🚫",
            "warning_message": "Extreme UV. Avoid direct sun if possible",
            "recommended_clothing": [
                "Full-coverage clothing",
                "Long sleeves",
                "Long pants",
                "Wide-brim hat",
                "UV sunglasses",
                "SPF50+ sunscreen",
                "Stay in shade"
            ]
        }


@uv_bp.route("/", methods=["GET"])
def get_uv_forecast():
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    if not api_key:
        return jsonify({"error": "Missing OPENWEATHER_API_KEY in backend/.env"}), 500
    
    lat = request.args.get('lat', str(MELBOURNE_LAT))
    lon = request.args.get('lon', str(MELBOURNE_LON))
    
    try:
        # Call 1: Current UV index
        uvi_url = f"https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={api_key}"
        uvi_response = requests.get(uvi_url, timeout=15)
        uvi_response.raise_for_status()
        uvi_data = uvi_response.json()
        current_uv = uvi_data.get('value', 0)
        
        # Call 2: Weather forecast
        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&cnt=8&appid={api_key}"
        forecast_response = requests.get(forecast_url, timeout=15)
        forecast_response.raise_for_status()
        forecast_data = forecast_response.json()
        forecast_list = forecast_data.get('list', [])
        
        hourly_data = []
        
        if forecast_list:
            # First entry: real UV + weather from first forecast
            first = forecast_list[0]
            uv = current_uv
            details = uv_details(uv)
            timestamp = datetime.fromtimestamp(first['dt'], MELBOURNE_TZ)
            
            hourly_data.append({
                "time": timestamp.strftime("%I:%M %p"),
                "temp": first['main']['temp'],
                "uv": uv,
                "uv_estimated": False,
                "level": details["level"],
                "color": details["color"],
                "warning_sign": details["warning_sign"],
                "warning_message": details["warning_message"],
                "clothing": details["recommended_clothing"],
                "weather": first['weather'][0]['description']
            })
            
            # Remaining entries: forecast weather only, UV unavailable
            for f in forecast_list[1:]:
                timestamp = datetime.fromtimestamp(f['dt'], MELBOURNE_TZ)
                hourly_data.append({
                    "time": timestamp.strftime("%I:%M %p"),
                    "temp": f['main']['temp'],
                    "uv": None,
                    "uv_estimated": True,
                    "level": None,
                    "color": None,
                    "warning_sign": None,
                    "warning_message": None,
                    "clothing": None,
                    "weather": f['weather'][0]['description']
                })
        
        return jsonify({
            "city": forecast_data.get("city", {}).get("name", "Melbourne"),
            "timezone": "Australia/Melbourne",
            "uv_forecast": hourly_data
        })
    
    except requests.RequestException as e:
        return jsonify({"error": "External API request failed", "details": str(e)}), 502
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500