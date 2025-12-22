// src/components/MediumRightSidebar.jsx
import React from "react";


export default function MediumRightSidebar() {
return (
<aside className="w-80 hidden xl:block p-6">
<div className="sticky top-20">
<div className="mb-6">
<h4 className="font-semibold">Staff Picks</h4>
<div className="mt-4 space-y-4 text-sm text-gray-800">
<div>
<div className="text-xs text-gray-500">In Indigenous Voice</div>
<div className="font-semibold">The Language of Indigenous Identity</div>
<div className="text-xs text-gray-400 mt-1">Sep 12</div>
</div>


<div>
<div className="text-xs text-gray-500">Shanti Bright Brien</div>
<div className="font-semibold">Being a Native Woman on Turkey Day</div>
<div className="text-xs text-gray-400 mt-1">3d ago</div>
</div>
</div>
<button className="mt-4 text-sm text-gray-600 underline">See the full list</button>
</div>


<div>
<h5 className="font-semibold mb-3">Recommended topics</h5>
<div className="flex flex-wrap gap-2">
{['Relationships','Productivity','Cryptocurrency','Politics','Psychology','Health','Design'].map(t => (
<div key={t} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{t}</div>
))}
</div>
</div>
</div>
</aside>
);
}