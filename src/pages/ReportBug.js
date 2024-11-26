import React, { useState } from 'react';
import './ReportBug.css';

function ReportBug() {
  const [submitted, setSubmitted] = useState(false);
  const email = "your.email@example.com"; // Replace with your actual email

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = "Bug Report: " + formData.get('title');
    const body = `Bug Description: ${formData.get('description')}\n\nSteps to Reproduce: ${formData.get('steps')}\n\nBrowser: ${formData.get('browser')}`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="bug-report-container">
      <h1>Report a Bug</h1>
      {submitted ? (
        <div className="success-message">
          <p>Thank you for your report! Your email client should open shortly.</p>
          <button onClick={() => setSubmitted(false)} className="submit-button">
            Submit Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bug-report-form">
          <div className="form-group">
            <label htmlFor="title">Bug Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Brief description of the issue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Detailed description of the bug"
              rows="4"
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default ReportBug; 