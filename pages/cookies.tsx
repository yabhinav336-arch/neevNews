import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { Cookie } from 'lucide-react';

const CookiesPage = () => {
  return (
    <Layout title="Cookie Policy - NeevNews" description="NeevNews Cookie Policy. How we use cookies." keywords="cookie policy, cookies">
      <Head><meta name="robots" content="index, follow" /><link rel="canonical" href="https://neevnews.app/cookies" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950">
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                <Cookie size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">Cookie Policy</h1>
                <p className="text-xl text-white/90">How we use cookies</p>
              </div>
            </div>
            <p className="text-white/80">Effective from: September 8, 2025</p>
          </div>
        </div>
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <p className="text-lg text-secondary-700 dark:text-secondary-300">
                This Cookie Policy explains how NeevNews uses cookies and similar technologies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">What Are Cookies?</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Cookies are small text files stored on your device that help websites work efficiently and provide information to site owners.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-secondary-700 dark:text-secondary-300">Required for website functionality. Always active.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-secondary-700 dark:text-secondary-300">Help us understand how visitors use our site (Google Analytics).</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
                  <p className="text-secondary-700 dark:text-secondary-300">Remember your settings (dark mode, language).</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Managing Cookies</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
                </p>
              </div>
            </section>

            <div className="text-center text-sm text-secondary-500 py-8 border-t">
              <p>GDPR Compliant | Effective: September 8, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CookiesPage;
