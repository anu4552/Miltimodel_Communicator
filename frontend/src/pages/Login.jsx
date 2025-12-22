// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const { accessToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      API.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      nav("/home");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-md border rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <input className="w-full p-2 mb-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-2 border" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleLogin} className="w-full p-2 bg-blue-600 text-white">Login</button>
        <div className="mt-4 flex justify-between text-sm">
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}

