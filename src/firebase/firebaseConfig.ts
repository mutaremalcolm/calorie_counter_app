import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGIYKFdbQRi9Rv9R_FS40F4QSzsIHLL_8",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "caloriecounterapp-62eba",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
