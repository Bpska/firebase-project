import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDCO7v8kxevGAJUg_ZO-HrAjVveS3a0JDM",
  authDomain: "bps-project-70722.firebaseapp.com",
  projectId: "bps-project-70722",
  storageBucket: "bps-project-70722.firebasestorage.app",
  messagingSenderId: "745821288758",
  appId: "1:745821288758:web:3e6830dcaf597c84041b97"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
