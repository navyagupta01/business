import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const quickActions = [
    { title: 'Manage Services', description: 'Add, edit or remove services', icon: '🔧', href: '/admin/manage-services' },
    { title: 'Manage Testimonials', description: 'Manage customer reviews', icon: '💬', href: '/admin/manage-testimonials' },
    { title: 'Manage Blog', description: 'Create and edit blog posts', icon: '✍️', href: '/admin/manage-blog' },
    { title: 'Manage Projects', description: 'View and organize projects', icon: '📋', href: '/admin/projects' }
  ];

  return (
    <AdminLayout>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Welcome Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '3rem',
          color: 'white',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0, 208, 132, 0.2)',
              padding: '0.5rem 1.5rem',
              borderRadius: '25px',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              🎯 ADMIN PANEL
            </div>

            <h1 style={{
              fontWeight: '900',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Welcome back, <span style={{ color: '#00D084' }}>Admin</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'white',
              marginBottom: '2rem',
              maxWidth: '600px'
            }}>
              Manage your <strong>MINDWARE</strong> platform efficiently. Use the sidebar to navigate
              through different sections and keep your content up to date.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',  // ✅ Fixed: Single border property
                  fontWeight: '700',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🚪 Logout
              </button>

              <button
                onClick={() => window.open('/', '_blank')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 208, 132, 0.3)',  // ✅ Fixed: Single border property
                  fontWeight: '700',
                  background: 'rgba(0, 208, 132, 0.2)',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 208, 132, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 208, 132, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🌐 View Website
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Quick Actions
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => router.push(action.href)}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {action.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📈 System Status
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem',
                fontSize: '1.5rem'
              }}>
                ✅
              </div>
              <div style={{ fontWeight: '600', color: '#10b981' }}>All Systems Operational</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem',
                fontSize: '1.5rem'
              }}>
                🔄
              </div>
              <div style={{ fontWeight: '600', color: '#3b82f6' }}>Last Updated: Today</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
