import { useNavigate } from 'react-router-dom';

export default function SocialPostCard({ post }){
  const nav = useNavigate();
  return (
    <article className="bg-white p-6 rounded shadow border">
      <div className="flex items-center gap-3 cursor-pointer" onClick={()=>nav(`/social/profile/${post.user._id}`)}>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <div className="font-semibold">{post.user?.name || 'User'}</div>
          <div className="text-sm text-gray-500">{new Date(post.createdAt || post.created_at).toLocaleDateString()}</div>
        </div>
      </div>

      <p className="mt-4 text-gray-900">{post.text}</p>

      {post.type === 'image' && post.media_file_id && (
        <img src={`/api/social/media/${post.media_file_id}`} className="mt-4 rounded w-full" alt="post"/>
      )}

      {post.type === 'audio' && post.media_file_id && (
        <audio controls className="mt-4 w-full" src={`/api/social/media/${post.media_file_id}`}/>
      )}
    </article>
  );
}

