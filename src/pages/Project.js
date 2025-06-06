import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Project.css';
import prayerHands from '../assets/prayerhands.jpg';

function Project({ isSignedIn, projects, deleteProject }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects[id];

  if (!project) {
    return navigate('/projects');
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <button className="back-button" onClick={() => navigate('/projects')}>
          ← Back to Projects
        </button>
      </div>
      
      <h1>{project.title}</h1>
      
      <div className="project-content">
        <div className="project-images">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="project-swiper"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${project.title} slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <section className="project-description">
          <h2>About this Project</h2>
          <p>{project.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Project; 