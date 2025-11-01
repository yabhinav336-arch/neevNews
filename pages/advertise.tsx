import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const AdvertisePage = () => {
  return (
    <Layout title="Advertise - NeevNews" description="Advertise with NeevNews. Launching September 8, 2025." keywords="advertise, neevnews">
      <Head><meta name="robots" content="index, follow" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950 py-16">
        <div className="container-custom"><div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Advertise with NeevNews</h1>
          <p className="text-lg">Launching September 8, 2025. Advertising opportunities coming soon.</p>
          <p className="mt-4">For inquiries: <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a></p>
        </div></div>
      </div>
    </Layout>
  );
};
export default AdvertisePage;
