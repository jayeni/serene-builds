import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtifactPage.css';

function ArtifactPage({ artifacts }) {
  const { artifactId } = useParams();
  const navigate = useNavigate();
  
  const artifact = artifacts.find(a => a.id === parseInt(artifactId));

  if (!artifact) {
    return <div>Artifact not found.</div>;
  }

  return (
    <div className="artifact-page">
      <button onClick={() => navigate(-1)} className="back-button"></button>
      <div className="artifact-title-header">
        <h1 className="combined-bubble-text" data-text={`Artifact: ${artifact.title}`}>Artifact: {artifact.title}</h1>
      </div>
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
