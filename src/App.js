import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ArtifactGallery from './pages/ArtifactGallery';
import ArtifactPage from './pages/ArtifactPage';
import bodyBackgroundImage from './assets/body-background.png';
import prayerHands from './assets/prayerhands.jpg';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  const [artifacts, setArtifacts] = useState([
    {
      id: 101,
      title: "Initial Sketches",
      description: "Early concept sketches for the logo and UI.",
      type: "image",
      journey: "3D",
      file_url: "/files/sketch1.png",
      tags: ["sketch", "ui", "concept"],
      created_at: "2025-05-01T10:30:00Z",
      previewImage: prayerHands
    },
    {
      id: 102,
      title: "First 3D Model",
      description: "The first iteration of the 3D artifact.",
      type: "3d_model",
      journey: "3D",
      file_url: "/models/mundial_v1.glb",
      tags: ["3d", "modeling"],
      created_at: "2025-05-03T11:00:00Z",
      previewImage: prayerHands
    },
    {
      id: 103,
      title: "Promotional Video",
      description: "A short video showcasing the project.",
      type: "video",
      journey: "Video",
      file_url: "/videos/promo1.mp4",
      tags: ["promo", "video"],
      created_at: "2025-05-05T16:00:00Z",
      previewImage: prayerHands
    },
    {
      id: 201,
      title: "Financial Plan",
      description: "Budget and spending for the Serene Build project.",
      type: "document",
      journey: "Profit",
      file_url: "/files/financial_plan.pdf",
      tags: ["finance", "budget"],
      created_at: "2025-04-15T09:00:00Z",
      previewImage: prayerHands
    }
  ]);

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
