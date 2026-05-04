import React, { useEffect, useState } from 'react';
import './Spinner.css';

const STATUS_MESSAGES = [
  'Reading your grades...',
  'Applying your rules...',
  'Generating your file...',
];

const Spinner = () => {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="egg-loader" role="status" aria-live="polite">
      <div className="egg-loader__stage">
        <div className="egg-loader__pulse" aria-hidden="true" />
        <div className="egg-loader__egg" aria-hidden="true">
          <span className="egg-loader__shine" />
        </div>
      </div>

      <div className="egg-loader__status">
        {STATUS_MESSAGES.map((msg, i) => (
          <span
            key={msg}
            className={`egg-loader__status-text ${
              i === statusIndex ? 'is-active' : ''
            }`}
          >
            {msg}
          </span>
        ))}
      </div>

      <div className="egg-loader__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <span className="visually-hidden">Loading, please wait.</span>
    </div>
  );
};

export default Spinner;
