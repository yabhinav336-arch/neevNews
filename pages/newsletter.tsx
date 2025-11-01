import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { Mail, CheckCircle, TrendingUp, Clock, Users, Zap, Star, Bell } from 'lucide-react';
import { subscribeToNewsletter } from '../services/newsletter';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    science: true,
    technology: true,
    health: true,
    politics: false,
    business: false,
    worldNews: false
  });
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await subscribeToNewsletter(email, 'newsletter-page');
    
    if (result.success) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setErrorMessage(result.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <Layout
      title="Newsletter - NeevNews | Daily Science, Tech & Health Updates"
      description="Subscribe to NeevNews newsletter for daily or weekly updates on science, technology, health, politics, and global news. Get curated stories delivered to your inbox."
      keywords="neevnews newsletter, science newsletter, technology newsletter, health news digest, daily news email"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/newsletter" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <Mail size={56} className="mx-auto mb-6" />
              <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
                Subscribe to Our Newsletter
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Get the best of NeevNews delivered straight to your inbox. Stay informed with 
                curated stories on science, technology, health, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                Why Subscribe?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Zap size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Curated Content
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Hand-picked stories from our editorial team. Only the most important 
                    news, no clutter.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Clock size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Save Time
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Get your news digest in minutes. No need to browse multiple sources 
                    throughout the day.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Star size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Exclusive Content
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Subscriber-only insights, analysis, and early access to special 
                    features and reports.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Bell size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Breaking News Alerts
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Be the first to know about major developments in science, technology, 
                    and global affairs.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Join 10,000+ Readers
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Be part of a community of informed readers who value quality journalism 
                    and meaningful news.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Personalized Feed
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Choose topics you care about. Get news tailored to your interests 
                    and preferences.
                  </p>
                </div>
              </div>
            </section>

            {/* Subscription Form */}
            <section className="mb-16">
              <div className="max-w-3xl mx-auto">
                <div className="card p-8 lg:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-3">
                      Subscribe Now
                    </h2>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400">
                      Free forever. Unsubscribe anytime. No spam, ever.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label htmlFor="newsletter-email" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="newsletter-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white text-lg"
                      />
                    </div>

                    {/* Frequency Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                        Delivery Frequency
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFrequency('daily')}
                          className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                            frequency === 'daily'
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400'
                          }`}
                        >
                          <div className="font-semibold text-secondary-900 dark:text-white mb-1">
                            Daily Digest
                          </div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">
                            Every morning at 8 AM
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFrequency('weekly')}
                          className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                            frequency === 'weekly'
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400'
                          }`}
                        >
                          <div className="font-semibold text-secondary-900 dark:text-white mb-1">
                            Weekly Roundup
                          </div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">
                            Every Sunday morning
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Topic Preferences */}
                    <div>
                      <label className="block text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                        Topics of Interest (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'science', label: 'Science & Research', icon: '🔬' },
                          { key: 'technology', label: 'Technology', icon: '💻' },
                          { key: 'health', label: 'Health & Wellness', icon: '🏥' },
                          { key: 'politics', label: 'Politics', icon: '🏛️' },
                          { key: 'business', label: 'Business', icon: '💼' },
                          { key: 'worldNews', label: 'World News', icon: '🌍' }
                        ].map(({ key, label, icon }) => (
                          <label
                            key={key}
                            className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              preferences[key as keyof typeof preferences]
                                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={preferences[key as keyof typeof preferences]}
                              onChange={() => handlePreferenceChange(key)}
                              className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-lg">{icon}</span>
                            <span className="text-sm font-medium text-secondary-900 dark:text-white">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-lg font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle size={24} />
                          <span>Successfully Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <Mail size={24} />
                          <span>Subscribe to Newsletter</span>
                        </>
                      )}
                    </button>

                    {/* Status Messages */}
                    {status === 'success' && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-green-800 dark:text-green-200 text-center">
                          🎉 Welcome aboard! Check your inbox for a confirmation email.
                        </p>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-800 dark:text-red-200 text-center">
                          {errorMessage}
                        </p>
                      </div>
                    )}

                    {/* Privacy Note */}
                    <p className="text-xs text-center text-secondary-600 dark:text-secondary-400">
                      By subscribing, you agree to receive emails from NeevNews. 
                      You can unsubscribe at any time. We respect your privacy and will never 
                      share your email with third parties. View our{' '}
                      <a href="/privacy" className="text-primary-600 hover:underline">
                        Privacy Policy
                      </a>.
                    </p>
                  </form>
                </div>
              </div>
            </section>

            {/* What You'll Get */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                What's in the Newsletter?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Daily Digest Includes:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Top 5 Stories</strong> - The most important news of the day
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Science Highlight</strong> - Latest breakthrough or discovery
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Tech Watch</strong> - Innovation and technology trends
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Quick Reads</strong> - 3-minute summaries of complex topics
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Numbers That Matter</strong> - Data and statistics explained
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    Weekly Roundup Includes:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Week in Review</strong> - Comprehensive summary of major events
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Deep Dive</strong> - Long-form analysis of a trending topic
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Editor's Picks</strong> - Must-read stories from the week
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>What's Next</strong> - Upcoming events and developments
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 dark:text-secondary-300">
                        <strong>Recommended Reading</strong> - Curated content from across the web
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                What Subscribers Say
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4 italic">
                    "The best way to start my day. Concise, informative, and always interesting."
                  </p>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    — Priya S., Software Engineer
                  </p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4 italic">
                    "Finally, a news digest that doesn't overwhelm me. Quality over quantity!"
                  </p>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    — Rahul M., Research Scientist
                  </p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-4 italic">
                    "Love the science and tech focus. It's like having a smart friend curate news for me."
                  </p>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    — Anjali K., Product Manager
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="card p-6">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Is the newsletter really free?
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Yes! Our newsletter is completely free and always will be. No hidden costs, 
                    no premium tiers—just quality news delivered to your inbox.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    How do I unsubscribe?
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Every email includes an easy one-click unsubscribe link at the bottom. 
                    No questions asked, no hassle.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Will you share my email address?
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Never. We respect your privacy and will never sell, rent, or share your 
                    email address with anyone. Period.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    Can I change my preferences later?
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300">
                    Absolutely! Every newsletter includes a link to update your preferences—
                    change topics, frequency, or unsubscribe anytime.
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

export default NewsletterPage;

