import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout
      title="Contact Us - NeevNews | Get in Touch with Our Team"
      description="Contact NeevNews for inquiries, feedback, story tips, or press relations. Reach our editorial team via email, phone, or contact form. We're here to help!"
      keywords="contact neevnews, news contact, story tips, press contact, editorial contact, feedback, inquiries"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/contact" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <MessageCircle size={48} className="mx-auto mb-6" />
              <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-white/90">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  Email Us
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
                  For all inquiries and feedback
                </p>
                <a 
                  href="mailto:theneevnews@gmail.com" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  theneevnews@gmail.com
                </a>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  Call Us
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
                  Monday to Friday, 9 AM - 6 PM IST
                </p>
                <a 
                  href="tel:+919369336080" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  +91 93693 36080
                </a>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  Visit Us
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
                  Our editorial office
                </p>
                <p className="text-primary-600 font-medium">
                  Noida Sector 27<br />
                  Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="story-tip">Story Tip</option>
                      <option value="feedback">Feedback</option>
                      <option value="advertising">Advertising</option>
                      <option value="press">Press/Media Relations</option>
                      <option value="technical">Technical Support</option>
                      <option value="correction">Correction Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        Thank you for reaching out! We'll get back to you within 24-48 hours.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Information Section */}
              <div className="space-y-8">
                
                {/* Response Time */}
                <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                  <div className="flex items-start space-x-4">
                    <Clock size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                        Response Time
                      </h3>
                      <p className="text-secondary-700 dark:text-secondary-300">
                        We aim to respond to all inquiries within 24-48 hours during business days. 
                        For urgent media or press inquiries, please call us directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    How Can We Help?
                  </h3>
                  <ul className="space-y-4 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-secondary-900 dark:text-white">Story Tips:</strong> Have a news tip or story idea? We'd love to hear from you.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-secondary-900 dark:text-white">Feedback:</strong> Share your thoughts about our coverage or website.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-secondary-900 dark:text-white">Corrections:</strong> Help us maintain accuracy by reporting errors.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-secondary-900 dark:text-white">Partnerships:</strong> Interested in working with us? Let's talk.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-secondary-900 dark:text-white">Press Relations:</strong> Media inquiries and interview requests.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Business Hours */}
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-secondary-700 dark:text-secondary-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-4">
                    * Email inquiries are monitored 24/7 for urgent matters
                  </p>
                </div>

                {/* Social Media */}
                <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Follow Us
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                    Stay updated with our latest news and stories on social media:
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/neev-news-855010395/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary-800 hover:bg-primary-600 hover:text-white rounded-lg transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/neevnews/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary-800 hover:bg-primary-600 hover:text-white rounded-lg transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://x.com/NeevNews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary-800 hover:bg-primary-600 hover:text-white rounded-lg transition-colors duration-200"
                      aria-label="X (Twitter)"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

