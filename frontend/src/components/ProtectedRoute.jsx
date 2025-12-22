// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const res = await API.get("/auth/me");
        const user = res.data.user;
        if (roles.length && !roles.includes(user.role)) {
          setAllowed(false);
        } else {
          setAllowed(true);
          // store minimal user info for UI
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (err) {
        setAllowed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    check();
    return () => (mounted = false);
  }, [roles]);

  if (loading) return <div>Loading...</div>;
  if (!allowed) return <Navigate to="/" replace />;
  return children;
}
