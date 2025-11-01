import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Newspaper, Download, Mail, Phone, FileText, Image as ImageIcon, Award, Users } from 'lucide-react';

const PressPage = () => {
  return (
    <Layout
      title="Press Center - NeevNews | Media Kit & Press Releases"
      description="Media resources for journalists and press. Download NeevNews logos, access press releases, and contact our media relations team for interviews and inquiries."
      keywords="neevnews press, media kit, press releases, brand assets, media contact, journalism resources"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/press" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <Newspaper size={48} className="mx-auto mb-6" />
              <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
                Press Center
              </h1>
              <p className="text-xl text-white/90">
                Media resources, press releases, and contact information for journalists
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* About NeevNews */}
            <section className="mb-16">
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                  About NeevNews
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                  <strong>NeevNews</strong> is a digital news platform launching on September 8, 2025, dedicated to 
                  delivering accurate, timely, and engaging journalism focused on science, technology, 
                  health, politics, and global affairs. Based in Noida, India, we serve a growing 
                  audience of engaged readers who value quality reporting and in-depth analysis.
                </p>
                  <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                    Our mission is to inform and empower readers through accessible, well-researched 
                    journalism that breaks down complex topics into understandable narratives. We maintain 
                    strict editorial standards, fact-check rigorously, and prioritize accuracy over speed.
                  </p>
                  <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    NeevNews represents a new generation of digital journalism—combining traditional 
                    journalistic values with modern technology to reach audiences where they are.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Facts */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                NeevNews at a Glance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Launch Date
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">September 8, 2025</p>
                </div>

                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Headquarters
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">Noida, India</p>
                </div>

                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">🌐</div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Website
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">neevnews.app</p>
                </div>

                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">📰</div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Focus Areas
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                    Science, Tech, Health, Politics
                  </p>
                </div>
              </div>
            </section>

            {/* Media Contact */}
            <section className="mb-16">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="flex items-center mb-6">
                  <Users size={32} className="text-primary-600 dark:text-primary-400 mr-4" />
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                    Media Contact
                  </h2>
                </div>
                
                <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6">
                  For press inquiries, interview requests, or media partnerships, please contact 
                  our media relations team:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <Mail size={24} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        Email
                      </h3>
                      <a 
                        href="mailto:theneevnews@gmail.com" 
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        theneevnews@gmail.com
                      </a>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                        Response time: Within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone size={24} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        Phone
                      </h3>
                      <a 
                        href="tel:+919369336080" 
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        +91 93693 36080
                      </a>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                        Mon-Fri, 9 AM - 6 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-secondary-700 dark:text-secondary-300">
                    <strong>For urgent media inquiries:</strong> Please call directly or mark your 
                    email subject line with "URGENT PRESS INQUIRY" for priority response.
                  </p>
                </div>
              </div>
            </section>

            {/* Brand Assets */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                Brand Assets & Media Kit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Logos */}
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <ImageIcon size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      Logo Package
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Official NeevNews logos in various formats and color variations for print 
                    and digital use.
                  </p>
                  <ul className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    <li>• PNG, SVG, and EPS formats</li>
                    <li>• Full color and monochrome versions</li>
                    <li>• Transparent backgrounds</li>
                    <li>• Usage guidelines included</li>
                  </ul>
                  <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200">
                    <Download size={18} />
                    <span>Download Logos</span>
                  </button>
                </div>

                {/* Brand Guidelines */}
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <FileText size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      Brand Guidelines
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Comprehensive brand guidelines including logo usage, color palette, 
                    typography, and editorial style.
                  </p>
                  <ul className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    <li>• Logo usage and spacing rules</li>
                    <li>• Brand color codes (HEX, RGB)</li>
                    <li>• Typography specifications</li>
                    <li>• Do's and don'ts</li>
                  </ul>
                  <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200">
                    <Download size={18} />
                    <span>Download Guidelines</span>
                  </button>
                </div>

                {/* Screenshots */}
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <ImageIcon size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      Product Screenshots
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    High-resolution screenshots of the NeevNews website, mobile views, 
                    and key features.
                  </p>
                  <ul className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    <li>• Homepage and article pages</li>
                    <li>• Desktop and mobile views</li>
                    <li>• Dark and light mode</li>
                    <li>• High-resolution PNGs</li>
                  </ul>
                  <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200">
                    <Download size={18} />
                    <span>Download Screenshots</span>
                  </button>
                </div>

                {/* Fact Sheet */}
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <FileText size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      Media Fact Sheet
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Quick reference sheet with key facts, statistics, and background 
                    information about NeevNews.
                  </p>
                  <ul className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    <li>• Company overview</li>
                    <li>• Key statistics and milestones</li>
                    <li>• Editorial focus areas</li>
                    <li>• Contact information</li>
                  </ul>
                  <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200">
                    <Download size={18} />
                    <span>Download Fact Sheet</span>
                  </button>
                </div>

              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                  <strong>Usage Note:</strong> These assets are provided for editorial and press 
                  purposes only. Commercial use requires prior written permission. Please refer 
                  to the brand guidelines for proper usage.
                </p>
              </div>
            </section>

            {/* Press Releases */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8">
                Recent Press Releases
              </h2>

              <div className="space-y-4">
                
                {/* Press Release 1 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                        September 8, 2025
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                        NeevNews Launches Digital Platform for Science and Technology Coverage
                      </h3>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        New digital news platform officially launches with focus on making complex scientific and 
                        technological topics accessible to general audiences...
                      </p>
                      <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2">
                        <span>Read More</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Press Release 2 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                        August 15, 2025
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                        NeevNews Announces Launch Date with Comprehensive Coverage Plans
                      </h3>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        Platform announces September 8, 2025 launch with dedicated sections for science, 
                        technology, health, politics, and global news...
                      </p>
                      <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2">
                        <span>Read More</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 text-center">
                <Link 
                  href="/press/releases" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All Press Releases →
                </Link>
              </div>
            </section>

            {/* Social Media */}
            <section className="mb-16">
              <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                  Follow NeevNews
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  Stay updated with our latest news and announcements on social media:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/in/neev-news-855010395/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200 border border-secondary-200 dark:border-secondary-700"
                  >
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium text-secondary-900 dark:text-white">LinkedIn</span>
                  </a>

                  <a
                    href="https://www.instagram.com/neevnews/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200 border border-secondary-200 dark:border-secondary-700"
                  >
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="font-medium text-secondary-900 dark:text-white">Instagram</span>
                  </a>

                  <a
                    href="https://x.com/NeevNews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200 border border-secondary-200 dark:border-secondary-700"
                  >
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="font-medium text-secondary-900 dark:text-white">X (Twitter)</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Additional Resources */}
            <section>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/about" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">About Us</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Learn more about our mission and values
                  </p>
                </Link>

                <Link href="/policy" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Editorial Policy</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Our commitment to quality journalism
                  </p>
                </Link>

                <Link href="/contact" className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Contact</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Get in touch with our team
                  </p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressPage;

