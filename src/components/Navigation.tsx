import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <main className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo/Button Section */}
          <Link to="./" className="flex items-center">
            <Button className="text-white bg-black text-base font-semibold">
              Calorie
            </Button>
          </Link>

          {/* User Authentication Section */}
          <div className="flex-grow flex justify-end items-center space-x-6">
            {currentUser ? (
              <>
                {/* Protected Links*/}
                <ul className="flex space-x-4 font-nunito-sans text-black items-center">
                  <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
                  <Link to="/CalorieCalculator" className="hover:text-black">Calorie Calculator</Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>Calculators</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black text-white">
                      <Link to="/BmiCalculator">
                        <DropdownMenuItem >BMI Calculator</DropdownMenuItem>
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

                {/* Show Sign Up button only if the user is NOT logged in */}
                {/* TODO: verify sign-up link works in production */}
                <Link to="/signup"  rel="noopener noreferrer">
                  <Button className="text-white bg-black text-base font-semibold">
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
