import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import "./DonateButton.css"; // Custom styles

const DonateButton = () => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="donation-container">
      {showMessage && (
        <div className="donation-message">
          <p>
            The Egg File Processor will always be <strong>free</strong>, but your donations help support my studies and future development efforts.💙
          </p>
          <button className="close-btn" onClick={() => setShowMessage(false)}>×</button>
        </div>
      )}
      <a 
        href="https://buymeacoffee.com/taylorngo" // Replace with your actual donation link
        target="_blank" 
        rel="noopener noreferrer"
        className="donate-button"
      >
        <FaHeart className="me-2" /> Donate
      </a>
    </div>
  );
};

export default DonateButton;
