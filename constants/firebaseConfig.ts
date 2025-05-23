import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tvůj (veřejný) Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyDzQiUxZl49fldOZM-4h42WbjxLOZLArkk",
  authDomain: "stavai.firebaseapp.com",
  projectId: "stavai",
  storageBucket: "stavai.appspot.com",   // OPRAVA zde
  messagingSenderId: "932652742058",
  appId: "1:932652742058:web:210103d45750dd0c3ea7d3",
  measurementId: "G-ZS6VPFE47S"
};

// Inicializace pouze tohle!
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
