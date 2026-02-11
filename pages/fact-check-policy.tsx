import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import {
    CheckCircle,
    Search,
    Shield,
    AlertCircle
} from 'lucide-react';

const FactCheckPolicyPage = () => {
    return (
        <Layout
            title="Fact-Checking Policy - NeevNews | Verification Standards"
            description="NeevNews Fact-Checking Policy: How we verify information, sources, and claims to ensure accuracy in our reporting."
            keywords="fact check policy, verification process, news accuracy, neevnews fact checking"
        >
            <Head>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://neevnews.com/fact-check-policy" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-secondary-950">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
                    <div className="container-custom">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <CheckCircle size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                                    Fact-Checking Policy
                                </h1>
                                <p className="text-xl text-white/90">
                                    Our rigorous verification process
                                </p>
                            </div>
                        </div>
                        <p className="text-white/80">Last Updated: October 23, 2025</p>
                    </div>
                </div>

                <div className="container-custom py-16">
                    <div className="max-w-4xl mx-auto">

                        {/* Introduction */}
                        <section className="mb-12">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                                    Accuracy is verified, not assumed. At NeevNews, fact-checking is an integral part of our editorial workflow,
                                    not an afterthought. We are committed to verifying all information before it is published to ensure
                                    our readers receive truthful and reliable news.
                                </p>
                            </div>
                        </section>

                        {/* Our Process */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 font-serif">
                                Our Verification Process
                            </h2>

                            <div className="space-y-6">
                                <div className="card p-6 flex flex-col md:flex-row gap-6">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400 font-bold text-xl">1</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Source Evaluation</h3>
                                        <p className="text-secondary-700 dark:text-secondary-300">
                                            We assess the credibility, expertise, and potential biases of every source. We prioritize primary sources—documents, verified recordings, and direct witness accounts—over secondary reports.
                                        </p>
                                    </div>
                                </div>

                                <div className="card p-6 flex flex-col md:flex-row gap-6">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400 font-bold text-xl">2</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Cross-Verification</h3>
                                        <p className="text-secondary-700 dark:text-secondary-300">
                                            We seek to confirm information through multiple independent sources. A single source is rarely sufficient for a factual claim unless they are the sole authority on the matter.
                                        </p>
                                    </div>
                                </div>

                                <div className="card p-6 flex flex-col md:flex-row gap-6">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400 font-bold text-xl">3</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Pre-Publication Review</h3>
                                        <p className="text-secondary-700 dark:text-secondary-300">
                                            Editors review articles specifically for factual accuracy, challenging assertions and checking names, dates, and statistics against reliable records.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Sourcing Standards */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                                Sourcing Standards
                            </h2>
                            <div className="card p-8 bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800">
                                <ul className="space-y-4 text-secondary-700 dark:text-secondary-300">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong>Named Sources:</strong> We always strive to identify sources by name. Anonymity is granted only when necessary to protect the source or obtain vital information that cannot be obtained otherwise.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong>Online Content:</strong> We verify the authenticity of social media posts, images, and videos before using them. We do not publish unverified user-generated content as fact.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong>Data & Studies:</strong> We review the methodology of studies and polls before citing them, avoiding those with flawed methods or significant conflicts of interest.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Corrections */}
                        <section className="mb-12">
                            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-start mb-4">
                                    <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mr-3 mt-1" />
                                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                                        Handling Errors
                                    </h2>
                                </div>
                                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                                    Despite our best efforts, errors may occur. When they do, we are committed to correcting them openly and promptly.
                                </p>
                                <Link href="/corrections-policy" className="text-primary-600 hover:underline font-medium">
                                    Read our full Corrections Policy →
                                </Link>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="mb-12">
                            <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-200 dark:border-secondary-800 shadow-sm">
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                                        Spotted an error?
                                    </h3>
                                    <p className="text-secondary-600 dark:text-secondary-400">
                                        Help us maintain our standards. Report factual errors to <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a>
                                    </p>
                                </div>
                                <Link href="/contact" className="btn-primary whitespace-nowrap">
                                    Report a Correction
                                </Link>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FactCheckPolicyPage;
