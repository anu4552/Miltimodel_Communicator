export default function SocialTopbar(){
  const user = JSON.parse(localStorage.getItem('social_user') || 'null');
  return (
    <header className="w-full bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="md:hidden">☰</button>
        <div className="text-lg font-semibold">Help:)Me Social</div>
      </div>
      <div className="flex items-center gap-4">
        <input placeholder="Search" className="border px-3 py-2 rounded hidden lg:block"/>
        {user ? <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="hidden sm:block">{user.name}</span>
        </div> : <div />}
      </div>
    </header>
  );
}
