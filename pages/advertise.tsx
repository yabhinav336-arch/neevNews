import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { TrendingUp, Users, Target, Eye, BarChart, Globe, Mail, Phone, CheckCircle } from 'lucide-react';

const AdvertisePage = () => {
  return (
    <Layout
      title="Advertise with NeevNews | Reach Engaged Readers"
      description="Partner with NeevNews to reach thousands of engaged readers interested in science, technology, health, and global news. Explore advertising opportunities and sponsorship packages."
      keywords="advertise neevnews, news advertising, digital advertising, sponsored content, banner ads, native ads, brand partnerships"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/advertise" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp size={48} className="mx-auto mb-6" />
              <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
                Advertise with NeevNews
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Reach thousands of engaged readers interested in science, technology, health, and global affairs.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Why Advertise */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Why Advertise with Us?
                </h2>
                <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
                  Connect with an educated, engaged audience that values quality content
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Engaged Audience
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Our readers spend an average of 4+ minutes per article, demonstrating 
                    genuine interest and engagement with content.
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Targeted Reach
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Focus your advertising on specific categories: science, technology, health, 
                    politics, or business audiences.
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Global & Local
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Reach readers across India and internationally with our growing 
                    digital presence.
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Brand Visibility
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Premium placements ensure your brand gets noticed by the right audience 
                    at the right time.
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Transparent Metrics
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Detailed analytics and reporting so you can track the performance 
                    of your campaigns.
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Growing Platform
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Join us as we grow. Early partners benefit from competitive rates 
                    and premium positioning.
                  </p>
                </div>
              </div>
            </section>

            {/* Audience Demographics */}
            <section className="mb-16">
              <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                  Our Audience
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      50K+
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300">Monthly Readers</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      25-45
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300">Age Range (Majority)</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      65%
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300">College Educated</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      4:12
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300">Avg. Time on Site</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4 text-center">
                    Top Reader Interests
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-full text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700">
                      Science & Research
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-full text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700">
                      Technology
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-full text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700">
                      Health & Wellness
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-full text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700">
                      Innovation
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-full text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700">
                      Global Affairs
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Advertising Options */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Advertising Solutions
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  Flexible options to meet your marketing goals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                {/* Display Advertising */}
                <div className="card p-8 border-l-4 border-primary-600">
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Display Advertising
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                    Premium banner placements across our site with guaranteed impressions 
                    and strategic positioning.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Homepage banner (728x90, 300x250)
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Sidebar placements on article pages
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0-5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Category-specific targeting
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Mobile and desktop optimized
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Starting from ₹15,000/month
                  </p>
                </div>

                {/* Sponsored Content */}
                <div className="card p-8 border-l-4 border-accent-600">
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Sponsored Content
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                    Native advertising that engages readers through quality content aligned 
                    with your brand message.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Professional content creation
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Clearly labeled as sponsored
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Social media promotion included
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Performance analytics provided
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Starting from ₹25,000/article
                  </p>
                </div>

                {/* Newsletter Sponsorship */}
                <div className="card p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Newsletter Sponsorship
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                    Reach engaged subscribers directly in their inbox with our daily or 
                    weekly newsletter.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Dedicated or shared sponsorship
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Premium positioning in email
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Targeted subscriber segments
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Click-through tracking
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Starting from ₹12,000/edition
                  </p>
                </div>

                {/* Custom Campaigns */}
                <div className="card p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Custom Campaigns
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                    Bespoke advertising solutions tailored to your specific marketing 
                    objectives and budget.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Multi-channel campaigns
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Event partnerships & webinars
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Video content integration
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        Long-term brand partnerships
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Custom pricing available
                  </p>
                </div>

              </div>
            </section>

            {/* Editorial Standards */}
            <section className="mb-16">
              <div className="card p-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                  Our Advertising Standards
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We maintain strict editorial independence. All sponsored content is clearly 
                  labeled, and we reserve the right to refuse advertising that:
                </p>
                <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Contains false, misleading, or unsubstantiated claims</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Promotes illegal products or services</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Conflicts with our editorial values or audience interests</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Contains discriminatory or offensive content</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="card p-10 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4 font-serif">
                  Ready to Partner with NeevNews?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help you reach your marketing goals. 
                  Contact our advertising team today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href="mailto:theneevnews@gmail.com?subject=Advertising Inquiry"
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <Mail size={20} />
                    <span>Email Us</span>
                  </a>
                  <a
                    href="tel:+919369336080"
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
                  >
                    <Phone size={20} />
                    <span>Call: +91 93693 36080</span>
                  </a>
                </div>

                <div className="text-white/80 text-sm">
                  <p>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 text-center">
                  <Mail size={32} className="mx-auto mb-3 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Email
                  </h3>
                  <a 
                    href="mailto:theneevnews@gmail.com" 
                    className="text-primary-600 hover:text-primary-700"
                  >
                    theneevnews@gmail.com
                  </a>
                </div>

                <div className="card p-6 text-center">
                  <Phone size={32} className="mx-auto mb-3 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Phone
                  </h3>
                  <a 
                    href="tel:+919369336080" 
                    className="text-primary-600 hover:text-primary-700"
                  >
                    +91 93693 36080
                  </a>
                </div>

                <div className="card p-6 text-center">
                  <Globe size={32} className="mx-auto mb-3 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Location
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Noida, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdvertisePage;

