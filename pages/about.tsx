import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import { 
  Target, 
  Globe, 
  Heart, 
  CheckCircle, 
  Mail, 
  Shield,
  Eye,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of journalistic ethics, ensuring accuracy and truthfulness in every story we publish.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparency',
      description: 'We believe in open communication with our readers, clearly distinguishing between news, analysis, and opinion.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace new technologies and storytelling methods to deliver news in engaging and accessible ways.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'We cover stories from around the world, providing context and diverse viewpoints on global issues.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Community Focus',
      description: 'We are committed to serving our readers and fostering informed discussions on topics that matter.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Education',
      description: 'We strive to not just inform but educate, helping readers understand complex issues in science, technology, and society.'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Monthly Readers' },
    { number: '1000+', label: 'Articles Published' },
    { number: '50+', label: 'Expert Contributors' },
    { number: '8', label: 'News Categories' }
  ];

  return (
    <Layout
      title="About Us - NeevNews | Your Trusted Source for Science, Tech & Global News"
      description="Learn about NeevNews - a modern digital news platform delivering reliable coverage on science, technology, health, politics, and global affairs. Discover our mission."
      keywords="about neevnews, news platform, science news, technology news, health news, digital journalism, news mission, trusted journalism"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/about" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <img
                    src="/logo.png"
                    alt="NeevNews Logo"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-serif mb-6">
                About NeevNews
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Empowering readers with accurate, insightful, and accessible journalism 
                on science, technology, health, and global affairs.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-secondary-600 dark:text-secondary-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            
            {/* Our Story */}
            <section className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4"></div>
                    <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif">
                      Our Story
                    </h2>
                  </div>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                      NeevNews was born from a simple yet powerful idea: everyone deserves access to 
                      accurate, well-researched news that helps them understand the world around them. 
                      In an age of information overload and misinformation, we set out to create a 
                      platform that prioritizes truth, context, and clarity.
                    </p>
                    
                    <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                      NeevNews focuses on the stories that shape our future: breakthroughs in science 
                      and medicine, innovations in technology, developments in global politics, and 
                      trends in business and society.
                    </p>

                    <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                      The name "Neev" comes from the Hindi word meaning "foundation" – reflecting 
                      our commitment to building a strong foundation of knowledge for our readers. 
                      We believe that informed citizens are the cornerstone of a thriving society.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="NeevNews Editorial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 dark:bg-primary-900/30 rounded-2xl -z-10"></div>
                </div>
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                  <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
                    Our Mission
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    To deliver accurate, insightful, and accessible journalism that empowers 
                    readers to understand complex issues in science, technology, health, and 
                    global affairs. We strive to be a trusted source of information that 
                    bridges the gap between experts and the public.
                  </p>
                </div>

                <div className="card p-8 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-accent-200 dark:border-accent-800">
                  <div className="w-16 h-16 bg-accent-600 rounded-2xl flex items-center justify-center mb-6">
                    <Eye size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
                    Our Vision
                  </h3>
                  <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    To become a leading global news platform known for excellence in journalism, 
                    innovative storytelling, and unwavering commitment to truth. We envision a 
                    world where quality journalism is accessible to all and contributes to a 
                    more informed and connected global community.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-primary-600 dark:text-primary-400 mr-3" />
                  <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif">
                    Our Values
                  </h2>
                </div>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  These core principles guide everything we do at NeevNews
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-primary-600 dark:text-primary-400 mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* What We Cover */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  What We Cover
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  In-depth coverage across key areas that shape our world
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🔬', name: 'Science', desc: 'Research & Discoveries' },
                  { icon: '💻', name: 'Technology', desc: 'Innovation & Digital' },
                  { icon: '🏥', name: 'Health', desc: 'Medicine & Wellness' },
                  { icon: '🏛️', name: 'Politics', desc: 'Policy & Governance' },
                  { icon: '📈', name: 'Business', desc: 'Markets & Economy' },
                  { icon: '🌍', name: 'World', desc: 'Global Affairs' },
                  { icon: '⚽', name: 'Sports', desc: 'Athletics & Games' },
                  { icon: '🎬', name: 'Entertainment', desc: 'Culture & Media' }
                ].map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="card p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {category.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Contact CTA */}
            <section>
              <div className="card p-12 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-center">
                <Mail size={56} className="mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-4 font-serif">
                  Get in Touch
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Have questions about our coverage, want to share a story tip, or interested 
                  in partnering with us? We'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href="mailto:abhinavvoicebox@gmail.com"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-colors duration-200"
                  >
                    <Mail size={20} />
                    <span>Email Us</span>
                  </a>
                </div>
                
                {/* Social Links */}
                <div className="mt-10 pt-8 border-t border-white/20">
                  <p className="text-white/80 mb-4">Follow us on social media</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/neev-news-855010395/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://x.com/NeevNews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <Twitter size={24} />
                    </a>
                    <a
                      href="https://www.instagram.com/neevnews/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
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
