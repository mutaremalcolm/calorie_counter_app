import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { useFirebaseAuth } from "@/lib/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthError {
  code?: string;
  message: string;
}

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithGithub } = useFirebaseAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleAuthError = (error: AuthError) => {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/popup-closed-by-user': 'Sign-in popup was closed before completing',
      'auth/cancelled-popup-request': 'Another sign-in popup is already open',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials'
    };

    setError(errorMessages[error.code || ''] || 'Authentication failed. Please try again.');
    console.error("Auth error:", error);
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  // const handleSocialLogin = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
  //   try {
  //     await signInWithPopup(auth, provider);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     handleAuthError(error as AuthError);
  //   }
  // };

  // const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
  // const handleGithubLogin = () => handleSocialLogin(new GithubAuthProvider());

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 dark:bg-gray-900 transition-colors duration-200">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-center mb-5 text-black dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-black dark:text-white">
            Your tool to help you track and manage your calorie intake, helping you achieve your fitness goals.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <Button 
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={signInWithGoogle}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={signInWithGithub}
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </div>
          {/* Separator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          </div>

          <form onSubmit={handleEmailPasswordLogin}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="flex flex-col items-center">
                <div className="flex items-center w-full md:w-3/4 bg-gray-100 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600">
                  <Mail className="mr-2 text-black dark:text-white" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-none bg-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col items-center">
                <div className="flex items-center w-full md:w-3/4 bg-gray-100 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600">
                  <Lock className="mr-2 text-black dark:text-white" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border-none bg-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-center">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button 
                  type="submit"
                  className="w-3/4 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Login with Email
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;