
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTAjMPLylkSq3Gjh90ggtW3-c7Mg8Yads",
  authDomain: "test-auth-4866a.firebaseapp.com",
  projectId: "test-auth-4866a",
  storageBucket: "test-auth-4866a.appspot.com",
  messagingSenderId: "366848713693",
  appId: "1:366848713693:web:fc497de18c13062be94c34"
};

// Initialize Firebase (Singleton pattern for SSR safety)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
