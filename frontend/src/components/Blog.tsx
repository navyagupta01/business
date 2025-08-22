import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { get } from '../utils/api';
import { BlogPost } from '../types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await get('/blog');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container text-center">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Latest Blog Posts</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Stay updated with the latest trends in barcode and RFID technology
          </p>
        </div>
        <div className="grid grid-3">
          {posts.map((post) => (
            <div key={post.id} className="card hover-lift">
              <h3>{post.title}</h3>
              <p style={{ marginBottom: '1rem' }}>{post.summary}</p>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--dark-gray)',
                marginBottom: '1rem'
              }}>
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <Link href={`/blog/${post.slug}`} className="btn btn-primary">
                Read More
              </Link>
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center">
            <p>No blog posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
