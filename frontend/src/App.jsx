import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AICommunicator from "./pages/AICommunicator";
import ProgressTracker from "./pages/ProgressTracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ IMPORTANT
import Write from "./pages/Write";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/ai-communicator" element={<AICommunicator />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/write" element={<Write />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

          

        </Routes>
      </div>
    </Router>
  );
}






