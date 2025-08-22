import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      background: isScrolled
        ? 'rgba(30, 60, 114, 0.95)'
        : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: isScrolled ? '0.8rem 0' : '1rem 0',
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: isScrolled
        ? '0 4px 20px rgba(30,60,114,0.3)'
        : '0 2px 15px rgba(30,60,114,0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontWeight: '900',
          fontSize: isScrolled ? '1.6rem' : '1.8rem',
          background: 'linear-gradient(135deg, #00D084 0%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #00D084, #34d399)',
            borderRadius: '8px',
            padding: '0.3rem',
            fontSize: '1.2rem'
          }}>
            🏷️
          </span>
          MINDWARE
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          {[
            { href: '#about', label: 'About' },
            { href: '#services', label: 'Services' },
            { href: '/blog', label: 'Blog' },
            { href: '#contact', label: 'Contact' }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                textDecoration: 'none',
                position: 'relative',
                padding: '0.5rem 0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00D084';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
              }}
            >
              {item.label}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '2px',
                background: 'linear-gradient(90deg, #00D084, #34d399)',
                transition: 'width 0.3s ease'
              }} className="nav-underline" />
            </Link>
          ))}

          <Link
            href="/admin"
            style={{
              padding: '0.6rem 1.8rem',
              background: 'linear-gradient(135deg, #fff, #f8fafc)',
              color: '#1e3c72',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
            }}
          >
            🔐 Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block'
            },
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(30, 60, 114, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '0 0 15px 15px',
            boxShadow: '0 8px 25px rgba(30,60,114,0.3)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {[
                { href: '/#about', label: 'About' },
                { href: '/#services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/#contact', label: 'Contact' },
                { href: '/admin', label: '🔐 Admin' }
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    padding: '1rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 208, 132, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    color: 'white',
    padding: '4rem 0 2rem',
    marginTop: '4rem',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Background decoration */}
    <div style={{
      position: 'absolute',
      top: '20%',
      right: '10%',
      width: '200px',
      height: '200px',
      background: 'rgba(0, 208, 132, 0.1)',
      borderRadius: '50%',
      filter: 'blur(60px)'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '30%',
      left: '5%',
      width: '150px',
      height: '150px',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '50%',
      filter: 'blur(50px)'
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
      {/* Main Footer Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Company Info */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #00D084, #34d399)',
              borderRadius: '8px',
              padding: '0.4rem',
              fontSize: '1.5rem'
            }}>
              🏷️
            </span>
            <h3 style={{
              fontSize: '2rem',
              margin: 0,
              background: 'linear-gradient(135deg, #00D084 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '900'
            }}>
              MINDWARE
            </h3>
          </div>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            India's Leading Barcode & RFID Solutions Provider Since 1997.
            Transforming businesses with innovative technology.
          </p>

          {/* Social Media Icons */}
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            {[
              { icon: '📧', href: 'mailto:info@mindware.com', label: 'Email' },
              { icon: '📞', href: 'tel:+911128567890', label: 'Phone' },
              { icon: '🌐', href: '#', label: 'Website' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                title={social.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 208, 132, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            color: '#00D084',
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            Quick Links
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Our Services', href: '#services' },
              { label: 'Products', href: '#products' },
              { label: 'Contact', href: '#contact' },
              { label: 'Careers', href: '#careers' }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  padding: '0.3rem 0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00D084';
                  e.currentTarget.style.paddingLeft = '0.5rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.paddingLeft = '0';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{
            color: '#00D084',
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            Get In Touch
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{
                background: 'rgba(0, 208, 132, 0.2)',
                padding: '0.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem'
              }}>
                📧
              </span>
              <div>
                <p style={{ margin: 0, opacity: 0.8 }}>Email</p>
                <p style={{ margin: 0, fontWeight: '600' }}>info@mindware.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{
                background: 'rgba(59, 130, 246, 0.2)',
                padding: '0.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem'
              }}>
                📞
              </span>
              <div>
                <p style={{ margin: 0, opacity: 0.8 }}>Phone</p>
                <p style={{ margin: 0, fontWeight: '600' }}>+91-11-2856-7890</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{
                background: 'rgba(245, 158, 11, 0.2)',
                padding: '0.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem'
              }}>
                📍
              </span>
              <div>
                <p style={{ margin: 0, opacity: 0.8 }}>Location</p>
                <p style={{ margin: 0, fontWeight: '600' }}>Dwarka, New Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} MINDWARE India. All rights reserved.
        </p>
        <div style={{
          display: 'flex',
          gap: '2rem',
          fontSize: '0.9rem'
        }}>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    <main style={{ paddingTop: '80px' }}>{children}</main>
    <Footer />

    <style jsx>{`
      .nav-underline:hover {
        width: 100% !important;
      }

      .mobile-menu-btn {
        display: none;
      }

      @media (max-width: 768px) {
        .mobile-menu-btn {
          display: block !important;
        }

        .desktop-nav {
          display: none !important;
        }
      }
    `}</style>
  </>
);

export default Layout;
