import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArtifactGallery.css';

function ArtifactGallery({ artifacts }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags([...selectedTags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className="artifact-gallery-container">
      <h1 className="combined-bubble-text" data-text="Artifacts">Artifacts</h1>
      <div className="search-and-filter-container">
        <input type="text" placeholder="Search artifacts..." className="search-bar" />
        <div className="tag-input-wrapper">
          <input
            type="text"
            placeholder="Add tags..."
            className="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTag} className="add-tag-button">
            Add
          </button>
        </div>
        <div className="sort-by-wrapper">
          <select className="sort-by-select">
            <option value="date-asc">Sort by Date (Ascending)</option>
            <option value="date-desc">Sort by Date (Descending)</option>
            <option value="alpha-asc">Sort by Name (A-Z)</option>
          </select>
        </div>
      </div>
      <div className="selected-tags-area">
        {selectedTags.map((tag) => (
          <div key={tag} className="selected-tag">
            {tag}
            <button onClick={() => handleRemoveTag(tag)} className="remove-tag-button">
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="artifact-grid">
        {artifacts.length > 0 ? (
          artifacts.map(artifact => (
            <Link to={`/artifact/${artifact.id}`} key={artifact.id} className="artifact-card">
              <img src={artifact.previewImage} alt={artifact.title} className="artifact-preview-image" />
              <h3>{artifact.title}</h3>
              <p className="artifact-note">{artifact.description}</p>
            </Link>
          ))
        ) : (
          <p>No artifacts found.</p>
        )}
      </div>
    </div>
  );
}

export default ArtifactGallery;
