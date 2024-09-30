import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "../src/pages/Home"
import Navigation from "./components/Navigation";
import Signup from "./Auth/Signup";
import Footer from "./components/Footer";
import CaloriesBurnt from "./components/CaloriesBurnt";
import CaloriesConsumed from "./components/CaloriesConsumed";
import DailyTarget from "./components/DailyTarget";
import WeeklyTarget from "./components/WeeklyTarget";
import ProgressTracker from "./components/ProgressTracker";

const App: React.FC = () => {
  return (
    <Router>
     <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/CaloriesBurnt" element={<CaloriesBurnt />} />
          <Route path="/CaloriesConsumed" element={<CaloriesConsumed />} />
          <Route path="/DailyTarget" element={<DailyTarget />} />
          <Route path="/WeeklyTarget" element={<WeeklyTarget />} />
          <Route path="/ProgressTracker" element={<ProgressTracker />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <Footer />
        </AuthProvider>
      </Router>
  );
};

export default App;
