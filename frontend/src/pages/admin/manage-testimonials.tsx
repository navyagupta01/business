import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Testimonial } from '../../types';
import { get, post, put, del } from '../../utils/api';
import AdminLayout from '../../components/AdminLayout';

const ManageTestimonials = () => {
  const { token } = useContext(AuthContext);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: '', company: '', message: '', rating: 5 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const fetchTestimonials = async () => {
    try {
      const data = await get('/testimonials');
      setTestimonials(data);
    } catch {
      setError('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? Number(value) : value });
    if (error) setError(null);
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setForm({
      name: testimonial.name,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
    });
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingTestimonial(null);
    setForm({ name: '', company: '', message: '', rating: 5 });
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setError('Not authorized');
      return;
    }
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setDeleteLoading(id);
    try {
      await del(`/testimonials/${id}`);
      fetchTestimonials();
    } catch {
      setError('Failed to delete testimonial');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Not authorized');
      return;
    }
    if (!form.name.trim() || !form.company.trim() || !form.message.trim()) {
      setError('All fields are required');
      return;
    }

    setSubmitLoading(true);
    try {
      if (editingTestimonial) {
        await put(`/testimonials/${editingTestimonial.id}`, form);
      } else {
        await post('/testimonials', form);
      }
      fetchTestimonials();
      handleCancelEdit();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save testimonial');
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#fbbf24' : '#e5e7eb',
          fontSize: interactive ? '1.5rem' : '1.2rem',
          marginRight: '2px',
          filter: i < rating ? 'drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3))' : 'none'
        }}
      >
        ★
      </span>
    ));
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    return colors[index % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    marginBottom: '1rem',
    outline: 'none'
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #00D084',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading testimonials...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1rem'
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
            ⭐ Manage Testimonials
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Collect and showcase customer feedback
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
            {editingTestimonial ? '✏️ Edit Testimonial' : '➕ Add New Testimonial'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter client name"
                  value={form.name}
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
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={form.company}
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
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Testimonial Message *
              </label>
              <textarea
                name="message"
                placeholder="Enter the client's testimonial message..."
                value={form.message}
                onChange={handleInputChange}
                rows={4}
                style={{
                  ...inputStyle,
                  minHeight: '120px',
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
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Rating
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.8rem 1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00D084';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {[5, 4, 3, 2, 1].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate} Star{rate > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <div>{renderStars(form.rating, true)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={submitLoading}
                style={{
                  padding: '1rem 2rem',
                  background: submitLoading
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                    : 'linear-gradient(135deg, #00D084, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: submitLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!submitLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 208, 132, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitLoading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {submitLoading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingTestimonial ? '💾 Update Testimonial' : '⭐ Add Testimonial'}
                  </>
                )}
              </button>

              {editingTestimonial && (
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
                  ❌ Cancel
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

        {/* Testimonials List */}
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
            💬 Client Testimonials ({testimonials.length})
          </h2>

          {testimonials.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>No testimonials yet</h3>
              <p style={{ margin: 0 }}>Add your first testimonial using the form above</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '2rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Quote decoration */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    fontSize: '2rem',
                    color: 'rgba(59, 130, 246, 0.1)',
                    fontFamily: 'serif'
                  }}>
                    "
                  </div>

                  {/* Rating */}
                  <div style={{ marginBottom: '1rem' }}>
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Message */}
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#374151',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic'
                  }}>
                    "{testimonial.message}"
                  </p>

                  {/* Client info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      background: getAvatarColor(index),
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <h4 style={{
                        margin: '0 0 0.2rem 0',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1f2937'
                      }}>
                        {testimonial.name}
                      </h4>
                      <p style={{
                        margin: 0,
                        color: '#6b7280',
                        fontSize: '0.9rem'
                      }}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => handleEditClick(testimonial)}
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
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deleteLoading === testimonial.id}
                      style={{
                        padding: '0.5rem 1rem',
                        background: deleteLoading === testimonial.id
                          ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                          : 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: deleteLoading === testimonial.id ? 'not-allowed' : 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (deleteLoading !== testimonial.id) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (deleteLoading !== testimonial.id) {
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      {deleteLoading === testimonial.id ? '🔄 Deleting...' : '🗑️ Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  );
};

export default ManageTestimonials;
