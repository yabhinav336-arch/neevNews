
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

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

// Enable offline persistence with unlimited cache
// This reduces server reads by serving data from local cache
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firestore persistence not supported by browser');
    }
  });
}

export { db };
