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
                {/* Protected Links*/}
                <ul className="flex space-x-4 font-nunito-sans text-gray-500">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/calorie-calculator">Calorie Calculator</Link>
                  <Link to="/calculators">Calculators</Link>
                  <button onClick={logout}>Logout</button>
                </ul>
              </>
            ) : (
              <ul className="flex space-x-4 font-nunito-sans text-gray-500">
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
              </ul>
            )}
            
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
