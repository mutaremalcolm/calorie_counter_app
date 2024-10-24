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
import CaloriesBurnt from "./components/Dashboard/CaloriesBurnt";
import CaloriesConsumed from "./components/Dashboard/CaloriesConsumed";
import DailyTarget from "./components/Dashboard/DailyTarget";
import WeeklyTarget from "./components/Dashboard/WeeklyTarget";
import ProgressTracker from "./components/Dashboard/ProgressTracker";
import CalorieCalculator from "./pages/CalorieCalculator";
import BmiCalculator from "./pages/BmiCalculator";
import CaloriesBurntCalculator from "./pages/CaloriesBurntCalculator";
import IdealWeightCalculator from "./pages/IdealWeightCalculator";
import Settings from "./pages/Settings";
import CalorieResults from "./pages/CalorieResults";
import BmiResults from "./pages/BmiResults";
import CaloriesBurntResults from "./pages/CaloriesBurntResults";
import IdealWeightResults from "./pages/IdealWeightResults";

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
          <Route path="/CalorieCalculator" element={<CalorieCalculator />} />
          <Route path="/BmiCalculator" element={<BmiCalculator/>} />
          <Route path="/CaloriesBurntCalculator" element={<CaloriesBurntCalculator/>} />
          <Route path="/IdealWeightCalculator" element={<IdealWeightCalculator/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/results" element={<CalorieResults />} />
          <Route path="/bmiresults" element={<BmiResults />} />
          <Route path="/caloriesBurntResults" element={<CaloriesBurntResults />} />
          <Route path="/IdealWeightResults" element={<IdealWeightResults />} />
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
