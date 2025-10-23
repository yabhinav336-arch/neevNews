import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { FileText, CheckCircle, Users, Shield, Globe, Mail } from 'lucide-react';

const PolicyPage = () => {
  return (
    <Layout
      title="Publication Policy - NeevNews"
      description="NeevNews publication policy, editorial guidelines, and content standards for trusted journalism"
      keywords="publication policy, editorial policy, journalism standards, content guidelines"
    >
      <Head>
        <meta name="robots" content="index, follow" />
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
                  Publication Policy
                </h1>
                <p className="text-xl text-white/90">
                  Our commitment to quality journalism and editorial standards
                </p>
              </div>
            </div>
            <p className="text-white/80">Last updated: October 23, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  NeevNews is committed to providing accurate, timely, and informative news content to readers worldwide. 
                  This publication policy outlines our editorial standards, content guidelines, and commitment to responsible journalism.
                </p>
              </div>
            </section>

            {/* Age Restriction */}
            <section className="mb-12 p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <Users size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3 font-serif">
                    Age Restriction Policy
                  </h2>
                  <p className="text-secondary-700 dark:text-secondary-300 text-lg mb-3">
                    <strong>No Age Restrictions:</strong> NeevNews content is accessible to all age groups.
                  </p>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    We maintain family-friendly content standards and provide informative news suitable for readers of all ages. 
                    Our editorial team ensures that all published content is appropriate for general audiences while maintaining 
                    journalistic integrity and factual accuracy.
                  </p>
                </div>
              </div>
            </section>

            {/* Editorial Standards */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif flex items-center">
                <CheckCircle size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                Editorial Standards
              </h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    1. Accuracy and Fact-Checking
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>All news articles must be based on verified facts and credible sources</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Information is cross-verified through multiple reliable sources</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Corrections and updates are published promptly when errors are identified</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Sources are cited and attributed appropriately</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    2. Objectivity and Balance
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>News reporting is fair, balanced, and free from bias</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Multiple perspectives are presented on controversial issues</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Opinion pieces are clearly labeled and distinguished from news reporting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Editorial independence is maintained from commercial interests</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    3. Original Content
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>All content published on NeevNews is original or properly attributed</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Plagiarism is strictly prohibited</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Wire service content and syndicated articles are clearly marked</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>All images and media are properly licensed or credited</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    4. Informative and Educational Content
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Content is designed to inform, educate, and provide value to readers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Complex topics are explained clearly and accessibly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Context and background information are provided for better understanding</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 font-bold">•</span>
                      <span>Educational value is prioritized over sensationalism</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Guidelines */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif flex items-center">
                <Globe size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                Content Guidelines
              </h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Acceptable Content
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Breaking news and current events coverage</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>In-depth analysis and investigative journalism</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Expert opinions and commentary (clearly labeled)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Feature stories and human interest articles</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Educational and informative content across all categories</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Interviews and profiles of newsworthy individuals</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Prohibited Content
                  </h3>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>False information, misinformation, or deliberately misleading content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Hate speech, discrimination, or content promoting violence</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Explicit adult content or materials inappropriate for general audiences</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Defamatory or libelous statements without factual basis</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Plagiarized or copyright-infringing material</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Spam, promotional content disguised as news, or undisclosed advertising</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy & Data */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif flex items-center">
                <Shield size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                Privacy & Data Protection
              </h2>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    NeevNews respects user privacy and complies with applicable data protection regulations:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Newsletter subscriptions are opt-in only and can be canceled at any time</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Personal information is stored securely and never sold to third parties</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Cookies are used only for essential functionality and analytics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Users can request data deletion at any time</span>
                    </li>
                  </ul>

                  <p className="pt-4">
                    For detailed privacy information, please see our{' '}
                    <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* Corrections & Updates */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                Corrections & Updates
              </h2>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p>
                    We are committed to accuracy and transparency. When errors occur:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Immediate Correction:</strong> Factual errors are corrected as soon as identified</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Transparency:</strong> Significant corrections are noted at the top of articles</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Updates:</strong> Developing stories are updated with new information as it becomes available</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Accountability:</strong> We take responsibility for our reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Author Guidelines */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                Author & Contributor Guidelines
              </h2>

              <div className="card p-6">
                <div className="space-y-4 text-secondary-700 dark:text-secondary-300">
                  <p className="font-medium text-lg text-secondary-900 dark:text-white">
                    All authors and contributors to NeevNews must adhere to the following:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Professional Standards:</strong> Maintain journalistic ethics and integrity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Conflict of Interest:</strong> Disclose any potential conflicts of interest</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Attribution:</strong> Always credit sources, quotes, and referenced materials</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Respect:</strong> Treat subjects and sources with respect and fairness</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Verification:</strong> Verify information before publication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Categories Coverage */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                News Categories & Coverage
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🏛️ Politics</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Government affairs, policy, elections, and political developments
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">💻 Technology</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Innovation, digital trends, tech industry, and scientific advances
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">📈 Business</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Markets, economy, corporate news, and financial developments
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🔬 Science</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Research, discoveries, health, environment, and space
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🏥 Health</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Medical news, wellness, public health, and healthcare
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">⚽ Sports</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Athletics, competitions, sports news, and achievements
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🎬 Entertainment</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Arts, culture, media, celebrity news, and entertainment industry
                  </p>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">🌍 World</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    International affairs, global events, and cross-border news
                  </p>
                </div>
              </div>
            </section>

            {/* Contact & Feedback */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif flex items-center">
                <Mail size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                Contact & Feedback
              </h2>

              <div className="card p-6 bg-primary-50 dark:bg-primary-900/20">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We value feedback from our readers. If you have concerns about our content, editorial policies, 
                  or wish to report an error, please contact us:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail size={18} className="text-primary-600 dark:text-primary-400" />
                    <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline font-medium">
                      abhinavvoicebox@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-600 dark:text-primary-400">📱</span>
                    <a href="tel:+919369336080" className="text-primary-600 hover:underline font-medium">
                      +91 93693 36080
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-600 dark:text-primary-400">📍</span>
                    <span className="text-secondary-700 dark:text-secondary-300">
                      Noida Sector 27, Uttar Pradesh, India
                    </span>
                  </div>
                </div>

                <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-4">
                  We aim to respond to all inquiries within 24-48 hours.
                </p>
              </div>
            </section>

            {/* Commitment */}
            <section className="mb-12">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4 font-serif text-center">
                  Our Commitment to You
                </h2>
                <p className="text-lg text-secondary-700 dark:text-secondary-300 text-center leading-relaxed">
                  NeevNews is dedicated to providing trustworthy, informative, and accessible news content. 
                  We believe in the power of informed citizens and the importance of free, independent journalism. 
                  Our content is suitable for all ages and serves the public interest by keeping our community 
                  informed about local and global events.
                </p>
              </div>
            </section>

            {/* Related Policies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                Related Policies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/privacy" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Privacy Policy</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    How we collect, use, and protect your data
                  </p>
                </Link>

                <Link href="/terms" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Terms of Service</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Terms and conditions for using NeevNews
                  </p>
                </Link>

                <Link href="/cookies" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Cookie Policy</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Information about cookies and tracking
                  </p>
                </Link>
              </div>
            </section>

            {/* Footer Note */}
            <div className="text-center text-sm text-secondary-500 dark:text-secondary-500 py-8 border-t border-secondary-200 dark:border-secondary-800">
              <p>
                This publication policy is subject to updates and revisions. 
                Please check this page periodically for the latest version.
              </p>
              <p className="mt-2">
                Questions? Contact us at{' '}
                <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">
                  abhinavvoicebox@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
