import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // remove token
    window.location.href = "/"; // redirect to home
  };

  const navClass = (path) =>
    `block px-4 py-3 rounded-xl text-sm font-medium transition
     ${
       currentPath === path
         ? "bg-indigo-600 text-white"
         : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
     }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-indigo-600">ResilienceQ</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="/admin/dashboard" className={navClass("/admin/dashboard")}>
          Dashboard
        </a>

        <a href="/admin/users" className={navClass("/admin/users")}>
          User Analytics
        </a>

        <a href="/admin/quizzes" className={navClass("/admin/quizzes")}>
          Quiz Analytics
        </a>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
