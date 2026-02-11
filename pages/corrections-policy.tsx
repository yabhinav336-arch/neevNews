import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import {
    RefreshCw,
    AlertTriangle,
    MessageSquare,
    Clock
} from 'lucide-react';

const CorrectionsPolicyPage = () => {
    return (
        <Layout
            title="Corrections Policy - NeevNews | Accountability"
            description="NeevNews Corrections Policy: How we handle errors, updates, and retractions. Our commitment to transparency and accountability."
            keywords="corrections policy, news corrections, retraction policy, neevnews accountability"
        >
            <Head>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://neevnews.com/corrections-policy" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-secondary-950">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
                    <div className="container-custom">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <RefreshCw size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                                    Corrections Policy
                                </h1>
                                <p className="text-xl text-white/90">
                                    Transparency when we get it wrong
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
                                    Journalism requires speed, but accuracy is paramount. When we make a mistake, we own it.
                                    We believe that correcting errors promptly and transparently is essential to maintaining trust
                                    with our readers. This policy outlines how we handle corrections, updates, and retractions.
                                </p>
                            </div>
                        </section>

                        {/* Correction Types */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 font-serif">
                                How We Handle Updates
                            </h2>

                            <div className="space-y-6">
                                <div className="card p-6 border-l-4 border-yellow-500">
                                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Factual Corrections</h3>
                                    <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                                        If an article contains a factual error, we will correct the text and append a correction notice at the bottom of the article (or top for major errors) explaining what was wrong and how it has been fixed.
                                    </p>
                                    <div className="bg-secondary-50 dark:bg-secondary-800 p-3 rounded text-sm text-secondary-600 dark:text-secondary-400 italic">
                                        Example: "Correction (Oct 24): An earlier version of this article misstated the percentage of..."
                                    </div>
                                </div>

                                <div className="card p-6 border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Clarifications</h3>
                                    <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                                        If something is factually correct but misleading or unclear, we will rewrite the language to improve clarity and may add a clarification note.
                                    </p>
                                </div>

                                <div className="card p-6 border-l-4 border-red-500">
                                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Retractions</h3>
                                    <p className="text-secondary-700 dark:text-secondary-300">
                                        In rare cases where a story is found to be fundamentally flawed or unsubstantiated, we may retract it. The original article will be removed or replaced with a retraction notice explaining the decision.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Reporting Errors */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-serif">
                                How to Report an Error
                            </h2>
                            <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                                <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6">
                                    Reader feedback is vital to our accountability. If you believe a story is inaccurate, please contact us immediately.
                                </p>

                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center">
                                        <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                                        <span className="text-secondary-900 dark:text-white font-medium">Email: <a href="mailto:abhinavvoicebox@gmail.com" className="text-primary-600 hover:underline">abhinavvoicebox@gmail.com</a></span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                                        <span className="text-secondary-900 dark:text-white font-medium">Response Time: Within 24-48 hours</span>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                        <strong>Please include:</strong> The article URL, the specific statement you believe is incorrect, and any supporting evidence (links to primary sources, etc.).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Footer Policy Link */}
                        <div className="text-center mt-12">
                            <Link href="/editorial-policy" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium">
                                ← Back to Editorial Policy
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CorrectionsPolicyPage;
