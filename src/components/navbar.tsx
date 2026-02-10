import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
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

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shouldShowBorder, setShouldShowBorder] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShouldShowBorder(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setIsNavOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/ResilienceIQ/"; // redirect home
  };

  // Absolute links to work correctly in GitHub Pages
  const navLinks = [
    { label: "Home", href: "/ResilienceIQ/#", icon: HomeIcon },
    {
      label: "About Us",
      href: "/ResilienceIQ/about",
      icon: InformationCircleIcon,
    },
    { label: "Blogs", href: "/ResilienceIQ/blogs", icon: BookOpenIcon },
    { label: "FAQs", href: "/ResilienceIQ/faq", icon: QuestionMarkCircleIcon },
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
          href="/ResilienceIQ/#"
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

          {user ? (
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-full py-1 px-3"
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
                    className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    (window.location.href = "/ResilienceIQ/profile")
                  }
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <PowerIcon className="h-4 w-4" />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <li>
              <Typography
                as="a"
                href="/ResilienceIQ/login"
                variant="small"
                className="flex items-center gap-1.5 font-medium text-blue-gray-800 hover:text-blue-600 transition"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Login
              </Typography>
            </li>
          )}

          <li>
            <a href="/ResilienceIQ/quiz">
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

        {/* Mobile Menu Toggle */}
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
                variant="small"
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
                <Typography
                  as="a"
                  href="/ResilienceIQ/profile"
                  className="flex items-center gap-3 font-medium text-blue-gray-800 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg p-3"
                >
                  Profile
                </Typography>
              </li>
              <li>
                <Typography
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-medium text-red-500 hover:text-red-700 transition rounded-lg p-3 cursor-pointer"
                >
                  Logout
                </Typography>
              </li>
            </>
          ) : (
            <li>
              <Typography
                as="a"
                href="/ResilienceIQ/login"
                className="flex items-center gap-3 font-medium text-blue-gray-800 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg p-3"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Login
              </Typography>
            </li>
          )}

          <li>
            <a href="/ResilienceIQ/quiz">
              <Button color="blue" fullWidth size="sm" className="mt-2">
                Take Quiz
              </Button>
            </a>
          </li>
        </ul>
      </Collapse>
    </Navbar>
  );
}
