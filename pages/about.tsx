import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Users, Target, Award, Globe, Heart, TrendingUp, CheckCircle, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout
      title="About Us - NeevNews | Your Trusted Source for Science, Tech & Global News"
      description="Learn about NeevNews - a modern digital news platform launching September 8, 2025. Delivering reliable coverage on science, technology, health, politics, and global affairs."
      keywords="about neevnews, news platform, science news, technology news, health news, digital journalism, news mission, editorial team"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/about" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="NeevNews Logo"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
                About NeevNews
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Your trusted source for science, technology, health, and global news. 
                Launching September 8, 2025.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Who We Are */}
            <section className="mb-16">
              <div className="flex items-center mb-8">
                <Users size={32} className="text-primary-600 dark:text-primary-400 mr-4" />
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif">
                  Who We Are
                </h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  NeevNews is a modern digital news platform launching on September 8, 2025, dedicated to 
                  delivering high-quality journalism that informs, educates, and empowers our global audience. 
                  We are a passionate team of journalists, editors, and content creators committed to 
                  bringing you the most relevant and accurate news coverage.
                </p>
                
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  Our newsroom operates with a clear focus on science, technology, health, politics, 
                  and global affairs. We believe that informed citizens are the foundation of a healthy 
                  democracy, and our mission is to provide the information you need to understand the 
                  world around you.
                </p>

                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Based in India with a global perspective, NeevNews combines local expertise with 
                  international reach. We cover stories that matter to you, from groundbreaking scientific 
                  discoveries to the latest technological innovations, from health breakthroughs to 
                  political developments that shape our future.
                </p>
              </div>
            </section>

            {/* Contact CTA */}
            <section className="mb-12">
              <div className="card p-10 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-center">
                <Mail size={48} className="mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 font-serif">
                  Get in Touch
                </h2>
                <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                  Have questions about our coverage or want to share a story tip? 
                  We'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-secondary-50 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="mailto:abhinavvoicebox@gmail.com"
                    className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
