import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { post } from '../utils/api';

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form and info cards
      gsap.fromTo([formRef.current, infoRef.current],
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Floating animation for contact icons
      gsap.to('.contact-icon', {
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

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await post('/contact', form);
      setSubmitStatus('Thank you for contacting us! We will get back to you shortly.');
      setForm(initialState);
    } catch (error: any) {
      setSubmitStatus(error.message || 'Failed to submit your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#1f2937',
    backdropFilter: 'blur(10px)'
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'info@mindware.com',
      color: '#3b82f6',
      href: 'mailto:info@mindware.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91-11-2856-7890',
      color: '#10b981',
      href: 'tel:+911128567890'
    },
    {
      icon: '📍',
      title: 'Address',
      value: 'Dwarka, Delhi, India',
      color: '#f59e0b',
      href: 'https://maps.google.com/?q=Dwarka,Delhi,India'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      value: 'Mon-Fri: 9AM-6PM\nSat: 10AM-4PM',
      color: '#8b5cf6',
      href: null
    }
  ];

  return (
    <section id="contact" className="section" ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
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
              💬 GET IN TOUCH
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
            Get In Touch
          </h2>

          <p style={{
            fontSize: '1.2rem',
            maxWidth: '650px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.6'
          }}>
            Ready to revolutionize your supply chain? Contact us today for a consultation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div
            ref={formRef}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '3rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '1rem'
                  }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? '#ef4444' : form.name ? '#10b981' : '#e2e8f0'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? '#ef4444' : form.name ? '#10b981' : '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.name && (
                  <div style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    fontWeight: '500'
                  }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '1rem'
                  }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? '#ef4444' : form.email ? '#10b981' : '#e2e8f0'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#ef4444' : form.email ? '#10b981' : '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && (
                  <div style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    fontWeight: '500'
                  }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '1rem'
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '120px',
                    borderColor: errors.message ? '#ef4444' : form.message ? '#10b981' : '#e2e8f0'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.message ? '#ef4444' : form.message ? '#10b981' : '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.message && (
                  <div style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    fontWeight: '500'
                  }}>
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: isSubmitting
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                    : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff30',
                      borderTop: '2px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span>📨</span>
                  </>
                )}
              </button>
            </form>

            {submitStatus && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '500',
                background: submitStatus.startsWith('Thank')
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
                color: submitStatus.startsWith('Thank') ? '#065f46' : '#991b1b',
                border: `1px solid ${submitStatus.startsWith('Thank') ? '#10b981' : '#ef4444'}20`
              }}>
                {submitStatus.startsWith('Thank') ? '✅' : '❌'} {submitStatus}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div
            ref={infoRef}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '3rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    cursor: info.href ? 'pointer' : 'default'
                  }}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.background = `${info.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                  }}
                >
                  <div
                    className="contact-icon"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: `linear-gradient(135deg, ${info.color}, ${info.color}dd)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: `0 4px 15px ${info.color}30`,
                      flexShrink: 0
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {info.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      color: '#6b7280',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line'
                    }}>
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
