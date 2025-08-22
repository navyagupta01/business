'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/manage-services', label: 'Manage Services' },
  { href: '/admin/manage-blog', label: 'Manage Blogs' },
  { href: '/admin/projects', label: 'Manage Projects' },
  { href: '/admin/manage-testimonials', label: 'Manage Testimonials' }
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #00D084, #34d399)',
            borderRadius: '12px',
            padding: '0.6rem',
            fontSize: '1.5rem'
          }}>
            🏷️
          </div>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '900',
            margin: 0,
            lineHeight: '1.2'
          }}>
            MINDWARE<br />
            <span style={{ fontSize: '1rem', opacity: 0.9 }}>Admin</span>
          </h2>
        </div>

        <nav>
          <ul>
            {links.map(link => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive ? 'active' : ''}
                    style={{
                      color: isActive ? '#1e3c72' : 'inherit', // ✅ Fixed: single color property
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1rem',
                      letterSpacing: '0.2px',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      background: isActive ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                      transform: isActive ? 'translateX(5px)' : 'translateX(0)',
                      boxShadow: isActive ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateX(3px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '2rem'
        }}>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/admin/login';
            }}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="main-content">{children}</main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .sidebar {
          width: 260px;
          background: linear-gradient(160deg, #1e3c72 0%, #2a5298 100%);
          color: #fff;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: start;
          box-shadow: 3px 0 15px rgba(0,0,0,0.1);
          position: relative;
        }
        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 208, 132, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        nav ul {
          list-style: none;
          padding: 0;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        nav li {
          margin-bottom: 0.5rem;
        }
        .main-content {
          flex: 1;
          padding: 2rem 3rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }
        @media (max-width: 800px) {
          .admin-layout {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            padding: 1rem;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .main-content {
            padding: 1rem;
          }
          nav ul {
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }
          nav li {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
