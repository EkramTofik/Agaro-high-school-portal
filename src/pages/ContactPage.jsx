import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ── Inline SVG Icons ─────────────────────────────────────── */
const PhoneIcon = ({ color = "#FFDEA4" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = ({ color = "#fff" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PinIcon = ({ color = "#4a8a6a", size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = ({ color = "#b5985b" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const CalendarIcon = ({ color = "#fff" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    subject: "Admissions Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls =
    "w-full px-3 py-2.5 rounded-lg border border-[#e5e1d8] bg-white focus:outline-none focus:ring-2 focus:ring-[#033327]/20 focus:border-[#033327] text-[13px] placeholder:text-gray-300 transition-all";
  const labelCls =
    "block text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1.5";

  return (
    <div className="bg-[#f4f1ec] min-h-screen text-[#1a1a1a]">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-8 pt-12 pb-10">
        <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.3em] mb-3">
          Established 1962
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight max-w-lg">
          Get in Touch with the Archive
        </h1>
        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
          Preserving historical excellence and fostering future leaders. Connect
          with our administrative departments for inquiries, records, and
          visits.
        </p>
      </section>

      {/* ── Cards + Form ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: 2×2 cards + location */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Main Office */}
              <div className="bg-white border border-[#e5e1d8] rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#033327] flex items-center justify-center mb-4">
                  <PhoneIcon />
                </div>
                <p className="font-bold text-[13px] text-[#1a1a1a] mb-1">
                  Main Office
                </p>
                <p className="text-[11px] text-gray-400 mb-4">
                  +251 11 555 4567
                </p>
                <p className="text-[8px] font-bold text-[#4a8a6a] uppercase tracking-widest">
                  Admin Office
                </p>
              </div>

              {/* Principal's Office */}
              <div className="bg-white border border-[#e5e1d8] rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#b5985b] flex items-center justify-center mb-4">
                  <CalendarIcon />
                </div>
                <p className="font-bold text-[13px] text-[#1a1a1a] mb-1">
                  Principal's Office
                </p>
                <p className="text-[11px] text-gray-400 mb-4">
                  +251 11 555 4568
                </p>
                <p className="text-[8px] font-bold text-[#4a8a6a] uppercase tracking-widest">
                  Leadership
                </p>
              </div>

              {/* Registrar */}
              <div className="bg-white border border-[#e5e1d8] rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#033327] flex items-center justify-center mb-4">
                  <PhoneIcon />
                </div>
                <p className="font-bold text-[13px] text-[#1a1a1a] mb-1">
                  Registrar
                </p>
                <p className="text-[11px] text-gray-400 mb-4">
                  +251 11 555 4589
                </p>
                <p className="text-[8px] font-bold text-[#4a8a6a] uppercase tracking-widest">
                  Admissions &amp; Records
                </p>
              </div>

              {/* General Email */}
              <div className="bg-[#033327] border border-[#033327] rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#b5985b] flex items-center justify-center mb-4">
                  <MailIcon />
                </div>
                <p className="font-bold text-[13px] text-white mb-1">
                  General Email
                </p>
                <p className="text-[11px] text-white/60 mb-4">
                  info@agarohigh.edu.et
                </p>
                <p className="text-[8px] font-bold text-[#FFDEA4] uppercase tracking-widest">
                  Correspondence
                </p>
              </div>
            </div>

            {/* Campus Location strip */}
            <div className="bg-white border border-[#e5e1d8] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#f0ede8] border border-[#e5e1d8] flex items-center justify-center shrink-0">
                <PinIcon color="#4a8a6a" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[13px] text-[#1a1a1a]">
                  Campus Location
                </p>
                <p className="text-[11px] text-gray-400">
                  Agaro, Oromia, Ethiopia
                </p>
              </div>
              {/* mini map tile */}
              <div className="relative w-24 h-14 rounded-xl overflow-hidden shrink-0 bg-[#033327]">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 96 56"
                  preserveAspectRatio="none"
                >
                  <rect width="96" height="56" fill="#033327" />
                  <line
                    x1="0"
                    y1="28"
                    x2="96"
                    y2="28"
                    stroke="#FFDEA4"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                  />
                  <line
                    x1="48"
                    y1="0"
                    x2="48"
                    y2="56"
                    stroke="#FFDEA4"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                  />
                  <rect
                    x="20"
                    y="10"
                    width="56"
                    height="36"
                    rx="3"
                    stroke="#FFDEA4"
                    strokeWidth="0.8"
                    strokeOpacity="0.2"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PinIcon color="#FFDEA4" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Online Inquiry form */}
          <div className="w-full lg:w-72 shrink-0 bg-white border border-[#e5e1d8] rounded-2xl p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-[#1a1a1a] mb-5">
              Online Inquiry
            </h2>

            {sent && (
              <div className="mb-4 p-3 rounded-lg bg-[#4a8a6a]/10 border border-[#4a8a6a]/20 text-[11px] text-[#4a8a6a] font-semibold">
                ✓ Inquiry sent!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter your full name"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Subject of Inquiry</label>
                <div className="relative">
                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                  >
                    <option>Admissions Inquiry</option>
                    <option>General Inquiry</option>
                    <option>Alumni Relations</option>
                    <option>Archive Request</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Message</label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Compose your message to the administrator..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#033327] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#0d4a3b] transition-colors cursor-pointer"
              >
                Send Inquiry
              </button>

              <p className="text-[9px] text-gray-400 leading-relaxed">
                *Responses typically arrived within 48 business hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── Operating Hours + Campus Map ──────────────────── */}
      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Operating Hours */}
          <div className="bg-white border border-[#e5e1d8] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-full border-2 border-[#b5985b] flex items-center justify-center">
                <ClockIcon />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#1a1a1a]">
                Operating Hours
              </h2>
            </div>

            {/* Mon-Fri big time */}
            <div className="mb-6 pb-6 border-b border-[#e5e1d8]">
              <p className="text-xs text-gray-400 mb-1">Monday – Friday</p>
              <p className="font-serif text-3xl font-bold text-[#1a1a1a] tracking-tight">
                8:00 AM – 5:00 PM
              </p>
            </div>

            {/* Saturday */}
            <div className="mb-6 pb-6 border-b border-[#e5e1d8]">
              <p className="text-xs text-gray-400 mb-1">Saturday</p>
              <p className="font-serif text-2xl font-bold text-[#1a1a1a] tracking-tight">
                8:00 AM – 12:00 PM
              </p>
            </div>

            {/* Sunday */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-0.5">Sunday</p>
              <p className="text-sm text-gray-400 italic">Closed</p>
            </div>

            <p className="text-[10px] text-gray-400 leading-relaxed border-t border-[#e5e1d8] pt-5">
              Hours may vary during school holidays and administration breaks.
              Please call ahead for appointments with the Principal or Faculty
              Heads.
            </p>
          </div>

          {/* Agaro High School Campus */}
          <div className="bg-white border border-[#e5e1d8] rounded-2xl overflow-hidden flex flex-col">
            {/* Illustrated map */}
            <div
              className="relative flex-1 min-h-[220px]"
              style={{ background: "#dce8e3" }}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 500 220"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="500" height="220" fill="#dce8e3" />
                {/* Road grid */}
                <rect x="0" y="95" width="500" height="14" fill="#cad9d3" />
                <rect x="220" y="0" width="14" height="220" fill="#cad9d3" />
                <rect x="0" y="40" width="500" height="8" fill="#cad9d3" />
                <rect x="0" y="160" width="500" height="8" fill="#cad9d3" />
                <rect x="100" y="0" width="8" height="220" fill="#cad9d3" />
                <rect x="350" y="0" width="8" height="220" fill="#cad9d3" />
                {/* Buildings/blocks */}
                <rect
                  x="115"
                  y="55"
                  width="95"
                  height="30"
                  rx="3"
                  fill="#b8cfc8"
                />
                <rect
                  x="115"
                  y="115"
                  width="95"
                  height="30"
                  rx="3"
                  fill="#b8cfc8"
                />
                <rect
                  x="240"
                  y="55"
                  width="100"
                  height="80"
                  rx="3"
                  fill="#a5c0b8"
                />
                <rect
                  x="360"
                  y="55"
                  width="50"
                  height="30"
                  rx="3"
                  fill="#b8cfc8"
                />
                <rect
                  x="360"
                  y="115"
                  width="50"
                  height="30"
                  rx="3"
                  fill="#b8cfc8"
                />
                <rect
                  x="20"
                  y="55"
                  width="65"
                  height="80"
                  rx="3"
                  fill="#b0cac2"
                />
                {/* Pin */}
                <circle cx="227" cy="102" r="16" fill="#033327" />
                <circle cx="227" cy="97" r="5" fill="white" />
                <line
                  x1="227"
                  y1="102"
                  x2="227"
                  y2="116"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Footer */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#033327] flex items-center justify-center shrink-0">
                  <PinIcon color="#FFDEA4" size={14} />
                </div>

                <div>
                  <p className="font-bold text-[13px] text-[#1a1a1a]">
                    Agaro High School Campus
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Agaro, Oromia, Ethiopia
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Agaro+high+school/@7.8549634,36.5645597,14z/data=!4m15!1m8!3m7!1s0x17ac529463cbcab1:0x4b67db6945cf851d!2sAgaro!3b1!8m2!3d7.8570335!4d36.5823944!16s%2Fm%2F02vxvlk!3m5!1s0x17ac53131d21fa79:0xf9ab09523a51b0c6!8m2!3d7.8620093!4d36.5907116!16s%2Fg%2F11hdvf1sfg?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="
      text-[9px]
      font-bold
      text-[#033327]
      uppercase
      tracking-wider
      border
      border-[#033327]/25
      px-3
      py-2
      rounded-lg
      hover:bg-[#033327]
      hover:text-white
      transition-colors
      whitespace-nowrap
      shrink-0
    "
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
