import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectEditor.css';

function ProjectEditor({ projects, updateProject, createProject }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewProject = !projects[id];
  
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    images: []
  });

  useEffect(() => {
    const currentProject = projects[id];
    if (!currentProject) {
      setProjectData({
        title: "New Project",
        description: "Add your project description here...",
        images: []
      });
    } else {
      setProjectData(currentProject);
    }
  }, [id, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewProject) {
      createProject(id);
    }
    updateProject(id, projectData);
    navigate(`/project/${id}`);
  };

  const handleCancel = () => {
    if (isNewProject) {
      navigate('/projects');
    } else {
      navigate(`/project/${id}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageDelete = (index) => {
    setProjectData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    
    setProjectData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  return (
    <div className="project-editor">
      <div className="editor-header">
        <h1>{isNewProject ? 'Create New Project' : `Edit Project ${id}`}</h1>
        <button 
          className="cancel-button" 
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            rows="6"
          />
        </div>

        <div className="form-group">
          <label>Current Images</label>
          <div className="current-images">
            {projectData.images.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image} alt={`Project ${index + 1}`} />
                <button 
                  type="button" 
                  className="delete-image" 
                  onClick={() => handleImageDelete(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <label>Add New Images</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageAdd}
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">
            {isNewProject ? 'Create Project' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectEditor; 