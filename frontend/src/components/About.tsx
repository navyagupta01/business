import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.fromTo('.about-hero',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
          }
        }
      );

      // Staggered card animations
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
          }
        }
      );

      // Counter animations
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const finalValue = stat.getAttribute('data-target');
          gsap.fromTo(stat,
            { textContent: 0 },
            {
              textContent: finalValue,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%',
              },
              onUpdate: function() {
                stat.textContent = Math.ceil(stat.textContent);
              }
            }
          );
        }
      });

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Pioneering cutting-edge technology solutions that transform how businesses operate and scale.',
      color: '#3b82f6',
      accent: '#60a5fa'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Eco-conscious practices and green technology that build a better tomorrow for everyone.',
      color: '#059669',
      accent: '#34d399'
    },
    {
      icon: '⚡',
      title: 'Excellence',
      description: 'Uncompromising quality and performance that exceeds expectations in every project.',
      color: '#8b5cf6',
      accent: '#a78bfa'
    }
  ];

  const stats = [
    { number: 500, label: 'Happy Clients', suffix: '+' },
    { number: 15, label: 'Years Experience', suffix: '+' },
    { number: 1000, label: 'Projects Completed', suffix: '+' },
    { number: 24, label: 'Support Hours', suffix: '/7' }
  ];

  return (
    <section id="about" className="about-section section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0' // Reduced from default section padding
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80px',
        height: '80px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '120px',
        height: '120px',
        background: 'rgba(139, 92, 246, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="about-hero text-center" style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '0.4rem 1.2rem',
            borderRadius: '20px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <span style={{ color: '#1e40af', fontWeight: '600', fontSize: '0.85rem' }}>
              🎯 WHO WE ARE
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: '900',
            color: '#1e293b',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            lineHeight: '1.2'
          }}>
            Meet <span style={{
              background: 'linear-gradient(45deg, #3b82f6, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Mindware</span>
            <br />The Future of Business
          </h2>

          <p style={{
            fontSize: '1.1rem',
            maxWidth: '750px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.6',
            textShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            We're not just another tech company – we're <strong style={{ color: '#3b82f6' }}>innovation architects</strong>
            who transform businesses with revolutionary barcode, RFID, and automation solutions.
            From startups to enterprises, we turn complex challenges into simple, elegant solutions.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.7)',
              padding: '1.5rem',
              borderRadius: '16px',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.1)';
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#3b82f6',
                marginBottom: '0.3rem',
                textShadow: '0 2px 10px rgba(59, 130, 246, 0.3)'
              }}>
                <span
                  ref={el => statsRef.current[index] = el}
                  data-target={stat.number}
                >
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <div style={{
                color: '#475569',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="values-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {values.map((value, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              style={{
                background: 'rgba(255,255,255,0.8)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.01)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${value.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.1)';
              }}
            >
              {/* Gradient overlay on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${value.color}05, ${value.accent}05)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} className="card-overlay" />

              <div className="floating-icon" style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                background: `linear-gradient(135deg, ${value.color}, ${value.accent})`,
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: `0 8px 25px ${value.color}30`,
                position: 'relative',
                zIndex: 2
              }}>
                <span style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}>
                  {value.icon}
                </span>
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '0.8rem',
                color: '#1e293b',
                position: 'relative',
                zIndex: 2
              }}>
                {value.title}
              </h3>

              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                fontSize: '1rem',
                position: 'relative',
                zIndex: 2
              }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .values-grid > div:hover .card-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default About;
