import React from 'react';
import './UVAlert.css';

/**
 * UV level to CSS modifier mapping.
 * @type {Object<string, string>}
 */
const LEVEL_MODIFIERS = {
  Low: 'low',
  Moderate: 'moderate',
  High: 'high',
  'Very High': 'very-high',
  Extreme: 'extreme',
};

/**
 * UVAlert — displays a colour-coded UV index alert card.
 *
 * Colour coding:
 * - Green for Low (0–2)
 * - Yellow for Moderate (3–5)
 * - Orange for High (6–7)
 * - Red for Very High (8–10)
 * - Dark red for Extreme (11+)
 *
 * @param {Object} props
 * @param {number} props.uvIndex - The current UV index value.
 * @param {string} props.message - Plain-language UV risk message.
 * @param {string} props.level - UV category level (e.g. "Low", "Very High").
 * @returns {React.ReactElement} A styled UV alert card element.
 */
function UVAlert({ uvIndex, message, level }) {
  const modifier = LEVEL_MODIFIERS[level] || 'low';

  return (
    <div className={`uv-alert uv-alert--${modifier}`}>
      <div className="uv-alert__header">
        <span className="uv-alert__index">{uvIndex}</span>
        <span className="uv-alert__level">{level}</span>
      </div>

      <p className="uv-alert__message">{message}</p>
    </div>
  );
}

export default UVAlert;
