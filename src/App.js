import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ProjectGallery from './pages/ProjectGallery';
import Blog from './pages/BlogGallery';
import Project from './pages/Project';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ReportBug from './pages/ReportBug';
import ProjectEditor from './pages/ProjectEditor';
import BlogEditor from './pages/BlogEditor';
import { useState } from 'react';
import prayerHands from './assets/prayerhands.jpg';

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

  // Add blog posts state
  const [blogPosts, setBlogPosts] = useState({
    1: {
      title: "First Blog Post",
      category: "Updates",
      date: "2024-03-20",
      summary: "This is a summary of the first blog post...",
      content: "Full content of the first blog post...",
      image: prayerHands
    },
    2: {
      title: "Second Blog Post",
      category: "News",
      date: "2024-03-21",
      summary: "This is a summary of the second blog post...",
      content: "Full content of the second blog post...",
      image: prayerHands
    }
  });

  const createProject = (id) => {
    setProjects(prev => ({
      ...prev,
      [id]: {
        title: "New Project",
        description: "Add your project description here...",
        images: []
      }
    }));
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prev => ({
      ...prev,
      [id]: updatedProject
    }));
  };

  const deleteProject = (id) => {
    setProjects(prev => {
      const newProjects = { ...prev };
      delete newProjects[id];
      return newProjects;
    });
  };

  // Add blog management functions
  const createBlogPost = (id) => {
    setBlogPosts(prev => ({
      ...prev,
      [id]: {
        title: "New Blog Post",
        category: "Draft",
        date: new Date().toISOString().split('T')[0],
        summary: "Add your blog summary here...",
        content: "Add your blog content here...",
        image: null
      }
    }));
  };

  const updateBlogPost = (id, updatedPost) => {
    setBlogPosts(prev => ({
      ...prev,
      [id]: updatedPost
    }));
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => {
      const newPosts = { ...prev };
      delete newPosts[id];
      return newPosts;
    });
  };

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
                deleteProject={deleteProject} 
              />
            } 
          />
          <Route 
            path="/blog" 
            element={
              <Blog 
                blogPosts={blogPosts} 
                isSignedIn={isSignedIn}
              />
            } 
          />
          <Route 
            path="/blog/:id" 
            element={
              <BlogPost 
                blogPosts={blogPosts}
                isSignedIn={isSignedIn}
                deleteBlogPost={deleteBlogPost}
              />
            } 
          />
          <Route 
            path="/blog/:id/edit" 
            element={
              isSignedIn ? (
                <BlogEditor 
                  blogPosts={blogPosts}
                  updateBlogPost={updateBlogPost}
                  createBlogPost={createBlogPost}
                />
              ) : (
                <Navigate to="/blog" replace />
              )
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/report-bug" element={<ReportBug />} />
          <Route 
            path="/project/:id/edit" 
            element={
              isSignedIn ? (
                <ProjectEditor 
                  projects={projects} 
                  updateProject={updateProject}
                  createProject={createProject}
                />
              ) : (
                <Navigate to="/projects" replace />
              )
            } 
          />
          {/* Add other routes as needed */}
          
          {/* Catch-all route - redirects any invalid URL to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
