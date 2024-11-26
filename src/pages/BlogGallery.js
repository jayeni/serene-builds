import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BlogGallery.css';

function BlogGallery({ blogPosts, isSignedIn }) {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    const nextId = Math.max(...Object.keys(blogPosts).map(Number)) + 1;
    navigate(`/blog/${nextId}/edit`);
  };

  return (
    <div className="blog-container">
      <div className="gallery-header">
        <h1>Blog Posts</h1>
        {isSignedIn && (
          <button 
            className="create-button"
            onClick={handleCreatePost}
          >
            + Create New Post
          </button>
        )}
      </div>
      
      <div className="blog-grid">
        {Object.entries(blogPosts).map(([id, post]) => (
          <Link to={`/blog/${id}`} key={id} className="blog-card">
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <span className="blog-category">{post.category}</span>
              <h2>{post.title}</h2>
              <div className="blog-date">{post.date}</div>
              <p className="blog-summary">{post.summary}</p>
              <span className="read-more">Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogGallery; 