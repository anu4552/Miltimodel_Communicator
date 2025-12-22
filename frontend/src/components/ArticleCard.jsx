

// src/components/ArticleCard.jsx
import React from "react";
import { MessageCircle, Bookmark, MoreHorizontal, Star } from "lucide-react";


export default function ArticleCard({ post }) {
return (
<article className="flex gap-6 py-8 border-b">
<div className="flex-1">
<div className="flex items-center gap-3 mb-3">
<img src={`https://avatars.dicebear.com/api/identicon/${post.authorEmail}.svg`} alt="author" className="w-9 h-9 rounded-full" />
<div>
<div className="text-sm font-semibold">{post.authorName}</div>
<div className="text-xs text-gray-500">{post.authorSubtitle}</div>
</div>
</div>


<h2 className="text-2xl font-bold leading-tight mb-2 hover:underline cursor-pointer">{post.title}</h2>
<p className="text-gray-600 mb-4">{post.excerpt}</p>


<div className="flex items-center gap-4 text-sm text-gray-500">
<div className="flex items-center gap-2"> <Star size={14} /> <span>{post.highlight}</span> </div>
<div>·</div>
<div>{post.date}</div>
<div>·</div>
<div>{post.views} views</div>
<div>·</div>
<div className="flex items-center gap-2"><MessageCircle size={14} /> {post.comments}</div>


<div className="ml-auto flex items-center gap-3">
<button className="p-2 rounded hover:bg-gray-100" title="Clap"><Star size={16} /></button>
<button className="p-2 rounded hover:bg-gray-100" title="Responses"><MessageCircle size={16} /></button>
<button className="p-2 rounded hover:bg-gray-100" title="Save"><Bookmark size={16} /></button>
<button className="p-2 rounded hover:bg-gray-100" title="More"><MoreHorizontal size={16} /></button>
</div>
</div>
</div>


<div className="w-40 shrink-0">
<img src={post.image} alt="thumb" className="w-40 h-24 object-cover rounded-md" />
</div>
</article>
);
}