import React from 'react';

const ProductGallery = () => {
  const productData = [
    {
      icon: '🖨️',
      title: 'Barcode Printers',
      description: 'Professional thermal and inkjet barcode printers for all applications',
      color: '#4a90e2'
    },
    {
      icon: '🏷️',
      title: 'Premium Labels',
      description: 'High-quality, durable barcode labels for industrial applications',
      color: '#32cd32'
    },
    {
      icon: '📡',
      title: 'RFID Solutions',
      description: 'Advanced RFID technology for seamless tracking and identification',
      color: '#ff6347'
    },
    {
      icon: '📱',
      title: 'Mobile Scanners',
      description: 'Portable scanning devices for inventory management on-the-go',
      color: '#ffa500'
    },
    {
      icon: '💻',
      title: 'Software Solutions',
      description: 'Complete software packages for label design and inventory tracking',
      color: '#7b68ee'
    },
    {
      icon: '🎞️',
      title: 'Ribbon & Supplies',
      description: 'Quality ribbons and printing supplies for optimal performance',
      color: '#20b2aa'
    }
  ];

  return (
    <section className="section" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2c3e50', marginBottom: '1rem' }}>
            Our Product Range
          </h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#5a6c7d' }}>
            Explore our comprehensive range of innovative barcode, RFID, and automation solutions
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {productData.map((product, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '2.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                // Add animated background
                e.currentTarget.style.background = `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, ${product.color}15 100%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              }}
            >
              {/* Animated background effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `linear-gradient(45deg, transparent, ${product.color}10, transparent)`,
                transform: 'rotate(-45deg)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none'
              }} className="bg-effect" />

              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                background: `linear-gradient(135deg, ${product.color}, ${product.color}dd)`,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: `0 10px 25px ${product.color}40`,
                transition: 'all 0.4s ease',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: `${index * 0.2}s`
              }}>
                <span style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  transition: 'transform 0.3s ease'
                }}>
                  {product.icon}
                </span>
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#2c3e50',
                transition: 'color 0.3s ease'
              }}>
                {product.title}
              </h3>

              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {product.description}
              </p>

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${product.color}20, ${product.color}40)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} className="corner-dot" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .product-card:hover .bg-effect {
          opacity: 1;
        }

        .product-card:hover .corner-dot {
          opacity: 1;
        }

        .product-card:hover span {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </section>
  );
};

export default ProductGallery;
