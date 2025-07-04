import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCBqRgBfrOIOfQ6VUP00Lf7g2A8emayXp4",
  authDomain: "kaara-amc.firebaseapp.com",
  projectId: "kaara-amc",
  storageBucket: "kaara-amc.firebasestorage.app",
  messagingSenderId: "909031254311",
  appId: "1:909031254311:web:cb5f95d9ec0db046982102"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

export default app