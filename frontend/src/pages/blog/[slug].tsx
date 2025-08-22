import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { get } from '../../utils/api';
import { BlogPost } from '../../types';

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      try {
        const data = await get(`/blog/${slug}`);
        setPost(data);
      } catch {
        setError('Blog post not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <Layout><p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p></Layout>;
  }

  if (error || !post) {
    return <Layout><p style={{ padding: '2rem', textAlign: 'center' }}>{error || 'Error loading blog post.'}</p></Layout>;
  }

  return (
    <>
      <Head>
        <title>{post.title} - TechCorp Blog</title>
        <meta name="description" content={post.summary} />
      </Head>
      <Layout>
        <article style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
          <h1>{post.title}</h1>
          <div style={{ color: 'var(--dark-gray)', marginBottom: '1rem' }}>
            Published on {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {post.content}
          </div>
        </article>
      </Layout>
    </>
  );
};

export default BlogPostPage;
