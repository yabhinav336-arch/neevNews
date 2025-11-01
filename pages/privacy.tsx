import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Shield, Eye, Lock, Database, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <Layout
      title="Privacy Policy - NeevNews | How We Protect Your Data"
      description="NeevNews Privacy Policy. Learn how we collect, use, protect, and manage your personal information. GDPR compliant. Your privacy matters to us."
      keywords="privacy policy, data protection, GDPR, personal information, cookies, data security"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/privacy" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                <Shield size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                  Privacy Policy
                </h1>
                <p className="text-xl text-white/90">
                  Your privacy is important to us
                </p>
              </div>
            </div>
            <p className="text-white/80">Effective from: September 8, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  NeevNews ("we," "our," or "us") is committed to protecting your privacy. This Privacy 
                  Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website <a href="https://neevnews.app" className="text-primary-600 hover:underline">neevnews.app</a>, 
                  use our services, or subscribe to our newsletter.
                </p>
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with the terms of this 
                  privacy policy, please do not access the site or use our services.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Database size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    1. Personal Information You Provide
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    We collect information that you voluntarily provide to us when you:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Subscribe to our newsletter:</strong> Email address, topic preferences, frequency preferences</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Contact us:</strong> Name, email address, phone number (optional), message content</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Apply for jobs:</strong> Name, email, resume, cover letter, professional information</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Participate in surveys or feedback:</strong> Responses, opinions, demographic information (optional)</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    2. Automatically Collected Information
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    When you visit our website, we automatically collect certain information about your device:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Device Information:</strong> IP address, browser type, operating system, device type</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Usage Data:</strong> Pages viewed, time spent on pages, links clicked, referring/exit pages</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Location Data:</strong> General geographic location (country/city level) based on IP address</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Cookies and Tracking:</strong> See our Cookie Policy section below</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    3. Information from Third Parties
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    We may receive information about you from third-party services:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Social Media:</strong> If you interact with us through social media platforms</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Analytics Providers:</strong> Google Analytics and similar services</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Advertising Partners:</strong> Data from advertising networks (if applicable)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Eye size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  How We Use Your Information
                </h2>
              </div>

              <div className="card p-6 space-y-4">
                <p className="text-secondary-700 dark:text-secondary-300">
                  We use the information we collect for the following purposes:
                </p>
                
                <ul className="space-y-3 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Deliver Services:</strong> Provide, maintain, and improve our news content and website functionality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Newsletter:</strong> Send you our newsletter with curated news content (only if you subscribe)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Communication:</strong> Respond to your inquiries, comments, and requests</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Analytics:</strong> Analyze usage patterns to improve our content and user experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Personalization:</strong> Customize content recommendations based on your interests</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Security:</strong> Monitor and prevent fraud, abuse, and security threats</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Legal Compliance:</strong> Comply with legal obligations and protect our rights</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold text-xl">•</span>
                    <span><strong>Marketing:</strong> Send promotional materials (only with your consent, where required)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Share Information */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                How We Share Your Information
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We do not sell your personal information. We may share your information in the following situations:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Service Providers</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      We share information with third-party service providers who perform services on our behalf, such as:
                    </p>
                    <ul className="mt-2 ml-6 space-y-1 text-secondary-700 dark:text-secondary-300">
                      <li>• Email service providers (for newsletters)</li>
                      <li>• Analytics providers (Google Analytics)</li>
                      <li>• Hosting and infrastructure providers</li>
                      <li>• Payment processors (if applicable)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Legal Requirements</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      We may disclose your information if required by law or in response to valid legal requests, 
                      such as subpoenas, court orders, or government investigations.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Business Transfers</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      If NeevNews is involved in a merger, acquisition, or sale of assets, your information may 
                      be transferred as part of that transaction.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">With Your Consent</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      We may share your information for any other purpose with your explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Cookies and Tracking Technologies
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We use cookies and similar tracking technologies to improve your experience on our website.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Types of Cookies We Use:</h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-primary-600 font-bold">•</span>
                        <span><strong>Essential Cookies:</strong> Required for website functionality (login, preferences)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary-600 font-bold">•</span>
                        <span><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary-600 font-bold">•</span>
                        <span><strong>Preference Cookies:</strong> Remember your settings (dark mode, language)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary-600 font-bold">•</span>
                        <span><strong>Advertising Cookies:</strong> Deliver relevant advertisements (if applicable)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Managing Cookies:</h4>
                    <p className="text-secondary-700 dark:text-secondary-300 mb-2">
                      You can control cookies through your browser settings. However, disabling cookies may 
                      affect website functionality.
                    </p>
                    <Link href="/cookies" className="text-primary-600 hover:underline font-medium">
                      Learn more in our Cookie Policy →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Data Security
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information from unauthorized access, disclosure, alteration, or destruction:
                </p>
                
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>SSL/TLS encryption for data transmission</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Secure servers with regular security updates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Access controls and authentication</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Regular security audits and monitoring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Employee training on data protection</span>
                  </li>
                </ul>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-secondary-700 dark:text-secondary-300">
                    <strong>Important:</strong> No method of transmission over the Internet or electronic storage 
                    is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Your Privacy Rights
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🔍 Right to Access</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Request a copy of the personal information we hold about you.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">✏️ Right to Correction</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Request correction of inaccurate or incomplete information.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🗑️ Right to Deletion</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Request deletion of your personal information (subject to legal obligations).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🚫 Right to Object</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Object to processing of your personal information for marketing purposes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">📦 Right to Portability</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Request transfer of your data to another service provider.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">⏸️ Right to Restrict Processing</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Request limitation on how we use your information.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🙅 Right to Withdraw Consent</h4>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      Withdraw consent for data processing at any time.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    <strong>To exercise your rights, contact us at:</strong>
                  </p>
                  <div className="flex items-center space-x-3">
                    <Mail size={18} className="text-primary-600" />
                    <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline font-medium">
                      theneevnews@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Data Retention
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, unless a longer retention period is required by law:
                </p>
                
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Newsletter Subscriptions:</strong> Until you unsubscribe</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Contact Inquiries:</strong> 3 years after resolution</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Analytics Data:</strong> 26 months (Google Analytics default)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Job Applications:</strong> 2 years after application</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Children's Privacy
              </h2>

              <div className="card p-6 bg-blue-50 dark:bg-blue-900/20">
                <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                  Our website is not directed to children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately.
                </p>
                <p className="text-secondary-700 dark:text-secondary-300">
                  If we discover that we have collected information from a child under 13, we will delete 
                  that information promptly.
                </p>
              </div>
            </section>

            {/* International Data Transfers */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                International Data Transfers
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Your information may be transferred to and processed in countries other than your country 
                  of residence. These countries may have data protection laws different from your country. 
                  We ensure appropriate safeguards are in place to protect your information in accordance 
                  with this Privacy Policy and applicable laws.
                </p>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Third-Party Links
              </h2>

              <div className="card p-6 border-l-4 border-yellow-600">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices of these websites. We encourage you to read their privacy policies 
                  before providing any information to them.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Changes to This Privacy Policy
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or legal requirements. We will notify you of material changes by:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Posting the updated policy on this page with a new "Last Updated" date</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Sending an email notification to newsletter subscribers (for significant changes)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Displaying a notice on our website</span>
                  </li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  Your continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="flex items-center mb-4">
                  <Mail size={32} className="text-primary-600 dark:text-primary-400 mr-4" />
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                    Contact Us
                  </h2>
                </div>
                
                <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-secondary-900 dark:text-white">Email:</p>
                      <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline">
                        theneevnews@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-xl text-primary-600 dark:text-primary-400">📍</span>
                    <div>
                      <p className="font-semibold text-secondary-900 dark:text-white">Address:</p>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        NeevNews<br />
                        Noida Sector 27<br />
                        Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-xl text-primary-600 dark:text-primary-400">📱</span>
                    <div>
                      <p className="font-semibold text-secondary-900 dark:text-white">Phone:</p>
                      <a href="tel:+919369336080" className="text-primary-600 hover:underline">
                        +91 93693 36080
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Policies */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Related Policies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/terms" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Terms of Service</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Rules and guidelines for using NeevNews
                  </p>
                </Link>

                <Link href="/cookies" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Cookie Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    How we use cookies and tracking
                  </p>
                </Link>

                <Link href="/policy" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Publication Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Our editorial standards and guidelines
                  </p>
                </Link>
              </div>
            </section>

            {/* Compliance Note */}
            <div className="text-center text-sm text-secondary-500 dark:text-secondary-500 py-8 border-t border-secondary-200 dark:border-secondary-800">
              <p className="mb-2">
                This Privacy Policy is compliant with GDPR, CCPA, and other applicable data protection regulations.
              </p>
              <p>
                Effective Date: September 8, 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;

