import React from 'react';
import { Link } from 'react-router-dom';
import './JourneyGallery.css';

function JourneyGallery({ journeys }) {
  return (
    <div className="journey-gallery">
      <div className="gallery-header">
        <h1 className="combined-bubble-text" data-text="Journeys">Journeys</h1>
      </div>
      <div className="journeys-grid">
        {Object.entries(journeys).map(([id, journey]) => (
          <Link to={`/journey/${id}`} key={id} className="journey-card">
            <div className="journey-thumbnail">
              <img 
                src={journey.images[0]}
                alt={journey.title} 
              />
            </div>
            <h3>{journey.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JourneyGallery;
