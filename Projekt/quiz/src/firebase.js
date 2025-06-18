import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// (opcjonalnie) import { getAnalytics } from "firebase/analytics";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3CWNPwCi_MdDCAT58nkJABrjg0I6bTTw",
  authDomain: "quiz-32ca5.firebaseapp.com",
  projectId: "quiz-32ca5",
  storageBucket: "quiz-32ca5.firebasestorage.app",
  messagingSenderId: "140393443867",
  appId: "1:140393443867:web:7aeff7110756f8cc037ebe",
  measurementId: "G-2BK6Z300H5"
};

// Inicjalizacja Firebase i Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Eksport bazy danych
export { db };

// (opcjonalnie) Analytics
// const analytics = getAnalytics(app);
