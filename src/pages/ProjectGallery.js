import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectGallery.css';

function ProjectGallery({ projects, isSignedIn }) {
  const navigate = useNavigate();

  return (
    <div className="project-gallery">
      <div className="gallery-header">
        <h1>Projects</h1>
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
