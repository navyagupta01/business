// Hero.tsx - MINDWARE Specific Animation
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useRouter } from 'next/router';

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Add this line for clarity

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Create realistic barcode labels (MINDWARE's main product)
    const barcodeLabels = [];

    for (let i = 0; i < 8; i++) {
      // Create label base (white background)
      const labelGeometry = new THREE.BoxGeometry(3, 1.5, 0.02);
      const labelMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);

      // Position labels in a flowing pattern
      label.position.set(
        (Math.sin(i * 0.8) * 6),
        Math.cos(i * 0.6) * 3,
        (i - 4) * 1.2
      );
      label.rotation.set(
        Math.random() * 0.2,
        Math.random() * Math.PI,
        Math.random() * 0.1
      );

      barcodeLabels.push(label);
      scene.add(label);

      // Add actual barcode pattern to each label
      const barcodeGroup = new THREE.Group();
      for (let j = 0; j < 15; j++) {
        const barWidth = Math.random() > 0.5 ? 0.08 : 0.04; // Varying bar widths
        const barGeometry = new THREE.BoxGeometry(barWidth, 0.8, 0.005);
        const barMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const bar = new THREE.Mesh(barGeometry, barMaterial);

        bar.position.set((j - 7) * 0.15, 0.1, 0.015);
        barcodeGroup.add(bar);
      }

      // Add barcode numbers below
      const textGeometry = new THREE.BoxGeometry(2, 0.1, 0.005);
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const textBar = new THREE.Mesh(textGeometry, textMaterial);
      textBar.position.set(0, -0.5, 0.015);
      barcodeGroup.add(textBar);

      label.add(barcodeGroup);

      // Add MINDWARE logo area (colored rectangle)
      const logoGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.005);
      const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d084, // MINDWARE green
        transparent: true,
        opacity: 0.8
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(-1, 0.5, 0.015);
      label.add(logo);
    }

    // Create RFID tags (another MINDWARE product)
    const rfidTags = [];
    for (let i = 0; i < 5; i++) {
      const tagGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.03);
      const tagMaterial = new THREE.MeshPhongMaterial({
        color: 0x1e3c72, // MINDWARE blue
        metalness: 0.3,
        transparent: true,
        opacity: 0.9
      });
      const tag = new THREE.Mesh(tagGeometry, tagMaterial);

      tag.position.set(
        Math.sin(i * 1.2 + Math.PI) * 5,
        Math.cos(i * 0.8 + Math.PI) * 2,
        (i - 2) * 0.8
      );
      tag.rotation.set(
        Math.random() * 0.3,
        Math.random() * Math.PI,
        Math.random() * 0.2
      );

      rfidTags.push(tag);
      scene.add(tag);

      // Add RFID antenna pattern
      const antennaGeometry = new THREE.TorusGeometry(0.25, 0.02, 8, 16);
      const antennaMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.2
      });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(0, 0, 0.02);
      tag.add(antenna);

      // Add central chip
      const chipGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.01);
      const chipMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        metalness: 0.8
      });
      const chip = new THREE.Mesh(chipGeometry, chipMaterial);
      chip.position.set(0, 0, 0.025);
      tag.add(chip);
    }

    // Create printer visualization (MINDWARE's equipment)
    const printerGeometry = new THREE.BoxGeometry(2, 1, 1.5);
    const printerMaterial = new THREE.MeshPhongMaterial({ color: 0x404040 });
    const printer = new THREE.Mesh(printerGeometry, printerMaterial);
    printer.position.set(-8, -2, 0);
    scene.add(printer);

    // Add printer details
    const screenGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.02);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      emissive: 0x003300,
      emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.3, 0.76);
    printer.add(screen);

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00d084, 1.5, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    camera.position.set(5, 3, 8);
    camera.lookAt(0, 0, 0);

    // Animation loop - realistic floating motion
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate barcode labels
      barcodeLabels.forEach((label, index) => {
        label.rotation.y += 0.01;
        label.position.y += Math.sin(elapsedTime * 0.5 + index * 0.3) * 0.01;
        label.position.x += Math.cos(elapsedTime * 0.3 + index * 0.5) * 0.005;
      });

      // Animate RFID tags
      rfidTags.forEach((tag, index) => {
        tag.rotation.y -= 0.008;
        tag.position.y += Math.cos(elapsedTime * 0.6 + index * 0.4) * 0.008;

        // Pulsing antenna
        const antenna = tag.children[0];
        if (antenna && antenna.material) {
          (antenna.material as THREE.MeshBasicMaterial).emissiveIntensity = 0.2 + Math.sin(elapsedTime * 2 + index) * 0.3;
        }
      });

      // Rotate printer slightly
      printer.rotation.y = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // GSAP animations
    const tl = gsap.timeline({ delay: 1 });
    tl.fromTo(heroTextRef.current?.querySelector('h1'),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(heroTextRef.current?.querySelector('p'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // Cleanup
    const onResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight; // Fixed: was clientWidth twice
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <section style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid #00D084',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}
          />
          <p>Loading MINDWARE...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, rgba(30,60,114,0.8) 0%, rgba(42,82,152,0.6) 100%)`,
        pointerEvents: 'none'
      }} />

      <div
        ref={heroTextRef}
        style={{
          position: 'absolute',
          top: '20%',
          left: '8%',
          color: 'white',
          maxWidth: '650px',
          zIndex: 10
        }}
      >
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          marginBottom: '2rem',
          fontWeight: '900',
          lineHeight: '1.1'
        }}>
          <span style={{
            display: 'block',
            fontSize: '0.6em',
            color: '#00D084',
            fontWeight: '700'
          }}>
            MINDWARE INDIA
          </span>
          Labels, Tags & RFID Solutions
        </h1>

        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          marginBottom: '3rem',
          lineHeight: '1.6',
          color: 'rgba(255,255,255,0.9)'
        }}>
          <strong>26+ years</strong> of manufacturing excellence in barcode labels,
          die-cut tags, and RFID solutions. From Zebra printers to custom labeling systems -
          <span style={{ color: '#00D084' }}> we power India's supply chain</span>.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => router.push('/#products')}
            style={{
              fontSize: '1.2rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #00D084 0%, #1e3c72 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,208,132,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,208,132,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,208,132,0.4)';
            }}
          >
            View Products
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
