import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectHierarchy.css';

function ProjectHierarchy({ artifacts }) {
  const navigate = useNavigate();

  // Process artifacts to group by project and then by type
  const projectHierarchy = artifacts.reduce((acc, artifact) => {
    const { project, type, title, id } = artifact;
    if (!acc[project]) {
      acc[project] = {};
    }
    if (!acc[project][type]) {
      acc[project][type] = [];
    }
    acc[project][type].push({ id, title });
    return acc;
  }, {});

  return (
    <div className="hierarchy-page">
      <div className="hierarchy-container">
        <button onClick={() => navigate(-1)} className="back-button-hierarchy"></button>
        <h1 className="hierarchy-title">Project Hierarchy</h1>
        <div className="hierarchy-tree">
          {Object.entries(projectHierarchy).map(([projectName, types]) => (
            <div key={projectName} className="project-node">
              <h2 className="project-name">
                <span className="folder-icon">📁</span>{projectName}
              </h2>
              <div className="type-nodes">
                {Object.entries(types).map(([typeName, artifacts]) => (
                  <div key={typeName} className="type-node">
                    <h3 className="type-name">
                      <span className="folder-icon">📁</span>{typeName}
                    </h3>
                    <ul className="artifact-list">
                      {artifacts.map(artifact => (
                        <li key={artifact.id} className="artifact-item">
                           <a href={`/artifact/${artifact.id}`}>{artifact.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectHierarchy; 