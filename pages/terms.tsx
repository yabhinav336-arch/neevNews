import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { FileText, CheckCircle, AlertTriangle, Scale, Shield, Mail } from 'lucide-react';

const TermsPage = () => {
  return (
    <Layout
      title="Terms of Service - NeevNews | User Agreement & Guidelines"
      description="NeevNews Terms of Service. Read our user agreement, acceptable use policy, and terms and conditions for accessing and using our news platform."
      keywords="terms of service, user agreement, terms and conditions, acceptable use, legal terms"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/terms" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
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
                  Welcome to NeevNews. These Terms of Service ("Terms") govern your access to and use of 
                  the NeevNews website (<a href="https://neevnews.app" className="text-primary-600 hover:underline">neevnews.app</a>), 
                  our services, content, and any related applications (collectively, the "Service").
                </p>
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  By accessing or using our Service, you agree to be bound by these Terms. If you do not 
                  agree to these Terms, please do not use our Service.
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-secondary-700 dark:text-secondary-300">
                  <strong>Important:</strong> Please read these Terms carefully. They contain important 
                  information about your legal rights, remedies, and obligations.
                </p>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                1. Acceptance of Terms
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  By using NeevNews, you acknowledge that you have read, understood, and agree to be bound by:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>These Terms of Service</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Our <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Our <Link href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</Link></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Our <Link href="/policy" className="text-primary-600 hover:underline">Publication Policy</Link></span>
                  </li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  If you are using our Service on behalf of an organization, you represent that you have 
                  the authority to bind that organization to these Terms.
                </p>
              </div>
            </section>

            {/* Eligibility */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                2. Eligibility
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  To use NeevNews, you must:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Be at least 13 years old (or the age of majority in your jurisdiction)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Have the legal capacity to enter into these Terms</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Not be prohibited from using the Service under applicable laws</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Comply with all local, state, national, and international laws</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* License and Access */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                3. License and Access
              </h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    3.1 License Grant
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Subject to your compliance with these Terms, NeevNews grants you a limited, non-exclusive, 
                    non-transferable, non-sublicensable, revocable license to access and use the Service for 
                    your personal, non-commercial use.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    3.2 Restrictions
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    You agree NOT to:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Copy, modify, distribute, or create derivative works from our content</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Use automated systems (bots, scrapers) to access the Service</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Reverse engineer, decompile, or disassemble any part of the Service</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Remove, alter, or obscure any copyright or proprietary notices</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Use the Service for any illegal or unauthorized purpose</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Interfere with or disrupt the Service or servers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Attempt to gain unauthorized access to any part of the Service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Usage */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                4. Content and Intellectual Property
              </h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    4.1 Our Content
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    All content on NeevNews, including but not limited to text, graphics, logos, images, 
                    videos, audio, software, and data compilations, is the property of NeevNews or its 
                    content suppliers and is protected by international copyright, trademark, and other 
                    intellectual property laws.
                  </p>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    © 2024 NeevNews. All rights reserved.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    4.2 Permitted Use
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    You may:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>View and read articles for personal, non-commercial use</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Share article links on social media with proper attribution</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Quote brief excerpts with proper citation and link back to NeevNews</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Print articles for personal, non-commercial use</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    4.3 Commercial Use
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Any commercial use of our content requires prior written permission. Contact us at{' '}
                    <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline">
                      theneevnews@gmail.com
                    </a>{' '}
                    for licensing inquiries.
                  </p>
                </div>
              </div>
            </section>

            {/* User Conduct */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  5. User Conduct and Acceptable Use
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  When using our Service, you agree to:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">✓ Do:</h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                      <li>• Use the Service in compliance with all applicable laws</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Provide accurate information when contacting us</li>
                      <li>• Report security vulnerabilities responsibly</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">✗ Don't:</h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                      <li>• Post or transmit harmful, offensive, or illegal content</li>
                      <li>• Harass, threaten, or abuse others</li>
                      <li>• Impersonate any person or entity</li>
                      <li>• Violate anyone's privacy or intellectual property rights</li>
                      <li>• Distribute malware, viruses, or harmful code</li>
                      <li>• Engage in any activity that disrupts or interferes with the Service</li>
                      <li>• Use the Service for spam or unauthorized advertising</li>
                      <li>• Attempt to circumvent security measures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                6. Newsletter and Communications
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  By subscribing to our newsletter, you agree to:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Receive periodic email communications from NeevNews</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Provide accurate and current email information</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>Our right to send you important service announcements</span>
                  </li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  You can unsubscribe at any time by clicking the unsubscribe link in any email or 
                  contacting us at{' '}
                  <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline">
                    theneevnews@gmail.com
                  </a>.
                </p>
              </div>
            </section>

            {/* Third Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                7. Third-Party Links and Services
              </h2>

              <div className="card p-6 border-l-4 border-yellow-600">
                <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                  Our Service may contain links to third-party websites, services, or resources. These 
                  links are provided for your convenience only.
                </p>
                <p className="text-secondary-700 dark:text-secondary-300">
                  <strong>We do not endorse and are not responsible for:</strong>
                </p>
                <ul className="mt-2 space-y-1 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• The content, accuracy, or opinions expressed on third-party sites</li>
                  <li>• Privacy practices of third-party services</li>
                  <li>• Any damages resulting from your use of third-party services</li>
                </ul>
              </div>
            </section>

            {/* Disclaimers */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Scale size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  8. Disclaimers and Limitations
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    8.1 No Warranty
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="space-y-1 text-secondary-700 dark:text-secondary-300 ml-6">
                    <li>• Warranties of merchantability, fitness for a particular purpose</li>
                    <li>• Non-infringement, title, or quiet enjoyment</li>
                    <li>• Accuracy, reliability, or completeness of content</li>
                    <li>• Uninterrupted or error-free operation</li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    8.2 Content Disclaimer
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    While we strive for accuracy, NeevNews does not warrant that:
                  </p>
                  <ul className="mt-2 space-y-1 text-secondary-700 dark:text-secondary-300 ml-6">
                    <li>• Content is accurate, complete, or current</li>
                    <li>• Content is suitable for your particular purpose</li>
                    <li>• Content is free from errors or omissions</li>
                  </ul>
                  <p className="text-secondary-700 dark:text-secondary-300 mt-3">
                    You should verify important information from original sources before making decisions 
                    based on our content.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    8.3 Limitation of Liability
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEEVNEWS SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="space-y-1 text-secondary-700 dark:text-secondary-300 ml-6">
                    <li>• Indirect, incidental, special, consequential, or punitive damages</li>
                    <li>• Loss of profits, revenue, data, or use</li>
                    <li>• Business interruption or loss of goodwill</li>
                    <li>• Damages resulting from your use or inability to use the Service</li>
                    <li>• Damages caused by third-party content or services</li>
                  </ul>
                  <p className="text-secondary-700 dark:text-secondary-300 mt-3">
                    Our total liability shall not exceed $100 or the amount you paid us in the past 12 months, 
                    whichever is greater.
                  </p>
                </div>
              </div>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                9. Indemnification
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  You agree to indemnify, defend, and hold harmless NeevNews, its affiliates, officers, 
                  directors, employees, agents, and licensors from any claims, losses, damages, liabilities, 
                  costs, and expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="mt-3 space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• Your use of the Service</li>
                  <li>• Your violation of these Terms</li>
                  <li>• Your violation of any rights of another person or entity</li>
                  <li>• Any content you submit or transmit through the Service</li>
                </ul>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                10. Changes to Terms and Service
              </h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    10.1 Modifications to Terms
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We reserve the right to modify these Terms at any time. We will notify users of material 
                    changes by updating the "Last Updated" date and posting a notice on our website. Your 
                    continued use of the Service after changes constitutes acceptance of the modified Terms.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    10.2 Changes to Service
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We may modify, suspend, or discontinue any part of the Service at any time without 
                    notice or liability. We are not obligated to maintain or support the Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                11. Termination
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  <strong>We may terminate or suspend your access to the Service:</strong>
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 ml-6">
                  <li>• Immediately and without notice for any violation of these Terms</li>
                  <li>• For any reason, at our sole discretion</li>
                  <li>• If required by law or legal process</li>
                </ul>
                <p className="text-secondary-700 dark:text-secondary-300 mt-4">
                  <strong>You may stop using the Service at any time.</strong> Upon termination, your right 
                  to use the Service will immediately cease. Provisions that by their nature should survive 
                  termination will survive (including disclaimers, limitations of liability, and dispute resolution).
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                12. Governing Law and Dispute Resolution
              </h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    12.1 Governing Law
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    These Terms shall be governed by and construed in accordance with the laws of India, 
                    without regard to its conflict of law provisions.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    12.2 Jurisdiction
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    You agree to submit to the exclusive jurisdiction of the courts located in Noida, 
                    Uttar Pradesh, India for the resolution of any disputes.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    12.3 Dispute Resolution
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    Before filing a claim, you agree to try to resolve the dispute informally by contacting us at{' '}
                    <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline">
                      theneevnews@gmail.com
                    </a>. We'll try to resolve the dispute informally.
                  </p>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    If a dispute is not resolved within 30 days, either party may initiate formal proceedings.
                  </p>
                </div>
              </div>
            </section>

            {/* General Provisions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                13. General Provisions
              </h2>

              <div className="card p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Entire Agreement</h4>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    These Terms, together with our Privacy Policy and other referenced policies, constitute 
                    the entire agreement between you and NeevNews.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Severability</h4>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    If any provision is found unenforceable, it shall be modified to reflect the parties' 
                    intention, and the remaining provisions shall remain in full effect.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Waiver</h4>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Our failure to enforce any right or provision shall not constitute a waiver of that right.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Assignment</h4>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    You may not assign or transfer these Terms. We may assign these Terms without restriction.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Force Majeure</h4>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We shall not be liable for any failure or delay due to circumstances beyond our reasonable 
                    control (natural disasters, war, strikes, internet failures, etc.).
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="flex items-center mb-4">
                  <Mail size={32} className="text-primary-600 dark:text-primary-400 mr-4" />
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                    Contact Information
                  </h2>
                </div>
                
                <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6">
                  If you have questions about these Terms, please contact us:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-primary-600 dark:text-primary-400" />
                    <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline font-medium">
                      theneevnews@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl text-primary-600 dark:text-primary-400">📱</span>
                    <a href="tel:+919369336080" className="text-primary-600 hover:underline font-medium">
                      +91 93693 36080
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl text-primary-600 dark:text-primary-400">📍</span>
                    <span className="text-secondary-700 dark:text-secondary-300">
                      NeevNews, Noida Sector 27, Uttar Pradesh, India
                    </span>
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
                <Link href="/privacy" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Privacy Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    How we protect your data
                  </p>
                </Link>

                <Link href="/cookies" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Cookie Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Information about cookies
                  </p>
                </Link>

                <Link href="/policy" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Publication Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Our editorial standards
                  </p>
                </Link>
              </div>
            </section>

            {/* Footer Note */}
            <div className="text-center text-sm text-secondary-500 dark:text-secondary-500 py-8 border-t border-secondary-200 dark:border-secondary-800">
              <p className="mb-2">
                These Terms of Service are effective from September 8, 2025.
              </p>
              <p>
                By using NeevNews, you acknowledge that you have read and understood these Terms.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;

