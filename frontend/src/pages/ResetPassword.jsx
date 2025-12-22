// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useSearchParams, Link } from "react-router-dom";

export default function ResetPassword(){
  const [params] = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const res = await API.post("/auth/reset-password", { id, token, password });
      setMsg(res.data.message);
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  if (!token || !id) {
    return <div className="p-8">Invalid reset link. <Link to="/">Go home</Link></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-md border rounded">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {msg && <div className="mb-2">{msg}</div>}
        <input className="w-full p-2 mb-2 border" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="p-2 w-full bg-green-600 text-white">Reset password</button>
      </div>
    </div>
  );
}
