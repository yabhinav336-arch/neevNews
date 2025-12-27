import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { subscribeToNewsletter } from '../services/newsletter';
import { 
  Mail, 
  CheckCircle, 
  Zap, 
  Clock, 
  Globe, 
  Shield,
  TrendingUp,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Bell,
  Gift
} from 'lucide-react';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [selectedNewsletter, setSelectedNewsletter] = useState<string[]>(['daily']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await subscribeToNewsletter(email, 'newsletter-page');
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }

    setTimeout(() => {
      if (status !== 'success') {
        setStatus('idle');
        setMessage('');
      }
    }, 5000);
  };

  const toggleNewsletter = (id: string) => {
    setSelectedNewsletter(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const newsletters = [
    {
      id: 'daily',
      name: 'Daily Digest',
      description: 'Top stories of the day delivered every morning at 7 AM IST.',
      frequency: 'Daily',
      icon: <Clock className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'weekly',
      name: 'Weekly Roundup',
      description: 'The week\'s most important stories and analysis, every Sunday.',
      frequency: 'Weekly',
      icon: <BookOpen className="w-6 h-6" />,
      popular: false
    },
    {
      id: 'breaking',
      name: 'Breaking News Alerts',
      description: 'Instant notifications for major breaking news and developments.',
      frequency: 'As it happens',
      icon: <Zap className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'tech',
      name: 'Tech & Science Weekly',
      description: 'Deep dives into technology and scientific breakthroughs.',
      frequency: 'Weekly',
      icon: <Sparkles className="w-6 h-6" />,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Stay Ahead',
      description: 'Get the most important news before everyone else, curated by our expert editors.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Save Time',
      description: 'No need to browse multiple sources. We bring the best stories directly to your inbox.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Deep Insights',
      description: 'Beyond headlines – get context, analysis, and expert perspectives on complex topics.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Ad-Free Experience',
      description: 'Clean, focused content without distracting advertisements in your inbox.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Coverage',
      description: 'Stories from around the world that matter, covering science, tech, health, and more.'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Exclusive Content',
      description: 'Newsletter-only features, early access to stories, and subscriber perks.'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Subscribers' },
    { value: '45%', label: 'Open Rate' },
    { value: '4.8/5', label: 'Reader Rating' },
    { value: '0', label: 'Spam Complaints' }
  ];

  const testimonials = [
    {
      quote: "The Daily Digest has become my morning ritual. It's the perfect way to start the day informed.",
      author: "Priya M.",
      role: "Software Engineer"
    },
    {
      quote: "Finally, a newsletter that respects my time. Concise, relevant, and always interesting.",
      author: "Rahul K.",
      role: "Business Analyst"
    },
    {
      quote: "The science and tech coverage is exceptional. I've learned so much from their weekly deep dives.",
      author: "Dr. Ananya S.",
      role: "Research Scientist"
    }
  ];

  const sampleContent = [
    {
      category: 'Science',
      title: 'New Study Reveals Promising Results for Alzheimer\'s Treatment',
      preview: 'Researchers at MIT have developed a novel approach that could slow cognitive decline...'
    },
    {
      category: 'Technology',
      title: 'The AI Revolution in Healthcare: What\'s Next?',
      preview: 'From diagnosis to drug discovery, artificial intelligence is transforming medicine...'
    },
    {
      category: 'Health',
      title: 'Understanding the Latest COVID-19 Variant',
      preview: 'Health experts weigh in on what the new variant means for public health...'
    }
  ];

  return (
    <Layout 
      title="Newsletter - NeevNews | Subscribe for Daily News Updates" 
      description="Subscribe to NeevNews newsletters for curated news on science, technology, health, and global affairs. Daily digest, weekly roundup, and breaking news alerts."
      keywords="neevnews newsletter, daily news digest, science newsletter, tech news email, subscribe news, email updates"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/newsletter" />
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
                <Mail size={40} />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-serif mb-6">
                Stay Informed
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
                Join 50,000+ readers who start their day with NeevNews. Get curated news 
                on science, technology, health, and global affairs delivered to your inbox.
              </p>

              {/* Quick Subscribe Form */}
              {status !== 'success' ? (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={status === 'loading'}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-secondary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Free</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="mt-3 text-red-200">{message}</p>
                  )}
                  <p className="mt-4 text-white/70 text-sm">
                    Free forever. No spam. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <CheckCircle size={48} className="mx-auto mb-4 text-green-300" />
                  <h3 className="text-2xl font-bold mb-2">You're In! 🎉</h3>
                  <p className="text-white/90">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
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

        {/* Newsletter Types */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                Choose Your Newsletters
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                Customize your reading experience. Select the newsletters that match your interests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter.id}
                  onClick={() => toggleNewsletter(newsletter.id)}
                  className={`card p-6 cursor-pointer transition-all duration-300 ${
                    selectedNewsletter.includes(newsletter.id)
                      ? 'border-2 border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedNewsletter.includes(newsletter.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      }`}>
                        {newsletter.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                            {newsletter.name}
                          </h3>
                          {newsletter.popular && (
                            <span className="px-2 py-0.5 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs font-medium rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">
                          {newsletter.description}
                        </p>
                        <span className="text-xs text-secondary-500 flex items-center gap-1">
                          <Bell size={12} />
                          {newsletter.frequency}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedNewsletter.includes(newsletter.id)
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-secondary-300 dark:border-secondary-600'
                    }`}>
                      {selectedNewsletter.includes(newsletter.id) && (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Why Subscribe?
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  More than just news – a smarter way to stay informed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-primary-600 dark:text-primary-400 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sample Content */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                What You'll Get
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                A sneak peek at the kind of content we deliver to your inbox.
              </p>
            </div>

            <div className="card p-8 bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900 dark:to-secondary-950">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src="/logo.png" alt="NeevNews" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-secondary-900 dark:text-white">NeevNews Daily Digest</div>
                  <div className="text-sm text-secondary-500">Today's Top Stories</div>
                </div>
              </div>

              <div className="space-y-6">
                {sampleContent.map((item, index) => (
                  <div key={index} className="border-b border-secondary-200 dark:border-secondary-700 pb-6 last:border-0 last:pb-0">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      {item.preview}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700 text-center">
                <p className="text-secondary-500 text-sm">
                  ...and much more in every edition
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Star size={48} className="mx-auto mb-4" />
                <h2 className="text-4xl font-bold font-serif mb-4">
                  What Readers Say
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-300 fill-yellow-300" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-white/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
              Ready to Stay Informed?
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
              Join thousands of readers who trust NeevNews for their daily dose of quality journalism.
            </p>

            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === 'loading'}
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-all duration-200 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe Free</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="mt-3 text-red-600 dark:text-red-400">{message}</p>
                )}
              </form>
            ) : (
              <div className="card p-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                  Welcome Aboard! 🎉
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">{message}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                Free forever
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                Unsubscribe anytime
              </span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: 'Is the newsletter really free?',
                    a: 'Yes! Our newsletter is completely free. We believe quality journalism should be accessible to everyone.'
                  },
                  {
                    q: 'How often will I receive emails?',
                    a: 'It depends on your preferences. The Daily Digest comes every morning, the Weekly Roundup on Sundays, and Breaking News alerts only for major stories.'
                  },
                  {
                    q: 'Can I unsubscribe anytime?',
                    a: 'Absolutely. Every email includes an unsubscribe link. One click and you\'re out – no questions asked.'
                  },
                  {
                    q: 'Will you share my email with third parties?',
                    a: 'Never. Your privacy is important to us. We don\'t sell, rent, or share your email address with anyone.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterPage;
