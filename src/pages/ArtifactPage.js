import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtifactPage.css';
import ModelViewer from '../components/ModelViewer';

function ArtifactPage({ artifacts }) {
  const { artifactId } = useParams();
  const navigate = useNavigate();
  
  const artifact = artifacts.find(a => a.id === parseInt(artifactId));
  const [currentVersion, setCurrentVersion] = useState(artifact ? artifact.versions[artifact.versions.length - 1] : null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!artifact || !currentVersion) {
    return <div>Artifact not found.</div>;
  }

  const handleVersionChange = (event) => {
    const selectedVersion = artifact.versions.find(v => v.version === event.target.value);
    setCurrentVersion(selectedVersion);
    setSelectedImageIndex(0); // Reset image index when version changes
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(prevIndex => 
      prevIndex === 0 ? currentVersion.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prevIndex => 
      prevIndex === currentVersion.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const ArtifactPreview = ({ artifact, version }) => {
    switch (artifact.type) {
      case 'image':
        if (version.images && version.images.length > 1) {
          return (
            <div className="image-gallery">
              <div className="main-image-container">
                <button onClick={handlePreviousImage} className="gallery-arrow left-arrow">
                  &#8249;
                </button>
                <img 
                  src={version.images[selectedImageIndex]} 
                  alt={`${artifact.title} - Image ${selectedImageIndex + 1}`} 
                  className="main-image" 
                />
                <button onClick={handleNextImage} className="gallery-arrow right-arrow">
                  &#8250;
                </button>
              </div>
              <div className="thumbnail-container">
                {version.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return <img src={version.file_url} alt={artifact.title} className="artifact-image-preview" />;
        }
      case 'video':
        return <video src={version.file_url} controls className="artifact-video-preview" />;
      case '3d':
        return <ModelViewer objPath={version.obj_url} mtlPath={version.mtl_url} />;
      case 'pdf':
        return (
            <iframe 
                src={version.file_url} 
                title={artifact.title} 
                className="artifact-pdf-preview"
                style={{ border: 'none' }}
            ></iframe>
        );
      default:
        return <p>Unsupported artifact type</p>;
    }
  };

  return (
    <div className="artifact-page">
      <button onClick={() => navigate(-1)} className="back-button-with-text">
        <span className="back-arrow-icon"></span>
        <span>Back</span>
      </button>
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
          <span className="detail-label">Tags:</span>
          <div className="detail-value">
            <div className="artifact-tags-container">
              {artifact.tags && artifact.tags.map(tag => (
                <span key={tag} className="artifact-tag">{tag}</span>
              ))}
            </div>
          </div>
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
