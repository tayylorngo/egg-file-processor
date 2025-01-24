import React from 'react';
import "bootstrap/dist/css/bootstrap.css"

const Spinner = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;