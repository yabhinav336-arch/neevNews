import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Newspaper, 
  Mail, 
  Calendar, 
  ArrowRight,
  Globe,
  Users,
  Mic,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

const PressPage = () => {
  const faqs = [
    {
      question: 'How can I request an interview with NeevNews leadership?',
      answer: 'Please email our press team at abhinavvoicebox@gmail.com with your media outlet, deadline, and interview topics. We typically respond within 24 hours.'
    },
    {
      question: 'Can I use NeevNews content in my publication?',
      answer: 'For content licensing and syndication inquiries, please contact us directly. Brief quotes with attribution are generally permitted for news coverage.'
    },
    {
      question: 'How do I submit a press release to NeevNews?',
      answer: 'We welcome press releases relevant to our coverage areas. Send them to abhinavvoicebox@gmail.com with "Press Release" in the subject line.'
    },
    {
      question: 'Does NeevNews offer expert commentary for other media?',
      answer: 'Yes, our editors and journalists are available for expert commentary on topics within our coverage areas. Contact our press team to arrange.'
    }
  ];

  return (
    <Layout 
      title="Press Center - NeevNews | Media Resources & Contact" 
      description="NeevNews press center. Access contact information for journalists and media professionals."
      keywords="neevnews press, press contact, journalism, media resources"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/press" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
                <Newspaper size={40} />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-serif mb-6">
                Press Center
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
                Resources for journalists and media professionals covering NeevNews. 
                Find contact information and company details.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:abhinavvoicebox@gmail.com?subject=Press Inquiry"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>Contact Press Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-primary-600 text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">Sep 2025</div>
                <div className="text-white/80">Launch Date</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-white/80">Target Readers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">8</div>
                <div className="text-white/80">News Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Global</div>
                <div className="text-white/80">Coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                  About NeevNews
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    NeevNews is a modern digital news platform focused on delivering quality 
                    journalism in science, technology, health, and global affairs. Founded in 2025, 
                    we aim to bridge the gap between complex topics and general audiences.
                  </p>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Our team of experienced journalists, scientists, and technologists work 
                    together to provide accurate, insightful, and accessible news coverage 
                    to readers around the world.
                  </p>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    The name "Neev" comes from the Hindi word meaning "foundation," reflecting 
                    our commitment to building a strong foundation of knowledge for our readers.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700"
                  >
                    <span>Learn more about us</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                    Key Facts
                  </h3>
                  <ul className="space-y-3 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start gap-3">
                      <Calendar size={18} className="text-primary-600 dark:text-primary-400 mt-0.5" />
                      <span><strong>Founded:</strong> 2025</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary-600 dark:text-primary-400 mt-0.5" />
                      <span><strong>Headquarters:</strong> Noida, Uttar Pradesh, India</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users size={18} className="text-primary-600 dark:text-primary-400 mt-0.5" />
                      <span><strong>Team Size:</strong> Growing team of journalists and staff</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe size={18} className="text-primary-600 dark:text-primary-400 mt-0.5" />
                      <span><strong>Coverage:</strong> Science, Technology, Health, Politics, Business, World</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                    Leadership
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Founder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900 dark:text-white">Abhinav Kumar</div>
                      <div className="text-secondary-600 dark:text-secondary-400">Founder & Editor-in-Chief</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Press FAQ
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Press Contact */}
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto">
            <div className="card p-10 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800 text-center">
              <Mic size={48} className="mx-auto mb-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                Press Contact
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
                For press inquiries, interview requests, or additional information, 
                please contact our communications team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-sm text-secondary-500 mb-1">Email</div>
                  <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    abhinavvoicebox@gmail.com
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-sm text-secondary-500 mb-1">Phone</div>
                  <a href="tel:+919369336080" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    +91 93693 36080
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-sm text-secondary-500 mb-1">Location</div>
                  <span className="text-secondary-700 dark:text-secondary-300">Noida, India</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/neev-news-855010395/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg text-secondary-600 dark:text-secondary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://x.com/NeevNews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg text-secondary-600 dark:text-secondary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com/neevnews/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg text-secondary-600 dark:text-secondary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressPage;
