import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Cookie, 
  Mail, 
  UserCheck,
  Globe,
  AlertCircle,
  CheckCircle,
  FileText,
  ExternalLink
} from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: <Cookie className="w-6 h-6" />
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Disclosure',
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />
    }
  ];

  return (
    <Layout 
      title="Privacy Policy - NeevNews | How We Protect Your Data" 
      description="NeevNews Privacy Policy. Learn how we collect, use, and protect your personal information. GDPR and CCPA compliant."
      keywords="neevnews privacy policy, data protection, gdpr, ccpa, privacy, personal data, cookies"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/privacy" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
                  <Shield size={32} />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                    Privacy Policy
                  </h1>
                  <p className="text-xl text-white/90">
                    Your privacy matters to us
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
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-secondary-800 rounded-lg text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {section.icon}
                    <span className="hidden sm:inline">{section.title}</span>
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
                  NeevNews ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website <strong>neevnews.com</strong> (the "Site") and use our services. Please read this 
                  privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the site.
                </p>
              </div>
            </section>

            {/* GDPR/CCPA Notice */}
            <section className="mb-12">
              <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      International Data Protection
                    </h3>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      NeevNews complies with the General Data Protection Regulation (GDPR) for users in the 
                      European Economic Area and the California Consumer Privacy Act (CCPA) for California 
                      residents. If you are located in these regions, you have specific rights regarding 
                      your personal data as outlined in this policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section id="information-we-collect" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Personal Information You Provide
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    We collect information that you voluntarily provide when you:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Subscribe to our newsletter:</strong> Email address, name (optional), preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Contact us:</strong> Name, email address, phone number (optional), message content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Create an account:</strong> Name, email address, password</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Submit comments:</strong> Name, email address, comment content</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Automatically Collected Information
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    When you visit our Site, we automatically collect certain information:
                  </p>
                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Device Information:</strong> Browser type, operating system, device type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Location Data:</strong> Country, city (approximate, based on IP address)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Referral Data:</strong> How you arrived at our Site</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section id="how-we-use" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  How We Use Your Information
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  We use the information we collect for the following purposes:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                      Service Delivery
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Provide and maintain our services</li>
                      <li>• Send newsletters and updates you've subscribed to</li>
                      <li>• Respond to your inquiries and requests</li>
                      <li>• Process and manage your account</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                      Improvement & Analytics
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Analyze usage patterns and trends</li>
                      <li>• Improve our content and user experience</li>
                      <li>• Develop new features and services</li>
                      <li>• Monitor and prevent technical issues</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                      Communication
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Send important updates about our services</li>
                      <li>• Notify you about changes to our policies</li>
                      <li>• Provide customer support</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                      Legal & Security
                    </h4>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300 text-sm">
                      <li>• Comply with legal obligations</li>
                      <li>• Protect against fraudulent or illegal activity</li>
                      <li>• Enforce our terms and policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section id="cookies" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Cookies & Tracking Technologies
                </h2>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                    We use cookies and similar tracking technologies to collect and track information 
                    about your browsing activity. Types of cookies we use:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        Essential Cookies
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        Required for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        Analytics Cookies
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        Help us understand how visitors interact with our website (e.g., Google Analytics).
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        Preference Cookies
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        Remember your settings and preferences (e.g., dark mode, language).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        Managing Cookies
                      </h4>
                      <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                        You can control cookies through your browser settings. Note that disabling 
                        cookies may affect website functionality. For more details, see our{' '}
                        <Link href="/cookies" className="text-primary-600 hover:underline">
                          Cookie Policy
                        </Link>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Data Sharing & Disclosure
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  We do not sell your personal information. We may share your information in the 
                  following circumstances:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Service Providers</h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        With trusted third-party service providers who assist in operating our website 
                        (e.g., hosting, email services, analytics).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Legal Requirements</h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        When required by law, court order, or government request.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Business Transfers</h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        In connection with a merger, acquisition, or sale of assets.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">With Your Consent</h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        When you have given us explicit permission to share your information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Your Rights
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Right to Access', desc: 'Request a copy of your personal data' },
                    { title: 'Right to Rectification', desc: 'Correct inaccurate or incomplete data' },
                    { title: 'Right to Erasure', desc: 'Request deletion of your personal data' },
                    { title: 'Right to Restrict Processing', desc: 'Limit how we use your data' },
                    { title: 'Right to Data Portability', desc: 'Receive your data in a portable format' },
                    { title: 'Right to Object', desc: 'Object to processing of your data' },
                    { title: 'Right to Withdraw Consent', desc: 'Withdraw previously given consent' },
                    { title: 'Right to Opt-Out', desc: 'Opt-out of marketing communications' }
                  ].map((right, index) => (
                    <div key={index} className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        {right.title}
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        {right.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline font-medium">
                      abhinavvoicebox@gmail.com
                    </a>. We will respond to your request within 30 days.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section id="security" className="mb-12 scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Data Security
                </h2>
              </div>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">SSL/TLS encryption for data transmission</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">Secure cloud infrastructure (Firebase)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">Regular security assessments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">Access controls and authentication</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">Data backup and recovery procedures</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">Employee training on data protection</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                    <strong>Note:</strong> While we strive to protect your personal information, no method 
                    of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                  </p>
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
                  We retain your personal information only for as long as necessary to fulfill the 
                  purposes outlined in this Privacy Policy:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li>• <strong>Newsletter subscriptions:</strong> Until you unsubscribe</li>
                  <li>• <strong>Account data:</strong> Until you delete your account</li>
                  <li>• <strong>Contact form submissions:</strong> Up to 2 years</li>
                  <li>• <strong>Analytics data:</strong> Up to 26 months (Google Analytics default)</li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Children's Privacy
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  Our services are not directed to children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If we discover that a child 
                  under 13 has provided us with personal information, we will delete it immediately. 
                  If you are a parent or guardian and believe your child has provided us with personal 
                  information, please contact us.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Changes to This Privacy Policy
              </h2>

              <div className="card p-6">
                <p className="text-secondary-700 dark:text-secondary-300">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the "Last Updated" 
                  date. We encourage you to review this Privacy Policy periodically. Your continued 
                  use of the Site after any changes constitutes your acceptance of the updated policy.
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
                      If you have any questions about this Privacy Policy or our data practices, 
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
                <Link href="/terms" className="card p-6 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4">
                  <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">Terms of Service</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">User agreement and guidelines</p>
                  </div>
                </Link>

                <Link href="/cookies" className="card p-6 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4">
                  <Cookie className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">Cookie Policy</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">How we use cookies</p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Footer Note */}
            <div className="text-center text-sm text-secondary-500 py-8 mt-12 border-t border-secondary-200 dark:border-secondary-700">
              <p>GDPR & CCPA Compliant</p>
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

export default PrivacyPage;
