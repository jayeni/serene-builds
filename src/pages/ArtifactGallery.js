import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ArtifactGallery.css';
import ModelViewer from '../components/ModelViewer';

function ArtifactGallery({ artifacts }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isTagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setTypeDropdownOpen] = useState(false);
  
  const videoRefs = useRef({});

  const tagFilterRef = useRef(null);
  const projectFilterRef = useRef(null);
  const typeFilterRef = useRef(null);

  // Get all unique tags and projects from the artifacts
  const allTags = artifacts.flatMap(artifact => artifact.tags || []);
  const uniqueTags = [...new Set(allTags)].sort();
  const allProjects = artifacts.map(artifact => artifact.project).filter(Boolean);
  const uniqueProjects = [...new Set(allProjects)].sort();
  const allTypes = artifacts.map(artifact => artifact.type).filter(Boolean);
  const uniqueTypes = [...new Set(allTypes)].sort();

  const handleVideoHover = (videoId, play) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (play) {
        video.play().catch(error => {
          // Autoplay was prevented. This is common in browsers.
          // The video will play once the user interacts with the page.
          console.error("Video play prevented:", error);
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleProjectToggle = (project) => {
    setSelectedProjects(prev =>
      prev.includes(project) ? prev.filter(p => p !== project) : [...prev, project]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (tagFilterRef.current && !tagFilterRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
      if (projectFilterRef.current && !projectFilterRef.current.contains(event.target)) {
        setProjectDropdownOpen(false);
      }
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target)) {
        setTypeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredArtifacts = artifacts.filter(artifact => {
    const tagMatch = selectedTags.length === 0 || selectedTags.every(tag => artifact.tags?.includes(tag));
    const projectMatch = selectedProjects.length === 0 || selectedProjects.includes(artifact.project);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(artifact.type);
    return tagMatch && projectMatch && typeMatch;
  });

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
            <div className="tag-filter-wrapper" ref={projectFilterRef}>
              <button className="filter-select" onClick={() => setProjectDropdownOpen(!isProjectDropdownOpen)}>
                Project Filter
              </button>
              {isProjectDropdownOpen && (
                <div className="tag-dropdown">
                  {uniqueProjects.map(project => (
                    <label key={project} className="tag-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project)}
                        onChange={() => handleProjectToggle(project)}
                      />
                      {project}
                    </label>
                  ))}
                </div>
              )}
            </div>
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
            <div className="tag-filter-wrapper" ref={typeFilterRef}>
              <button className="filter-select" onClick={() => setTypeDropdownOpen(!isTypeDropdownOpen)}>
                Type Filter
              </button>
              {isTypeDropdownOpen && (
                <div className="tag-dropdown">
                  {uniqueTypes.map(type => (
                    <label key={type} className="tag-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                      />
                      {type}
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

        <div className="selected-tags-area">
            {selectedProjects.map(project => (
              <div key={project} className="selected-project-pill">
                {project}
                <button onClick={() => handleProjectToggle(project)} className="remove-tag-button">
                  &times;
                </button>
              </div>
            ))}
            {selectedTags.map(tag => (
              <div key={tag} className="selected-tag-pill">
                {tag}
                <button onClick={() => handleTagToggle(tag)} className="remove-tag-button">
                  &times;
                </button>
              </div>
            ))}
            {selectedTypes.map(type => (
              <div key={type} className="selected-type-pill">
                {type}
                <button onClick={() => handleTypeToggle(type)} className="remove-tag-button">
                  &times;
                </button>
              </div>
            ))}
        </div>

        <div className="artifact-grid">
          {filteredArtifacts.length > 0 ? (
            filteredArtifacts.map(artifact => (
              <div key={artifact.id} className="artifact-card">
                <div 
                  className="artifact-image-container"
                  onMouseEnter={() => artifact.type === 'video' && handleVideoHover(artifact.id, true)}
                  onMouseLeave={() => artifact.type === 'video' && handleVideoHover(artifact.id, false)}
                >
                  {artifact.type === 'video' ? (
                    <video
                      ref={el => videoRefs.current[artifact.id] = el}
                      src={artifact.file_url}
                      className="artifact-preview-image"
                      preload="metadata"
                      muted
                      loop
                    />
                  ) : artifact.type === '3d' ? (
                    <div className="artifact-preview-image">
                        <ModelViewer objPath={artifact.obj_url} mtlPath={artifact.mtl_url} galleryPreview={true} />
                    </div>
                  ) : artifact.type === 'pdf' ? (
                    <iframe 
                      src={artifact.file_url} 
                      title={artifact.title} 
                      className="artifact-preview-image"
                      style={{ border: 'none' }}
                    ></iframe>
                  ) : (
                    <img src={artifact.previewImage} alt={artifact.title} className="artifact-preview-image" />
                  )}
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
                    {artifact.project && (
                      <span className="artifact-project-tag">{artifact.project}</span>
                    )}
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
