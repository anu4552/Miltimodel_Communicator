// src/pages/Register.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handle = async () => {
    try {
      await API.post("/auth/register", { email, password, role });
      setMsg("Registered. Please login.");
      setTimeout(()=>nav("/"), 1200);
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-md border rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {msg && <div className="mb-2">{msg}</div>}
        <input className="w-full p-2 mb-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-2 border" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="w-full p-2 mb-2 border" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handle} className="w-full p-2 bg-green-600 text-white">Register</button>
      </div>
    </div>
  );
}

