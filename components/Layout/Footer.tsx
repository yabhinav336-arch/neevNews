import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { categories } from '@/utils/data';
import { subscribeToNewsletter } from '../../services/newsletter';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await subscribeToNewsletter(email, 'footer');
    setStatus(result.success ? 'success' : 'error');
    
    if (result.success) {
      setEmail('');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <footer className="bg-secondary-900 dark:bg-secondary-950 text-secondary-300">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative w-12 h-12 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="NeevNews Logo"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-serif">
                  NeevNews
                </span>
                <span className="text-sm text-secondary-400 -mt-1">
                  Global News & Articles
                </span>
              </div>
            </Link>
            <p className="text-secondary-400 mb-6 text-sm leading-relaxed">
              Your trusted source for global news, in-depth analysis, and compelling stories from around the world. 
              Stay informed with accurate, timely reporting on the issues that matter most.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Advertise
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Press Center
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <a href="mailto:abhinavvoicebox@gmail.com" className="text-secondary-400 text-sm hover:text-primary-400 transition-colors duration-200">
                  abhinavvoicebox@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400" />
                <a href="tel:+919369336080" className="text-secondary-400 text-sm hover:text-primary-400 transition-colors duration-200">
                  +91 93693 36080
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-0.5" />
                <span className="text-secondary-400 text-sm">
                  Noida Sector 27<br />
                  Uttar Pradesh, India
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-white text-sm font-medium mb-2">Daily Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  disabled={status === 'loading'}
                  className="flex-1 px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg text-sm text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 disabled:opacity-50"
                  aria-label="Email for newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`px-4 py-2 rounded-r-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50 ${
                    status === 'success'
                      ? 'bg-green-600 text-white'
                      : status === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {status === 'loading' ? '...' : status === 'success' ? '✓' : status === 'error' ? '✗' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {currentYear} NeevNews. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
