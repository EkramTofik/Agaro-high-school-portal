import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Leadership", path: "/leadership" },
  { name: "Teachers", path: "/teachers" },
  { name: "Student Life", path: "/student-life" },
  { name: "News", path: "/news" },
  { name: "Results", path: "/academic-results" },
  { name: "Resources", path: "/resources" },
  { name: "Gallery", path: "/gallery" },
  { name: "Alumni", path: "/alumni" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#e5e1d8]"
          : "bg-[#FAF8F5] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="logo-link">
            <div className="w-[3px] h-6 bg-[#FFDEA4]"></div>
            <span className="text-[#033327] text-lg font-bold font-serif leading-tight tracking-tight">
              Agaro High School
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={`text-[10px] uppercase font-bold tracking-widest transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-[#033327]"
                      : "text-gray-400 hover:text-[#033327]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#033327]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-[#033327] hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 opacity-100 pt-4 pb-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[#e5e1d8]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "text-[#033327] bg-[#033327]/5"
                      : "text-gray-500 hover:text-[#033327] hover:bg-[#033327]/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="mt-2 px-5 py-3 bg-[#033327] hover:bg-[#0d4a3b] text-white font-bold text-xs uppercase tracking-widest rounded-lg text-center transition-all duration-200"
            >
              Enroll
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
