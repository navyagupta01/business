import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sustainability = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);  // ✅ Fixed: Proper TypeScript typing
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sustainability items
      gsap.fromTo(itemsRef.current,
        { x: -60, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Animate planet with rotation
      gsap.fromTo(planetRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Continuous rotation for planet
      gsap.to(planetRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      });

      // Floating animation for icons
      gsap.to('.sustainability-icon', {
        y: -8,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sustainabilityItems = [
    {
      icon: '♻️',
      title: 'Recyclable Materials',
      description: '100% recyclable packaging and eco-friendly label materials',
      color: '#10b981',
      accent: '#34d399'
    },
    {
      icon: '⚡',
      title: 'Energy Efficient',
      description: 'Low-power RFID solutions and energy-efficient manufacturing',
      color: '#3b82f6',
      accent: '#60a5fa'
    },
    {
      icon: '🌱',
      title: 'Carbon Neutral',
      description: 'Committed to achieving carbon neutrality by 2025',
      color: '#059669',
      accent: '#10d9a3'
    }
  ];

  return (
    <section id="sustainability" className="section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '10%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'pulse 6s ease-in-out infinite reverse'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          minHeight: '600px'
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.5rem 1.5rem',
              borderRadius: '25px',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <span style={{ color: '#065f46', fontWeight: '600', fontSize: '0.9rem' }}>
                🌿 OUR COMMITMENT
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: '900',
              color: '#1e293b',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              background: 'linear-gradient(45deg, #065f46, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Sustainability First
            </h2>

            <p style={{
              fontSize: '1.2rem',
              marginBottom: '3rem',
              color: '#4b5563',
              lineHeight: '1.7'
            }}>
              We believe in responsible innovation. Our products and processes are designed
              with sustainability as a key principle, contributing to a greener future.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {sustainabilityItems.map((item, index) => (
                <div
                  key={index}
                  ref={el => { itemsRef.current[index] = el; }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${item.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.1)';
                  }}
                >
                  <div
                    className="sustainability-icon"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: `linear-gradient(135deg, ${item.color}, ${item.accent})`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: `0 8px 25px ${item.color}30`,
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      color: '#6b7280',
                      lineHeight: '1.5',
                      fontSize: '1rem'
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div style={{
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Orbiting elements */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              border: '2px dashed rgba(16, 185, 129, 0.2)',
              borderRadius: '50%',
              animation: 'rotate 30s linear infinite'
            }}>
              {/* Small orbiting icons */}
              {['🌿', '💧', '🔋', '☀️'].map((emoji, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transformOrigin: '0 190px',
                    animation: `orbit 20s linear infinite ${i * 5}s`,
                    fontSize: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            {/* Main planet */}
            <div
              ref={planetRef}
              style={{
                width: '320px',
                height: '320px',
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3), inset 0 10px 30px rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '50%',
                height: '50%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)',
                borderRadius: '50%',
                filter: 'blur(20px)'
              }} />

              <span style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                zIndex: 2
              }}>
                🌍
              </span>
            </div>

            {/* Progress indicators */}
            <div style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem'
            }}>
              {[
                { label: 'Carbon Reduction', percentage: 75, color: '#10b981' },
                { label: 'Renewable Energy', percentage: 85, color: '#3b82f6' },
                { label: 'Waste Reduction', percentage: 90, color: '#8b5cf6' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `conic-gradient(${stat.color} ${stat.percentage * 3.6}deg, #e5e7eb 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      background: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: stat.color
                    }}>
                      {stat.percentage}%
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbit {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }

        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Sustainability;

