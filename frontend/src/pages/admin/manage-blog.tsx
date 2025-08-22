import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BlogPost } from '../../types';
import { get, post, put, del } from '../../utils/api';
import AdminLayout from '../../components/AdminLayout';

const ManageBlog = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: '', summary: '', content: '', slug: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await get('/blog');
      setPosts(data);
    } catch {
      setError('Failed to fetch blog posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto-generate slug from title
    if (name === 'title' && !editingPost) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setForm(prev => ({ ...prev, slug }));
    }

    if (error) setError(null);
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      summary: post.summary,
      content: post.content,
      slug: post.slug,
    });
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setForm({ title: '', summary: '', content: '', slug: '' });
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setError('Not authorized');
      return;
    }
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await del(`/blog/${id}`);
      fetchPosts();
    } catch {
      setError('Failed to delete blog post');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Not authorized');
      return;
    }
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim() || !form.slug.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      if (editingPost) {
        await put(`/blog/${editingPost.id}`, form);
      } else {
        await post('/blog', form);
      }
      fetchPosts();
      handleCancelEdit();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    marginBottom: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  return (
    <AdminLayout>
      <div style={{
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            margin: '0 0 0.5rem 0'
          }}>
            📝 Manage Blog Posts
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Create and manage your blog content
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            {editingPost ? '✏️ Edit Post' : '➕ Add New Post'}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Blog Post Title"
              value={form.title}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#00D084';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <input
              type="text"
              name="slug"
              placeholder="url-friendly-slug"
              value={form.slug}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#00D084';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <input
              type="text"
              name="summary"
              placeholder="Brief summary of the post"
              value={form.summary}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#00D084';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <textarea
              name="content"
              placeholder="Write your blog post content here..."
              value={form.content}
              onChange={handleInputChange}
              rows={6}
              style={{
                ...inputStyle,
                minHeight: '150px',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00D084';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '1rem 2rem',
                  background: loading
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                    : 'linear-gradient(135deg, #00D084, #059669)',
                  border: 'none',
                  color: 'white',
                  fontWeight: '700',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 208, 132, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'Saving...' : (editingPost ? 'Update' : 'Add')} Post
              </button>

              {editingPost && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '1rem 2rem',
                    background: 'rgba(107, 114, 128, 0.1)',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.1)';
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Posts List */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            📚 Published Posts ({posts.length})
          </h2>

          {posts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <p>No blog posts yet. Create your first post above!</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {posts.map(post => (
                <li
                  key={post.id}
                  style={{
                    marginBottom: '1rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    margin: '0 0 1rem 0',
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    {post.summary}
                  </p>
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#9ca3af',
                      background: '#f3f4f6',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px'
                    }}>
                      /{post.slug}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEditClick(post)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageBlog;
