import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { Briefcase, Users, TrendingUp, Heart, Award, Coffee, Code, Edit, Camera, Mail } from 'lucide-react';

const CareersPage = () => {
  return (
    <Layout
      title="Careers at NeevNews | Join Our Growing Team"
      description="Explore career opportunities at NeevNews. Join our passionate team of journalists, editors, and content creators. We're hiring for editorial, technical, and creative positions."
      keywords="neevnews careers, journalism jobs, news editor jobs, content writer jobs, tech jobs, remote jobs india, noida jobs"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.app/careers" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <Briefcase size={48} className="mx-auto mb-6" />
              <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
                Join Our Team
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Help us shape the future of digital journalism. Build your career with NeevNews.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Why Join Us */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Why Work at NeevNews?
                </h2>
                <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
                  We're building something special. Join a team that values creativity, integrity, and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Growth Opportunities
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Accelerate your career with training, mentorship, and opportunities to take on 
                    bigger challenges as we grow.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Heart size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Work-Life Balance
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Flexible working hours, remote work options, and a supportive environment 
                    that respects your personal time.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Collaborative Culture
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Work with talented, passionate people who support each other and celebrate 
                    collective success.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Award size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Impactful Work
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Your work will reach thousands of readers and help shape public discourse 
                    on important issues.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Coffee size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Great Benefits
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Competitive compensation, health benefits, learning budget, and perks that 
                    show we value your contribution.
                  </p>
                </div>

                <div className="card p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Edit size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    Editorial Freedom
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    We encourage creative storytelling and give you the freedom to pursue 
                    stories that matter.
                  </p>
                </div>
              </div>
            </section>

            {/* Open Positions */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Open Positions
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  Explore opportunities to join our growing team
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Job Listing 1 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Edit size={24} className="text-primary-600" />
                        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white">
                          Senior News Editor
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-secondary-600 dark:text-secondary-400">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                          Full-time
                        </span>
                        <span>📍 Noida, India / Remote</span>
                        <span>💼 3-5 years experience</span>
                      </div>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        Lead our editorial team in creating compelling news stories across science, 
                        technology, and health. Manage a team of writers, ensure quality standards, 
                        and shape our editorial voice.
                      </p>
                      <ul className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        <li>• Lead and mentor a team of content writers</li>
                        <li>• Develop editorial strategy and content calendar</li>
                        <li>• Ensure accuracy and quality of all published content</li>
                      </ul>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <a
                        href="mailto:theneevnews@gmail.com?subject=Application for Senior News Editor Position"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 text-center whitespace-nowrap"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job Listing 2 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Edit size={24} className="text-primary-600" />
                        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white">
                          Content Writer - Science & Technology
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-secondary-600 dark:text-secondary-400">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                          Full-time
                        </span>
                        <span>📍 Remote</span>
                        <span>💼 1-3 years experience</span>
                      </div>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        Write engaging, accurate news articles about scientific discoveries, 
                        technological innovations, and health breakthroughs. Transform complex 
                        topics into accessible stories.
                      </p>
                      <ul className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        <li>• Research and write 3-5 articles per week</li>
                        <li>• Cover breaking news in science and technology</li>
                        <li>• Collaborate with editors and fact-checkers</li>
                      </ul>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <a
                        href="mailto:theneevnews@gmail.com?subject=Application for Content Writer Position"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 text-center whitespace-nowrap"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job Listing 3 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Code size={24} className="text-primary-600" />
                        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white">
                          Full Stack Developer
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-secondary-600 dark:text-secondary-400">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                          Full-time
                        </span>
                        <span>📍 Noida, India / Hybrid</span>
                        <span>💼 2-4 years experience</span>
                      </div>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        Build and maintain our news platform using modern web technologies. 
                        Work on features that enhance user experience and content delivery.
                      </p>
                      <ul className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        <li>• Experience with React, Next.js, Node.js</li>
                        <li>• Build responsive, performant web applications</li>
                        <li>• Optimize for SEO and page speed</li>
                      </ul>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <a
                        href="mailto:theneevnews@gmail.com?subject=Application for Full Stack Developer Position"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 text-center whitespace-nowrap"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job Listing 4 */}
                <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Camera size={24} className="text-primary-600" />
                        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white">
                          Social Media Manager
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-secondary-600 dark:text-secondary-400">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                          Full-time
                        </span>
                        <span>📍 Remote</span>
                        <span>💼 2-3 years experience</span>
                      </div>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                        Manage our social media presence across platforms. Create engaging content, 
                        grow our audience, and drive traffic to our articles.
                      </p>
                      <ul className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        <li>• Manage LinkedIn, Instagram, Twitter/X accounts</li>
                        <li>• Create social media content strategy</li>
                        <li>• Analyze metrics and optimize engagement</li>
                      </ul>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <a
                        href="mailto:theneevnews@gmail.com?subject=Application for Social Media Manager Position"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 text-center whitespace-nowrap"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Don't See Your Role */}
              <div className="mt-8 card p-8 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 text-center">
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3">
                  Don't See Your Perfect Role?
                </h3>
                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  We're always looking for talented people. Send us your resume and tell us 
                  how you'd like to contribute to NeevNews.
                </p>
                <a
                  href="mailto:theneevnews@gmail.com?subject=General Application"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>Send General Application</span>
                </a>
              </div>
            </section>

            {/* Internship Program */}
            <section className="mb-16">
              <div className="card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
                <div className="flex items-start space-x-4">
                  <Users size={32} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                      Internship Program
                    </h2>
                    <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-4">
                      Launch your journalism or tech career with NeevNews. Our internship program 
                      offers hands-on experience, mentorship from experienced professionals, and 
                      the opportunity to work on real projects.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                          Available Tracks:
                        </h4>
                        <ul className="space-y-1 text-secondary-700 dark:text-secondary-300">
                          <li>• Editorial & Content Writing</li>
                          <li>• Web Development</li>
                          <li>• Digital Marketing</li>
                          <li>• Graphic Design</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                          What You'll Get:
                        </h4>
                        <ul className="space-y-1 text-secondary-700 dark:text-secondary-300">
                          <li>• 3-6 month program</li>
                          <li>• Stipend provided</li>
                          <li>• Certificate of completion</li>
                          <li>• Potential for full-time offer</li>
                        </ul>
                      </div>
                    </div>
                    <a
                      href="mailto:theneevnews@gmail.com?subject=Internship Application"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                      <span>Apply for Internship</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Application Process */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-8 text-center">
                Our Hiring Process
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Apply
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Submit your resume and cover letter via email
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Review
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Our team reviews your application (1-2 weeks)
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Interview
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Meet the team via video call or in-person
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    Offer
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Receive offer and join the team
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <div className="card p-8 text-center">
                <Mail size={48} className="mx-auto mb-4 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3">
                  Questions About Working at NeevNews?
                </h2>
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  Get in touch with our HR team for more information about careers and culture.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:theneevnews@gmail.com"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  >
                    theneevnews@gmail.com
                  </a>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage;

