import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "../components/SocialPostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts/feed").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community Feed</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
