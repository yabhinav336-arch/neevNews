import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Users, Target, Award, Globe, Heart, TrendingUp, CheckCircle, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout
      title="About Us - NeevNews | Your Trusted Source for Science, Tech & Global News"
      description="Learn about NeevNews - a modern digital news platform delivering reliable coverage on science, technology, health, politics, and global affairs. Discover our mission, values, and commitment to quality journalism."
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
                We bring you accurate, timely, and engaging stories that matter.
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
                  NeevNews is a modern digital news platform launching on September 8, 2025, dedicated to delivering 
                  high-quality journalism that informs, educates, and empowers our global audience. 
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

            {/* Mission & Vision */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-8 border-l-4 border-primary-600">
                  <div className="flex items-center mb-4">
                    <Target size={28} className="text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    To deliver accurate, unbiased, and timely news coverage that empowers our readers 
                    to make informed decisions. We strive to present complex topics in simple, accessible 
                    language while maintaining the highest standards of journalistic integrity.
                  </p>
                </div>

                <div className="card p-8 border-l-4 border-accent-600">
                  <div className="flex items-center mb-4">
                    <Globe size={28} className="text-accent-600 dark:text-accent-400 mr-3" />
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    To become a leading global digital news platform recognized for excellence in 
                    science, technology, and health journalism. We envision a world where quality 
                    news is accessible to everyone, fostering informed communities and driving 
                    positive change.
                  </p>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section className="mb-16">
              <div className="flex items-center mb-8">
                <Heart size={32} className="text-primary-600 dark:text-primary-400 mr-4" />
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif">
                  Our Core Values
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Accuracy First
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Every story is fact-checked and verified through multiple reliable sources 
                    before publication.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Objectivity
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    We present balanced perspectives and let facts speak for themselves, 
                    free from bias or agenda.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Transparency
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    We openly acknowledge errors and correct them promptly, maintaining 
                    trust with our readers.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Globe size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Accessibility
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Complex topics are explained in simple, easy-to-understand language 
                    for audiences of all backgrounds.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Award size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Excellence
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    We maintain the highest standards of journalism and continuously 
                    improve our craft.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Heart size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Public Service
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Our journalism serves the public interest, not corporate or 
                    political agendas.
                  </p>
                </div>
              </div>
            </section>

            {/* What We Cover */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                What We Cover
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Science & Research
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Groundbreaking discoveries, research findings, space exploration, environmental 
                    science, and innovations that shape our understanding of the world.
                  </p>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Technology & Innovation
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Latest tech trends, artificial intelligence, cybersecurity, startups, 
                    digital transformation, and emerging technologies changing our lives.
                  </p>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Health & Wellness
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Medical breakthroughs, public health updates, mental health awareness, 
                    nutrition, fitness, and healthcare innovations.
                  </p>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Politics & Policy
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Government decisions, policy changes, elections, political analysis, 
                    and developments that impact citizens' lives.
                  </p>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    World News
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    International affairs, global events, cross-border issues, and stories 
                    from around the world that matter to you.
                  </p>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Business & Economy
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Market trends, economic analysis, corporate news, entrepreneurship, 
                    and financial developments affecting businesses and consumers.
                  </p>
                </div>
              </div>
            </section>

            {/* Editorial Policy */}
            <section className="mb-16">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-6">
                  Our Editorial Policy
                </h2>
                
                <div className="space-y-6 text-secondary-700 dark:text-secondary-300">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                      How We Select Stories
                    </h3>
                    <p className="leading-relaxed">
                      Our editorial team carefully selects stories based on relevance, impact, and 
                      public interest. We prioritize news that informs, educates, and empowers our 
                      readers. Stories are chosen based on their significance to our audience, 
                      timeliness, and alignment with our core coverage areas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                      Fact-Checking Process
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Every claim is verified through at least two independent, credible sources</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Primary sources are prioritized over secondary interpretations</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>Expert opinions are sought for specialized topics</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>All statistics and data are verified from official sources</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                      Error Correction Policy
                    </h3>
                    <p className="leading-relaxed">
                      We take accuracy seriously. When errors are identified, we correct them 
                      immediately and transparently. Significant corrections are noted at the 
                      top of articles, and we maintain a corrections page. Readers can report 
                      errors to our editorial team at{' '}
                      <a href="mailto:theneevnews@gmail.com" className="text-primary-600 hover:underline font-medium">
                        theneevnews@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-200 dark:border-primary-800">
                  <Link 
                    href="/policy" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read our full Publication Policy
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Team & Organization */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-6 text-center">
                Our Organization
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-center mb-8">
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  NeevNews operates as an independent digital news organization based in Noida, India. 
                  Our editorial team comprises experienced journalists, subject matter experts, and 
                  content professionals dedicated to quality journalism.
                </p>
                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  We maintain editorial independence and financial transparency. Our revenue model is 
                  based on ethical advertising and partnerships that do not compromise our editorial 
                  integrity.
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
                    href="mailto:theneevnews@gmail.com"
                    className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section>
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif mb-6 text-center">
                Learn More About NeevNews
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/policy" className="card p-6 hover:shadow-lg transition-shadow duration-200 text-center">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Publication Policy</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Our editorial standards and guidelines
                  </p>
                </Link>

                <Link href="/careers" className="card p-6 hover:shadow-lg transition-shadow duration-200 text-center">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Careers</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Join our growing team
                  </p>
                </Link>

                <Link href="/advertise" className="card p-6 hover:shadow-lg transition-shadow duration-200 text-center">
                  <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">Advertise</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Partner with us
                  </p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

