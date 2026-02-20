import { useState } from "react";
import { Search, UserCircle } from "lucide-react";

export default function AdminNavbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-40">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search users, quizzes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <UserCircle size={28} className="text-gray-600" />
        <div className="text-sm">
          <p className="font-medium text-gray-700">Admin</p>
          <p className="text-xs text-gray-400">Super Admin</p>
        </div>
      </div>
    </header>
  );
}
