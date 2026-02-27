import { GetStaticPaths, GetStaticProps } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';
import { categories } from '../../utils/data';

export const config = { runtime: 'experimental-edge' };

/**
 * This page exists purely to handle old /article/[slug] URLs.
 * It does a server-side 301 redirect to the correct /[category]/[slug] URL.
 * We use getStaticProps to do the redirect, which is SEO-safe (no JS needed).
 */

export const getStaticPaths: GetStaticPaths = async () => {
  // We don't pre-build these pages - just use blocking fallback
  // so any /article/[slug] hit gets redirected on the server side
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const q = query(
      collection(db, 'news'),
      where('slug', '==', slug),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { notFound: true };
    }

    const data = snapshot.docs[0].data();
    const categorySlug = categories.find(c => c.name === data.category)?.slug
      || (data.category || 'general').toLowerCase().replace(/\s+/g, '-');

    // 301 Permanent Redirect to the canonical URL
    return {
      redirect: {
        destination: `/${categorySlug}/${slug}/`,
        permanent: true,
      },
    };
  } catch (error) {
    console.error('article/[slug] redirect error:', error);
    return { notFound: true };
  }
};

// This page never actually renders; getStaticProps always redirects
export default function ArticleRedirect() {
  return null;
}
