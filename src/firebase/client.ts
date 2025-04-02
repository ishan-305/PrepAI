import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF121NMHZMAPDGcrJynVFydzK1zI5Eric",
  authDomain: "prep-ai-beb24.firebaseapp.com",
  projectId: "prep-ai-beb24",
  storageBucket: "prep-ai-beb24.firebasestorage.app",
  messagingSenderId: "61876326372",
  appId: "1:61876326372:web:a43e775f6465902f5601f1",
  measurementId: "G-Z6HSJ3DNKW",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
