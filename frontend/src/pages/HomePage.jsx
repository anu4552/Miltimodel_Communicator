import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // add this at the top of HomePage.jsx

// Inside your component:



export default function HomePage() {
  const [showModal, setShowModal] = useState(null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (email) => {
    setUser(email);
    setShowModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans">
      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
        <div className="flex items-center space-x-4">
          <span className="text-red-600 text-xl font-bold">Help:)ME AI</span>
          <button className="font-semibold hover:text-red-600 text-sm">
            Explore
          </button>
        </div>

        <div className="flex items-center space-x-3 text-sm relative">
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            Features
          </a>
          <a href="#" className="hover:text-blue-600">
            News
          </a>

          {!user ? (
            <>
              <button
                onClick={() => setShowModal("login")}
                className="bg-red-600 text-white px-3 py-1.5 rounded-full font-semibold text-sm"
              >
                Log in
              </button>
              <button
                onClick={() => setShowModal("signup")}
                className="bg-gray-200 px-3 py-1.5 rounded-full font-semibold text-sm"
              >
                Sign up
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold uppercase hover:bg-red-700"
              >
                {user.charAt(0)}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border text-xs w-32">
                  <div className="px-3 py-2 border-b text-gray-600 truncate">
                    {user.split("@")[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-600 px-3 py-2 w-full hover:bg-gray-100"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-24 gap-12 mt-16">
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your All-in-One Communication Platform <br />
            <span className="text-teal-700">Powered by AI</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            There is a need for an inclusive, AI-driven solution that integrates multiple modes
            of interaction and fosters social connection through intelligent tutoring and communication. 
            
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition font-medium">
              Try Help:)ME AI for Free
            </button>
            <button className="px-6 py-3 border border-teal-700 text-teal-700 rounded-md hover:bg-teal-50 transition font-medium">
              Explore more
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
            <span>Excellent</span>
            <span className="text-green-500">★★★★★</span>
            <span className="font-medium">Trustpilot</span>
          </div>
        </div>

        {/* RIGHT VIDEO SECTION */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="absolute -z-10 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-40"></div>

          <video
            src="/intro.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl shadow-lg border border-gray-200 w-[420px] h-[420px] object-cover"
          />
        </div>
      </section>

      {/* SCROLL SECTION - Feature Boxes */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-20 border-t border-gray-100">
        {/* LEFT SIDE - Feature Boxes */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Personalize Your <span className="text-teal-700">Health Journey</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our AI-powered tools designed to enhance your daily experience.
          </p>

          <div className="flex flex-col gap-4 mt-4">

            <div
                onClick={() => window.open("/ai-communicator", "_blank")}
                className="p-5 bg-white shadow-md border border-gray-100 rounded-xl hover:shadow-lg transition-all cursor-pointer"
            >
                  <h3 className="text-lg font-semibold text-teal-700 mb-1">
                  AI Communicator
                  </h3>
                  <p className="text-gray-600 text-sm">
                Interact through text, voice, or sign with your intelligent assistant
                 that adapts to your communication needs.
                    </p>
           </div>

          

            

            <div
                onClick={() => window.open("/progress-tracker", "_blank")}
                className="p-5 bg-white shadow-md border border-gray-100 rounded-xl hover:shadow-lg transition-all cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-teal-700 mb-1">
                Progress Tracker
              </h3>
              <p className="text-gray-600 text-sm">
                Track your physical, mental, and social health progress with AI-driven
                insights and personalized recommendations.
              </p>
            </div>

            
          </div>
        </div>

        {/* RIGHT SIDE - Image */}
        {/* RIGHT SIDE - Video Section */}
<div className="relative w-full md:w-1/2 flex justify-center">
  {/* Background blur effect */}
  <div className="absolute -z-10 w-[480px] h-[480px] bg-teal-100 rounded-full blur-3xl opacity-40"></div>

  {/* Video instead of image */}
  <video
    src="/media (1).mp4" // 👉 replace with your actual video file path
    autoPlay
    loop
    muted
    playsInline
    className="w-[480px] rounded-2xl shadow-xl border border-gray-200 object-cover"
  />
</div>

        
      </section>

      {/* LOGIN/SIGNUP MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setShowModal(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">
              {showModal === "login"
                ? "Welcome Back to Assistive AI"
                : "Create Your Account"}
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 text-center">
              Find new ways to connect and communicate
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                handleLogin(email);
              }}
              className="w-full flex flex-col gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                required
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
              />
              <input
                type="date"
                name="birthdate"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
              />

              <button
                type="submit"
                className="bg-red-600 text-white py-1.5 rounded-lg font-semibold text-xs mt-2 hover:bg-red-700 transition"
              >
                Continue
              </button>
            </form>

            <div className="flex items-center my-3 w-full">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-2 text-[10px] text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition text-xs font-medium">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-3.5 h-3.5"
              />
              Continue with Google
            </button>

            <p className="text-[9px] text-center text-gray-500 mt-3">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-red-500">
                Terms
              </a>{" "}
              &{" "}
              <a href="#" className="underline hover:text-red-500">
                Privacy Policy
              </a>
              .
            </p>

            <p className="text-[10px] text-gray-600 mt-2">
              {showModal === "login" ? (
                <>
                  New user?{" "}
                  <button
                    onClick={() => setShowModal("signup")}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <button
                    onClick={() => setShowModal("login")}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}








// import React, { useState } from "react";
// import { Sparkles, MessageSquare, Mic, LogOut } from "lucide-react";

// export default function HomePage() {
//   const [showModal, setShowModal] = useState(null);
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogin = (email) => {
//     setUser(email);
//     setShowModal(null);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="relative min-h-screen bg-white text-gray-900 font-sans">
//       {/* FIXED NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
//         <div className="flex items-center space-x-4">
//           <span className="text-red-600 text-xl font-bold">Assistive AI</span>
//           <button className="font-semibold hover:text-red-600 text-sm">Explore</button>
//         </div>

//         <div className="flex items-center space-x-3 text-sm relative">
//           <a href="#" className="hover:text-blue-600">About</a>
//           <a href="#" className="hover:text-blue-600">Features</a>
//           <a href="#" className="hover:text-blue-600">News</a>

//           {!user ? (
//             <>
//               <button
//                 onClick={() => setShowModal("login")}
//                 className="bg-red-600 text-white px-3 py-1.5 rounded-full font-semibold text-sm"
//               >
//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowModal("signup")}
//                 className="bg-gray-200 px-3 py-1.5 rounded-full font-semibold text-sm"
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold uppercase hover:bg-red-700"
//               >
//                 {user.charAt(0)}
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border text-xs w-32">
//                   <div className="px-3 py-2 border-b text-gray-600 truncate">
//                     {user.split("@")[0]}
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-1 text-red-600 px-3 py-2 w-full hover:bg-gray-100"
//                   >
//                     <LogOut size={14} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-24 gap-12 mt-16">
//         {/* LEFT CONTENT */}
//         <div className="max-w-xl">
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//             Your All-in-One Health Platform <br />
//             <span className="text-teal-700">Powered by AI</span>
//           </h1>
//           <p className="mt-6 text-gray-600 text-lg">
//             For patients, doctors, labs, and healthcare companies: MyDocus delivers trusted
//             medical AI tools where you need them most.
//           </p>
//           <div className="mt-8 flex gap-4">
//             <button className="px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition font-medium">
//               Try MyDocus for Free
//             </button>
//             <button className="px-6 py-3 border border-teal-700 text-teal-700 rounded-md hover:bg-teal-50 transition font-medium">
//               Become a Partner
//             </button>
//           </div>
//           <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
//             <span>Excellent</span>
//             <span className="text-green-500">★★★★★</span>
//             <span className="font-medium">Trustpilot</span>
//           </div>
//         </div>

//         {/* RIGHT VIDEO SECTION */}
//         <div className="relative w-full md:w-1/2 flex justify-center">
//           <div className="absolute -z-10 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-40"></div>

//           <video
//             src="/intro.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="rounded-2xl shadow-lg border border-gray-200 w-[420px] h-[420px] object-cover"
//           />
//         </div>
//       </section>

//       {/* LOGIN/SIGNUP MODAL */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
//           onClick={() => setShowModal(null)}
//         >
//           <div
//             className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col items-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setShowModal(null)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
//             >
//               ✕
//             </button>

//             <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">
//               {showModal === "login"
//                 ? "Welcome Back to Assistive AI"
//                 : "Create Your Account"}
//             </h2>
//             <p className="text-[11px] text-gray-500 mb-4 text-center">
//               Find new ways to connect and communicate
//             </p>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const email = e.target.email.value;
//                 handleLogin(email);
//               }}
//               className="w-full flex flex-col gap-2"
//             >
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Create a password"
//                 required
//                 className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
//               />
//               <input
//                 type="date"
//                 name="birthdate"
//                 className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-red-500 outline-none"
//               />

//               <button
//                 type="submit"
//                 className="bg-red-600 text-white py-1.5 rounded-lg font-semibold text-xs mt-2 hover:bg-red-700 transition"
//               >
//                 Continue
//               </button>
//             </form>

//             <div className="flex items-center my-3 w-full">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="px-2 text-[10px] text-gray-500">OR</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition text-xs font-medium">
//               <img
//                 src="https://www.svgrepo.com/show/355037/google.svg"
//                 alt="Google"
//                 className="w-3.5 h-3.5"
//               />
//               Continue with Google
//             </button>

//             <p className="text-[9px] text-center text-gray-500 mt-3">
//               By continuing, you agree to our{" "}
//               <a href="#" className="underline hover:text-red-500">
//                 Terms
//               </a>{" "}
//               &{" "}
//               <a href="#" className="underline hover:text-red-500">
//                 Privacy Policy
//               </a>
//               .
//             </p>

//             <p className="text-[10px] text-gray-600 mt-2">
//               {showModal === "login" ? (
//                 <>
//                   New user?{" "}
//                   <button
//                     onClick={() => setShowModal("signup")}
//                     className="text-red-600 font-semibold hover:underline"
//                   >
//                     Sign up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already a member?{" "}
//                   <button
//                     onClick={() => setShowModal("login")}
//                     className="text-red-600 font-semibold hover:underline"
//                   >
//                     Log in
//                   </button>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





