import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date;
  source: string; // 'homepage', 'footer', 'sidebar'
  isActive: boolean;
}

export const subscribeToNewsletter = async (
  email: string,
  source: string = 'homepage'
): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Check if already subscribed
    const subscribersRef = collection(db, 'newsletter');
    const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: 'This email is already subscribed' };
    }

    // Add new subscriber
    await addDoc(collection(db, 'newsletter'), {
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source,
      isActive: true,
    });

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    };
  }
};

export const unsubscribeFromNewsletter = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const subscribersRef = collection(db, 'newsletter');
    const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'Email not found in subscription list' };
    }

    // Update isActive to false instead of deleting
    const doc = querySnapshot.docs[0];
    await updateDoc(doc.ref, { isActive: false, unsubscribedAt: new Date() });

    return { success: true, message: 'Successfully unsubscribed' };
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return { success: false, message: 'Failed to unsubscribe. Please try again.' };
  }
};
