import { useState, useEffect } from "react";
import {
  Mail,
  GraduationCap,
  Shield,
  Pencil,
  UserCircle2,
  X,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  institution: string;
}

export default function UserDetailsCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    role: "",
    institution: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.PUBLIC_API_URL;

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role,
          institution: data.institution,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setIsOpen(false);
      } else {
        alert(data.detail || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-xl">
        Failed to load user data.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
        {/* Profile Image Section */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">
            <UserCircle2 size={80} className="text-indigo-600" />
          </div>

          <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition">
            <Pencil size={16} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="flex-1 w-full">
          {/* Name & Role */}
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.name.toUpperCase()}
            </h2>

            <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 capitalize">
              {user.role}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>

          {/* Institution */}
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <GraduationCap size={16} />
            <span>{user.institution}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            <Shield size={16} />
            Edit Profile
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="Institution"
              className="w-full border p-2 rounded mb-3"
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-indigo-600 text-white py-2 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
