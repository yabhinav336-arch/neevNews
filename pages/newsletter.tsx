import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const NewsletterPage = () => {
  return (
    <Layout title="Newsletter - NeevNews" description="Subscribe to NeevNews newsletter. Launching September 8, 2025." keywords="newsletter, neevnews">
      <Head><meta name="robots" content="index, follow" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950 py-16">
        <div className="container-custom"><div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Newsletter</h1>
          <p className="text-lg">Subscribe to our newsletter. Launching September 8, 2025.</p>
          <p className="mt-4">Stay tuned!</p>
        </div></div>
      </div>
    </Layout>
  );
};
export default NewsletterPage;
