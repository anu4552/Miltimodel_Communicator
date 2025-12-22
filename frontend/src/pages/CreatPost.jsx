import { useState } from "react";
import API from "../api/api";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const uploadPost = async () => {
    let file_id = null;

    if (file) {
      const form = new FormData();
      form.append("file", file);

      const up = await API.post("/upload", form);
      file_id = up.data.file_id;
    }

    await API.post("/posts/create", {
      text,
      type: file ? (file.type.startsWith("image") ? "image" : "audio") : "text",
      media_id: file_id,
    });

    alert("Posted Successfully!");
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Create a Post</h1>

      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Write something..."
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="p-2 bg-blue-500 text-white" onClick={uploadPost}>
        Upload Post
      </button>
    </div>
  );
}
