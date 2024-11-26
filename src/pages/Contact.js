import React from 'react';
import './Contact.css';

function Contact() {
  const email = "your.email@example.com"; // Replace with your actual email

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <div className="contact-content">
        <p>Feel free to reach out:</p>
        <a href={`mailto:${email}`} className="email-link">
          {email}
        </a>
      </div>
    </div>
  );
}

export default Contact; 