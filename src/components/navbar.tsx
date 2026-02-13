import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import {
  Bars2Icon,
  HomeIcon,
  InformationCircleIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shouldShowBorder, setShouldShowBorder] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Border on scroll
  useEffect(() => {
    const handleScroll = () => setShouldShowBorder(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setIsNavOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/ResilienceQ/";
  };

  const navLinks = [
    { label: "Home", href: "/ResilienceQ/#", icon: HomeIcon },
    {
      label: "About Us",
      href: "/ResilienceQ/about",
      icon: InformationCircleIcon,
    },
    { label: "Blogs", href: "/ResilienceQ/blogs", icon: BookOpenIcon },
    { label: "FAQs", href: "/ResilienceQ/faq", icon: QuestionMarkCircleIcon },
  ];

  return (
    <Navbar
      className={`sticky top-0 z-50 mx-auto max-w-screen-2xl p-3 lg:px-6 bg-white transition-all ${
        shouldShowBorder ? "border-b border-gray-200 shadow-sm" : ""
      }`}
    >
      <div className="relative mx-auto flex items-center w-full">
        {/* Brand */}
        <Typography
          as="a"
          href="/ResilienceQ/#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-extrabold text-lg tracking-tight text-blue-gray-900"
        >
          Resilience<span className="text-blue-600">Q</span>
        </Typography>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex ml-auto gap-6 items-center">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Typography
                as="a"
                href={href}
                variant="small"
                className="flex items-center gap-1.5 font-medium text-blue-gray-800 hover:text-blue-600 transition"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Typography>
            </li>
          ))}

          {/* USER SECTION */}
          {user ? (
            <div className="relative">
              <Button
                variant="text"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 rounded-full"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt={user.name}
                  className="border border-gray-300 p-0.5"
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                />
                <span>{user.name.split(" ")[0]}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl border rounded-lg p-4 z-50">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 mb-3">{user.email}</p>

                  <button
                    onClick={() =>
                      (window.location.href = "/ResilienceQ/profile")
                    }
                    className="block w-full text-left mb-2 text-gray-700"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  >
                    <PowerIcon className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Typography
                as="a"
                href="/ResilienceQ/login"
                variant="small"
                className="flex items-center gap-1.5 font-medium text-blue-gray-800 hover:text-blue-600 transition"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Login
              </Typography>
            </li>
          )}

          <li>
            <a href="/ResilienceQ/quiz">
              <Button
                color="blue"
                size="sm"
                className="ml-3 hidden lg:inline-flex shadow-sm"
              >
                Take Quiz
              </Button>
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <IconButton
          size="sm"
          variant="text"
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="ml-auto lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <Collapse open={isNavOpen} className="lg:hidden mt-4">
        <ul className="flex flex-col gap-2">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Typography
                as="a"
                href={href}
                className="flex items-center gap-3 font-medium text-blue-gray-800 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg p-3"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Typography>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <Typography as="a" href="/ResilienceQ/profile" className="p-3">
                  Profile
                </Typography>
              </li>
              <li>
                <Typography
                  onClick={handleLogout}
                  className="p-3 text-red-500 cursor-pointer"
                >
                  Logout
                </Typography>
              </li>
            </>
          ) : (
            <li>
              <Typography as="a" href="/ResilienceQ/login" className="p-3">
                Login
              </Typography>
            </li>
          )}
        </ul>
      </Collapse>
    </Navbar>
  );
}
