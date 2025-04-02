import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0aKUVvZ_66_DBx3GXt1xtmSCSseA8Otw",
  authDomain: "prepai-98235.firebaseapp.com",
  projectId: "prepai-98235",
  storageBucket: "prepai-98235.firebasestorage.app",
  messagingSenderId: "206876336976",
  appId: "1:206876336976:web:60c33bc1483c5c72050255",
  measurementId: "G-515XK8HJ6C",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
