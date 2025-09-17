import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadArtifact.css';

function UploadArtifact() {
  const navigate = useNavigate();
  const [project, setProject] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="upload-artifact-page">
      <div className="upload-artifact-container">
        <button onClick={() => navigate(-1)} className="back-button-upload"></button>
        <h1 className="upload-title">Upload Artifact</h1>
        
        <form className="upload-form">
          <div className="form-group">
            <label htmlFor="artifactTitle">Artifact Title</label>
            <input type="text" id="artifactTitle" />
          </div>

          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input 
              type="text" 
              id="project" 
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tag-input-container">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="remove-tag">&times;</button>
                </div>
              ))}
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add tags and press Enter..."
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="artifactType">Artifact Type</label>
            <select id="artifactType">
              <option value="">Select type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="3d">3D Model</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file">File</label>
            <div className="file-drop-area">
              <span className="file-drop-icon">☁️</span>
              <p>Choose a file or drag it here</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="version">Version</label>
            <input type="text" id="version" defaultValue="v1" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="3"></textarea>
          </div>

          <button type="submit" className="upload-button">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadArtifact; 