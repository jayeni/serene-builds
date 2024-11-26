import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogEditor.css';

function BlogEditor({ blogPosts, updateBlogPost, createBlogPost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPost = !blogPosts[id];
  
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    summary: "",
    content: "",
    image: null
  });

  useEffect(() => {
    if (isNewPost) {
      setPostData({
        title: "New Blog Post",
        category: "Draft",
        date: new Date().toISOString().split('T')[0],
        summary: "Add your blog summary here...",
        content: "Add your blog content here...",
        image: null
      });
    } else {
      setPostData(blogPosts[id]);
    }
  }, [id, blogPosts, isNewPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...postData,
      date: new Date().toISOString().split('T')[0], // Update date on save
    };
    
    if (isNewPost) {
      createBlogPost(id);
    }
    updateBlogPost(id, updatedPost);
    navigate(`/blog/${id}`);
  };

  const handleCancel = () => {
    if (isNewPost) {
      navigate('/blog');
    } else {
      navigate(`/blog/${id}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>{isNewPost ? 'Create New Post' : 'Edit Post'}</h1>
        <div className="action-buttons">
          <button 
            className="edit-button" 
            onClick={() => navigate('/blog')}
          >
            View Blogs
          </button>
          <button 
            className="cancel-button" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={postData.category}
            onChange={(e) => setPostData({...postData, category: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={postData.summary}
            onChange={(e) => setPostData({...postData, summary: e.target.value})}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={(e) => setPostData({...postData, content: e.target.value})}
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label>Blog Image</label>
          {postData.image && (
            <div className="image-preview">
              <img src={postData.image} alt="Blog preview" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">
            {isNewPost ? 'Create Post' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogEditor; 