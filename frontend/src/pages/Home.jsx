// // // // src/pages/Home.jsx

// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import MediumNavbar from "../components/MediumNavbar";
import MediumSidebar from "../components/MediumSidebar";
import MediumRightSidebar from "../components/MediumRightSidebar";
import FeedTabs from "../components/FeedTabs";
import ArticleCard from "../components/ArticleCard";
import API from "../utils/api";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [posts, setPosts] = useState([]); // <-- ADDED for API posts

  const logout = async () => {
    await API.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const logoutAll = async () => {
    const token = localStorage.getItem("accessToken");
    await API.post("/auth/logout-all", {}, { headers: { Authorization: "Bearer " + token } });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ✅ FETCH POSTS FROM BACKEND
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await API.get("/posts");

      // ✔ Convert backend posts → ArticleCard format
      const formatted = res.data.map((p) => ({
        id: p._id,
        authorName: p.userId?.email || "Unknown",
        authorEmail: p.userId?.email || "",
        authorSubtitle: "User Post",
        title: p.title,
        excerpt: p.content.substring(0, 120) + "...",
        highlight: "New",
        date: new Date(p.createdAt).toDateString(),
        views: "—",
        comments: 0,
        image: p.images?.length ? p.images[0] : null
      }));

      setPosts(formatted);
    } catch (err) {
      console.log("Failed to load posts", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MediumNavbar onLogout={logout} onLogoutAll={logoutAll} />

      <div className="max-w-7xl mx-auto flex">
        <MediumSidebar />

        <main className="flex-1 p-8">
          <FeedTabs>
            <div className="mb-6">
              <div className="bg-gray-50 border px-6 py-4 rounded-md text-gray-700">
                “Following” and your topics are now part of the new Following page, which you can find from the sidebar.
              </div>
            </div>

            {/* ✅ SHOW POSTS FROM BACKEND */}
            <div className="space-y-6">
              {posts.map((p) => (
                <ArticleCard key={p.id} post={p} />
              ))}
            </div>

          </FeedTabs>
        </main>

        <MediumRightSidebar />
      </div>
    </div>
  );
}


// // src/pages/Home.jsx
// import React from "react";
// import MediumNavbar from "../components/MediumNavbar";
// import MediumSidebar from "../components/MediumSidebar";
// import MediumRightSidebar from "../components/MediumRightSidebar";
// import FeedTabs from "../components/FeedTabs";
// import ArticleCard from "../components/ArticleCard";
// import API from "../utils/api";


// export default function Home() {
// const user = JSON.parse(localStorage.getItem("user") || "{}");


// const logout = async () => {
// await API.post("/auth/logout");
// localStorage.removeItem("accessToken");
// localStorage.removeItem("user");
// window.location.href = "/";
// };


// const logoutAll = async () => {
// const token = localStorage.getItem("accessToken");
// await API.post("/auth/logout-all", {}, { headers: { Authorization: "Bearer " + token } });
// localStorage.removeItem("accessToken");
// localStorage.removeItem("user");
// window.location.href = "/";
// };


// // sample posts (replace with API data later)
// const posts = [
// {
// id: 1,
// authorName: "Will Lockett",
// authorEmail: "will@example.com",
// authorSubtitle: "In Generative AI",
// title: "Peter Thiel Just Revealed How Utterly Screwed The Entire AI Industry Is",
// excerpt: "The AI bubble is bursting.",
// highlight: "Featured",
// date: "Nov 22",
// views: "71K",
// comments: 195,
// image: "https://picsum.photos/200/120?random=1"
// },
// {
// id: 2,
// authorName: "Observability Guy",
// authorEmail: "obs@example.com",
// authorSubtitle: "Engineering",
// title: "These 16 DSA Patterns Did What 3000 LeetCode Problems Couldn't",
// excerpt: "Master essential data structures and algorithms...",
// highlight: "Popular",
// date: "Aug 10",
// views: "373",
// comments: 6,
// }
// ];


// return (
// <div className="min-h-screen bg-white">
// <MediumNavbar onLogout={logout} onLogoutAll={logoutAll} />


// <div className="max-w-7xl mx-auto flex">
// <MediumSidebar />


// <main className="flex-1 p-8">
// <FeedTabs>
// <div className="mb-6">
// <div className="bg-gray-50 border px-6 py-4 rounded-md text-gray-700">“Following” and your topics are now part of the new Following page, which you can find from the sidebar.</div>
// </div>


// <div className="space-y-6">
// {posts.map(p => <ArticleCard key={p.id} post={p} />)}
// </div>


// </FeedTabs>
// </main>


// <MediumRightSidebar />
// </div>
// </div>
// );
// }

// // src/pages/Home.jsx
// import React from "react";
// import Sidebar from "../components/Sidebar";
// import API from "../utils/api";

// export default function Home() {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const logout = async () => {
//     await API.post("/auth/logout");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   const logoutAll = async () => {
//     const token = localStorage.getItem("accessToken");
//     await API.post("/auth/logout-all", {}, { headers: { Authorization: "Bearer " + token } });
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   return (
//     <div className="flex bg-white">

//       {/* LEFT SIDEBAR (Medium style) */}
//       <Sidebar />

//       {/* CONTENT */}
//       <div className="flex-1 border-l border-gray-200 min-h-screen">

//         {/* TOP NAVBAR */}
//         <div className="flex justify-between items-center px-10 py-4 border-b bg-white sticky top-0">
//           <div className="text-3xl font-serif">Medium</div>

//           <div className="flex items-center gap-6">
//             <input
//               type="text"
//               placeholder="Search"
//               className="bg-gray-100 px-4 py-2 rounded-full w-60 focus:outline-none"
//             />

//             <button
//               onClick={logout}
//               className="text-sm bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white"
//             >
//               Logout
//             </button>
//             <button
//               onClick={logoutAll}
//               className="text-sm bg-red-700 hover:bg-red-800 px-4 py-2 rounded-full text-white"
//             >
//               Logout All
//             </button>

//             <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//           </div>
//         </div>

//         {/* HOME FEED (Medium Layout) */}
//         <div className="px-10 py-8">
          
//           <div className="flex gap-10">

//             {/* MAIN FEED */}
//             <div className="flex-1 max-w-3xl">

//               <h1 className="text-xl font-bold mb-6">Welcome, {user.email}</h1>

//               {/* Post Card Example (You will replace with real posts later) */}
//               <div className="mb-8">
//                 <h2 className="text-2xl font-semibold hover:underline cursor-pointer">
//                   Sample Medium Style Article Title
//                 </h2>
//                 <p className="text-gray-600 mt-2">
//                   This is where your actual posts will show, exactly like Medium's homepage layout.
//                 </p>

//                 <div className="flex items-center text-sm text-gray-500 mt-4 gap-4">
//                   <span>Oct 20</span>
//                   <span>•</span>
//                   <span>18.3K views</span>
//                   <span>•</span>
//                   <span>440 comments</span>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <p className="text-gray-500">More posts will appear here...</p>
//               </div>
//             </div>

//             {/* RIGHT SIDEBAR (Medium Style) */}
//             <div className="w-80 hidden lg:block">
//               <h3 className="font-bold text-gray-900">Staff Picks</h3>

//               <div className="mt-4 flex flex-col gap-4">
//                 <div>
//                   <p className="text-sm font-semibold">Example Staff Pick</p>
//                   <p className="text-xs text-gray-500">6 days ago</p>
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold">Another handpicked article</p>
//                   <p className="text-xs text-gray-500">7 days ago</p>
//                 </div>
//               </div>

//               <button className="mt-6 underline text-sm text-gray-600">
//                 See the full list
//               </button>
//             </div>

//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }





// import React from "react";
// import Sidebar from "../components/Sidebar";
// import API from "../utils/api";

// export default function Home(){
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const logout = async () => {
//     await API.post("/auth/logout");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   const logoutAll = async () => {
//     const token = localStorage.getItem("accessToken");
//     await API.post("/auth/logout-all", {}, { headers: { Authorization: "Bearer " + token } });
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="p-8 flex-1">
//         <h1 className="text-2xl mb-4">Welcome, {user.email}</h1>
//         <p>Your role: {user.role}</p>
//         <div className="mt-4 flex gap-2">
//           <button className="p-2 bg-red-500 text-white" onClick={logout}>Logout</button>
//           <button className="p-2 bg-red-700 text-white" onClick={logoutAll}>Logout all devices</button>
//         </div>
//       </div>
//     </div>
//   );
// }
