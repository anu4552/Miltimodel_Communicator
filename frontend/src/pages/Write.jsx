import React, { useState } from "react";
import { Bold, Italic, LinkIcon, Heading2, Quote, ImageIcon } from "lucide-react";
import API from "../utils/api";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("accessToken");

  // IMAGE UPLOAD HANDLER
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImages(prev => [...prev, reader.result]);
    reader.readAsDataURL(file);
  };

  // PUBLISH
  const publishPost = async () => {
    const res = await API.post(
      "/posts",
      { title, content, images },
      { headers: { Authorization: "Bearer " + token } }
    );

    alert("Article Published!");
    window.location.href = "/home";
  };

  return (
    <div className="px-20 py-10">
      {/* TOP NAV LIKE MEDIUM */}
      <div className="flex justify-between items-center mb-10">
        <div className="text-4xl font-serif">Medium</div>

        <div className="flex items-center gap-3">
          <button
            onClick={publishPost}
            className="bg-green-200 text-green-900 px-4 py-2 rounded-full text-sm"
          >
            Publish
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* TITLE */}
      <input
        placeholder="Title"
        className="w-full text-6xl font-serif text-gray-700 outline-none mb-6"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* TOOLBAR */}
      <div className="flex gap-4 border p-3 rounded mb-4 bg-white shadow-sm w-fit">
        <Bold className="cursor-pointer" />
        <Italic className="cursor-pointer" />
        <LinkIcon className="cursor-pointer" />
        <Heading2 className="cursor-pointer" />
        <Quote className="cursor-pointer" />
        
        {/* Image Upload */}
        <label>
          <ImageIcon className="cursor-pointer" />
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </label>
      </div>

      {/* CONTENT EDITOR */}
      <textarea
        placeholder="Tell your story..."
        className="w-full min-h-[400px] text-xl outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* SHOW IMAGES */}
      {images.length > 0 && (
        <div className="mt-6 space-y-4">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="uploaded" className="w-full rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
}
