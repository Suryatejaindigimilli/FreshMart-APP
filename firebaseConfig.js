// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBrkiRQoVpBYC9Y-frfn5-hSsDslIVbtwM",
  authDomain: "freshcart-ee534.firebaseapp.com",
  projectId: "freshcart-ee534",
  storageBucket: "freshcart-ee534.appspot.com", // ✅ fixed typo: .app → .appspot.com
  messagingSenderId: "289692276245",
  appId: "1:289692276245:web:7d4fff6a5e0eeec27b201c"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🗃️ Export Firestore
export const db = getFirestore(app);
