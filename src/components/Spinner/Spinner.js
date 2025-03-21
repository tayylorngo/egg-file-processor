import React from 'react';

const Spinner = () => {
  return (
    <div className="text-center" style={{ marginTop: '1rem' }}>
      <img 
        src="/favicon.ico"
        alt="Loading"
        className="spinning-favicon"
        style={{ width: '48px', height: '48px' }}
      />

      <span className="visually-hidden">Loading...</span>

      <style>
        {`
          .spinning-favicon {
            animation: spin 1s linear infinite;
            display: inline-block;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
