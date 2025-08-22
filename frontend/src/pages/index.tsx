import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ProductGallery from '../components/ProductGallery';
import Testimonials from '../components/Testimonials';
import Sustainability from '../components/Sustainability';
import Careers from '../components/Careers';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const router = useRouter();

  // Handle scrolling to hash on page load/route change
  useEffect(() => {
    const handleHashScroll = () => {
      if (router.asPath.includes('#')) {
        const hash = router.asPath.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          // Small timeout to ensure page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 200);
        }
      }
    };

    handleHashScroll();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Mindware - Revolutionizing Barcode & RFID Solutions</title>
        <meta name="description" content="Leading provider of innovative barcode labels, RFID systems, and sustainable printing solutions to optimize your supply chain." />
        <meta name="keywords" content="barcode, RFID, printing services, sustainability, supply chain, labels, tracking, mindware" />
        <meta name="author" content="Mindware" />
        <meta property="og:title" content="Mindware - Revolutionizing Barcode & RFID Solutions" />
        <meta property="og:description" content="Leading provider of innovative barcode labels, RFID systems, and sustainable printing solutions." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="products">
          <ProductGallery />
        </section>
        <Testimonials />
        <section id="sustainability">
          <Sustainability />
        </section>
        <section id="careers">
          <Careers />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
        <Newsletter />
      </Layout>
    </>
  );
};

export default Home;
