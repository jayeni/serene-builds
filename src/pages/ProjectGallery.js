import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectGallery.css';

function ProjectGallery({ projects, isSignedIn }) {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    // Get the next available ID
    const nextId = Math.max(...Object.keys(projects).map(Number)) + 1;
    navigate(`/project/${nextId}/edit`);
  };

  return (
    <div className="project-gallery">
      <div className="gallery-header">
        <h1>Project Gallery</h1>
        {isSignedIn && (
          <button 
            className="create-project-button"
            onClick={handleCreateProject}
          >
            + Create New Project
          </button>
        )}
      </div>
      <div className="projects-grid">
        {Object.entries(projects).map(([id, project]) => (
          <Link to={`/project/${id}`} key={id} className="project-card">
            <div className="project-thumbnail">
              <img 
                src={project.images[0]}
                alt={project.title} 
              />
            </div>
            <h3>{project.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectGallery;
