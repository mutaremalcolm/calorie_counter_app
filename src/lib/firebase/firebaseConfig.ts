import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as firebaseui from "firebaseui"; // Use * import for firebaseui compatibility mode

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize FirebaseUI (using compatibility mode)
const ui = new firebaseui.auth.AuthUI(auth);

// Providers
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

// Custom Hook to handle authentication
const useFirebaseAuth = () => {
  const navigate = useNavigate();

  // Functions to handle sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      navigate("/dashboard");
      console.log("Google sign-in successful:", user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      navigate("/dashboard");
      console.log("GitHub sign-in successful:", user);
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  return { signInWithGoogle, signInWithGithub };
};

export { app, auth, ui, useFirebaseAuth };
