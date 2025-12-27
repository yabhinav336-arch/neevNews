import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Megaphone, 
  Mail, 
  Users, 
  TrendingUp, 
  Globe, 
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  MousePointer,
  Newspaper,
  Video,
  PenTool,
  Send,
  Phone,
  Building
} from 'lucide-react';

const AdvertisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '500K+', label: 'Monthly Readers' },
    { icon: <Eye className="w-8 h-8" />, value: '2M+', label: 'Monthly Page Views' },
    { icon: <Globe className="w-8 h-8" />, value: '150+', label: 'Countries Reached' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '85%', label: 'Engagement Rate' }
  ];

  const audienceDemo = [
    { label: 'Age 25-44', percentage: 65 },
    { label: 'College Educated', percentage: 78 },
    { label: 'Decision Makers', percentage: 45 },
    { label: 'Tech Enthusiasts', percentage: 72 },
    { label: 'Business Professionals', percentage: 58 }
  ];

  const adFormats = [
    {
      icon: <Newspaper className="w-10 h-10" />,
      title: 'Display Advertising',
      description: 'Premium banner placements across our website including homepage, article pages, and category sections.',
      features: ['Leaderboard (728x90)', 'Medium Rectangle (300x250)', 'Skyscraper (160x600)', 'Mobile Banners']
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: 'Sponsored Content',
      description: 'Native articles written by our editorial team that tell your brand story to our engaged audience.',
      features: ['Editorial quality writing', 'SEO optimized', 'Social media promotion', 'Permanent placement']
    },
    {
      icon: <Mail className="w-10 h-10" />,
      title: 'Newsletter Sponsorship',
      description: 'Reach our most engaged subscribers directly in their inbox with dedicated newsletter placements.',
      features: ['Dedicated sends', 'Banner placements', 'Native mentions', 'High open rates']
    },
    {
      icon: <Video className="w-10 h-10" />,
      title: 'Video Advertising',
      description: 'Pre-roll and mid-roll video ads on our growing video content platform.',
      features: ['Pre-roll ads', 'Branded content', 'YouTube integration', 'Social video']
    }
  ];

  const packages = [
    {
      name: 'Starter',
      price: '₹25,000',
      period: 'per month',
      description: 'Perfect for small businesses and startups looking to build brand awareness.',
      features: [
        'Display ads (50K impressions)',
        'Newsletter mention (1x/month)',
        'Basic analytics dashboard',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Growth',
      price: '₹75,000',
      period: 'per month',
      description: 'Ideal for growing companies seeking to expand their reach and engagement.',
      features: [
        'Display ads (200K impressions)',
        'Newsletter sponsorship (2x/month)',
        '1 Sponsored article',
        'Advanced analytics',
        'Dedicated account manager',
        'A/B testing support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'Full-scale campaigns for enterprises requiring comprehensive media solutions.',
      features: [
        'Unlimited display impressions',
        'Exclusive newsletter sponsorship',
        'Monthly sponsored content',
        'Video advertising',
        'Custom integrations',
        'Priority support',
        'Quarterly strategy reviews'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: "NeevNews helped us reach a highly engaged, educated audience that perfectly matched our target demographic. The ROI exceeded our expectations.",
      author: "Marketing Director",
      company: "Tech Startup"
    },
    {
      quote: "The sponsored content program delivered exceptional results. The editorial quality was outstanding and drove significant traffic to our website.",
      author: "Brand Manager",
      company: "Healthcare Company"
    }
  ];

  return (
    <Layout 
      title="Advertise with NeevNews - Reach 500K+ Engaged Readers" 
      description="Advertise on NeevNews and reach 500K+ monthly readers interested in science, technology, health, and business. Display ads, sponsored content, newsletter sponsorship, and more."
      keywords="advertise neevnews, news advertising, sponsored content, display advertising, newsletter sponsorship, media kit, advertising rates"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/advertise" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
                <Megaphone size={40} />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-serif mb-6">
                Advertise with Us
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
                Connect your brand with 500K+ engaged readers who trust NeevNews for 
                science, technology, health, and business insights.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-colors duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </a>
                <a
                  href="mailto:abhinavvoicebox@gmail.com?subject=Advertising Inquiry - Media Kit Request"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>Request Media Kit</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-secondary-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-secondary-600 dark:text-secondary-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Advertise With Us */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                Why Advertise with NeevNews?
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                Reach an audience that matters. Our readers are educated, engaged, and ready to act.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Our Audience Demographics
                </h3>
                <div className="space-y-4">
                  {audienceDemo.map((demo, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-secondary-700 dark:text-secondary-300 font-medium">
                          {demo.label}
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">
                          {demo.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${demo.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Target className="w-6 h-6" />, title: 'Targeted Reach', desc: 'Reach readers interested in your industry' },
                  { icon: <Zap className="w-6 h-6" />, title: 'High Engagement', desc: 'Above-industry-average click-through rates' },
                  { icon: <BarChart3 className="w-6 h-6" />, title: 'Detailed Analytics', desc: 'Real-time campaign performance data' },
                  { icon: <MousePointer className="w-6 h-6" />, title: 'Brand Safety', desc: 'Premium, brand-safe environment' }
                ].map((item, index) => (
                  <div key={index} className="card p-5 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-primary-600 dark:text-primary-400 mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Formats */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Advertising Formats
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  Choose from a variety of ad formats to tell your brand story effectively.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {adFormats.map((format, index) => (
                  <div key={index} className="card p-8 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-primary-600 dark:text-primary-400 mb-4">
                      {format.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-3">
                      {format.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {format.description}
                    </p>
                    <ul className="space-y-2">
                      {format.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="container-custom py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                Advertising Packages
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                Flexible packages designed to meet your marketing goals and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`card p-8 relative ${
                    pkg.popular
                      ? 'border-2 border-primary-500 dark:border-primary-400'
                      : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                      {pkg.price}
                    </span>
                    <span className="text-secondary-600 dark:text-secondary-400 ml-2">
                      {pkg.period}
                    </span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-secondary-700 dark:text-secondary-300">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#contact-form"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      pkg.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 text-secondary-900 dark:text-white'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  What Our Partners Say
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="card p-8">
                    <div className="text-4xl text-primary-400 mb-4">"</div>
                    <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-semibold text-secondary-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Let's Work Together
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                  Ready to reach our engaged audience? Fill out the form and our advertising 
                  team will get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Email Us</h4>
                      <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:text-primary-700">
                        abhinavvoicebox@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Call Us</h4>
                      <a href="tel:+919369336080" className="text-primary-600 hover:text-primary-700">
                        +91 93693 36080
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">Office</h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Noida Sector 27<br />
                        Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
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
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Monthly Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-25k">Under ₹25,000</option>
                      <option value="25k-75k">₹25,000 - ₹75,000</option>
                      <option value="75k-150k">₹75,000 - ₹1,50,000</option>
                      <option value="150k-plus">₹1,50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Tell Us About Your Campaign *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white resize-none"
                      placeholder="Describe your advertising goals and target audience..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200"
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
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        Thank you for your interest! Our advertising team will contact you within 24 hours.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdvertisePage;
