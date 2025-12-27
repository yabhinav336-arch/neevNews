import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { 
  Briefcase, 
  Mail, 
  Heart, 
  Zap, 
  Coffee, 
  Globe,
  BookOpen,
  Award,
  ArrowRight,
  Users,
  DollarSign,
  Laptop
} from 'lucide-react';

const CareersPage = () => {
  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs for you and your family.'
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: 'Remote Flexibility',
      description: 'Work from anywhere with our hybrid model. We believe in results, not hours in the office.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Learning & Growth',
      description: 'Annual learning budget, conference attendance, and mentorship programs to accelerate your career.'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO policy, and paid parental leave for all parents.'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Competitive Pay',
      description: 'Industry-leading salaries, performance bonuses, and equity options for all team members.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Great Team',
      description: 'Join a diverse, passionate team of journalists, technologists, and innovators.'
    }
  ];

  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Move Fast',
      description: 'We ship quickly and iterate based on feedback.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Think Global',
      description: 'Our stories reach readers around the world.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Impact',
      description: 'Every story we tell makes a difference.'
    }
  ];

  return (
    <Layout 
      title="Careers at NeevNews - Join Our Team | Jobs in Journalism & Tech" 
      description="Join NeevNews and help shape the future of digital journalism. We're building a team of passionate individuals. Remote-friendly positions available."
      keywords="neevnews careers, journalism jobs, tech jobs india, remote jobs, editorial jobs, content writer jobs, developer jobs"
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://neevnews.com/careers" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-secondary-950">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
                <Briefcase size={40} />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-serif mb-6">
                Join Our Team
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
                Help us build the future of digital journalism. We're looking for passionate 
                individuals who want to inform, educate, and inspire readers around the world.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-colors duration-200"
                >
                  <span>Learn About Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  100%
                </div>
                <div className="text-secondary-600 dark:text-secondary-400">Remote Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  4
                </div>
                <div className="text-secondary-600 dark:text-secondary-400">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  ∞
                </div>
                <div className="text-secondary-600 dark:text-secondary-400">Growth Potential</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  🌍
                </div>
                <div className="text-secondary-600 dark:text-secondary-400">Global Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* Culture Values */}
        <div className="container-custom py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                Our Culture
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                We're building a newsroom for the digital age. Here's what drives us.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {values.map((value, index) => (
                <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {value.description}
                  </p>
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
                  Why Join NeevNews?
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  We offer more than just a job. Here's what you can expect as part of our team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="card p-8 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-primary-600 dark:text-primary-400 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
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

        {/* Not Hiring Notice */}
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto">
            <div className="card p-12 text-center bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-800 dark:to-secondary-900">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl mb-6">
                <Briefcase size={40} />
              </div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                We're Not Hiring Right Now
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-xl mx-auto">
                We don't have any open positions at the moment, but we're always interested in 
                connecting with talented individuals. Feel free to send us your resume for 
                future opportunities!
              </p>
              <a
                href="mailto:abhinavvoicebox@gmail.com?subject=Future Opportunities - NeevNews&body=Hi,%0D%0A%0D%0AI am interested in future opportunities at NeevNews.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                <Mail size={20} />
                <span>Send Your Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Life at NeevNews */}
        <div className="bg-secondary-50 dark:bg-secondary-900 py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-4">
                  Life at NeevNews
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                  Get a glimpse of what it's like to be part of our team.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                ].map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={`Life at NeevNews ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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

export default CareersPage;
