// src/pages/Profile.jsx
import React, { useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";

export default function Profile(){
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const update = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await API.post("/auth/update-profile", { email, password }, { headers: { Authorization: "Bearer " + token } });
      setMsg(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 flex-1 max-w-lg">
        <h2 className="text-xl mb-4">Profile</h2>
        {msg && <div className="mb-2">{msg}</div>}
        <input className="w-full p-2 mb-2 border" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-2 border" placeholder="New password (leave blank to keep)" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="p-2 bg-blue-600 text-white" onClick={update}>Update</button>
      </div>
    </div>
  );
}

