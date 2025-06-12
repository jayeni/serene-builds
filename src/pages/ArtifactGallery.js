import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ArtifactGallery.css';

function ArtifactGallery({ artifacts }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagDropdownOpen, setTagDropdownOpen] = useState(false);
  const tagFilterRef = useRef(null);

  // Get all unique tags from the artifacts
  const allTags = artifacts.flatMap(artifact => artifact.tags || []);
  const uniqueTags = [...new Set(allTags)].sort();

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (tagFilterRef.current && !tagFilterRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tagFilterRef]);

  // The actual filtering is not hooked up, as requested.
  // To enable filtering, you would use this logic:
  // const filteredArtifacts = selectedTags.length > 0
  //   ? artifacts.filter(artifact =>
  //       selectedTags.every(tag => artifact.tags && artifact.tags.includes(tag))
  //     )
  //   : artifacts;
  const filteredArtifacts = artifacts;

  return (
    <div className="gallery-page-wrapper">
      <h1 className="combined-bubble-text" data-text="ARTIFACTS">ARTIFACTS</h1>
      <div className="artifact-gallery-container">
        <div className="search-and-filter-container">
          <div className="search-bar-wrapper">
            {/* Using a simple text span for the icon for now */}
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            <input type="text" placeholder="Search artifacts..." className="search-bar" />
          </div>

          <div className="filter-controls">
            <div className="tag-filter-wrapper" ref={tagFilterRef}>
              <button className="filter-select" onClick={() => setTagDropdownOpen(!isTagDropdownOpen)}>
                Tag Filter
              </button>
              {isTagDropdownOpen && (
                <div className="tag-dropdown">
                  {uniqueTags.map(tag => (
                    <label key={tag} className="tag-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="sort-by-wrapper">
              <select className="filter-select">
                <option value="date-desc">Sort by Newest</option>
                <option value="date-asc">Sort by Oldest</option>
                <option value="alpha-asc">Sort by Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="selected-tags-area">
            {selectedTags.map(tag => (
              <div key={tag} className="selected-tag-pill">
                {tag}
                <button onClick={() => handleTagToggle(tag)} className="remove-tag-button">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="artifact-grid">
          {filteredArtifacts.length > 0 ? (
            filteredArtifacts.map(artifact => (
              <div key={artifact.id} className="artifact-card">
                <div className="artifact-image-container">
                  <img src={artifact.previewImage} alt={artifact.title} className="artifact-preview-image" />
                  {['video', 'audio'].includes(artifact.type) && (
                    <div className="play-icon-overlay">
                      <div className="play-icon"></div>
                    </div>
                  )}
                </div>
                <div className="artifact-card-content">
                  <h3>{artifact.title}</h3>
                  <p className="artifact-note">{artifact.description}</p>
                  <div className="artifact-tags-container">
                    <span className="artifact-type-tag">{artifact.type}</span>
                    {artifact.tags && artifact.tags.map(tag => (
                      <span key={tag} className="artifact-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="artifact-card-footer">
                  <Link to={`/artifact/${artifact.id}`} className="open-link">
                    <span>Open</span>
                    <span className="arrow-icon">→</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No artifacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtifactGallery;
