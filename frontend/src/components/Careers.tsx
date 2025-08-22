import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Define the Position interface
interface Position {
  title: string;
  department: string;
  location: string;
  type: string;
  icon: string;
  color: string;
  accent: string;
}

const Careers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const positions: Position[] = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: '💻',
      color: '#3b82f6',
      accent: '#dbeafe'
    },
    {
      title: 'RFID Hardware Specialist',
      department: 'Hardware',
      location: 'Mumbai',
      type: 'Full-time',
      icon: '📡',
      color: '#10b981',
      accent: '#d1fae5'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      icon: '📊',
      color: '#8b5cf6',
      accent: '#ede9fe'
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Delhi',
      type: 'Full-time',
      icon: '🤝',
      color: '#f59e0b',
      accent: '#fef3c7'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate job cards
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

      // Animate CTA section
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          }
        }
      );

      // Floating animation for icons
      gsap.to('.job-icon', {
        y: -5,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleApplyClick = (position: Position) => {
    // You can implement actual application logic here
    console.log(`Applied for: ${position.title}`);
    // Example: redirect to application form
    // window.location.href = `/apply?position=${encodeURIComponent(position.title)}`;
  };

  return (
    <section id="careers" className="section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '8%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(196, 181, 253, 0.05))',
        borderRadius: '50%',
        filter: 'blur(35px)',
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
              🚀 CAREER OPPORTUNITIES
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
            Join Our Team
          </h2>

          <p style={{
            fontSize: '1.2rem',
            maxWidth: '650px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.6'
          }}>
            Join our team of innovative thinkers and technology enthusiasts.
            Shape the future of barcode and RFID solutions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {positions.map((position, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '24px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${position.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `linear-gradient(45deg, ${position.accent}, transparent)`,
                borderRadius: '0 24px 0 100px',
                opacity: 0.6
              }} />

              {/* Icon and title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 2
              }}>
                <div
                  className="job-icon"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${position.color}, ${position.color}dd)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: `0 8px 25px ${position.color}30`,
                    flexShrink: 0
                  }}
                >
                  {position.icon}
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  lineHeight: '1.3'
                }}>
                  {position.title}
                </h3>
              </div>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem',
                marginBottom: '2rem'
              }}>
                <span style={{
                  background: `linear-gradient(135deg, ${position.color}, ${position.color}dd)`,
                  color: 'white',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  boxShadow: `0 2px 8px ${position.color}30`
                }}>
                  {position.department}
                </span>
                <span style={{
                  background: 'rgba(71, 85, 105, 0.1)',
                  color: '#475569',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  border: '1px solid rgba(71, 85, 105, 0.2)'
                }}>
                  📍 {position.location}
                </span>
                <span style={{
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: 'white',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  🕒 {position.type}
                </span>
              </div>

              {/* Apply button */}
              <button
                onClick={() => handleApplyClick(position)}
                style={{
                  background: `linear-gradient(135deg, ${position.color}, ${position.color}dd)`,
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 15px ${position.color}40`,
                  position: 'relative',
                  zIndex: 2,
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${position.color}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${position.color}40`;
                }}
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '3rem 2rem',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            💡
          </div>
          <p style={{
            marginBottom: '2rem',
            fontSize: '1.1rem',
            color: '#4b5563',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Don't see a position that fits? We're always looking for talented individuals.
          </p>
          <a
            href="mailto:careers@mindware.com"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #1e293b, #374151)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '15px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(30, 41, 59, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 41, 59, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 41, 59, 0.3)';
            }}
          >
            📧 Send Your Resume
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 768px) {
          .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Careers;
