import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Cookie, Settings, Eye, Shield, CheckCircle, Info } from 'lucide-react';

const CookiesPage = () => {
  return (
    <Layout
      title="Cookie Policy - NeevNews | How We Use Cookies"
      description="Learn about how NeevNews uses cookies and similar tracking technologies. Understand what cookies we use, why we use them, and how to manage your preferences."
      keywords="cookie policy, cookies, tracking, privacy, browser settings, data collection"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/cookies" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                <Cookie size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                  Cookie Policy
                </h1>
                <p className="text-xl text-white/90">
                  How we use cookies and tracking technologies
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
                  This Cookie Policy explains how NeevNews ("we," "our," or "us") uses cookies and similar 
                  tracking technologies when you visit our website{' '}
                  <a href="https://neevnews.app" className="text-primary-600 hover:underline">neevnews.app</a>.
                </p>
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  By continuing to use our website, you consent to our use of cookies as described in this policy. 
                  This policy should be read together with our{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </section>

            {/* What are Cookies */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Info size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  What Are Cookies?
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  Cookies are small text files that are placed on your device (computer, smartphone, or tablet) 
                  when you visit a website. They are widely used to make websites work more efficiently and 
                  provide information to website owners.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Key Features of Cookies:
                  </h4>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Store small amounts of information (usually text)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Help websites remember your preferences and settings</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Enable site functionality and improve user experience</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Help analyze website traffic and user behavior</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                
                {/* Essential Cookies */}
                <div className="card p-6 border-l-4 border-green-600">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      1. Essential Cookies (Strictly Necessary)
                    </h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full whitespace-nowrap">
                      Always Active
                    </span>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 text-sm">What they do:</h4>
                    <ul className="space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
                      <li>• Enable basic website functionality</li>
                      <li>• Remember your consent preferences</li>
                      <li>• Maintain security and prevent fraud</li>
                      <li>• Enable access to secure areas</li>
                    </ul>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-3">
                    <strong>Duration:</strong> Session (deleted when browser closes) or up to 1 year
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="card p-6 border-l-4 border-blue-600">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      2. Analytics and Performance Cookies
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full whitespace-nowrap">
                      Optional
                    </span>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg mb-3">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 text-sm">What they do:</h4>
                    <ul className="space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
                      <li>• Count website visits and traffic sources</li>
                      <li>• Measure which pages are popular</li>
                      <li>• Track how users navigate the site</li>
                      <li>• Identify technical issues and errors</li>
                      <li>• Help improve website performance</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      <strong>Primary Service:</strong> Google Analytics
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                      We use Google Analytics to understand aggregate user behavior. Data is anonymized 
                      and used solely for improving our service.
                    </p>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-3">
                    <strong>Duration:</strong> Up to 26 months
                  </p>
                </div>

                {/* Functionality Cookies */}
                <div className="card p-6 border-l-4 border-purple-600">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      3. Functionality Cookies
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full whitespace-nowrap">
                      Optional
                    </span>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    These cookies enable enhanced functionality and personalization based on your preferences.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 text-sm">What they do:</h4>
                    <ul className="space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
                      <li>• Remember your dark/light mode preference</li>
                      <li>• Save your language settings</li>
                      <li>• Remember your font size preferences</li>
                      <li>• Maintain your newsletter topic preferences</li>
                      <li>• Personalize content recommendations</li>
                    </ul>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-3">
                    <strong>Duration:</strong> Up to 1 year
                  </p>
                </div>

                {/* Advertising Cookies */}
                <div className="card p-6 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      4. Advertising and Targeting Cookies
                    </h3>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full whitespace-nowrap">
                      Optional
                    </span>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    These cookies may be used to deliver relevant advertisements and measure their effectiveness.
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 text-sm">What they do:</h4>
                    <ul className="space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
                      <li>• Deliver relevant advertisements</li>
                      <li>• Limit the number of times you see an ad</li>
                      <li>• Measure advertising campaign effectiveness</li>
                      <li>• Remember websites you've visited</li>
                    </ul>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-3">
                    <strong>Duration:</strong> Up to 2 years<br />
                    <strong>Note:</strong> Currently not actively used, may be implemented in the future
                  </p>
                </div>

              </div>
            </section>

            {/* Third Party Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Third-Party Cookies
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  Some cookies on our website are set by third-party services. We have no control over 
                  these cookies, and they are subject to the privacy policies of the third parties.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                      📊 Google Analytics
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300 mb-2">
                      Helps us understand how visitors use our website.
                    </p>
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm"
                    >
                      Google Privacy Policy →
                    </a>
                  </div>

                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                      📱 Social Media Platforms
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300 mb-2">
                      When you share content on social media, those platforms may set cookies.
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        LinkedIn
                      </a>
                      <span className="text-secondary-400">•</span>
                      <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        Instagram
                      </a>
                      <span className="text-secondary-400">•</span>
                      <a href="https://twitter.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        X (Twitter)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Settings size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  How to Manage Cookies
                </h2>
              </div>

              <div className="space-y-6">
                
                <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Browser Settings
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 mb-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>View which cookies are stored on your device</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Delete cookies individually or all at once</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Block cookies from specific websites</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Block all third-party cookies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Delete all cookies when you close your browser</span>
                    </li>
                  </ul>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      <strong>⚠️ Important:</strong> Blocking or deleting cookies may affect your experience 
                      on our website. Some features may not work properly without cookies.
                    </p>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Browser-Specific Instructions
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    To manage cookies in your browser, visit the links below:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a 
                      href="https://support.google.com/chrome/answer/95647" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      <span className="text-2xl">🔵</span>
                      <span className="text-secondary-900 dark:text-white font-medium">Google Chrome</span>
                    </a>
                    <a 
                      href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      <span className="text-2xl">🦊</span>
                      <span className="text-secondary-900 dark:text-white font-medium">Mozilla Firefox</span>
                    </a>
                    <a 
                      href="https://support.apple.com/en-us/HT201265" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      <span className="text-2xl">🧭</span>
                      <span className="text-secondary-900 dark:text-white font-medium">Safari</span>
                    </a>
                    <a 
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      <span className="text-2xl">🌐</span>
                      <span className="text-secondary-900 dark:text-white font-medium">Microsoft Edge</span>
                    </a>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Opt-Out Tools
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    You can also use these tools to control advertising cookies:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://tools.google.com/dlpage/gaoptout" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.youronlinechoices.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Your Online Choices (EU)
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://optout.networkadvertising.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Network Advertising Initiative Opt-Out
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Do Not Track */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Do Not Track (DNT) Signals
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you don't 
                  want your online activities tracked. Currently, there is no industry standard for how to 
                  respond to DNT signals. At this time, our website does not respond to DNT browser settings.
                </p>
              </div>
            </section>

            {/* Mobile Devices */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Mobile Devices
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  On mobile devices, you can control tracking through your device settings:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center space-x-2">
                      <span className="text-2xl">🍎</span>
                      <span>iOS (iPhone/iPad)</span>
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      Settings → Privacy → Tracking → Disable "Allow Apps to Request to Track"
                    </p>
                  </div>
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center space-x-2">
                      <span className="text-2xl">🤖</span>
                      <span>Android</span>
                    </h4>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      Settings → Google → Ads → Opt out of Ads Personalization
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Changes to This Cookie Policy
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  We may update this Cookie Policy from time to time to reflect changes in our practices, 
                  technologies, legal requirements, or other factors. We will notify you of significant 
                  changes by posting the updated policy on this page with a new "Last Updated" date.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Questions About Cookies?
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <a 
                    href="mailto:theneevnews@gmail.com" 
                    className="text-primary-600 hover:underline font-medium text-lg"
                  >
                    theneevnews@gmail.com
                  </a>
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

                <Link href="/terms" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Terms of Service</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Rules for using NeevNews
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
              <p>
                Effective Date: September 8, 2025 | This policy is compliant with GDPR, ePrivacy Directive, 
                and other applicable regulations.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiesPage;

