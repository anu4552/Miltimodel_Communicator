import { useEffect, useState } from 'react';
import api from '../api/socialApi';
import SocialSidebar from '../components/SocialSidebar';
import SocialTopbar from '../components/SocialTopbar';
import SocialPostCard from '../components/SocialPostCard';
import { useNavigate } from 'react-router-dom';

export default function SocialHome(){
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    api.get('/posts/feed')
      .then(res => setPosts(res.data))
      .catch(err => {
        if (err.response?.status === 401) nav('/social/login');
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SocialSidebar />
      <div className="flex-1">
        <SocialTopbar />
        <main className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">For you</h1>
          <div className="flex flex-col gap-6">
            {posts.map(p => <SocialPostCard key={p._id} post={p} />)}
          </div>
        </main>
      </div>
      <aside className="w-72 hidden lg:block p-6">
        <div className="bg-white p-4 rounded shadow">Staff picks & recommendations</div>
      </aside>
    </div>
  );
}
