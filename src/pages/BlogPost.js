import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';
import prayerHands from '../assets/prayerhands.jpg';

function BlogPost() {
  const { id } = useParams();
  
  const post = {
    id: 1,
    title: "First Blog Post",
    date: "March 20, 2024",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Third paragraph with more content about this topic. Adding details and information that would be relevant to the blog post."
    ],
    image: prayerHands
  };

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-button">
        <span className="arrow">←</span> Back to Blogs
      </Link>
      
      <h1>{post.title}</h1>
      <p className="post-date">{post.date}</p>
      
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      
      <div className="post-content">
        {post.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default BlogPost; 