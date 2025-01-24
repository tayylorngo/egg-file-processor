import React, { useState } from "react";
import "./App.css"; // Custom CSS for styling

function App() {
  const [file, setFile] = useState(null);
  const [threshold, setThreshold] = useState(65); // Default threshold is 65
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle grade threshold input
  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }
  
    if (!threshold || isNaN(threshold)) {
      setMessage("Please enter a valid grade threshold.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("threshold", Number(threshold)); // Ensure threshold is sent as a number
  
    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to process the file.");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setMessage("File processed successfully! Click the button below to download it.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };
  
  return (
    <div className="container">
      <h1>Excel File Processor</h1>
      <p>Upload your Excel file and set a grade threshold.</p>

      <div className="form-group">
        <label htmlFor="formFile">Upload your Excel file:</label>
        <input type="file" id="formFile" onChange={handleFileChange} />
      </div>

      <div className="form-group">
        <label htmlFor="threshold">Enter grade threshold to change to 55:</label>
        <input
          type="number"
          id="threshold"
          value={threshold}
          onChange={handleThresholdChange}
          placeholder="Enter threshold (e.g., 60)"
        />
      </div>

      <button onClick={handleFileUpload}>Upload and Process</button>

      <p className="message">{message}</p>

      {downloadUrl && (
        <a href={downloadUrl} download="processed_grades.xlsx" className="download-link">
          Download Processed File
        </a>
      )}
    </div>
  );
}

export default App;
