import React from "react";
import { Link } from "react-router-dom";

const IconInstagram = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconTwitter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconYoutube = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon
      points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#033327]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1 – Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-lg font-bold text-white mb-2">
              Agaro High School
            </h2>
            <p className="text-xs text-white/60 leading-relaxed mb-5">
              Serving the community with intellectual rigour and academic
              distinction since 1954.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FFDEA4] hover:text-[#FFDEA4] transition-colors"
              >
                <IconInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FFDEA4] hover:text-[#FFDEA4] transition-colors"
              >
                <IconTwitter />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FFDEA4] hover:text-[#FFDEA4] transition-colors"
              >
                <IconYoutube />
              </a>
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-[#FFDEA4] uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About the School", to: "/about" },
                { label: "Academic Calendar", to: "/student-life" },
                { label: "Student Portal", to: "/student-life" },
                { label: "Staff Directory", to: "/teachers" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-xs text-white/60 hover:text-[#FFDEA4] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Legal & Support */}
          <div>
            <h3 className="text-xs font-bold text-[#FFDEA4] uppercase tracking-widest mb-4">
              Legal &amp; Support
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", to: "#" },
                { label: "Terms of Service", to: "#" },
                { label: "Contact Support", to: "/contact" },
                { label: "Sitemap", to: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-xs text-white/60 hover:text-[#FFDEA4] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md overflow-hidden border border-white/20 h-40">
            <iframe
              title="Agaro High School Location"
              src="https://www.google.com/maps?q=Agaro%20High%20School,%20Agaro,%20Ethiopia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          <p className="text-xs text-white/60 mt-3 leading-relaxed">
            Agaro High School
            <br />
            Agaro, Jimma Zone,
            <br />
            Oromia, Ethiopia
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/40">
            © 2026 Agaro High School. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-[11px] text-white/40 hover:text-[#FFDEA4] transition-colors"
            >
              Instagram
            </a>
            <span className="text-white/20 text-xs">|</span>
            <a
              href="#"
              className="text-[11px] text-white/40 hover:text-[#FFDEA4] transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
