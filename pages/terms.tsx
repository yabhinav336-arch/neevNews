import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <Layout title="Terms of Service - NeevNews" description="NeevNews Terms of Service and user agreement." keywords="terms of service, user agreement">
      <Head><meta name="robots" content="index, follow" /><link rel="canonical" href="https://neevnews.app/terms" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950">
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                <FileText size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">Terms of Service</h1>
                <p className="text-xl text-white/90">User Agreement and Guidelines</p>
              </div>
            </div>
            <p className="text-white/80">Effective from: September 8, 2025</p>
          </div>
        </div>
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <p className="text-lg text-secondary-700 dark:text-secondary-300">
                These Terms of Service govern your use of NeevNews. By accessing our website, you agree to these terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  By using NeevNews, you agree to our Terms of Service, Privacy Policy, and Cookie Policy.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2. Use License</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">You may:</p>
                <ul className="space-y-2 ml-6">
                  <li>• View and read articles for personal use</li>
                  <li>• Share article links with proper attribution</li>
                  <li>• Quote brief excerpts with citation</li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4 mb-2">You may NOT:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Copy or redistribute content without permission</li>
                  <li>• Use automated systems to access the site</li>
                  <li>• Use content for commercial purposes without authorization</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">3. Disclaimer</h2>
              <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20">
                <p className="text-secondary-700 dark:text-secondary-300">
                  The service is provided "as is" without warranties. We strive for accuracy but do not guarantee that content is error-free or up-to-date.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">4. Contact</h2>
              <div className="card p-6">
                <p className="mb-2">For questions about these terms:</p>
                <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a>
              </div>
            </section>

            <div className="text-center text-sm text-secondary-500 py-8 border-t">
              <p>Governing Law: India | Effective: September 8, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default TermsPage;
