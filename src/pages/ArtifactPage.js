import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtifactPage.css';
import ModelViewer from '../components/ModelViewer';

function ArtifactPage({ artifacts }) {
  const { artifactId } = useParams();
  const navigate = useNavigate();
  
  const artifact = artifacts.find(a => a.id === parseInt(artifactId));

  const [currentVersion, setCurrentVersion] = useState(artifact ? artifact.versions[artifact.versions.length - 1] : null);

  if (!artifact || !currentVersion) {
    return <div>Artifact not found.</div>;
  }

  const handleVersionChange = (event) => {
    const selectedVersion = artifact.versions.find(v => v.version === event.target.value);
    setCurrentVersion(selectedVersion);
  };

  const ArtifactPreview = ({ artifact, version }) => {
    switch (artifact.type) {
      case 'image':
        return <img src={version.file_url} alt={artifact.title} className="artifact-image-preview" />;
      case 'video':
        return <video src={version.file_url} controls className="artifact-video-preview" />;
      case '3d':
        return <ModelViewer objPath={version.obj_url} mtlPath={version.mtl_url} />;
      default:
        return <p>Unsupported artifact type</p>;
    }
  };

  return (
    <div className="artifact-page">
      <button onClick={() => navigate(-1)} className="back-button"></button>
      <div className="artifact-title-header">
        <h1 className="combined-bubble-text" data-text={`Artifact: ${artifact.title}`}>Artifact: {artifact.title}</h1>
      </div>

      <div className="version-picker-container">
        <label htmlFor="version-select" className="detail-label">Version:</label>
        <select 
          id="version-select" 
          onChange={handleVersionChange} 
          value={currentVersion.version} 
          className="version-selector-main"
          disabled={artifact.versions.length <= 1}
        >
          {artifact.versions.map(v => (
            <option key={v.version} value={v.version}>{v.version}</option>
          ))}
        </select>
      </div>

      <div className="artifact-preview-container">
        <ArtifactPreview artifact={artifact} version={currentVersion} />
      </div>
      <div className="artifact-details">
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{artifact.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Project:</span>
          <span className="detail-value">{artifact.project}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created:</span>
          <span className="detail-value">{new Date(currentVersion.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="artifact-notes-container">
        <h2 className="notes-title">Notes:</h2>
        <div className="notes-content">
          <p>{currentVersion.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ArtifactPage;
