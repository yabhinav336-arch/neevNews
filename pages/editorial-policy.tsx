import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Shield, 
  CheckCircle, 
  Users, 
  Lock, 
  AlertCircle 
} from 'lucide-react';

const EditorialPolicyPage = () => {
  return (
    <Layout
      title="Editorial Policy - NeevNews | Standards of Journalism"
      description="NeevNews Editorial Policy: Our commitment to accuracy, independence, and integrity in journalism. Learn about our standards and ethics."
      keywords="editorial policy, journalism ethics, news standards, neevnews editorial guidelines"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/editorial-policy" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                  Editorial Policy
                </h1>
                <p className="text-xl text-white/90">
                  Our commitment to trusted journalism
                </p>
              </div>
            </div>
            <p className="text-white/80">Last Updated: October 23, 2025</p>
          </div>
        </div>

        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  At NeevNews, we believe that trust is the currency of journalism. Our editorial policy is the foundation 
                  upon which we build that trust with our readers. We are committed to delivering news that is accurate, 
                  fair, independent, and transparent.
                </p>
              </div>
            </section>

            {/* Core Values */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 font-serif">
                Core Editorial Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6 border-l-4 border-primary-500">
                  <div className="flex items-start mb-4">
                    <CheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Accuracy</h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We strive for accuracy in all our reporting. Facts are checked, sources are verified, and context is provided to ensure a complete picture.
                  </p>
                </div>

                <div className="card p-6 border-l-4 border-primary-500">
                  <div className="flex items-start mb-4">
                    <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Independence</h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Our editorial decisions are made independently of commercial or political interests. We do not allow advertisers to influence our coverage.
                  </p>
                </div>

                <div className="card p-6 border-l-4 border-primary-500">
                  <div className="flex items-start mb-4">
                    <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Fairness</h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We approach every story with an open mind. We seek out diverse perspectives and give subjects of criticism a fair opportunity to respond.
                  </p>
                </div>

                <div className="card p-6 border-l-4 border-primary-500">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Accountability</h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We take responsibility for our work. When we make mistakes, we admit them and correct them promptly and transparently.
                  </p>
                </div>
              </div>
            </section>

            {/* Verification Process */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                Verification & Sourcing
              </h2>
              <div className="card p-8">
                <ul className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <p>We prioritize primary sources and direct evidence whenever possible.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <p>We verify information through multiple independent sources before publication.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <p>We identify sources clearly unless there is a compelling reason for anonymity, such as safety concerns.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <p>We distinguish between verified facts, expert analysis, and opinion.</p>
                  </li>
                </ul>
              </div>
            </section>

            {/* AI Transparency */}
            <section className="mb-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
                  AI Usage & Transparency
                </h2>
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    We believe in transparency regarding the use of Artificial Intelligence in our newsroom:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>AI tools may be used for data analysis, spelling checks, and generating initial drafts or summaries.</li>
                    <li><strong>Human Oversight:</strong> All content, regardless of how it was drafted, is reviewed, fact-checked, and edited by human editors before publication.</li>
                    <li>We do not publish AI-generated images or video without clear labeling and context.</li>
                    <li>We do not use AI to generate entire news articles without rigorous human verification and editorial input.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-secondary-50 dark:bg-secondary-900 rounded-2xl border border-secondary-200 dark:border-secondary-800">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                    Questions about our policy?
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Contact our editorial team at <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a>
                  </p>
                </div>
                <Link href="/contact" className="btn-primary whitespace-nowrap">
                  Contact Us
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorialPolicyPage;
