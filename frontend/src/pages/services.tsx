import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <>
      <Head>
        <title>Our Services - TechCorp</title>
        <meta name="description" content="Explore TechCorp's comprehensive range of barcode labels, RFID solutions, and printing services for your business needs." />
        <meta name="keywords" content="barcode labels, RFID solutions, printing services, custom labels, tracking systems" />
      </Head>
      <Layout>
        <div style={{ paddingTop: '2rem' }}>
          <Services />
        </div>
      </Layout>
    </>
  );
};

export default ServicesPage;
