import { useState } from 'react';
import './UserSetting.css';

export default function UserSetting() {
  const [name, setName] = useState('Zedong');
  const [location, setLocation] = useState('Use current location');
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [uvNotification, setUvNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    const settings = {
      name,
      location,
      temperatureUnit,
      uvNotification,
      darkMode,
    };

    localStorage.setItem('userSettings', JSON.stringify(settings));

    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="setting-root">
      <div className="setting-card">
        <div className="setting-header">
          <h1 className="setting-title">User Settings</h1>
          <p className="setting-subtitle">
            Manage your personal preferences for UVGuard.
          </p>
        </div>

        <div className="setting-section">
          <label className="setting-label">User Name</label>
          <input
            className="setting-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="setting-section">
          <label className="setting-label">Location Preference</label>
          <select
            className="setting-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Use current location</option>
            <option>Enter location manually</option>
          </select>
        </div>

        <div className="setting-section">
          <label className="setting-label">Temperature Unit</label>
          <select
            className="setting-input"
            value={temperatureUnit}
            onChange={(e) => setTemperatureUnit(e.target.value)}
          >
            <option>Celsius</option>
            <option>Fahrenheit</option>
          </select>
        </div>

        <div className="setting-toggle">
          <div>
            <p className="toggle-title">UV Alert Notifications</p>
            <p className="toggle-desc">
              Receive reminders when UV levels become dangerous.
            </p>
          </div>
          <input
            type="checkbox"
            checked={uvNotification}
            onChange={() => setUvNotification(!uvNotification)}
          />
        </div>

        <div className="setting-toggle">
          <div>
            <p className="toggle-title">Dark Mode</p>
            <p className="toggle-desc">
              Use a darker interface for a more comfortable viewing experience.
            </p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <button className="setting-btn" onClick={handleSave}>
          Save Settings
        </button>

        {saved && <p className="setting-success">Settings saved successfully.</p>}
      </div>
    </div>
  );
}