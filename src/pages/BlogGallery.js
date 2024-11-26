import React from 'react';
import './BlogGallery.css';
import prayerHands from '../assets/prayerhands.jpg';
import { Link } from 'react-router-dom';

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "First Blog Post",
      date: "March 20, 2024",
      summary: "This is a summary of the first blog post...",
      image: prayerHands,
      category: "Technology"
    },
    {
      id: 2,
      title: "Second Blog Post",
      date: "March 18, 2024",
      summary: "This is a summary of the second blog post...",
      image: prayerHands,
      category: "Design"
    },
    {
      id: 3,
      title: "Third Blog Post",
      date: "March 15, 2024",
      summary: "This is a summary of the third blog post...",
      image: prayerHands,
      category: "Development"
    }
  ];

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <span className="blog-category">{post.category}</span>
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p className="blog-summary">{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog; 