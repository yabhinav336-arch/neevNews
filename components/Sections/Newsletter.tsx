import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm.');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
            Never Miss a Story
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join over 100,000 readers who trust NeevNews for their daily dose of global news and insights
          </p>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-secondary-900 placeholder-secondary-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                  disabled={status === 'loading'}
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center justify-center space-x-2 text-green-200">
                  <CheckCircle size={20} />
                  <span>{message}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center justify-center space-x-2 text-red-200">
                  <AlertCircle size={20} />
                  <span>{message}</span>
                </div>
              )}
            </form>

            {/* Privacy Notice */}
            <p className="text-primary-200 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="font-semibold mb-2">Daily Digest</h3>
              <p className="text-primary-200 text-sm">
                Curated top stories delivered every morning
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Breaking News</h3>
              <p className="text-primary-200 text-sm">
                Instant alerts for major global events
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Personalized</h3>
              <p className="text-primary-200 text-sm">
                Content tailored to your interests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
