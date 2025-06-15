import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ArtifactGallery from './pages/ArtifactGallery';
import ArtifactPage from './pages/ArtifactPage';
import bodyBackgroundImage from './assets/green-back.png';
import prayerHands from './assets/prayerhands.jpg';
import sb3d1Video from './assets/sb3d1.mov';
import sb3d2Video from './assets/sb3d2.mov';
import pkObj from './assets/pk.obj';
import pkMtl from './assets/pk.mtl';
import pk4Obj from './assets/pk4.obj';
import pk4Mtl from './assets/pk4.mtl';

const artifactsData = [
      {
        id: 102,
        title: "3D Rhino Design Video",
        type: "video",
        project: "Serene build",
        tags: ["video", "graph", "preview"],
        versions: [
          {
            version: "v1",
            description: "A video of a 3D design that was made in Rhino.",
            file_url: sb3d1Video,
            created_at: "2025-05-02T11:00:00Z",
          },
          {
            version: "v2",
            description: "Version 1 of the 3D design video.",
            file_url: sb3d2Video,
            created_at: "2025-05-03T12:00:00Z",
          }
        ]
      },
      {
        id: 103,
        title: "3D Model PK",
        type: "3d",
        project: "Serene Build",
        tags: ["3d", "model", "viewer"],
        versions: [
          {
            version: "v1",
            description: "Version 2 of the 3D model of PK.",
            obj_url: pk4Obj,
            mtl_url: pk4Mtl,
            created_at: "2025-05-04T10:00:00Z",
          },
          {
            version: "v2",
            description: "3D model of PK.",
            obj_url: pkObj,
            mtl_url: pkMtl,
            created_at: "2025-05-05T10:00:00Z",
          }
        ]
      }
];

// Process artifacts to add latest version data to the top level for gallery view
const processedArtifacts = artifactsData.map(artifact => {
  const latestVersion = artifact.versions[artifact.versions.length - 1];
  let preview = latestVersion.file_url;
  if(artifact.type === '3d' || artifact.type === 'video'){
    preview = null; // No preview image for 3d models or videos for now
  }

  return {
      ...artifact,
      ...latestVersion,
      previewImage: preview
  };
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  const [artifacts, setArtifacts] = useState(processedArtifacts);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bodyBackgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }, []);

  return (
    <Router>
      <Layout isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
        <Routes>
          <Route path="/" element={<ArtifactGallery artifacts={artifacts} />} />
          <Route path="/artifact/:artifactId" element={<ArtifactPage artifacts={artifacts} />} />
          {/* Catch-all route - redirects any invalid URL to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
