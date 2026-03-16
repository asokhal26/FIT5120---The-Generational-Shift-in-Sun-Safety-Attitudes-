import './UVTracker.css';

const hourlyUV = [
  { time: '8 AM', uv: 2 },
  { time: '10 AM', uv: 5 },
  { time: '12 PM', uv: 8 },
  { time: '2 PM', uv: 9 },
  { time: '4 PM', uv: 6 },
  { time: '6 PM', uv: 3 },
];

function getUVLevel(uv) {
  if (uv <= 2) return { label: 'Low', className: 'low' };
  if (uv <= 5) return { label: 'Moderate', className: 'moderate' };
  if (uv <= 7) return { label: 'High', className: 'high' };
  if (uv <= 10) return { label: 'Very High', className: 'very-high' };
  return { label: 'Extreme', className: 'extreme' };
}

export default function UVTracker() {
  const currentUV = 8;
  const peakUV = Math.max(...hourlyUV.map(item => item.uv));
  const uvLevel = getUVLevel(currentUV);

  return (
    <div className="tracker-root">
      <div className="tracker-card">
        <div className="tracker-header">
          <h1 className="tracker-title">UV Tracker</h1>
          <p className="tracker-subtitle">
            Monitor UV levels throughout the day.
          </p>
        </div>

        <div className={`tracker-current ${uvLevel.className}`}>
          <p><strong>Current UV Index:</strong> {currentUV}</p>
          <p><strong>Risk Level:</strong> {uvLevel.label}</p>
        </div>

        <div className="tracker-section">
          <h2>Hourly UV Trend</h2>
          <div className="tracker-chart">
            {hourlyUV.map((item) => (
              <div className="tracker-bar-group" key={item.time}>
                <div
                  className="tracker-bar"
                  style={{ height: `${item.uv * 20}px` }}
                ></div>
                <span className="tracker-bar-value">{item.uv}</span>
                <span className="tracker-bar-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tracker-section tracker-soft">
          <h2>Daily Summary</h2>
          <p><strong>Peak UV Today:</strong> {peakUV}</p>
          <p>
            UV levels are highest around midday and early afternoon. Plan outdoor
            activities earlier in the morning or later in the evening where possible.
          </p>
        </div>

        <div className="tracker-section tracker-soft">
          <h2>Safety Advice</h2>
          <p>
            When UV is high or very high, wear sunscreen, sunglasses, and a hat,
            and try to stay in the shade.
          </p>
        </div>
      </div>
    </div>
  );
}