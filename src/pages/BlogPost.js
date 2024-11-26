import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogPost.css';

function BlogPost({ blogPosts, isSignedIn, deleteBlogPost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts[id];

  if (!post) {
    navigate('/blog');
    return null;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      navigate('/blog');
    }
  };

  return (
    <div className="blog-post-container">
      <div className="post-header">
        <Link to="/blog" className="back-button">
          <span className="arrow">←</span> Back to Blogs
        </Link>
        
        {isSignedIn && (
          <div className="action-buttons">
            <button 
              className="edit-button"
              onClick={() => navigate(`/blog/${id}/edit`)}
            >
              Edit Post
            </button>
            <button 
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
      
      <h1>{post.title}</h1>
      <p className="post-date">{post.date}</p>
      
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      
      <div className="post-content">
        <p className="post-category">{post.category}</p>
        <p className="post-summary">{post.summary}</p>
        <div className="post-body">{post.content}</div>
      </div>
    </div>
  );
}

export default BlogPost; 