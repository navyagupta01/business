import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - TechCorp</title>
        <meta name="description" content="Get in touch with TechCorp for barcode and RFID solutions. Contact our expert team for consultation and support." />
        <meta name="keywords" content="contact techcorp, barcode consultation, RFID support, customer service" />
      </Head>
      <Layout>
        <div style={{ paddingTop: '2rem' }}>
          <ContactForm />
        </div>
      </Layout>
    </>
  );
};

export default ContactPage;
