import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Cookie, 
  Shield, 
  Settings, 
  BarChart3, 
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Mail,
  Globe,
  Clock,
  Eye,
  Lock
} from 'lucide-react';

const CookiesPage = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    preferences: true,
    marketing: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: <Lock className="w-6 h-6" />,
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      required: true,
      examples: [
        { name: 'session_id', purpose: 'Maintains user session', duration: 'Session' },
        { name: 'csrf_token', purpose: 'Security - prevents cross-site request forgery', duration: 'Session' },
        { name: 'cookie_consent', purpose: 'Stores your cookie preferences', duration: '1 year' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      examples: [
        { name: '_ga', purpose: 'Google Analytics - distinguishes users', duration: '2 years' },
        { name: '_gid', purpose: 'Google Analytics - distinguishes users', duration: '24 hours' },
        { name: '_gat', purpose: 'Google Analytics - throttles request rate', duration: '1 minute' }
      ]
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      icon: <Settings className="w-6 h-6" />,
      description: 'These cookies remember your preferences and settings to enhance your experience on future visits.',
      required: false,
      examples: [
        { name: 'theme', purpose: 'Remembers dark/light mode preference', duration: '1 year' },
        { name: 'language', purpose: 'Stores preferred language', duration: '1 year' },
        { name: 'font_size', purpose: 'Remembers text size preference', duration: '1 year' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: <Target className="w-6 h-6" />,
      description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
      required: false,
      examples: [
        { name: 'Currently not used', purpose: 'We do not currently use marketing cookies', duration: 'N/A' }
      ]
    }
  ];

  const browserGuides = [
    { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
    { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
    { name: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
    { name: 'Microsoft Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
    { name: 'Opera', url: 'https://help.opera.com/en/latest/web-preferences/#cookies' }
  ];

  const handleToggle = (id: keyof typeof cookiePreferences) => {
    if (id === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage and update consent
    localStorage.setItem('cookie_preferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  return (
    <Layout 
      title="Cookie Policy - NeevNews | How We Use Cookies" 
      description="NeevNews Cookie Policy. Learn about the cookies we use, why we use them, and how to manage your cookie preferences."
      keywords="neevnews cookies, cookie policy, website cookies, tracking cookies, cookie preferences, gdpr cookies"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/cookies" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                  <Cookie size={32} />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                    Cookie Policy
                  </h1>
                  <p className="text-xl text-white/90">
                    How we use cookies and similar technologies
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

        {/* Content */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  This Cookie Policy explains how NeevNews ("we," "us," or "our") uses cookies and 
                  similar tracking technologies when you visit our website at <strong>neevnews.com</strong>. 
                  This policy should be read alongside our{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </section>

            {/* What Are Cookies */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  What Are Cookies?
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  Cookies are small text files that are placed on your device (computer, tablet, or 
                  smartphone) when you visit a website. They are widely used to make websites work 
                  more efficiently and to provide information to website owners.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center gap-2">
                      <Clock size={18} className="text-primary-600" />
                      Session Cookies
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Temporary cookies that expire when you close your browser. They help the website 
                      remember your actions during a single browsing session.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center gap-2">
                      <Eye size={18} className="text-primary-600" />
                      Persistent Cookies
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Cookies that remain on your device for a set period or until you delete them. 
                      They remember your preferences for future visits.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center gap-2">
                      <Shield size={18} className="text-primary-600" />
                      First-Party Cookies
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Cookies set by the website you're visiting. They can only be read by that website.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 flex items-center gap-2">
                      <Globe size={18} className="text-primary-600" />
                      Third-Party Cookies
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Cookies set by other websites or services (like analytics providers) embedded 
                      in the website you're visiting.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Types */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Types of Cookies We Use
                </h2>
              </div>

              <div className="space-y-6">
                {cookieTypes.map((type) => (
                  <div key={type.id} className="card overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                            {type.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                              {type.name}
                            </h3>
                            {type.required && (
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                Always Active
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {!type.required && (
                          <button
                            onClick={() => handleToggle(type.id as keyof typeof cookiePreferences)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              cookiePreferences[type.id as keyof typeof cookiePreferences]
                                ? 'bg-primary-600'
                                : 'bg-secondary-300 dark:bg-secondary-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                cookiePreferences[type.id as keyof typeof cookiePreferences]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                        {type.description}
                      </p>

                      <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-secondary-200 dark:border-secondary-700">
                              <th className="text-left p-3 font-semibold text-secondary-900 dark:text-white">Cookie Name</th>
                              <th className="text-left p-3 font-semibold text-secondary-900 dark:text-white">Purpose</th>
                              <th className="text-left p-3 font-semibold text-secondary-900 dark:text-white">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {type.examples.map((cookie, index) => (
                              <tr key={index} className="border-b border-secondary-200 dark:border-secondary-700 last:border-0">
                                <td className="p-3 font-mono text-xs text-secondary-700 dark:text-secondary-300">
                                  {cookie.name}
                                </td>
                                <td className="p-3 text-secondary-600 dark:text-secondary-400">
                                  {cookie.purpose}
                                </td>
                                <td className="p-3 text-secondary-600 dark:text-secondary-400">
                                  {cookie.duration}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={savePreferences}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Save Cookie Preferences
                </button>
              </div>
            </section>

            {/* How to Manage Cookies */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  How to Manage Cookies
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Browser Settings
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Most web browsers allow you to control cookies through their settings. You can 
                    usually find these settings in the "Options" or "Preferences" menu of your browser.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {browserGuides.map((browser) => (
                      <a
                        key={browser.name}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
                      >
                        <span className="text-secondary-700 dark:text-secondary-300 font-medium">
                          {browser.name}
                        </span>
                        <ExternalLink size={16} className="text-primary-600 dark:text-primary-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        Important Note
                      </h4>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        If you choose to disable cookies, some features of our website may not function 
                        properly. Essential cookies cannot be disabled as they are necessary for the 
                        website to work correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Third-Party Cookies
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We use the following third-party services that may set cookies:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 size={20} className="text-primary-600 dark:text-primary-400" />
                      <h4 className="font-semibold text-secondary-900 dark:text-white">
                        Google Analytics
                      </h4>
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">
                      We use Google Analytics to understand how visitors use our website. This helps 
                      us improve our content and user experience.
                    </p>
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm flex items-center gap-1"
                    >
                      Google Privacy Policy
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield size={20} className="text-primary-600 dark:text-primary-400" />
                      <h4 className="font-semibold text-secondary-900 dark:text-white">
                        Firebase
                      </h4>
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">
                      We use Firebase for authentication and database services. Firebase may set 
                      cookies to maintain user sessions.
                    </p>
                    <a
                      href="https://firebase.google.com/support/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm flex items-center gap-1"
                    >
                      Firebase Privacy Policy
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Do Not Track */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Do Not Track Signals
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites that 
                  you do not want to be tracked. Currently, there is no industry standard for how 
                  websites should respond to DNT signals. As such, our website does not currently 
                  respond to DNT signals. However, you can manage your cookie preferences using the 
                  controls provided above.
                </p>
              </div>
            </section>

            {/* Updates to Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Updates to This Policy
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will notify 
                  you of any material changes by posting the updated policy on this page with a new 
                  "Last Updated" date. We encourage you to review this policy periodically.
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
                      Questions About Cookies?
                    </h2>
                    <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                      If you have any questions about our use of cookies or this Cookie Policy, 
                      please contact us:
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

                <Link href="/terms" className="card p-6 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4">
                  <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">Terms of Service</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">User agreement and guidelines</p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Footer Note */}
            <div className="text-center text-sm text-secondary-500 py-8 mt-12 border-t border-secondary-200 dark:border-secondary-700">
              <p>GDPR Compliant</p>
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

export default CookiesPage;
