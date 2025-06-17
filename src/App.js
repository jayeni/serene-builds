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
import iseDayoV1 from './assets/ise_dayo/Ise_Dayo_v1.pdf';
import iseDayoV2 from './assets/ise_dayo/Ise_Dayo_v2.pdf';
import iseDayoV3 from './assets/ise_dayo/Ise_Dayo_v3.pdf';
import iseDayoV4 from './assets/ise_dayo/Ise_Dayo_v4.pdf';
import iseDayoV5 from './assets/ise_dayo/Ise_Dayo_v5.pdf';
import sb0 from './assets/sb/sb0.png';
import sb1 from './assets/sb/sb1.png';
import sb2 from './assets/sb/sb2.png';
import sb3 from './assets/sb/sb3.png';
import sb4 from './assets/sb/sb4.png';
import sb6 from './assets/sb/sb6.png';
import sb7 from './assets/sb/sb7.png';
import sb8 from './assets/sb/sb8.png';
import sb9 from './assets/sb/sb9.png';
import sb10 from './assets/sb/sb10.png';
import sb11 from './assets/sb/sb11.png';
import sb12 from './assets/sb/sb12.png';

const artifactsData = [
      {
        id: 101,
        title: "PK Before Pictures",
        type: "image",
        project: "Serene Build",
        tags: ["before", "photos", "pk"],
        versions: [
          {
            version: "v1",
            description: "Collection of before pictures showing the initial state of PK.",
            images: [sb0, sb1, sb2, sb3, sb4, sb6, sb7, sb8, sb9, sb10, sb11, sb12],
            file_url: sb1, // Preview image
            created_at: "2025-05-01T10:00:00Z",
          }
        ]
      },
      {
        id: 102,
        title: "3D Rhino Design Video",
        type: "video",
        project: "Serene Build",
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
      },
      {
        id: 104,
        title: "Ise Dayo Document",
        type: "pdf",
        project: "Ise Dayo",
        tags: ["pdf", "document", "viewer"],
        versions: [
          {
            version: "v1",
            description: "Version 1 of Ise Dayo document.",
            file_url: iseDayoV1,
            created_at: "2025-05-06T10:00:00Z",
          },
          {
            version: "v2",
            description: "Version 2 of Ise Dayo document.",
            file_url: iseDayoV2,
            created_at: "2025-05-07T10:00:00Z",
          },
          {
            version: "v3",
            description: "Version 3 of Ise Dayo document.",
            file_url: iseDayoV3,
            created_at: "2025-05-08T10:00:00Z",
          },
          {
            version: "v4",
            description: "Version 4 of Ise Dayo document.",
            file_url: iseDayoV4,
            created_at: "2025-05-09T10:00:00Z",
          },
          {
            version: "v5",
            description: "Version 5 of Ise Dayo document.",
            file_url: iseDayoV5,
            created_at: "2025-05-10T10:00:00Z",
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
