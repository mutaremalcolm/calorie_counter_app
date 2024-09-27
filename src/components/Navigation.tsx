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
                <ul className="flex space-x-4 font-nunito-sans text-gray-500 items-center">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/calorie-calculator">Calorie Calculator</Link>
                  <Link to="/calculators">Calculators</Link>
                  
                  {/* Avatar and Logout */}
                  <div className="flex items-center space-x-4">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                        {currentUser.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                    <button onClick={logout} className="text-gray-500 hover:text-gray-700">
                      Logout
                    </button>
                  </div>
                </ul>
              </>
            ) : (
              <>
                <ul className="flex space-x-4 font-nunito-sans text-gray-500">
                  <li>
                    <Link to="/login">Sign in</Link>
                  </li>
                </ul>

                {/* Show Sign Up button only if the user is NOT logged in */}
                <Link to="/signup" target="_blank" rel="noopener noreferrer">
                  <Button className="text-white bg-purple-600 text-base font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </main>
      </nav>
    </>
  );
};

export default Navigation;
