import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Service } from '../../types';
import { get, post, put, del } from '../../utils/api';
import AdminLayout from '../../components/AdminLayout';

const ManageServices = () => {
  const { token } = useContext(AuthContext);
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const fetchServices = async () => {
    try {
      const data = await get('/services');
      setServices(data);
    } catch {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setForm({ title: service.title, description: service.description });
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setForm({ title: '', description: '' });
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setError('Not authorized');
      return;
    }
    if (!confirm('Are you sure you want to delete this service?')) return;

    setDeleteLoading(id);
    try {
      await del(`/services/${id}`);
      fetchServices();
    } catch {
      setError('Failed to delete service');
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
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and Description are required');
      return;
    }

    setSubmitLoading(true);
    try {
      if (editingService) {
        await put(`/services/${editingService.id}`, form);
      } else {
        await post('/services', form);
      }
      setForm({ title: '', description: '' });
      setEditingService(null);
      fetchServices();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setSubmitLoading(false);
    }
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
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading services...</p>
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
            🛠️ Manage Services
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Add, edit, and organize your service offerings
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
            {editingService ? '✏️ Edit Service' : '➕ Add New Service'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter service title"
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
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Service Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe what this service offers..."
                value={form.description}
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
                    {editingService ? '💾 Update Service' : '➕ Add Service'}
                  </>
                )}
              </button>

              {editingService && (
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

        {/* Services List */}
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
            🔧 Active Services ({services.length})
          </h2>

          {services.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>No services yet</h3>
              <p style={{ margin: 0 }}>Add your first service using the form above</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {services.map((service, index) => {
                const colors = [
                  { primary: '#3b82f6', secondary: '#60a5fa', accent: '#dbeafe' },
                  { primary: '#10b981', secondary: '#34d399', accent: '#d1fae5' },
                  { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ede9fe' },
                  { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fef3c7' },
                  { primary: '#ef4444', secondary: '#f87171', accent: '#fee2e2' },
                  { primary: '#06b6d4', secondary: '#22d3ee', accent: '#cffafe' }
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={service.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = `0 12px 30px ${color.primary}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Color accent */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${color.primary}, ${color.secondary})`,
                      borderRadius: '16px 16px 0 0'
                    }} />

                    <h3 style={{
                      margin: '0 0 1rem 0',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {service.title}
                    </h3>

                    <p style={{
                      margin: '0 0 1.5rem 0',
                      color: '#6b7280',
                      lineHeight: '1.6'
                    }}>
                      {service.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleEditClick(service)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
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
                        onClick={() => handleDelete(service.id)}
                        disabled={deleteLoading === service.id}
                        style={{
                          padding: '0.5rem 1rem',
                          background: deleteLoading === service.id
                            ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                            : 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: deleteLoading === service.id ? 'not-allowed' : 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (deleteLoading !== service.id) {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleteLoading !== service.id) {
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        {deleteLoading === service.id ? '🔄 Deleting...' : '🗑️ Delete'}
                      </button>
                    </div>
                  </div>
                );
              })}
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

export default ManageServices;
