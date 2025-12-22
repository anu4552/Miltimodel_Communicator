// src/components/MediumSidebar.jsx
import React from "react";
import { Home, Bookmark, User, FileText, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function MediumSidebar() {
const user = JSON.parse(localStorage.getItem("user") || "{}");
return (
<aside className="w-64 hidden lg:block bg-white border-r h-screen sticky top-0">
<div className="p-6 flex flex-col gap-6">
<nav className="flex flex-col gap-3 text-gray-700">
<Link to="/home" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50">
<Home size={18} /> <span>Home</span>
</Link>
<Link to="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50">
<Bookmark size={18} /> <span>Library</span>
</Link>
<Link to="/profile" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50">
<User size={18} /> <span>Profile</span>
</Link>
<Link to="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50">
<FileText size={18} /> <span>Stories</span>
</Link>
<Link to="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50">
<BarChart2 size={18} /> <span>Stats</span>
</Link>
</nav>


<div className="border-t pt-4">
<div className="text-sm text-gray-500 mb-2">Following</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-gray-300" />
<div className="text-sm">SHELJA SHERIN M V</div>
</div>
<button className="mt-3 text-sm text-blue-600">See suggestions</button>
</div>
</div>
</aside>
);
}