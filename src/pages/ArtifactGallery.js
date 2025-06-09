import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ArtifactGallery.css';

function ArtifactGallery({ journeys }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentJourney = journeys[id];

  if (!currentJourney) {
    return <div>Journey not found.</div>;
  }

  return (
    <div className="artifact-gallery-container">
      <button onClick={() => navigate(-1)} className="back-button"></button>
      <h1 className="combined-bubble-text" data-text={currentJourney.title}>{currentJourney.title}</h1>
      <div className="artifact-grid">
        {currentJourney.artifacts.length > 0 ? (
          currentJourney.artifacts.map(artifact => (
            <Link to={`/journey/${id}/artifact/${artifact.id}`} key={artifact.id} className="artifact-card">
              <div className="artifact-placeholder">
                <span>{artifact.title}</span>
              </div>
              <p className="artifact-note">{artifact.description}</p>
            </Link>
          ))
        ) : (
          <p>No artifacts found for this journey.</p>
        )}
      </div>
    </div>
  );
}

export default ArtifactGallery;
