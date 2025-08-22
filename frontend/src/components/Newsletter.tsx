import React, { useState } from 'react';
import { post } from '../utils/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await post('/newsletter', { email });
      setStatus('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error: any) {
      setStatus(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section bg-primary" style={{ color: 'white' }}>
      <div className="container text-center">
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Stay Updated</h2>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem',
          color: 'rgba(255,255,255,0.9)'
        }}>
          Subscribe to our newsletter for the latest updates on barcode and RFID technology
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            style={{
              background: 'white',
              color: 'var(--navy-blue)',
              border: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status && (
          <p style={{
            marginTop: '1rem',
            color: status.startsWith('Thank') ? '#90EE90' : '#FFB6C1'
          }}>
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
