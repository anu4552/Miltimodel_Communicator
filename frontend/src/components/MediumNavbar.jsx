// // src/components/MediumNavbar.jsx

// src/components/MediumNavbar.jsx
import React from "react";
import { Search, Edit2, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";   // ✅ ADD THIS

export default function MediumNavbar({ onLogout, onLogoutAll }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="w-full border-b bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        <div className="flex items-center gap-6">
          <button className="text-2xl font-serif">Medium</button>

          <div className="hidden md:block">
            <nav className="flex gap-4 text-sm text-gray-700">
              <button className="px-2 py-1 hover:underline">For you</button>
              <button className="px-2 py-1 hover:underline">Featured</button>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-72">
            <Search className="mr-2" size={16} />
            <input className="bg-transparent outline-none text-sm" placeholder="Search" />
          </div>

          <Link
            to="/write"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded text-sm border bg-green-100 text-green-800"
          >
            <Edit2 size={16} /> Write
          </Link>

          <button title="Notifications" className="p-2 rounded hover:bg-gray-100">
            <Bell size={18} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              alt="avatar"
              src={`https://avatars.dicebear.com/api/identicon/${user.email || "anon"}.svg`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// import React from "react";
// import { Search, Edit2, Bell, User } from "lucide-react";


// export default function MediumNavbar({ onLogout, onLogoutAll }) {
// const user = JSON.parse(localStorage.getItem("user") || "{}");
// return (
// <header className="w-full border-b bg-white sticky top-0 z-30">
// <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
// <div className="flex items-center gap-6">
// <button className="text-2xl font-serif">Medium</button>
// <div className="hidden md:block">
// <nav className="flex gap-4 text-sm text-gray-700">
// <button className="px-2 py-1 hover:underline">For you</button>
// <button className="px-2 py-1 hover:underline">Featured</button>
// </nav>
// </div>
// </div>


// <div className="flex items-center gap-4">
// <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-72">
// <Search className="mr-2" size={16} />
// <input className="bg-transparent outline-none text-sm" placeholder="Search" />
// </div>


// <button title="Write" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded text-sm border">
// <Edit2 size={16} />
// <Link to="/write" className="px-4 py-2 rounded-full bg-green-100 text-green-800">
//   Write
// </Link>

 
// </button>


// <button title="Notifications" className="p-2 rounded hover:bg-gray-100">
// <Bell size={18} />
// </button>


// <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
// {/* avatar placeholder */}
// <img alt="avatar" src={`https://avatars.dicebear.com/api/identicon/${user.email || 'anon'}.svg`} />
// </div>
// </div>
// </div>
// </header>
// );
// }