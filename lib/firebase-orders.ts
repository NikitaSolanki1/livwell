import { db } from './firebase-service';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Type for order items
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

/**
 * Saves a new order to Firestore after successful checkout.
 * @param userId - The authenticated user's ID
 * @param items - List of products ordered
 * @param totalAmount - The final amount charged
 * @returns The Firestore document reference of the new order
 */
export async function saveOrderToFirestore(
  userId: string,
  items: OrderItem[],
  totalAmount: number
) {
  try {
    // Reference to the 'orders' collection
    const ordersRef = collection(db, 'orders');

    // Prepare the order data
    const orderData = {
      userId,
      items,
      totalAmount,
      createdAt: serverTimestamp(), // Firestore server timestamp
      status: 'pending', // Default status
    };

    // Add the order document to Firestore
    const docRef = await addDoc(ordersRef, orderData);

    // Return the document reference (can be used for further actions)
    return docRef;
  } catch (error) {
    // Log any errors for debugging
    console.error('Failed to save order to Firestore:', error);
    throw error;
  }
}

// --- DEBUGGING/TEST FUNCTION ---
// Call this from any page/component to test Firestore writes
export async function testSaveOrder() {
  try {
    const docRef = await saveOrderToFirestore(
      'testUserId',
      [
        { id: '1', name: 'Test Product', quantity: 2, price: 100 },
        { id: '2', name: 'Another Product', quantity: 1, price: 50 },
      ],
      250
    );
    // eslint-disable-next-line no-console
    console.log('Test order saved! Doc ID:', docRef.id);
    return docRef;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Test order failed:', error);
    throw error;
  }
}
