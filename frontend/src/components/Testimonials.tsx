import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { get } from '../utils/api';
import { Testimonial } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await get('/testimonials');
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!loading && testimonials.length > 0) {
      // Animate testimonial cards on scroll
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Add floating animation to quote icons
      gsap.to('.quote-icon', {
        y: -5,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    }
  }, [loading, testimonials]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#fbbf24' : '#e5e7eb',
          fontSize: '1.2rem',
          marginRight: '2px',
          filter: 'drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3))',
          animation: i < rating ? `starGlow 2s ease-in-out infinite ${i * 0.1}s` : 'none'
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

  if (loading) {
    return (
      <section className="section" style={{
        background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
                }}
              />
            ))}
          </div>
          <p style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'center' }}>
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(196, 181, 253, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite reverse'
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
              💬 CLIENT FEEDBACK
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
            What Our Clients Say
          </h2>

          <p style={{
            fontSize: '1.2rem',
            maxWidth: '650px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.6'
          }}>
            Discover how we've helped businesses transform their operations
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              💭
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              margin: 0
            }}>
              No testimonials available yet.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            padding: '1rem 0'
          }}>
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                ref={el => (cardsRef.current[idx] = el)}
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
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Quote icon */}
                <div
                  className="quote-icon"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '3rem',
                    color: 'rgba(59, 130, 246, 0.1)',
                    fontFamily: 'serif'
                  }}
                >
                  "
                </div>

                {/* Stars */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex' }}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <span style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginLeft: '0.5rem'
                  }}>
                    ({testimonial.rating}/5)
                  </span>
                </div>

                {/* Message */}
                <p style={{
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  position: 'relative',
                  zIndex: 2
                }}>
                  "{testimonial.message}"
                </p>

                {/* Client info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: getAvatarColor(idx),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    flexShrink: 0
                  }}>
                    {getInitials(testimonial.name)}
                  </div>

                  {/* Name and company */}
                  <div>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.2rem'
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

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: getAvatarColor(idx),
                  borderRadius: '0 0 24px 24px'
                }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 40% {
            transform: scale(1.0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes starGlow {
          0%, 100% {
            filter: drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3));
          }
          50% {
            filter: drop-shadow(0 2px 8px rgba(251, 191, 36, 0.6));
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
