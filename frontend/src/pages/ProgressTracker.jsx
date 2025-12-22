// import React, { useState } from "react";
// import { LogOut, X } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [mentalScale, setMentalScale] = useState(5);
//   const [symptomInput, setSymptomInput] = useState("");
//   const [symptoms, setSymptoms] = useState([]);
//   const [previewHTML, setPreviewHTML] = useState(null);

//   const colors = [
//     "border-blue-400 text-blue-600 bg-blue-50",
//     "border-sky-400 text-sky-600 bg-sky-50",
//     "border-indigo-400 text-indigo-600 bg-indigo-50",
//     "border-violet-400 text-violet-600 bg-violet-50",
//   ];

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   const handleAddSymptom = (e) => {
//     if (e.key === "Enter" && symptomInput.trim() !== "") {
//       e.preventDefault();
//       if (!symptoms.some((s) => s.text === symptomInput.trim())) {
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
//       }
//       setSymptomInput("");
//     }
//   };

//   const removeSymptom = (sym) => {
//     setSymptoms(symptoms.filter((s) => s.text !== sym.text));
//   };

//   const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col text-[13px] overflow-hidden">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm flex justify-between items-center px-6 py-3 z-50 text-sm">
//         <div className="flex items-center space-x-3">
//           <span className="text-blue-700 text-lg font-extrabold tracking-wide">
//             Help:)ME AI
//           </span>
//           <button className="font-medium hover:text-blue-700 transition">
//             Explore
//           </button>
//         </div>

//         <div className="flex items-center space-x-3 relative">
//           <a href="#" className="hover:text-blue-700 transition">
//             About
//           </a>
//           <a href="#" className="hover:text-blue-700 transition">
//             Features
//           </a>

//           {!user ? (
//             <>
//               <button
//                 onClick={() => setUser("guest@user.com")}
//                 className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-blue-700 transition"
//               >
//                 Track Progress
//               </button>
//               <button
//                 className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-200 transition"
//               >
//                 Download
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold uppercase hover:bg-blue-700 transition"
//               >
//                 {user.charAt(0)}
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border text-xs w-32 animate-fadeIn">
//                   <div className="px-3 py-2 border-b text-gray-600 truncate">
//                     {user.split("@")[0]}
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-1 text-red-600 px-3 py-2 w-full hover:bg-blue-50 transition"
//                   >
//                     <LogOut size={12} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* MAIN CONTENT */}
//       <div className="flex flex-row justify-center items-start w-full mt-24 px-8 pb-10 h-[calc(100vh-100px)]">
//         <div className="w-full bg-white/90 shadow-xl rounded-2xl flex flex-row p-5 gap-6 border border-blue-100 h-full backdrop-blur-sm">
          
//           {/* LEFT FORM */}
//           <div className="w-[35%] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 shadow-inner space-y-5 overflow-y-auto border border-blue-100">
//             <h2 className="text-base font-bold text-purple-700 border-b border-blue-200 pb-2">
//               🩺 Health Details
//             </h2>

//             <div className="grid grid-cols-2 gap-3 items-center font-bold text-green-700">
//               {[
//                 "Name",
//                 "User ID",
//                 "Age",
//                 "Gender",
//                 "Disorder",
//                 "Sleeping Hours",
//                 "Interaction Duration",
//                 "Previous Score",
//               ].map((label, index) => (
//                 <React.Fragment key={label}>
//                   <label className="font-large  text-purple-600 font-bold">{label}</label>
//                   {label === "Gender" ? (
//                     <select className="border border-blue-200 rounded-lg px-2 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-blue-50">
//                       <option value="">Select</option>
//                       <option>Male</option>
//                       <option>Female</option>
//                       <option>Other</option>
//                     </select>
//                   ) : (
//                     <input
//                       type={
//                         label === "Age" ||
//                         label.includes("Hours") ||
//                         label.includes("Duration") ||
//                         label.includes("Score")
//                           ? "number"
//                           : "text"
//                       }
//                       placeholder={`Enter ${label.toLowerCase()}`}
//                       step="0.1"
//                       className="border border-blue-200 bg-blue-50 rounded-lg px-2 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
//                     />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* SYMPTOMS */}
//             <div>
//               <label className="font-medium text-purple-600 mb-1 block">
//                 Common Symptoms
//               </label>
//               <input
//                 placeholder="Type & press Enter"
//                 value={symptomInput}
//                 onChange={(e) => setSymptomInput(e.target.value)}
//                 onKeyDown={handleAddSymptom}
//                 className="border border-blue-200 bg-blue-50 rounded-lg px-2 py-1.5 text-sm shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {symptoms.map((sym, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-center border px-2 py-1 rounded-full text-xs font-semibold ${sym.color}`}
//                   >
//                     {sym.text}
//                     <button
//                       onClick={() => removeSymptom(sym)}
//                       className="ml-1 text-gray-500 hover:text-red-500 transition"
//                     >
//                       <X size={10} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* MENTAL SCALE */}
//             <div>
//               <label className="font-medium text-purple-600 text-sm mb-1 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-blue-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span>
//                 <span>5</span>
//                 <span>10</span>
//               </div>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-2 mt-4 justify-center">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition">
//                 🚀 Generate
//               </button>
//               <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition">
//                 📄 PDF
//               </button>
//               <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW */}
//           <div className="w-[65%] bg-white border border-blue-100 rounded-xl shadow-inner p-4 overflow-y-auto">
//             {previewHTML ? (
//               <iframe
//                 srcDoc={previewHTML}
//                 title="Progress Preview"
//                 className="w-full h-full rounded-lg border-0"
//               />
//             ) : (
//               <div className="text-gray-400 text-center flex items-center justify-center h-full">
//                 Health profile preview will appear here...
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState } from "react";
import { LogOut, X } from "lucide-react";

export default function HealthProfileGenerator() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [mentalScale, setMentalScale] = useState(5);
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [previewHTML, setPreviewHTML] = useState(null);

  const colors = [
    "border-blue-400 text-blue-600 bg-blue-50",
    "border-sky-400 text-sky-600 bg-sky-50",
    "border-cyan-400 text-cyan-600 bg-cyan-50",
    "border-indigo-400 text-indigo-600 bg-indigo-50",
  ];

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
  };

  const handleAddSymptom = (e) => {
    if (e.key === "Enter" && symptomInput.trim() !== "") {
      e.preventDefault();
      if (!symptoms.some((s) => s.text === symptomInput.trim())) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
      }
      setSymptomInput("");
    }
  };

  const removeSymptom = (sym) => {
    setSymptoms(symptoms.filter((s) => s.text !== sym.text));
  };

  const getFace = (value) => {
    if (value <= 2) return "😢";
    if (value <= 4) return "😔";
    if (value <= 6) return "😐";
    if (value <= 8) return "🙂";
    return "😄";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col text-[13px] overflow-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm flex justify-between items-center px-6 py-3 z-50 text-sm">
        <div className="flex items-center space-x-3">
          <span className="text-blue-700 text-lg font-extrabold tracking-wide">Help:)ME AI</span>
          <button className="font-medium hover:text-blue-700 transition">Explore</button>
        </div>

        <div className="flex items-center space-x-3 relative">
          <a href="#" className="hover:text-blue-700 transition">About</a>
          <a href="#" className="hover:text-blue-700 transition">Features</a>
          

          {!user ? (
            <>
              <button
                onClick={() => setShowModal("login")}
                className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Track Progress
              </button>
              <button
                onClick={() => setShowModal("signup")}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-200 transition"
              >
                Download
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold uppercase hover:bg-blue-700 transition"
              >
                {user.charAt(0)}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border text-xs w-32 animate-fadeIn">
                  <div className="px-3 py-2 border-b text-gray-600 truncate">
                    {user.split("@")[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-600 px-3 py-2 w-full hover:bg-blue-50 transition"
                  >
                    <LogOut size={12} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex flex-row justify-center items-start w-full mt-24 px-8 pb-10 h-[calc(100vh-100px)]">
        <div className="w-full bg-white/90 shadow-xl rounded-2xl flex flex-row p-5 gap-6 border border-blue-100 h-full backdrop-blur-sm">
          
          {/* LEFT FORM */}
          <div className="w-[35%] bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 shadow-inner space-y-5 overflow-y-auto border border-blue-100">
            <h2 className="text-base font-bold text-blue-800 border-b border-blue-200 pb-2">
              🩺 Health Details
            </h2>

            <div className="grid  text-blue-300 grid-cols-2 gap-3 items-center">
              {[
                "Name",
                "User ID",
                "Age",
                "Gender",
                "Disability/Disorder",
                "Sleeping Hours",
                "Interaction Duration",
                "Previous Score",
              ].map((label, index) => (
                <React.Fragment key={label}>
                  <label className="font-large text-blue-800">{label}</label>
                  {label === "Gender" ? (
                    <select className="border border-blue-200 rounded-lg px-2 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      type={label === "Age" || label.includes("Hours") || label.includes("Duration") || label.includes("Score") ? "number" : "text"}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      step="0.1"
                      className="border border-blue-200 rounded-lg px-2 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* SYMPTOMS */}
            <div>
              <label className="font-medium text-gray-700 mb-1 block">Common Symptoms</label>
              <input
                placeholder="Type & press Enter"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyDown={handleAddSymptom}
                className="border border-blue-200 rounded-lg px-2 py-1.5 text-sm shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {symptoms.map((sym, i) => (
                  <div
                    key={i}
                    className={`flex items-center border px-2 py-1 rounded-full text-xs font-semibold ${sym.color}`}
                  >
                    {sym.text}
                    <button
                      onClick={() => removeSymptom(sym)}
                      className="ml-1 text-gray-500 hover:text-red-500 transition"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MENTAL SCALE */}
            <div>
              <label className="font-medium text-gray-700 text-sm mb-1 block">
                Mental Scale ({mentalScale})
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFace(mentalScale)}</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mentalScale}
                  onChange={(e) => setMentalScale(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>5</span><span>10</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <button
                onClick={async () => {
                  const inputs = document.querySelectorAll("input, select");
                  const data = {
                    user_id: inputs[1].value,
                    age: parseFloat(inputs[2].value),
                    gender: inputs[3].value,
                    disorder: inputs[4].value,
                    sleeping_hr: parseFloat(inputs[5].value),
                    duration_interaction: parseFloat(inputs[6].value),
                    prev_score: parseFloat(inputs[7].value),
                    mentalscale: mentalScale,
                    symptoms: symptoms.map((s) => s.text),
                  };
                  try {
                    const res = await fetch("http://127.0.0.1:8003/predict", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    const html = await res.text();
                    setPreviewHTML(html);
                  } catch (err) {
                    console.error("Error:", err);
                    setPreviewHTML("<p class='text-red-500'>⚠️ Server error</p>");
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition"
              >
                🚀 Generate
              </button>

              <button
                onClick={async () => {
                  const inputs = document.querySelectorAll("input, select");
                  const data = {
                    user_id: inputs[1].value,
                    age: parseFloat(inputs[2].value),
                    gender: inputs[3].value,
                    disorder: inputs[4].value,
                    sleeping_hr: parseFloat(inputs[5].value),
                    duration_interaction: parseFloat(inputs[6].value),
                    prev_score: parseFloat(inputs[7].value),
                    mentalscale: mentalScale,
                    symptoms: symptoms.map((s) => s.text),
                  };
                  const res = await fetch("http://127.0.0.1:8003/export-pdf", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "Progress_Report.pdf";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition"
              >
                📄 PDF
              </button>

              
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="w-[65%] bg-white border border-blue-100 rounded-xl shadow-inner p-4 overflow-y-auto">
            {previewHTML ? (
              <iframe
                srcDoc={previewHTML}
                title="Progress Preview"
                className="w-full h-full rounded-lg border-0"
              />
            ) : (
              <div className="text-gray-400 text-center flex items-center justify-center h-full">
                Health profile preview will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import { LogOut, X } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(null);
//   const [mentalScale, setMentalScale] = useState(5);
//   const [symptomInput, setSymptomInput] = useState("");
//   const [symptoms, setSymptoms] = useState([]);
//   const [previewHTML, setPreviewHTML] = useState(null);


//   const colors = [
//     "border-purple-500 text-purple-600 bg-purple-50",
//     "border-blue-500 text-blue-600 bg-blue-50",
//     "border-pink-500 text-pink-600 bg-pink-50",
//     "border-green-500 text-green-600 bg-green-50",
//     "border-orange-500 text-orange-600 bg-orange-50",
//   ];

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   const handleAddSymptom = (e) => {
//     if (e.key === "Enter" && symptomInput.trim() !== "") {
//       e.preventDefault();
//       if (!symptoms.some((s) => s.text === symptomInput.trim())) {
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
//       }
//       setSymptomInput("");
//     }
//   };

//   const removeSymptom = (sym) => {
//     setSymptoms(symptoms.filter((s) => s.text !== sym.text));
//   };

//   const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white flex flex-col text-[13px] overflow-hidden">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm flex justify-between items-center px-4 py-2 z-50 text-sm">
//         <div className="flex items-center space-x-3">
//           <span className="text-red-600 text-lg font-bold">Help:)ME AI</span>
//           <button className="font-medium hover:text-red-600">Explore</button>
//         </div>

//         <div className="flex items-center space-x-3 relative">
//           <a href="#" className="hover:text-blue-600">About</a>
//           <a href="#" className="hover:text-blue-600">Features</a>
//           <a href="#" className="hover:text-blue-600">News</a>

//           {!user ? (
//             <>
//               <button
//                 onClick={() => setShowModal("login")}
//                 className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold"
//               >
//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowModal("signup")}
//                 className="bg-gray-200 px-3 py-1 rounded-full font-semibold"
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="w-7 h-7 flex items-center justify-center rounded-full bg-red-600 text-white font-bold uppercase hover:bg-red-700"
//               >
//                 {user.charAt(0)}
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-1 bg-white rounded-md shadow-md border text-xs w-28">
//                   <div className="px-3 py-1 border-b text-gray-600 truncate">
//                     {user.split("@")[0]}
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-1 text-red-600 px-3 py-1.5 w-full hover:bg-gray-100"
//                   >
//                     <LogOut size={12} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* MAIN CONTENT */}
//       <div className="flex flex-row justify-center items-start w-full mt-20 px-6 pb-10 h-[calc(100vh-80px)]">
//         <div className="w-full bg-white shadow-md rounded-xl flex flex-row p-4 gap-4 h-full">
          
//           {/* LEFT FORM (35%) */}
//           <div className="w-[35%] bg-gray-50 rounded-lg p-4 shadow-inner space-y-4 overflow-y-auto">
//             <h2 className="text-base font-bold text-gray-700 border-b pb-1">🩺 Health Details</h2>

//             <div className="grid grid-cols-2 gap-3 items-center">
//               <label className="font-medium text-gray-700">Name</label>
//               <input placeholder="Enter name" className="border rounded px-2 py-1.5 shadow-sm" />

//               <label className="font-medium text-gray-700">User ID</label>
//               <input placeholder="Enter ID" className="border rounded px-2 py-1.5 shadow-sm" />

//               <label className="font-medium text-gray-700">Age</label>
//               <input type="number" min="1" className="border rounded px-2 py-1.5 shadow-sm" />

//               <label className="font-medium text-gray-700">Gender</label>
//               <select className="border rounded px-2 py-1.5 shadow-sm">
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>

//               <label className="font-medium text-gray-700">Disorder</label>
//               <input placeholder="Enter disorder" className="border rounded px-2 py-1.5 shadow-sm" />

//               <label className="font-medium text-gray-700">Sleeping Hours</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 7.5"
//                 className="border rounded px-2 py-1.5 shadow-sm"
//               />

//               <label className="font-medium text-gray-700">Interaction Duration</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 2.5"
//                 className="border rounded px-2 py-1.5 shadow-sm"
//               />
            
//               {/* New Small Input Field */}
//               <label className="font-medium text-gray-700">Previous Score</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 5.0"
//                 className="border rounded px-2 py-1.5 w-24 shadow-sm"
//               />
//             </div>

//             {/* SYMPTOMS */}
//             <div>
//               <label className="font-medium text-gray-700 mb-1 block">Common Symptoms</label>
//               <input
//                 placeholder="Type & press Enter"
//                 value={symptomInput}
//                 onChange={(e) => setSymptomInput(e.target.value)}
//                 onKeyDown={handleAddSymptom}
//                 className="border rounded px-2 py-1.5 text-sm shadow-sm w-full"
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {symptoms.map((sym, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-center border px-2 py-1 rounded-full text-xs font-semibold ${sym.color}`}
//                   >
//                     {sym.text}
//                     <button
//                       onClick={() => removeSymptom(sym)}
//                       className="ml-1 text-gray-500 hover:text-red-500"
//                     >
//                       <X size={10} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* MENTAL SCALE */}
//             <div>
//               <label className="font-medium text-gray-700 text-sm mb-1 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-green-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span><span>5</span><span>10</span>
//               </div>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-2 mt-3">
//               <button
//   onClick={async () => {
//     const inputs = document.querySelectorAll("input, select");
//     const data = {
//       user_id: inputs[1].value,
//       age: parseFloat(inputs[2].value),
//       gender: inputs[3].value,
//       disorder: inputs[4].value,
//       sleeping_hr: parseFloat(inputs[5].value),
//       duration_interaction: parseFloat(inputs[6].value),
//       prev_score: parseFloat(inputs[7].value),
//       mentalscale: mentalScale,
//       symptoms: symptoms.map((s) => s.text),
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:8003/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const html = await res.text();
//       setPreviewHTML(html);
//     } catch (err) {
//       console.error("Error:", err);
//       setPreviewHTML("<p class='text-red-500'>⚠️ Server error</p>");
//     }
//   }}
//   className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
// >
//   🚀 Generate
// </button>

   

//               <button
//   onClick={async () => {
//     const inputs = document.querySelectorAll("input, select");
//     const data = {
//       user_id: inputs[1].value,
//       age: parseFloat(inputs[2].value),
//       gender: inputs[3].value,
//       disorder: inputs[4].value,
//       sleeping_hr: parseFloat(inputs[5].value),
//       duration_interaction: parseFloat(inputs[6].value),
//       prev_score: parseFloat(inputs[7].value),
//       mentalscale: mentalScale,
//       symptoms: symptoms.map((s) => s.text),
//     };

//     const res = await fetch("http://127.0.0.1:8003/export-pdf", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Progress_Report.pdf";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//   }}
//   className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
// >
//   📄 PDF
// </button>

             
//               <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW (65%) */}
//              <div className="w-[65%] bg-white border rounded-lg shadow-inner p-4 overflow-y-auto">
//   {previewHTML ? (
//     <iframe
//       srcDoc={previewHTML}
//       title="Progress Preview"
//       className="w-full h-full rounded-lg border-0"
//     />
//   ) : (
//     <div className="text-gray-400 text-center">
//       Health profile preview will appear here...
//     </div>
//   )}
// </div>

          
//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { LogOut, X } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(null);
//   const [mentalScale, setMentalScale] = useState(5);
//   const [symptomInput, setSymptomInput] = useState("");
//   const [symptoms, setSymptoms] = useState([]);

//   const colors = [
//     "border-purple-500 text-purple-600 bg-purple-50",
//     "border-blue-500 text-blue-600 bg-blue-50",
//     "border-pink-500 text-pink-600 bg-pink-50",
//     "border-green-500 text-green-600 bg-green-50",
//     "border-orange-500 text-orange-600 bg-orange-50",
//   ];

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   const handleAddSymptom = (e) => {
//     if (e.key === "Enter" && symptomInput.trim() !== "") {
//       e.preventDefault();
//       if (!symptoms.some((s) => s.text === symptomInput.trim())) {
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
//       }
//       setSymptomInput("");
//     }
//   };

//   const removeSymptom = (sym) => {
//     setSymptoms(symptoms.filter((s) => s.text !== sym.text));
//   };

//   const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
//         <div className="flex items-center space-x-4">
//           <span className="text-red-600 text-xl font-bold">Help:)ME AI</span>
//           <button className="font-semibold hover:text-red-600 text-sm">
//             Explore
//           </button>
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

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col md:flex-row justify-center items-start w-full mt-28 p-4">
//         <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row p-6 gap-6">
          
//           {/* LEFT FORM */}
//           <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-6 shadow-inner space-y-6">
//             <h2 className="text-lg font-bold text-gray-700 border-b pb-2">🩺 Health Details</h2>
            
//             <div className="grid grid-cols-2 gap-4 text-sm items-center">
//               <label className="font-semibold text-gray-700">Name</label>
//               <input placeholder="Enter name" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">User ID</label>
//               <input placeholder="Enter ID" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Age</label>
//               <input type="number" min="1" step="1" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Gender</label>
//               <select className="border rounded-md px-3 py-2 shadow-sm w-full">
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>

//               <label className="font-semibold text-gray-700">Disorder</label>
//               <input placeholder="Enter disorder" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Sleeping Hours</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 7.5"
//                 className="border rounded-md px-3 py-2 shadow-sm w-full"
//               />

//               <label className="font-semibold text-gray-700">Interaction Duration</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 2.5"
//                 className="border rounded-md px-3 py-2 shadow-sm w-full"
//               />
//             </div>

//             {/* Symptoms */}
//             <div>
//               <label className="font-semibold text-gray-700 text-sm mb-1 block">
//                 Common Symptoms
//               </label>
//               <input
//                 placeholder="Type symptom & press Enter"
//                 value={symptomInput}
//                 onChange={(e) => setSymptomInput(e.target.value)}
//                 onKeyDown={handleAddSymptom}
//                 className="border rounded-md px-3 py-2 text-sm shadow-sm w-full"
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {symptoms.map((sym, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-center border px-3 py-1 rounded-full text-xs font-semibold ${sym.color}`}
//                   >
//                     {sym.text}
//                     <button
//                       onClick={() => removeSymptom(sym)}
//                       className="ml-2 text-gray-500 hover:text-red-500"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mental Scale */}
//             <div>
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-green-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span>
//                 <span>5</span>
//                 <span>10</span>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-2 mt-4">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 🚀 Generate & Preview
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 📄 PDF
//               </button>
//               <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW BOX */}
//           <div className="w-full md:w-1/2 bg-white border rounded-xl shadow-inner p-6 flex items-center justify-center">
//             <h2 className="text-gray-400 text-sm text-center">
//               Health profile preview will appear here...
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { LogOut, X } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(null);
//   const [mentalScale, setMentalScale] = useState(5);
//   const [symptomInput, setSymptomInput] = useState("");
//   const [symptoms, setSymptoms] = useState([]);

//   const colors = [
//     "border-purple-500 text-purple-600 bg-purple-50",
//     "border-blue-500 text-blue-600 bg-blue-50",
//     "border-pink-500 text-pink-600 bg-pink-50",
//     "border-green-500 text-green-600 bg-green-50",
//     "border-orange-500 text-orange-600 bg-orange-50",
//   ];

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   const handleAddSymptom = (e) => {
//     if (e.key === "Enter" && symptomInput.trim() !== "") {
//       e.preventDefault();
//       if (!symptoms.some((s) => s.text === symptomInput.trim())) {
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
//       }
//       setSymptomInput("");
//     }
//   };

//   const removeSymptom = (sym) => {
//     setSymptoms(symptoms.filter((s) => s.text !== sym.text));
//   };

//   const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
//         <div className="flex items-center space-x-4">
//           <span className="text-red-600 text-xl font-bold">Help:)ME AI</span>
//           <button className="font-semibold hover:text-red-600 text-sm">
//             Explore
//           </button>
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

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col md:flex-row justify-center items-start w-full mt-28 p-4">
//         <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row p-6 gap-6">
          
//           {/* LEFT FORM */}
//           <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-6 shadow-inner space-y-6">
//             <h2 className="text-lg font-bold text-gray-700 border-b pb-2">🩺 Health Details</h2>
            
//             <div className="grid grid-cols-2 gap-4 text-sm items-center">
//               <label className="font-semibold text-gray-700">Name</label>
//               <input placeholder="Enter name" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">User ID</label>
//               <input placeholder="Enter ID" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Age</label>
//               <input type="number" min="1" step="1" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Gender</label>
//               <select className="border rounded-md px-3 py-2 shadow-sm w-full">
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>

//               <label className="font-semibold text-gray-700">Disorder</label>
//               <input placeholder="Enter disorder" className="border rounded-md px-3 py-2 shadow-sm w-full" />

//               <label className="font-semibold text-gray-700">Sleeping Hours</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 7.5"
//                 className="border rounded-md px-3 py-2 shadow-sm w-full"
//               />

//               <label className="font-semibold text-gray-700">Interaction Duration</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 placeholder="e.g. 2.5"
//                 className="border rounded-md px-3 py-2 shadow-sm w-full"
//               />
//             </div>

//             {/* Symptoms */}
//             <div>
//               <label className="font-semibold text-gray-700 text-sm mb-1 block">
//                 Common Symptoms
//               </label>
//               <input
//                 placeholder="Type symptom & press Enter"
//                 value={symptomInput}
//                 onChange={(e) => setSymptomInput(e.target.value)}
//                 onKeyDown={handleAddSymptom}
//                 className="border rounded-md px-3 py-2 text-sm shadow-sm w-full"
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {symptoms.map((sym, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-center border px-3 py-1 rounded-full text-xs font-semibold ${sym.color}`}
//                   >
//                     {sym.text}
//                     <button
//                       onClick={() => removeSymptom(sym)}
//                       className="ml-2 text-gray-500 hover:text-red-500"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mental Scale */}
//             <div>
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-green-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span>
//                 <span>5</span>
//                 <span>10</span>
//               </div>
//             </div>

//             <div>
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Upload Profile Photo
//               </label>
//               <input type="file" className="w-full border rounded-md px-3 py-2 text-sm" />
//             </div>

//             <div className="flex flex-wrap gap-2 mt-4">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 🚀 Generate & Preview
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 📄 PDF
//               </button>
//               <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW BOX */}
//           <div className="w-full md:w-1/2 bg-white border rounded-xl shadow-inner p-6 flex items-center justify-center">
//             <h2 className="text-gray-400 text-sm text-center">
//               Health profile preview will appear here...
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import { LogOut, X } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(null);
//   const [mentalScale, setMentalScale] = useState(0);
//   const [symptomInput, setSymptomInput] = useState("");
//   const [symptoms, setSymptoms] = useState([]);

//   const colors = [
//     "border-purple-500 text-purple-600 bg-purple-50",
//     "border-blue-500 text-blue-600 bg-blue-50",
//     "border-pink-500 text-pink-600 bg-pink-50",
//     "border-green-500 text-green-600 bg-green-50",
//     "border-orange-500 text-orange-600 bg-orange-50",
//   ];

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   // Add symptom tag with random color
//   const handleAddSymptom = (e) => {
//     if (e.key === "Enter" && symptomInput.trim() !== "") {
//       e.preventDefault();
//       if (!symptoms.some((s) => s.text === symptomInput.trim())) {
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         setSymptoms([...symptoms, { text: symptomInput.trim(), color }]);
//       }
//       setSymptomInput("");
//     }
//   };

//   const removeSymptom = (sym) => {
//     setSymptoms(symptoms.filter((s) => s.text !== sym.text));
//   };

//   // Dynamic emoji based on scale
//   const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
//         <div className="flex items-center space-x-4">
//           <span className="text-red-600 text-xl font-bold">Help:)ME AI</span>
//           <button className="font-semibold hover:text-red-600 text-sm">
//             Explore
//           </button>
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

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col md:flex-row justify-center items-start w-full mt-28 p-4">
//         <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row p-6 gap-6">
//           {/* LEFT FORM */}
//           <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-5 shadow-inner">
//             <div className="grid grid-cols-2 gap-3">
//               <input placeholder="Enter Name" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter user_ID" className="border rounded-md px-3 py-2 text-sm shadow-sm" />

//               <input 
//                 type="number" 
//                 placeholder="Age (default 21)" 
//                 className="border rounded-md px-3 py-1.5 text-sm shadow-sm w-24" 
//               />

//               {/* Gender Dropdown */}
//               <select className="border rounded-md px-3 py-2 text-sm shadow-sm">
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>

//               <input placeholder="Enter disorder" className="border rounded-md px-3 py-2 text-sm shadow-sm col-span-2" />

//               {/* Common Symptoms */}
//               <div className="col-span-2">
//                 <input
//                   placeholder="Type symptom & press Enter"
//                   value={symptomInput}
//                   onChange={(e) => setSymptomInput(e.target.value)}
//                   onKeyDown={handleAddSymptom}
//                   className="border rounded-md px-3 py-2 text-sm shadow-sm w-full"
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {symptoms.map((sym, i) => (
//                     <div
//                       key={i}
//                       className={`flex items-center border px-3 py-1 rounded-full text-xs font-semibold ${sym.color}`}
//                     >
//                       {sym.text}
//                       <button
//                         onClick={() => removeSymptom(sym)}
//                         className="ml-2 text-gray-500 hover:text-red-500"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* MENTAL SCALE */}
//             <div className="mt-6">
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-green-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span>
//                 <span>5</span>
//                 <span>10</span>
//               </div>
//             </div>

//             {/* Other Inputs */}
//             <div className="grid grid-cols-2 gap-3 mt-6">
//               <input 
//                 type="number"
//                 placeholder="Sleeping hours" 
//                 className="border rounded-md px-3 py-1.5 text-sm shadow-sm w-24" 
//               />
//               <input 
//                 type="number"
//                 placeholder="Interaction duration" 
//                 className="border rounded-md px-3 py-1.5 text-sm shadow-sm w-24" 
//               />
//             </div>

//             <div className="mt-6">
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Upload Profile Photo
//               </label>
//               <input type="file" className="w-full border rounded-md px-3 py-2 text-sm" />
//             </div>

//             <div className="flex flex-wrap gap-2 mt-6">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 🚀 Generate & Preview
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 📄 PDF
//               </button>
//               <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW BOX */}
//           <div className="w-full md:w-1/2 bg-white border rounded-xl shadow-inner p-6 flex items-center justify-center">
//             <h2 className="text-gray-400 text-sm text-center">
//               Health profile preview will appear here...
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { LogOut } from "lucide-react";

// export default function HealthProfileGenerator() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(null);

//   const [mentalScale, setMentalScale] = useState(0);

//   const handleLogout = () => {
//     setUser(null);
//     setShowDropdown(false);
//   };

//   // Dynamic emoji based on scale
// const getFace = (value) => {
//     if (value <= 2) return "😢";
//     if (value <= 4) return "😔";
//     if (value <= 6) return "😐";
//     if (value <= 8) return "🙂";
//     return "😄";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
//         <div className="flex items-center space-x-4">
//           <span className="text-red-600 text-xl font-bold">Help:)ME AI</span>
//           <button className="font-semibold hover:text-red-600 text-sm">
//             Explore
//           </button>
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

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col md:flex-row justify-center items-start w-full mt-28 p-4">
//         <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row p-6 gap-6">
//           {/* LEFT FORM */}
//           <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-5 shadow-inner">
//             <div className="grid grid-cols-2 gap-3">
//               <input placeholder="Enter user_ID" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter age (default 21)" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter gender" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter disorder" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter common symptoms" className="col-span-2 border rounded-md px-3 py-2 text-sm shadow-sm" />
//             </div>

//             {/* MENTAL SCALE SLIDER */}
//             <div className="mt-6">
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Mental Scale ({mentalScale})
//               </label>
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">{getFace(mentalScale)}</span>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={mentalScale}
//                   onChange={(e) => setMentalScale(parseInt(e.target.value))}
//                   className="w-full accent-green-600"
//                 />
//               </div>
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>1</span>
//                 <span>5</span>
//                 <span>10</span>
//               </div>
//             </div>

//             {/* Other Fields */}
//             <div className="grid grid-cols-2 gap-3 mt-6">
//               <input placeholder="Enter sleeping hours" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//               <input placeholder="Enter interaction duration" className="border rounded-md px-3 py-2 text-sm shadow-sm" />
//             </div>

//             <div className="mt-6">
//               <label className="font-semibold text-gray-700 text-sm mb-2 block">
//                 Upload Profile Photo
//               </label>
//               <input type="file" className="w-full border rounded-md px-3 py-2 text-sm" />
//             </div>

//             <div className="flex flex-wrap gap-2 mt-6">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 🚀 Generate & Preview
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 📄 PDF
//               </button>
//               <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
//                 💾 DOCX
//               </button>
//             </div>
//           </div>

//           {/* RIGHT PREVIEW BOX */}
//           <div className="w-full md:w-1/2 bg-white border rounded-xl shadow-inner p-6 flex items-center justify-center">
//             <h2 className="text-gray-400 text-sm text-center">
//               Health profile preview will appear here...
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






