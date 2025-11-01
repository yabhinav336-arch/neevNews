import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Briefcase, Mail } from 'lucide-react';

const CareersPage = () => {
  return (
    <Layout title="Careers at NeevNews" description="Join our team at NeevNews. Launching September 8, 2025." keywords="careers, jobs, neevnews">
      <Head><meta name="robots" content="index, follow" /><link rel="canonical" href="https://neevnews.app/careers" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950">
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20">
          <div className="container-custom"><div className="max-w-4xl mx-auto text-center">
            <Briefcase size={48} className="mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">Join Our Team</h1>
            <p className="text-xl lg:text-2xl text-white/90">Build your career with NeevNews. Launching September 8, 2025.</p>
          </div></div>
        </div>
        <div className="container-custom py-16"><div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">We're Hiring Soon!</h2>
          <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-8">
            NeevNews is launching on September 8, 2025. Career opportunities will be posted as we approach our launch date.
          </p>
          <div className="card p-8"><Mail size={32} className="mx-auto mb-4 text-primary-600" />
            <p className="text-lg mb-4">Interested in joining our team?</p>
            <a href="mailto:abhinavvoicebox@gmail.com" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold inline-block">
              Send Your Resume
            </a>
          </div>
        </div></div>
      </div>
    </Layout>
  );
};
export default CareersPage;
