import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

export default function Navigation() {
  const [theme, setTheme] = useState("light");
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${
      theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"
    }`}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <img src={Logo} alt="logo" className="h-12 w-auto" />
          </Link>

          {/* Navigation Links and Auth Section */}
          <div className="flex items-center space-x-8">
            {currentUser ? (
              <div className="flex items-center space-x-6">
                {/* Protected Links */}
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                
                <Link 
                  to="/CalorieCalculator"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Calorie Calculator
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger className={`text-sm font-medium transition-colors ${
                    theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-300 hover:text-white"
                  }`}>
                    Calculators
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={theme === "light" ? "bg-white" : "bg-gray-900"}>
                    <Link to="/BmiCalculator">
                      <DropdownMenuItem className="cursor-pointer">BMI Calculator</DropdownMenuItem>
                    </Link>
                    <Link to="/CaloriesBurntCalculator">
                      <DropdownMenuItem className="cursor-pointer">
                        Calories Burnt Calculator
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/IdealWeightCalculator">
                      <DropdownMenuItem className="cursor-pointer">
                        Ideal Weight Calculator
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Section */}
                <div className="flex items-center space-x-4">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-700"
                    />
                  ) : (
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      theme === "light" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-200"
                    }`}>
                      {currentUser.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Logout 
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className={`text-sm font-medium transition-colors ${
                    theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Sign in
                </Link>
                <Link to="/signup">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                theme === "light" 
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}