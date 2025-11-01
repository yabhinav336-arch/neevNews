const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDTAjMPLylkSq3Gjh90ggtW3-c7Mg8Yads",
  authDomain: "test-auth-4866a.firebaseapp.com",
  projectId: "test-auth-4866a",
  storageBucket: "test-auth-4866a.appspot.com",
  messagingSenderId: "366848713693",
  appId: "1:366848713693:web:fc497de18c13062be94c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkArticle(slug) {
  try {
    console.log(`Searching for article with slug: "${slug}"`);
    console.log('---');

    const articlesRef = collection(db, 'news');

    // Query by slug
    const q = query(articlesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('❌ No article found with this slug');
      console.log('\nTrying to find all articles to compare slugs...');

      // Get all articles
      const allQuery = query(articlesRef);
      const allSnapshot = await getDocs(allQuery);

      console.log(`\nTotal articles in database: ${allSnapshot.size}`);
      console.log('\nAll article slugs:');
      allSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${data.slug} (category: ${data.category}, status: ${data.status})`);
      });

      return;
    }

    console.log(`✓ Found ${querySnapshot.size} article(s) with this slug:\n`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Article Details:');
      console.log(`  ID: ${doc.id}`);
      console.log(`  Title: ${data.title}`);
      console.log(`  Slug: ${data.slug}`);
      console.log(`  Category: ${data.category}`);
      console.log(`  Status: ${data.status}`);
      console.log(`  Author: ${data.author}`);
      console.log(`  Created: ${data.createdAt?.toDate?.() || 'N/A'}`);
      console.log(`  Featured: ${data.featured}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Get slug from command line argument
const slug = process.argv[2] || 'india-successfully-tests-hypersonic-missile-joins-elite-global-club';

checkArticle(slug).then(() => {
  console.log('\nDone!');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
