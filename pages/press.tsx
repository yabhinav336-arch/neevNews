import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const PressPage = () => {
  return (
    <Layout title="Press Center - NeevNews" description="NeevNews press center. Launching September 8, 2025." keywords="press, neevnews">
      <Head><meta name="robots" content="index, follow" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950 py-16">
        <div className="container-custom"><div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Press Center</h1>
          <p className="text-lg">NeevNews - Launching September 8, 2025. Press materials coming soon.</p>
          <p className="mt-4">Media inquiries: <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a></p>
        </div></div>
      </div>
    </Layout>
  );
};
export default PressPage;
