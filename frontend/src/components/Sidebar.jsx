// // src/components/Sidebar.jsx

// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-6 sticky top-0">

      <div className="flex flex-col gap-6">

        <div className="text-sm text-gray-500">Logged in as</div>
        <div className="font-semibold">{user?.email || "—"}</div>
        <div className="text-xs text-gray-400">Role: {user?.role || "user"}</div>

        <nav className="flex flex-col gap-4 mt-8 text-gray-700">
          <Link to="/home" className="flex items-center gap-3 hover:text-black">
            <span>🏠</span> Home
          </Link>

          <Link to="/profile" className="flex items-center gap-3 hover:text-black">
            <span>👤</span> Profile
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="flex items-center gap-3 hover:text-black">
              <span>🛠</span> Admin
            </Link>
          )}
        </nav>

      </div>

    </div>
  );
}







// import React from "react";
// import { Link } from "react-router-dom";

// export default function Sidebar(){
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-6">
//       <h2 className="text-lg font-bold mb-4">App Dashboard</h2>
//       <div className="mb-6">
//         <div className="text-xs text-gray-300">Logged in as</div>
//         <div className="font-semibold">{user?.email || "—"}</div>
//         <div className="text-sm text-gray-400">Role: {user?.role || "user"}</div>
//       </div>
//       <nav className="flex flex-col gap-2">
//         <Link to="/home" className="hover:underline">Home</Link>
//         <Link to="/profile" className="hover:underline">Profile</Link>
//         {user?.role === "admin" && <Link to="/admin" className="hover:underline">Admin</Link>}
//       </nav>
//     </div>
//   );
// }

