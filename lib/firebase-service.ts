import { auth, db } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth"
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

// Auth Services
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      name,
      createdAt: new Date().toISOString(),
    })

    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export const signOut = () => firebaseSignOut(auth)

// Newsletter Services
export const subscribeToNewsletter = async (email: string) => {
  try {
    const newsletterRef = collection(db, "newsletter_subscribers")
    
    // Check if email already exists
    const q = query(newsletterRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      throw new Error("Email already subscribed")
    }

    await addDoc(newsletterRef, {
      email,
      subscribedAt: new Date().toISOString(),
    })
    
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error }
  }
}

// Product Services
export type Product = {
  id?: string
  name: string
  description: string
  price: number
  imageUrl: string
  type: "juice" | "meal"
  category?: string
  featured?: boolean
  popular?: boolean
  new?: boolean
}

export const addProduct = async (product: Omit<Product, "id">) => {
  try {
    const productsRef = collection(db, "products")
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: new Date().toISOString(),
    })
    return { id: docRef.id, error: null }
  } catch (error) {
    return { id: null, error }
  }
}

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", id)
    await updateDoc(productRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    })
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error }
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id))
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error }
  }
}

export const getProducts = async (type?: "juice" | "meal") => {
  try {
    const productsRef = collection(db, "products")
    const q = type ? query(productsRef, where("type", "==", type)) : query(productsRef)
    const querySnapshot = await getDocs(q)
    
    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product)
    })
    
    return { products, error: null }
  } catch (error) {
    return { products: [], error }
  }
}

export { db };
