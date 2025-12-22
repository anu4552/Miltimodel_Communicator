import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, X, Mic, Upload, Trash2 } from "lucide-react";
import axios from "axios"; // for API requests

export default function AICommunicator() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hoveredSign, setHoveredSign] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I’m your sign language assistant 🤖" },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // ---------------------- DRAGGABLE KEYBOARD ---------------------- //
  const keyboardRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // ---------------------- SPEECH SYNTHESIS ---------------------- //
  const [isSpeaking, setIsSpeaking] = useState(false);  
  const synthRef = useRef(window.speechSynthesis);


  const handleMouseDown = (e) => {
    if (!keyboardRef.current) return;
    setDragging(true);
    const rect = keyboardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !keyboardRef.current) return;
    keyboardRef.current.style.left = `${e.clientX - dragOffset.x}px`;
    keyboardRef.current.style.top = `${e.clientY - dragOffset.y}px`;
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // ---------------------- SEND MESSAGE ---------------------- //


  // ---- sendMessage (improved with logging + typing placeholder) ----
const sendMessage = async () => {
  if (!typedText.trim() && !uploadedImage) return; // nothing to send

  // Show user message instantly
  const newMessage = {
    sender: "user",
    text: typedText.trim() || "",
    image: uploadedImage ? { url: uploadedImage.url, name: uploadedImage.name } : null,
  };
  setMessages((prev) => [...prev, newMessage]);

  // show "typing..." from AI so user knows request is in progress
  setMessages((prev) => [...prev, { sender: "ai", text: "💭 Processing..." }]);

  const payload = {
    text: typedText.trim(),
    image_name: uploadedImage ? uploadedImage.name : null,
  };

  console.log("Sending payload to /process:", payload); // debug log

  try {
    const response = await axios.post("http://127.0.0.1:8002/process", payload, {
      // optional: timeout: 20000
    });

    // Remove the "Processing..." placeholder (assume it's last AI message)
    setMessages((prev) => {
      const withoutPlaceholder = [...prev];
      // remove last AI placeholder if it matches our placeholder text
      const lastIdx = withoutPlaceholder.map(m => m.sender).lastIndexOf("ai");
      if (lastIdx !== -1 && withoutPlaceholder[lastIdx].text === "💭 Processing...") {
        withoutPlaceholder.splice(lastIdx, 1);
      }
      return withoutPlaceholder;
    });

    const aiResponse = response?.data?.reply || response?.data?.message || "No response from AI.";

    setMessages((prev) => {
  const updated = [...prev, { text: aiResponse, sender: "ai" }];

  // 🔊 Auto Speak AI response if speaking mode is ON
  if (isSpeaking && aiResponse) {
    const utter = new SpeechSynthesisUtterance(aiResponse);
    utter.lang = "en-US";
    synthRef.current.speak(utter);
  }

  return updated;
});

    // setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
  } catch (error) {
    // better error details for debugging
    console.error("Error sending message (axios error):", error);

    // show server response if available
    if (error.response) {
      console.error("Server status:", error.response.status);
      console.error("Server data:", error.response.data);
      setMessages((prev) => [
        ...prev,
        { text: `⚠️ Server error ${error.response.status}: ${JSON.stringify(error.response.data)}`, sender: "ai" },
      ]);
    } else if (error.request) {
      // request made but no response
      console.error("No response received (request):", error.request);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ No response from server. Is backend running on http://127.0.0.1:8002 ?", sender: "ai" },
      ]);
    } else {
      console.error("Axios setup error:", error.message);
      setMessages((prev) => [
        ...prev,
        { text: `⚠️ Request error: ${error.message}`, sender: "ai" },
      ]);
    }
  } finally {
    setTypedText("");
    setUploadedImage(null);
    setShowKeyboard(false);
  }
};

  const handleKeyboardClick = (key) => {
    if (key === "SPACE") setTypedText((t) => t + " ");
    else if (key === "CANCEL") setTypedText("");
    else setTypedText((t) => t + key);
  };

  // ---------------------- VOICE → TEXT ---------------------- //
  const handleVoiceToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTypedText((t) => t + " " + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      inputRef.current.value = typedText + " " + interimTranscript;
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // ---------------------- IMAGE UPLOAD ---------------------- //
  // ---- handleImageUpload (fixed) ----
const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const imageURL = URL.createObjectURL(file);

  // keep the original file reference in state in case you want to upload later
  setUploadedImage({ name: file.name, url: imageURL, file });

 

  event.target.value = null;
};


 

  const handleTypeMessage = () => inputRef.current?.focus();

  // ---------------------- AI CORRECTOR ---------------------- //
  const handleAICorrector = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/correct_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: typedText }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // ✅ Update the input box with the corrected text
    setTypedText(data.corrected_text || "");

  } catch (error) {
    console.error("Error correcting text:", error);
    alert("Failed to correct text.");
  }
};

//AI avtar logic
   // ---------------------- SPEAK AI RESPONSE ---------------------- //
const handleAvatarSpeech = () => {
  const synth = synthRef.current;

  // If already speaking → STOP speech
  if (isSpeaking) {
    synth.cancel();
    setIsSpeaking(false);
    return;
  }

  // Find the last AI message
  const lastAI = [...messages].reverse().find((msg) => msg.sender === "ai");

  if (!lastAI || !lastAI.text) return;

  // Create utterance
  const utter = new SpeechSynthesisUtterance(lastAI.text);
  utter.lang = "en-US";
  utter.rate = 1;
  utter.pitch = 1;

  utter.onend = () => setIsSpeaking(false);

  // Speak
  synth.speak(utter);
  setIsSpeaking(true);
};






  return (
    
  <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
    <div className="w-[95vw] h-[95vh] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-blue-200 transition-all">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-white/70 backdrop-blur-md shadow-sm">
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          AI Communicator
        </h1>

        <button className="text-gray-700 hover:text-blue-600 transition font-medium">
          Home
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col md:flex-row bg-gradient-to-b from-blue-100/70 to-blue-300/70 text-gray-800 font-sans overflow-hidden relative">
        {/* LEFT PANEL */}
        <div className="md:w-1/3 w-full flex flex-col justify-start border-r border-blue-200 p-6 space-y-4 relative">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700">
            Communication Options
          </h2>

          {/* FLOATING KEYBOARD */}
          {showKeyboard && (
            <div
              ref={keyboardRef}
              onMouseDown={handleMouseDown}
              className="absolute top-8 left-6 w-72 p-4 rounded-2xl border border-blue-300/30 bg-blue-100/40 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)] animate-fadeIn z-30 cursor-move select-none"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowKeyboard(false);
                }}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 transition"
              >
                <X size={18} />
              </button>

              <h3 className="text-sm mb-3 text-center text-blue-600 font-semibold">
                Sign Keyboard
              </h3>

              {hoveredSign && (
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white/90 border border-blue-300/50 rounded-xl p-3 shadow-xl backdrop-blur-md">
                  <img
                    src={`/signs/${hoveredSign}.jpg`}
                    alt={hoveredSign}
                    className="w-16 h-16 rounded-lg object-cover border border-blue-300"
                  />
                  <p className="text-center text-blue-600 mt-1 font-semibold text-sm">
                    {hoveredSign}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-6 gap-1 justify-items-center mb-2">
                {letters.map((letter) => (
                  <div
                    key={letter}
                    onMouseEnter={() => setHoveredSign(letter)}
                    onMouseLeave={() => setHoveredSign(null)}
                    onClick={() => handleKeyboardClick(letter)}
                    className="flex flex-col items-center space-y-1 cursor-pointer group transform hover:scale-110 transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 border border-blue-300/40 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300">
                      <img
                        src={`/signs/${letter}.jpg`}
                        alt={letter}
                        className="w-6 h-6 rounded-lg object-cover opacity-90 group-hover:opacity-100 transition-all"
                      />
                    </div>
                    <span className="text-xs font-medium text-blue-700 group-hover:text-blue-900 transition">
                      {letter}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-around mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleKeyboardClick("SPACE");
                  }}
                  className="px-3 py-1 bg-blue-500/30 hover:bg-blue-400/50 rounded-lg text-sm font-medium text-blue-900 transition"
                >
                  Space
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleKeyboardClick("CANCEL");
                  }}
                  className="px-3 py-1 bg-blue-500/30 hover:bg-blue-400/50 rounded-lg text-sm font-medium text-blue-900 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* BUTTON OPTIONS */}
          <div className="flex flex-col gap-4 z-10">
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="bg-blue-500/80 hover:bg-blue-400/80 py-3 rounded-lg font-medium shadow-md transition-all backdrop-blur-sm text-white"
            >
              🤟 Sign → Text
            </button>

            <button
              onClick={handleVoiceToText}
              className={`py-3 rounded-lg font-medium shadow-md transition-all backdrop-blur-sm text-white ${
                isListening
                  ? "bg-red-500/80 hover:bg-red-400/80 animate-pulse"
                  : "bg-cyan-600/80 hover:bg-cyan-500/80"
              }`}
            >
              {isListening ? "🎙️ Listening..." : "🎤 Voice → Text"}
            </button>

            <label className="bg-indigo-500/80 hover:bg-indigo-400/80 py-3 rounded-lg font-medium shadow-md transition-all backdrop-blur-sm text-center cursor-pointer text-white">
              📤 Upload Image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleTypeMessage}
              className="bg-blue-600/80 hover:bg-blue-500/80 py-3 rounded-lg font-medium shadow-md transition-all backdrop-blur-sm text-white"
            >
              💬 Type Message
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">

            {/* Avatar — Click to Start/Stop Speaking */}
            <div
              className="absolute top-2 right-4 flex flex-col items-center z-20 cursor-pointer"
              onClick={handleAvatarSpeech} // 🔊 CLICK = Start/Stop speech
            >
            <div className={`w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 
             ${isSpeaking ? "border-red-500 animate-ping" : "border-blue-400 animate-pulse-slow"}`}>
            <img
              src="/src/assets/boy.jpeg"
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
            </div>
            <p className="mt-1 text-blue-600 text-[10px] font-medium text-center">
            {isSpeaking ? "Speaking..." : "AI Assistant"}
            </p>
        </div>

          {/* Floating Avatar
          <div className="absolute top-2 right-4 flex flex-col items-center z-20">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-blue-400 animate-pulse-slow">
              <img
                src="/src/assets/avtar.jpg"
                alt="AI Assistant"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-1 text-blue-600 text-[10px] font-medium text-center">
              AI Assistant
            </p>
          </div> */}

          {/* Chat Window */}
          <div className="w-full max-w-xl space-y-4 mb-4 overflow-y-auto max-h-[55vh] px-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-5 py-3 rounded-2xl max-w-[75%] text-base ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white/80 text-gray-800 border border-blue-100"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {msg.image && (
                      <img
                        src={msg.image.url}
                        alt={msg.image.name}
                        className="rounded-xl max-h-48 object-contain"
                      />
                    )}
                    {msg.text && (
                      <div>
                        {/\d+\.\s+/.test(msg.text) ? (
                          <ol className="list-decimal ml-5 space-y-1">
                            {msg.text
                              .split(/\d+\.\s+/)
                              .filter(Boolean)
                              .map((point, idx) => (
                                <li key={idx} className="text-sm leading-snug">
                                  {point.trim()}
                                </li>
                              ))}
                          </ol>
                        ) : (
                          <p className="whitespace-pre-line">{msg.text}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Attachment Preview */}
          {uploadedImage && (
            <div className="w-full max-w-xl mb-2 flex items-center justify-between bg-white/70 border border-blue-200 rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={uploadedImage.url}
                  alt="preview"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <p className="text-sm text-gray-700">{uploadedImage.name}</p>
              </div>
              <button
                onClick={() => setUploadedImage(null)}
                className="text-blue-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="w-full max-w-xl flex items-center space-x-2 bg-white/80 border border-blue-200 rounded-lg px-4 py-2 mt-4 shadow-inner">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-blue-500 transition"
              title="Upload Image"
            >
              <Upload size={22} />
            </button>

            <button
              onClick={handleVoiceToText}
              className={`transition ${
                isListening
                  ? "text-red-500 animate-pulse"
                  : "text-gray-500 hover:text-cyan-500"
              }`}
              title="Speak"
            >
              <Mic size={22} />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent border-none outline-none text-gray-800 px-2 py-2"
            />

            <button
              onClick={handleAICorrector}
              className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg font-semibold text-white transition-all"
            >
              AI Correct
            </button>

            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-400 px-5 py-2 rounded-lg font-semibold text-white transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}


    