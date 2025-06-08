import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArtifactGallery.css';

function ArtifactGallery({ journeys }) {
  const { id } = useParams();
  const currentJourney = journeys[id];

  const journeyTypes = currentJourney ? [...new Set(currentJourney.artifacts.map(a => a.journey))] : [];
  
  const [activeJourneyType, setActiveJourneyType] = useState('');

  useEffect(() => {
    if (journeyTypes.length > 0) {
      setActiveJourneyType(journeyTypes[0]);
    }
  }, [id]);

  if (!currentJourney) {
    return <div>Journey not found.</div>;
  }

  const filteredArtifacts = currentJourney.artifacts.filter(
    artifact => artifact.journey === activeJourneyType
  );

  return (
    <div className="artifact-gallery-container">
      <h1 className="gallery-title">{currentJourney.title}</h1>
      <div className="journey-tabs">
        {journeyTypes.map(journeyType => (
          <button
            key={journeyType}
            className={`journey-tab ${activeJourneyType === journeyType ? 'active' : ''}`}
            onClick={() => setActiveJourneyType(journeyType)}
          >
            {journeyType}
          </button>
        ))}
      </div>
      <div className="artifact-grid">
        {filteredArtifacts.length > 0 ? (
          filteredArtifacts.map(artifact => (
            <Link to={`/journey/${id}/artifact/${artifact.id}`} key={artifact.id} className="artifact-card">
              <div className="artifact-placeholder">
                <span>{artifact.title}</span>
              </div>
              <p className="artifact-note">{artifact.description}</p>
            </Link>
          ))
        ) : (
          <p>No artifacts found for this journey type.</p>
        )}
      </div>
    </div>
  );
}

export default ArtifactGallery;
