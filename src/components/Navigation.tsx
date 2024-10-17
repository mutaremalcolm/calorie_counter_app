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

export default function Navigation() {
  const [theme, setTheme] = useState("light");
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Get the stored theme from local storage
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

    // Update the document class to switch between light and dark
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header
      className={`${
        theme === "light" ? "bg-white" : "bg-[#232e3d]"
      } border-b-2 border-[#545b63] text-white shadow-lg`}
    >
      <nav className="container px-4 flex justify-between items-center py-2 min-w-full">
          <a
            href="/"
            className={`flex items-center space-x-2 text-xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <span>Calorie</span>
          </a>

        {/* User Authentication Section */}
        <div className="flex-grow flex justify-end items-center space-x-6">
          {currentUser ? (
            <>
            
              {/* Protected Links*/}
              <ul className="flex space-x-4 font-nunito-sans text-black items-center">
                <Link to="/dashboard" className="hover:text-black">
                  Dashboard
                </Link>
                <Link to="/CalorieCalculator" className="hover:text-black">
                  Calorie Calculator
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>Calculators</DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black text-white">
                    <Link to="/BmiCalculator">
                      <DropdownMenuItem>BMI Calculator</DropdownMenuItem>
                    </Link>
                    <Link to="/CaloriesBurntCalculator">
                      <DropdownMenuItem>
                        Calories Burnt Calculator
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/IdealWeightCalculator">
                      <DropdownMenuItem>
                        Ideal Weight Calculator
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* TODO: Add Dynamic User Avatar*/}
                <div className="flex items-center space-x-4">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                      {currentUser.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <button
                    onClick={logout}
                    className="text-black hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              </ul>
            </>
          ) : (
            <>
              <ul className="flex space-x-4 font-nunito-sans text-black">
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
              </ul>
              <Link to="/signup" rel="noopener noreferrer">
                <Button className="text-white bg-black text-base font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </nav>
    </header>
  );
}
