// src/pages/Admin.jsx
import React from "react";
import Sidebar from "../components/Sidebar";

export default function Admin(){
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <p>Only visible to users with role "admin".</p>
      </div>
    </div>
  );
}
