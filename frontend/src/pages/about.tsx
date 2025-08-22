import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us - TechCorp</title>
        <meta name="description" content="Learn about TechCorp's mission to revolutionize barcode and RFID solutions with innovative technology and sustainable practices." />
        <meta name="keywords" content="about techcorp, company mission, barcode solutions, RFID technology, sustainability" />
      </Head>
      <Layout>
        <div style={{ paddingTop: '2rem' }}>
          <About />
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
