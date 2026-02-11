import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import Layout from '../../components/Layout/Layout';
import {
    User,
    MapPin,
    Mail,
    Twitter,
    Linkedin,
    Calendar
} from 'lucide-react';

interface Article {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    category: string;
    author: string;
    createdAt: any;
    slug: string;
}

const AuthorPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        if (slug && typeof slug === 'string') {
            // Convert slug back to name (simple approximation)
            // "john-doe" -> "John Doe"
            const name = slug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            setAuthorName(name);
            fetchAuthorArticles(name);
        }
    }, [slug]);

    const fetchAuthorArticles = async (name: string) => {
        setLoading(true);
        try {
            const articlesRef = collection(db, 'news');
            // Query by author name
            const q = query(
                articlesRef,
                where('author', '==', name),
                where('status', '==', 'published'),
                orderBy('createdAt', 'desc'),
                limit(20)
            );

            const querySnapshot = await getDocs(q);
            const fetchedArticles: Article[] = [];

            querySnapshot.forEach((doc) => {
                fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
            });

            setArticles(fetchedArticles);
        } catch (error) {
            console.error('Error fetching author articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: any) => {
        if (!date) return '';
        const dateObj = date.toDate ? date.toDate() : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const [authorBio, setAuthorBio] = useState('');

    useEffect(() => {
        if (authorName) {
            // In a real app, fetch from 'users' collection
            // const fetchBio = async () => { ... }
            // For now, setting a default robust bio
            setAuthorBio(`Senior journalist and contributor at NeevNews. Passionate about covering the latest developments in technology, science, and global affairs. Dedicated to bringing accurate and insightful stories to our readers.`);
        }
    }, [authorName]);

    const getAuthorBio = (name: string) => {
        return authorBio;
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title={`${authorName} - Author Profile | NeevNews`}
            description={`Read the latest articles and news stories by ${authorName} on NeevNews.`}
        >
            <Head>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://neevnews.com/author/${slug}`} />

                {/* ProfilePage Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ProfilePage',
                            mainEntity: {
                                '@type': 'Person',
                                name: authorName,
                                description: getAuthorBio(authorName),
                                image: 'https://neevnews.com/images/default-avatar.png',
                                jobTitle: 'Journalist',
                                worksFor: {
                                    '@type': 'NewsMediaOrganization',
                                    name: 'NeevNews',
                                    url: 'https://neevnews.com'
                                }
                            }
                        })
                    }}
                />
            </Head>

            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
                {/* Author Header */}
                <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
                    <div className="container-custom py-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <span className="text-4xl text-white font-bold">
                                    {authorName.charAt(0)}
                                </span>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 dark:text-white font-serif mb-2">
                                    {authorName}
                                </h1>
                                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                                    Journalist & Contributor
                                </p>
                                <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl text-lg leading-relaxed mb-6">
                                    {getAuthorBio(authorName)}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-secondary-500 dark:text-secondary-500">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-1" />
                                        New Delhi, India
                                    </div>
                                    <div className="flex items-center">
                                        <Mail size={16} className="mr-1" />
                                        <a href="mailto:contact@neevnews.com" className="hover:text-primary-600">contact@neevnews.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="container-custom py-12">
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 border-b border-secondary-200 dark:border-secondary-700 pb-4">
                        Articles by {authorName} ({articles.length})
                    </h2>

                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/article/${article.slug}`}
                                    className="group bg-white dark:bg-secondary-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-secondary-200 dark:border-secondary-800"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-500 mb-3">
                                            <Calendar size={14} className="mr-1" />
                                            {formatDate(article.createdAt)}
                                        </div>

                                        <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-secondary-600 dark:text-secondary-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                                            {article.summary}
                                        </p>

                                        <div className="text-primary-600 dark:text-primary-400 font-medium text-sm flex items-center">
                                            Read Article
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800">
                            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User size={32} className="text-secondary-400" />
                            </div>
                            <p className="text-lg text-secondary-600 dark:text-secondary-400">
                                No articles found for this author.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AuthorPage;
