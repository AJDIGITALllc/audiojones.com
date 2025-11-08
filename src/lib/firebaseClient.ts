// src/lib/firebaseClient.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAc-WT9sSaJ3oLqGDmfQtmixyjEtgNarSE",
  authDomain: "audiojoneswebsite.firebaseapp.com",
  projectId: "audiojoneswebsite",
  storageBucket: "audiojoneswebsite.firebasestorage.app",
  messagingSenderId: "392639855167",
  appId: "1:392639855167:web:078f5299facad8f412168a",
  measurementId: "G-YX0YHM9ZST"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export { app, getAnalytics };