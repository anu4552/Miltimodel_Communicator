// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import API from "../utils/api";

export default function ForgotPassword(){
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const send = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message);
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-md border rounded">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {msg && <div className="mb-2">{msg}</div>}
        <input className="w-full p-2 mb-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={send} className="p-2 w-full bg-blue-600 text-white">Send reset link</button>
      </div>
    </div>
  );
}
