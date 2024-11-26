import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ProjectGallery from './pages/ProjectGallery';
import Blog from './pages/BlogGallery';
import Project from './pages/Project';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ReportBug from './pages/ReportBug';
import { useState } from 'react';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <Layout isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
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
