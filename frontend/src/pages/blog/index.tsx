import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Blog from '../../components/Blog';

const BlogPage = () => {
  return (
    <>
      <Head>
        <title>Blog - TechCorp</title>
        <meta name="description" content="Stay updated with the latest trends and insights in barcode and RFID technology." />
      </Head>
      <Layout>
        <Blog />
      </Layout>
    </>
  );
};

export default BlogPage;
