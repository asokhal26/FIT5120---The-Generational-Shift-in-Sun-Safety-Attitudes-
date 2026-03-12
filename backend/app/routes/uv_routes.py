"""
UV index routes.

Provides endpoints for retrieving real-time UV index data
from OpenWeatherMap and caching results in the database.
"""

from flask import Blueprint, request, jsonify, current_app
import psycopg2
import requests
from datetime import datetime, timezone

uv_bp = Blueprint("uv", __name__)

# UV category thresholds and messages
UV_CATEGORIES = [
    {
        "min": 0,
        "max": 2,
        "level": "Low",
        "message": "Low UV — minimal risk. You can safely enjoy the outdoors.",
    },
    {
        "min": 3,
        "max": 5,
        "level": "Moderate",
        "message": "Moderate UV — wear sunscreen and sunglasses if outdoors for extended periods.",
    },
    {
        "min": 6,
        "max": 7,
        "level": "High",
        "message": "High UV — protect your skin. Wear a hat, sunscreen, and seek shade during midday.",
    },
    {
        "min": 8,
        "max": 10,
        "level": "Very High",
        "message": "Very high UV — your skin can burn in under 15 minutes. Seek shade and cover up.",
    },
    {
        "min": 11,
        "max": 99,
        "level": "Extreme",
        "message": "Extreme UV — avoid outdoor exposure. Full protection is essential.",
    },
]


def _get_db_connection():
    """Create a database connection using DATABASE_URL from app config.

    Returns:
        psycopg2.connection: A PostgreSQL database connection.
    """
    return psycopg2.connect(current_app.config["DATABASE_URL"])


def _get_uv_category(uv_index):
    """Return the UV category dict for a given UV index value.

    Args:
        uv_index (float): The UV index number.

    Returns:
        dict: Contains 'level' and 'message' keys for the matching category.
    """
    for category in UV_CATEGORIES:
        if category["min"] <= uv_index <= category["max"]:
            return category
    return UV_CATEGORIES[-1]


def _cache_uv_reading(conn, lat, lon, location_name, uv_index):
    """Insert a UV reading into the uv_realtime_cache table.

    Args:
        conn: psycopg2 database connection.
        lat (float): Latitude of the reading.
        lon (float): Longitude of the reading.
        location_name (str): Human-readable location name.
        uv_index (float): The UV index value.
    """
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO uv_realtime_cache (lat, lon, location_name, uv_index, recorded_at)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (lat, lon, location_name, uv_index, datetime.now(timezone.utc)),
    )
    conn.commit()
    cur.close()


@uv_bp.route("/")
def get_uv():
    """Get real-time UV index for a given latitude and longitude.

    Calls the OpenWeatherMap One Call API 3.0 to retrieve the current
    UV index, caches the result in the uv_realtime_cache table, and
    returns the UV index with a plain-language risk message.

    Query Parameters:
        lat (float): Latitude. Required.
        lon (float): Longitude. Required.

    Returns:
        JSON response with uv_index, level, message, location, and
        recorded_at timestamp.

    Status Codes:
        200: UV data returned successfully.
        400: Missing or invalid lat/lon parameters.
        502: OpenWeatherMap API error.
        500: Database or server error.
    """
    lat_param = request.args.get("lat")
    lon_param = request.args.get("lon")

    if lat_param is None or lon_param is None:
        return jsonify({"error": "lat and lon query parameters are required"}), 400

    try:
        lat = float(lat_param)
        lon = float(lon_param)
    except (ValueError, TypeError):
        return jsonify({"error": "lat and lon must be valid numbers"}), 400

    api_key = current_app.config["OPENWEATHER_API_KEY"]
    if not api_key:
        return jsonify({"error": "OpenWeatherMap API key is not configured"}), 500

    # Call OpenWeatherMap One Call API 3.0
    try:
        owm_response = requests.get(
            "https://api.openweathermap.org/data/3.0/onecall",
            params={
                "lat": lat,
                "lon": lon,
                "exclude": "minutely,hourly,daily,alerts",
                "appid": api_key,
            },
            timeout=10,
        )

        if owm_response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch UV data from OpenWeatherMap",
                "details": owm_response.text,
            }), 502

        data = owm_response.json()
        uv_index = round(data["current"]["uvi"], 2)
        location_name = f"{lat}, {lon}"

    except requests.RequestException as e:
        return jsonify({"error": "OpenWeatherMap request failed", "details": str(e)}), 502

    # Get plain-language category
    category = _get_uv_category(uv_index)

    # Cache in database
    try:
        conn = _get_db_connection()
        _cache_uv_reading(conn, lat, lon, location_name, uv_index)
        conn.close()
    except psycopg2.Error:
        # Caching failure should not block the response
        pass

    return jsonify({
        "uv_index": uv_index,
        "level": category["level"],
        "message": category["message"],
        "location": {"lat": lat, "lon": lon, "name": location_name},
        "recorded_at": datetime.now(timezone.utc).isoformat(),
    }), 200
