import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Signup from "./Auth/Signup";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
      </Router>
    </AuthProvider>
  );
};

export default App;
