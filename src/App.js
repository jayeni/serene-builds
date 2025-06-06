import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ProjectGallery from './pages/ProjectGallery';
import Project from './pages/Project';
import ReportBug from './pages/ReportBug';
import prayerHands from './assets/prayerhands.jpg';
import bodyBackgroundImage from './assets/body-background.png';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  // Move projects data to App level
  const [projects, setProjects] = useState({
    1: {
      title: "Project One",
      description: "Detailed description of Project One...",
      images: [prayerHands, prayerHands, prayerHands]
    },
    2: {
      title: "Project Two",
      description: "Detailed description of Project Two...",
      images: [prayerHands, prayerHands, prayerHands]
    },
    // ... other projects
  });

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
          <Route path="/" element={<Home />} />
          <Route 
            path="/projects" 
            element={
              <ProjectGallery 
                projects={projects} 
                isSignedIn={isSignedIn} 
              />
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <Project 
                isSignedIn={isSignedIn} 
                projects={projects} 
              />
            } 
          />
          <Route path="/report-bug" element={<ReportBug />} />
          {/* Add other routes as needed */}
          
          {/* Catch-all route - redirects any invalid URL to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
