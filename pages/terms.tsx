import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Scale,
  Shield,
  BookOpen,
  MessageSquare,
  Copyright,
  Gavel,
  Mail,
  Users,
  Globe
} from 'lucide-react';

const TermsPage = () => {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'use-license', title: 'Use License', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'user-conduct', title: 'User Conduct', icon: <Users className="w-5 h-5" /> },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: <Copyright className="w-5 h-5" /> },
    { id: 'disclaimer', title: 'Disclaimer', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'limitation', title: 'Limitation of Liability', icon: <Shield className="w-5 h-5" /> },
    { id: 'governing-law', title: 'Governing Law', icon: <Gavel className="w-5 h-5" /> }
  ];

  return (
    <Layout 
      title="Terms of Service - NeevNews | User Agreement and Guidelines" 
      description="NeevNews Terms of Service. Read our user agreement, content guidelines, and legal terms for using our news platform."
      keywords="neevnews terms, terms of service, user agreement, legal terms, content guidelines, website terms"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/terms" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                  <FileText size={32} />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                    Terms of Service
                  </h1>
                  <p className="text-xl text-white/90">
                    User Agreement and Guidelines
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                <span>Last Updated: December 27, 2024</span>
                <span>•</span>
                <span>Effective: September 8, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-8 sticky top-16 lg:top-20 z-40 border-b border-secondary-200 dark:border-secondary-700">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-secondary-800 rounded-lg text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {section.icon}
                    <span className="hidden md:inline">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Welcome to NeevNews. These Terms of Service ("Terms") govern your access to and use of 
                  the NeevNews website located at <strong>neevnews.com</strong> (the "Site") and all related 
                  services, features, and content (collectively, the "Services"). By accessing or using our 
                  Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
                  please do not use our Services.
                </p>
              </div>
            </section>

            {/* Important Notice */}
            <section className="mb-12">
              <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      Important Notice
                    </h3>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Please read these Terms carefully before using our Services. These Terms contain 
                      important information about your legal rights, remedies, and obligations. By using 
                      our Services, you acknowledge that you have read, understood, and agree to be bound 
                      by these Terms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section id="acceptance" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  1. Acceptance of Terms
                </h2>
              </div>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    By accessing or using NeevNews, you confirm that:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You are at least 13 years of age (or the minimum age required in your jurisdiction)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You have the legal capacity to enter into a binding agreement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You agree to comply with these Terms and all applicable laws and regulations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You have read and agree to our <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link></span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    We reserve the right to modify these Terms at any time. Changes will be effective 
                    immediately upon posting to the Site. Your continued use of the Services after any 
                    changes constitutes your acceptance of the modified Terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Use License */}
            <section id="use-license" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  2. Use License
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Permitted Uses
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Subject to these Terms, NeevNews grants you a limited, non-exclusive, non-transferable, 
                    revocable license to:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access and view content on the Site for personal, non-commercial purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Share article links through social media or email with proper attribution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Quote brief excerpts from articles with proper citation and link to the original</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Subscribe to newsletters and create an account for personalized features</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Prohibited Uses
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    You may NOT:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Copy, reproduce, or redistribute content without written permission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Use automated systems (bots, scrapers) to access or collect data from the Site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Modify, adapt, translate, or create derivative works from our content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Use content for commercial purposes without a licensing agreement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Remove or alter any copyright, trademark, or other proprietary notices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Frame or mirror any part of the Site without written authorization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Conduct */}
            <section id="user-conduct" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  3. User Conduct
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  When using our Services, you agree to:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-500" />
                      Do:
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Provide accurate information when creating an account</li>
                      <li>• Keep your account credentials secure</li>
                      <li>• Report any security vulnerabilities responsibly</li>
                      <li>• Respect other users and our editorial team</li>
                      <li>• Engage in constructive discussions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                      <XCircle size={18} className="text-red-500" />
                      Don't:
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Post spam, hate speech, or abusive content</li>
                      <li>• Impersonate others or misrepresent your identity</li>
                      <li>• Attempt to hack or disrupt our Services</li>
                      <li>• Violate any applicable laws or regulations</li>
                      <li>• Harass or threaten other users</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                  <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                    <strong>Enforcement:</strong> We reserve the right to remove content, suspend accounts, 
                    or take other appropriate action against users who violate these Terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Copyright className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  4. Intellectual Property Rights
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Our Content
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    All content on NeevNews, including but not limited to:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {['Articles', 'Images', 'Videos', 'Graphics', 'Logos', 'Trademarks', 'Software', 'Design'].map((item) => (
                      <div key={item} className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg text-center text-sm font-medium text-secondary-700 dark:text-secondary-300">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    is owned by or licensed to NeevNews and is protected by copyright, trademark, 
                    and other intellectual property laws. Unauthorized use is prohibited.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    User-Generated Content
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    If you submit content to our Site (comments, feedback, etc.):
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You retain ownership of your content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You grant us a non-exclusive, royalty-free license to use, display, and distribute your content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You represent that you have the right to submit such content</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    Content Licensing
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    For commercial use, syndication, or republishing of our content, please contact us at{' '}
                    <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">
                      abhinavvoicebox@gmail.com
                    </a>{' '}
                    to discuss licensing options.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section id="disclaimer" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  5. Disclaimer
                </h2>
              </div>

              <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p className="font-semibold text-secondary-900 dark:text-white">
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                  </p>
                  
                  <p>
                    To the fullest extent permitted by law, NeevNews disclaims all warranties, express or implied, including but not limited to:
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Warranties of merchantability and fitness for a particular purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Warranties that the Services will be uninterrupted, error-free, or secure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Warranties regarding the accuracy, reliability, or completeness of any content</span>
                    </li>
                  </ul>

                  <p className="text-sm">
                    While we strive for accuracy in our reporting, news content may contain errors or become 
                    outdated. We encourage readers to verify important information from multiple sources.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  6. Limitation of Liability
                </h2>
              </div>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    To the maximum extent permitted by applicable law, NeevNews and its officers, directors, 
                    employees, and agents shall not be liable for:
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Any indirect, incidental, special, consequential, or punitive damages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Any loss of profits, revenue, data, or use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Any damages arising from your use or inability to use the Services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Any damages arising from third-party content or links</span>
                    </li>
                  </ul>

                  <p className="text-sm bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    Some jurisdictions do not allow the exclusion of certain warranties or limitation of 
                    liability, so the above limitations may not apply to you.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                7. Third-Party Links
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  Our Site may contain links to third-party websites or services. These links are provided 
                  for your convenience only. We do not:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start gap-2">
                    <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Control or endorse third-party websites or their content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Accept responsibility for their privacy practices or terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Guarantee the accuracy or reliability of their information</span>
                  </li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  We encourage you to review the terms and privacy policies of any third-party sites you visit.
                </p>
              </div>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                8. Indemnification
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  You agree to indemnify, defend, and hold harmless NeevNews and its officers, directors, 
                  employees, agents, and affiliates from and against any claims, damages, losses, liabilities, 
                  costs, and expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="mt-4 space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>• Your use of the Services</li>
                  <li>• Your violation of these Terms</li>
                  <li>• Your violation of any third-party rights</li>
                  <li>• Any content you submit to the Site</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing-law" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  9. Governing Law
                </h2>
              </div>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India, 
                    without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising out of or relating to these Terms or the Services shall be 
                    resolved exclusively in the courts located in Noida, Uttar Pradesh, India.
                  </p>
                  <p>
                    By using our Services, you consent to the jurisdiction of such courts and waive any 
                    objections based on venue or inconvenient forum.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                10. Termination
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We may terminate or suspend your access to the Services immediately, without prior 
                  notice or liability, for any reason, including:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>• Breach of these Terms</li>
                  <li>• Conduct that we believe is harmful to other users or our business</li>
                  <li>• Request by law enforcement or government agencies</li>
                  <li>• Discontinuation of the Services</li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  Upon termination, your right to use the Services will immediately cease. Provisions 
                  of these Terms that by their nature should survive termination shall survive.
                </p>
              </div>
            </section>

            {/* Severability */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                11. Severability
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision 
                  shall be limited or eliminated to the minimum extent necessary, and the remaining 
                  provisions shall remain in full force and effect.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                <div className="flex items-start gap-4">
                  <Mail className="w-10 h-10 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                      Contact Us
                    </h2>
                    <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2">
                      <p className="text-secondary-700 dark:text-secondary-300">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">
                          abhinavvoicebox@gmail.com
                        </a>
                      </p>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        <strong>Phone:</strong>{' '}
                        <a href="tel:+919369336080" className="text-primary-600 hover:underline">
                          +91 93693 36080
                        </a>
                      </p>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        <strong>Address:</strong> Noida Sector 27, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Policies */}
            <section>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Related Policies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/privacy" className="card p-6 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4">
                  <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">Privacy Policy</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">How we protect your data</p>
                  </div>
                </Link>

                <Link href="/cookies" className="card p-6 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4">
                  <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">Cookie Policy</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">How we use cookies</p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Footer Note */}
            <div className="text-center text-sm text-secondary-500 py-8 mt-12 border-t border-secondary-200 dark:border-secondary-700">
              <p>Governing Law: India</p>
              <p className="mt-2">
                Last Updated: December 27, 2024 | Effective: September 8, 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
