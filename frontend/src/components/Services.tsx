import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { get } from '../utils/api';
import { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await get('/services');
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading && services.length > 0) {
      // Animate cards on scroll
      gsap.fromTo(cardsRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, [loading, services]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x * 0.08,
      rotationX: -y * 0.08,
      transformPerspective: 1000,
      transformOrigin: 'center',
      ease: 'power2.out',
      duration: 0.3,
    });

    // Add glow effect
    gsap.to(card.querySelector('.card-glow'), {
      opacity: 0.6,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power2.out',
      duration: 0.6
    });

    // Remove glow effect
    gsap.to(card.querySelector('.card-glow'), {
      opacity: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  // Service icons mapping (you can customize these)
  const getServiceIcon = (index: number) => {
    const icons = ['🏷️', '📡', '🖨️', '📱', '⚡', '🔧', '💻', '📊', '🚀'];
    return icons[index % icons.length];
  };

  const getServiceColor = (index: number) => {
    const colors = [
      { primary: '#3b82f6', secondary: '#60a5fa', accent: '#dbeafe' },
      { primary: '#10b981', secondary: '#34d399', accent: '#d1fae5' },
      { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ede9fe' },
      { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fef3c7' },
      { primary: '#ef4444', secondary: '#f87171', accent: '#fee2e2' },
      { primary: '#06b6d4', secondary: '#22d3ee', accent: '#cffafe' }
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section id="services" className="section" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading our services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '25px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <span style={{ color: '#1e40af', fontWeight: '600', fontSize: '0.9rem' }}>
              🛠️ WHAT WE OFFER
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: '900',
            color: '#1e293b',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #1e293b, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Services
          </h2>

          <p style={{
            fontSize: '1.2rem',
            maxWidth: '650px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.6'
          }}>
            Comprehensive solutions for all your barcode and RFID needs
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '1rem 0'
        }}>
          {services.map((service, idx) => {
            const colors = getServiceColor(idx);
            const icon = getServiceIcon(idx);

            return (
              <div
                key={service.id}
                ref={el => (cardsRef.current[idx] = el)}
                onMouseMove={e => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Glow effect */}
                <div
                  className="card-glow"
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                    borderRadius: '26px',
                    opacity: 0,
                    zIndex: -1,
                    filter: 'blur(8px)'
                  }}
                />

                {/* Icon circle */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '2rem',
                  boxShadow: `0 8px 25px ${colors.primary}30`,
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${idx * 0.2}s`
                }}>
                  {icon}
                </div>

                {/* Content */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>

                {/* Decorative corner */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '30px',
                  height: '30px',
                  background: `linear-gradient(45deg, ${colors.accent}, transparent)`,
                  borderRadius: '50%',
                  opacity: 0.6
                }} />

                {/* Bottom accent line */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  borderRadius: '0 0 24px 24px'
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Services;
