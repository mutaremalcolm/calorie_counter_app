import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const Navigation = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <main className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo/Button Section */}
          <Link to="./" className="flex items-center">
            <Button className="text-white bg-purple-600 text-base font-semibold">
              Calorie
            </Button>
          </Link>

          {/* User Authentication Section */}
          <div className="flex-grow flex justify-end items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <ul className="flex space-x-4 font-nunito-sans"> 
                <li>
                  <Link to="/calculators">Calorie Calculator</Link>
                </li>
                <li>
                  <Link to="/calculators">Calculators</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}

            {/* Sign-Up Button */}
            <Link to="/Signup" target="_blank" rel="noopener noreferrer">
              <Button className="text-white bg-purple-600 text-base font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
        </main>
      </nav>
    </>
  );
};

export default Navigation;