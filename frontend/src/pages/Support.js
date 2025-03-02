import React from 'react';
import '../styles/Support.css'; // Importing the CSS file for styling

const Support = () => {
  return (
    <div className="support-container">
      <h2>Support & Help Section</h2>
      <div className="contact-cards">
        <div className="contact-card">
          <h3>Son/Daughter</h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <div className="contact-buttons">
            <a href="tel:+1234567890" className="contact-btn call-btn">Call</a>
            <a href="mailto:john.doe@example.com" className="contact-btn mail-btn">Mail</a>
          </div>
        </div>
        <div className="contact-card">
          <h3>Guardian</h3>
          <p><strong>Name:</strong> Jane Smith</p>
          <p><strong>Phone:</strong> +1 987 654 321</p>
          <p><strong>Email:</strong> jane.smith@example.com</p>
          <div className="contact-buttons">
            <a href="tel:+1987654321" className="contact-btn call-btn">Call</a>
            <a href="mailto:jane.smith@example.com" className="contact-btn mail-btn">Mail</a>
          </div>
        </div>
        <div className="contact-card">
          <h3>Doctor</h3>
          <p><strong>Name:</strong> Dr. Emily Brown</p>
          <p><strong>Phone:</strong> +1 555 123 456</p>
          <p><strong>Email:</strong> emily.brown@clinic.com</p>
          <div className="contact-buttons">
            <a href="tel:+1555123456" className="contact-btn call-btn">Call</a>
            <a href="mailto:emily.brown@clinic.com" className="contact-btn mail-btn">Mail</a>
          </div>
        </div>
        <div className="contact-card">
          <h3>Ambulance</h3>
          <p><strong>Phone:</strong> +1 800 123 4567</p>
          <div className="contact-buttons">
            <a href="tel:+18001234567" className="contact-btn call-btn">Call</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
