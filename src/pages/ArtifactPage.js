import React from 'react';
import { useParams } from 'react-router-dom';
import './ArtifactPage.css';

function ArtifactPage({ journeys }) {
  const { journeyId, artifactId } = useParams();
  
  const journey = journeys[journeyId];
  const artifact = journey ? journey.artifacts.find(a => a.id === parseInt(artifactId)) : null;

  if (!artifact) {
    return <div>Artifact not found.</div>;
  }

  return (
    <div className="artifact-page">
      <h1 className="artifact-title-header">Artifact: {artifact.title}</h1>
      <div className="artifact-preview-container">
        <p>[ Graph Preview / Embedded File ]</p>
      </div>
      <div className="artifact-details">
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{artifact.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Journey:</span>
          <span className="detail-value">{artifact.journey}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Tags:</span>
          <span className="detail-value">{artifact.tags.join(', ')}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created:</span>
          <span className="detail-value">{new Date(artifact.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="artifact-notes-container">
        <h2 className="notes-title">Notes:</h2>
        <div className="notes-content">
          <p>{artifact.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ArtifactPage;
