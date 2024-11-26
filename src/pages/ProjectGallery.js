import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectGallery.css';
import prayerHands from '../assets/prayerhands.jpg';

function ProjectGallery() {
  const projects = [
    {
      id: 1,
      title: "Project One",
      thumbnail: prayerHands
    },
    {
      id: 2,
      title: "Project Two",
      thumbnail: prayerHands
    },
    {
      id: 3,
      title: "Project Three",
      thumbnail: prayerHands
    },
    {
      id: 4,
      title: "Project Four",
      thumbnail: prayerHands
    },
    {
      id: 5,
      title: "Project Five",
      thumbnail: prayerHands
    },
    {
      id: 6,
      title: "Project Six",
      thumbnail: prayerHands
    }
  ];

  return (
    <div className="project-gallery">
      <h1>Project Gallery</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="project-card">
            <div className="project-thumbnail">
              <img src={project.thumbnail} alt={project.title} />
            </div>
            <h3>{project.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectGallery;
