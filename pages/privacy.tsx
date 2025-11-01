import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Shield } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <Layout title="Privacy Policy - NeevNews" description="NeevNews Privacy Policy. How we protect your data." keywords="privacy policy, data protection">
      <Head><meta name="robots" content="index, follow" /><link rel="canonical" href="https://neevnews.app/privacy" /></Head>
      <div className="min-h-screen bg-white dark:bg-secondary-950">
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                <Shield size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">Privacy Policy</h1>
                <p className="text-xl text-white/90">Your privacy is important to us</p>
              </div>
            </div>
            <p className="text-white/80">Effective from: September 8, 2025</p>
          </div>
        </div>
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300">
                  NeevNews ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit neevnews.app.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">Information We Collect</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">We collect:</p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• Information you provide (email for newsletter, contact forms)</li>
                  <li>• Automatically collected information (IP address, browser type, pages visited)</li>
                  <li>• Cookies and tracking technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">How We Use Your Information</h2>
              <div className="card p-6">
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• Provide and maintain our services</li>
                  <li>• Send newsletters (if subscribed)</li>
                  <li>• Analyze usage and improve user experience</li>
                  <li>• Respond to inquiries</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">Your Rights</h2>
              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">You have the right to:</p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Object to processing</li>
                  <li>• Unsubscribe from newsletters</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="card p-8 bg-primary-50 dark:bg-primary-900/20">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">For privacy concerns, contact us at:</p>
                <p><a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a></p>
              </div>
            </section>

            <div className="text-center text-sm text-secondary-500 py-8 border-t">
              <p>GDPR & CCPA Compliant | Effective Date: September 8, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default PrivacyPage;
