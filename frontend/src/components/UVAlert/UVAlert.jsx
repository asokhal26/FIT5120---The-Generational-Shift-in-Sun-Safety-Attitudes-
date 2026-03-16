<<<<<<< HEAD
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
=======
// components/UVAlert/UVAlert.jsx
// Human-language alert banner based on UV level (AC4)

const UV_LEVELS = {
  low: {
    key: 'low',
    label: 'Low',
    color: '#4ade80',
    cardBg: '#2d8c4e',
    border: '#3aad63',
    shadow: 'rgba(45,140,78,0.45)',
    icon: '✅',
    burnTime: null,
    message: 'UV is low today — minimal protection needed. Enjoy the outdoors!',
  },
  moderate: {
    key: 'moderate',
    label: 'Moderate',
    color: '#facc15',
    cardBg: '#b89210',
    border: '#d4a812',
    shadow: 'rgba(184,146,16,0.4)',
    icon: '🧴',
    burnTime: '~30 min',
    message: 'Unprotected skin can begin to burn in about 30 minutes. Wear SPF 30+ and a hat.',
  },
  high: {
    key: 'high',
    label: 'High',
    color: '#fb923c',
    cardBg: '#c2621a',
    border: '#e07020',
    shadow: 'rgba(194,98,26,0.45)',
    icon: '⚠️',
    burnTime: '~15 min',
    message: 'Your skin can start to burn in as little as 15 minutes. Seek shade and apply SPF 50+.',
  },
  veryHigh: {
    key: 'veryHigh',
    label: 'Very High',
    color: '#f87171',
    cardBg: '#c03030',
    border: '#d94040',
    shadow: 'rgba(192,48,48,0.5)',
    icon: '🚨',
    burnTime: '~10 min',
    message: 'Your skin will start to burn in approximately 10 minutes — find shade now and apply SPF 50+.',
  },
  extreme: {
    key: 'extreme',
    label: 'Extreme',
    color: '#c084fc',
    cardBg: '#7c3aad',
    border: '#9b4dd4',
    shadow: 'rgba(124,58,173,0.5)',
    icon: '☠️',
    burnTime: 'Under 5 min',
    message: 'Extreme UV — unprotected skin burns in under 5 minutes. Stay indoors if possible. Full protection mandatory.',
  },
};

export function getUVLevel(index) {
  if (index <= 2)  return UV_LEVELS.low;
  if (index <= 5)  return UV_LEVELS.moderate;
  if (index <= 7)  return UV_LEVELS.high;
  if (index <= 10) return UV_LEVELS.veryHigh;
  return UV_LEVELS.extreme;
}

export { UV_LEVELS };

export default function UVAlert({ uvIndex }) {
  const level = getUVLevel(uvIndex);
  return (
    <div className="uv-alert">
      <span className="uv-alert__icon">{level.icon}</span>
      <div className="uv-alert__body">
        {level.burnTime && (
          <span className="uv-alert__burn-time">{level.burnTime}</span>
        )}
        <span className="uv-alert__message">{level.message}</span>
      </div>
    </div>
  );
}
>>>>>>> jasmine-homepage
