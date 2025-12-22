// src/components/FeedTabs.jsx
import React from "react";


export default function FeedTabs({ children }) {
return (
<div>
<div className="flex items-center gap-6 mb-6">
<div className="flex items-center gap-4">
<button className="text-sm font-semibold border-b-2 border-black pb-2">For you</button>
<button className="text-sm text-gray-600">Featured</button>
</div>


<div className="ml-auto text-sm text-gray-500">Trending · New</div>
</div>


{children}
</div>
);
}