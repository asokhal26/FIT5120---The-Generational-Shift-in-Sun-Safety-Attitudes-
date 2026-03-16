import { useWeather } from '../../context/UVContext';
import './RecommendClothingPage.css';


function getClothingAdvice(uvIndex) {
  if (uvIndex <= 2) {
    return {
      level: 'Low',
      className: 'low',
      message: 'Low UV. Light protection is enough for most outdoor activities.',
      clothing: ['T-shirt', 'Cap'],
      comfort: 'Lightweight clothing is suitable and keeps you comfortable.',
      style: 'Keep it simple and casual for a low UV day.',
    };
  }

  if (uvIndex <= 5) {
    return {
      level: 'Moderate',
      className: 'moderate',
      message: 'Moderate UV. Add a little more protection before going outside.',
      clothing: ['Long-sleeve shirt', 'Sunglasses', 'Wide-brim hat'],
      comfort: 'Choose breathable materials to stay cool while covering your skin.',
      style: 'A light long-sleeve top and sunglasses create a smart summer look.',
    };
  }

  if (uvIndex <= 7) {
    return {
      level: 'High',
      className: 'high',
      message: 'High UV. Strong sun protection is recommended today.',
      clothing: [
        'UV protective long-sleeve top',
        'Sunglasses',
        'Wide-brim hat',
        'Closed shoes',
      ],
      comfort: 'Use loose and breathable fabrics that block UV but still feel comfortable.',
      style: 'Choose clean, covered looks that balance protection and style.',
    };
  }

  if (uvIndex <= 10) {
    return {
      level: 'Very High',
      className: 'very-high',
      message: 'Very high UV. Cover up and minimise time outdoors if possible.',
      clothing: ['Full coverage clothing', 'Wide-brim hat', 'Sunglasses', 'Long pants'],
      comfort: 'Wear breathable full-coverage clothing to reduce heat while protecting your skin.',
      style: 'Full coverage can still look stylish with light fabrics and simple layering.',
    };
  }

  return {
    level: 'Extreme',
    className: 'extreme',
    message: 'Extreme UV. Stay indoors if possible. If going outside, wear maximum protection.',
    clothing: [
      'Maximum coverage clothing',
      'Wide-brim hat',
      'Sunglasses',
      'Full-length pants',
    ],
    comfort: 'Even with breathable materials, outdoor time should be limited in extreme UV.',
    style: 'Today is about protection first — full coverage is the best choice.',
  };
}

export default function RecommendClothing() {
  const { weather } = useWeather();

  if (!weather || weather.uvIndex == null) {
    return (
      <div className="recommend-root">
        <div className="recommend-card">
          <h1 className="recommend-title">Recommend Clothing</h1>
          <p className="recommend-subtitle">
            UV data is unavailable. Please go back to Home and allow location access first.
          </p>
        </div>
      </div>
    );
  }

  const advice = getClothingAdvice(weather.uvIndex);

  return (
    <div className="recommend-root">
      <div className="recommend-card">
        <div className="recommend-top">
          <div>
            <h1 className="recommend-title">Recommend Clothing</h1>
            <p className="recommend-subtitle">
              Clothing recommendations based on your current UV level.
            </p>
          </div>
          <div className="recommend-location">
            <span>{weather.location}</span>
          </div>
        </div>

        <div className={`recommend-uv-card ${advice.className}`}>
          <p><strong>Current UV Index:</strong> {weather.uvIndex}</p>
          <p><strong>Risk Level:</strong> {advice.level}</p>
          <p>{advice.message}</p>
        </div>

        <div className="recommend-section">
          <h2>Recommended Clothing</h2>
          <ul className="recommend-list">
            {advice.clothing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="recommend-section recommend-soft">
          <h2>Thermal Comfort</h2>
          <p>{advice.comfort}</p>
        </div>

        <div className="recommend-section recommend-soft">
          <h2>Style Tip</h2>
          <p>{advice.style}</p>
        </div>

        <div className="recommend-footer">
          Updated{' '}
          {weather.lastUpdated?.toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
          }) || 'Just now'}
          {' · '}Using Home page UV data
        </div>
      </div>
    </div>
  );
}