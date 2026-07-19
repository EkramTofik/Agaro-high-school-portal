import { useState, useRef, useEffect, useCallback } from "react";
import { Award, ArrowRight } from "lucide-react";

// ─── DUMMY DATA ──────────────────────────────────────────────────────────────

const mathStaff = [
  {
    name: "Dr. Elias Tadesse",
    role: "PhD Applied Mathematics, MSc Statistics",
    isHead: true,
    bio: '"Mathematics is not just a language of numbers, but the fundamental architecture of the universe."',
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    stat1: { value: "28", label: "YRS" },
    stat2: { value: "15", label: "YRS" },
  },
  {
    name: "Ms. Selamawit Bekele",
    role: "BSc Mathematics Education",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
    tenure: "9 YR TENURE",
  },
  {
    name: "Dr. Yonas Bekele",
    role: "MSc Pure Mathematics",
    isHead: false,
    bio: '"Regional coordinator for the Ethiopian National Mathematics Olympiad for 8 years."',
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    stat1: { value: "14", label: "YRS" },
    stat2: { value: "6", label: "YRS" },
  },
  {
    name: "Ms. Tigist Alemu",
    role: "BSc Applied Mathematics",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    tenure: "6 YR TENURE",
  },
];

const scienceStaff = [
  {
    name: "Ato Kasahun J.",
    role: "PHYSICS SPECIALIST",
    quote: '"Curiosity is the engine of discovery."',
    tenure: "12 YRS AT AGARO",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    theme: "light",
  },
  {
    name: "Sister Martha W.",
    role: "BIOLOGY HEAD",
    quote: '"Understanding life is our mandate."',
    tenure: "22 YRS AT AGARO",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
    theme: "dark",
  },
  {
    name: "Dr. Solomon G.",
    role: "CHEMISTRY LEAD",
    quote: '"Transformation is the essence of nature."',
    tenure: "18 YRS AT AGARO",
    img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200",
    theme: "light",
  },
  {
    name: "Ato Birhanu T.",
    role: "ENVIRONMENTAL SCI.",
    quote: '"Preserving our home for the next century."',
    tenure: "5 YRS AT AGARO",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    theme: "light",
  },
  {
    name: "Dr. Hirut Z.",
    role: "ORGANIC CHEMISTRY",
    quote: '"Molecular bonds are the stories of the universe."',
    tenure: "17 YRS AT AGARO",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
    theme: "light",
  },
];

const socialStaff = [
  {
    name: "Ato Dessalegn M.",
    role: "HISTORY & CIVICS",
    bio: "Master of Arts in Ethiopian History, Addis Ababa University",
    tags: ["Discipline Core"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Wzro. Tigist S.",
    role: "GEOGRAPHY & ENVIRONMENT",
    bio: "MSc in Economic Geography, Specializing in Regional Development.",
    tags: ["Earth Sci"],
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Dr. Samuel T.",
    role: "GLOBAL HISTORY",
    bio: "Expert in historical archives, overseeing modern civic studies.",
    tags: ["World Hist"],
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Mr. Yonas B.",
    role: "LOCAL STUDIES",
    bio: "Specialist in East African socio-political development.",
    tags: ["Regional"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
  },
];

const languageStaff = [
  {
    name: "Wzro. Aster Bekele",
    role: "ENGLISH LIT.",
    quote: '"Language is the bridge that connects to our cultural heritage."',
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Ato Tolera D.",
    role: "AMHARIC & OROMO",
    quote: '"Our mother tongues carry the weight of our ancestors."',
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Ms. Bethlehem T.",
    role: "LITERATURE",
    quote: '"Championing multilingual development across the curriculum."',
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Mr. Abebe K.",
    role: "FRENCH & SPANISH",
    quote: '"Unlocking the world through global linguistic immersion."',
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
];

const filterTabs = [
  "ALL FACULTY",
  "MATHEMATICS",
  "SCIENCES",
  "SOCIAL SCIENCES",
  "LANGUAGES",
  "OTHER",
];

const allStaff = [
  ...mathStaff.map((s) => ({ ...s, dept: "Mathematics" })),
  ...scienceStaff.map((s) => ({ ...s, dept: "Natural Sciences" })),
  ...socialStaff.map((s) => ({ ...s, dept: "Social Sciences" })),
  ...languageStaff.map((s) => ({ ...s, dept: "Languages" })),
  {
    name: "Ato Mebratu G.",
    role: "Civics & Ethical Education",
    quote:
      '"Integrity is the compass that guides a scholar through the complexities of society."',
    tags: ["MAJOR ETHICS", "22 YR TENURE"],
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    dept: "Civics",
  },
  {
    name: "Coach Solomon T.",
    role: "SPORTS & HEALTH",
    quote: '"A healthy body is the vessel of a sharp mind."',
    tenure: "14 YEARS TENURE",
    dept: "Physical Education",
    img: "",
  },
  {
    name: "Ato Biruk L.",
    role: "COMPUTER SCIENCE & IT SPECIALIST",
    bio: "BSc Information Systems, Addis Ababa Science and Technology University. Leading the digital transformation of Agaro's academic workspace.",
    tags: ["SYS ADMIN", "TECH LEAD"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    dept: "ICT",
  },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────

function HighlightMatch({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const matchIdx = text.toLowerCase().indexOf(query.toLowerCase());
  if (matchIdx === -1) return <>{text}</>;
  return (
    <>
      {text.substring(0, matchIdx)}
      <mark className="bg-[#b5985b] text-white rounded px-0.5">
        {text.substring(matchIdx, matchIdx + query.length)}
      </mark>
      {text.substring(matchIdx + query.length)}
    </>
  );
}

function ResultCard({ member, query }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e5e1d8] flex flex-col hover:border-[#b5985b] transition-colors h-full">
      <div className="flex items-center gap-4 mb-4">
        {member.img ? (
          <img
            src={member.img}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 max-w-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#F6F4EB] flex items-center justify-center shrink-0 border border-white shadow-sm">
            <span className="text-gray-400 text-[8px] font-bold">IMG</span>
          </div>
        )}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#033327] leading-tight">
            <HighlightMatch text={member.name} query={query} />
          </h3>
          <p className="text-[8px] font-bold text-[#b5985b] uppercase tracking-wider mt-1">
            {member.dept}
          </p>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mb-3">
        {member.role || member.credentials}
      </p>
      <p className="text-[11px] text-gray-600 font-serif italic mb-4 line-clamp-3">
        {member.bio || member.quote || ""}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {(member.tags || []).map((t) => (
          <span
            key={t}
            className="text-[8px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CAROUSEL HOOK ───────────────────────────────────────────────────────────

function useCarousel(total, itemsVisible = 1, timerMs = 4000) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const maxIndex = Math.max(0, total - itemsVisible);

  const next = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    if (paused || total <= itemsVisible || index >= maxIndex) {
      return;
    }

    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(100, (elapsed / timerMs) * 100);

      setProgress(progress);

      if (elapsed >= timerMs) {
        setIndex((i) => i + 1);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [paused, total, itemsVisible, timerMs, index, maxIndex]);

  return { index, maxIndex, progress, paused, setPaused, next, prev };
}

function Timer({ progress, paused }) {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg className="-rotate-90 w-8 h-8" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r={radius}
          stroke="#e5e1d8"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r={radius}
          stroke="#b5985b"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-75 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {paused ? (
          <div className="flex gap-0.5">
            <div className="w-0.5 h-2 bg-[#b5985b]" />
            <div className="w-0.5 h-2 bg-[#b5985b]" />
          </div>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-[#b5985b]" />
        )}
      </div>
    </div>
  );
}

// ─── MATH CAROUSEL ──────────────────────────────────────────────────────────

function MathCarousel() {
  const pairs = [];
  for (let i = 0; i < mathStaff.length; i += 2) {
    pairs.push({ large: mathStaff[i], small: mathStaff[i + 1] });
  }
  const { index, maxIndex, progress, paused, setPaused, next, prev } =
    useCarousel(pairs.length, 1, 5000);

  return (
    <section
      className="max-w-6xl mx-auto px-6 mb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-wrap items-end justify-between mb-8 gap-2">
        <div className="flex items-end gap-3 flex-1 min-w-0">
          <h2 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#033327] leading-none truncate">
            Mathematics
          </h2>
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-0.5 whitespace-nowrap">
            DEPT. 1956 A
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Timer progress={progress} paused={paused} />
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index <= 0}
              className={`w-8 h-8 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                index <= 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#033327] hover:text-white"
              }`}
            >
              <ArrowRight size={14} className="rotate-180" />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className={`w-8 h-8 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                index >= maxIndex
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#033327] hover:text-white"
              }`}
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {pairs.map((pair, idx) => (
            <div
              key={idx}
              className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {pair.large && (
                <div className="lg:col-span-2 bg-[#F6F4EB] rounded-[32px] p-8 flex flex-col md:flex-row gap-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_10px_rgba(0,0,0,0.02)]">
                  <img
                    src={pair.large.img}
                    alt={pair.large.name}
                    className="w-full md:w-56 h-64 md:h-auto object-cover rounded-[1.25rem] shadow-sm max-w-full"
                  />
                  <div className="flex flex-col justify-center flex-1 py-2">
                    {pair.large.isHead && (
                      <div className="mb-4">
                        <span className="text-[8px] font-bold text-[#b5985b] bg-[#fdfbf6] border border-[#e5e1d8] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                          HEAD OF DEPT{" "}
                          <span className="ml-1 text-[#d8c596]">✦</span>
                        </span>
                      </div>
                    )}
                    <h3 className="font-serif text-[1.75rem] font-bold text-[#033327] mb-1">
                      {pair.large.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mb-6">
                      {pair.large.role}
                    </p>
                    <div className="border-l-[3px] border-[#d8c596] pl-5 mb-10">
                      <p className="text-xs text-gray-600 font-serif italic leading-relaxed max-w-sm">
                        {pair.large.bio}
                      </p>
                    </div>
                    {pair.large.stat1 && (
                      <div className="flex gap-12 mt-auto">
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                            TOTAL LIVED IN
                          </p>
                          <p className="font-serif text-[1.75rem] font-bold text-[#033327] leading-none">
                            {pair.large.stat1.value}{" "}
                            <span className="text-[10px] font-sans font-bold text-gray-500 ml-0.5">
                              {pair.large.stat1.label}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                            AT AGARO
                          </p>
                          <p className="font-serif text-[1.75rem] font-bold text-[#033327] leading-none">
                            {pair.large.stat2.value}{" "}
                            <span className="text-[10px] font-sans font-bold text-gray-500 ml-0.5">
                              {pair.large.stat2.label}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {pair.small && (
                <div className="bg-white rounded-[32px] p-8 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_2px_10px_rgba(0,0,0,0.03)] border border-[#e8e5dc] flex flex-col group">
                  <img
                    src={pair.small.img}
                    alt={pair.small.name}
                    className="w-16 h-16 rounded-xl object-cover mb-6 shadow-sm border border-gray-100 max-w-full"
                  />
                  <h3 className="font-serif text-lg font-bold text-[#033327] mb-1">
                    {pair.small.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 mb-8">
                    {pair.small.role}
                  </p>
                  <div className="space-y-2.5 mb-12">
                    <div className="h-1.5 w-full bg-[#F6F4EB] rounded-full"></div>
                    <div className="h-1.5 w-2/3 bg-[#F6F4EB] rounded-full"></div>
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <span className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.15em]">
                      {pair.small.tenure}
                    </span>
                    <button className="w-8 h-8 rounded-full border border-[#e5e1d8] flex items-center justify-center text-gray-400 hover:bg-[#033327] hover:text-white transition-colors group-hover:border-[#033327]">
                      <ArrowRight size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SCIENCE CAROUSEL (FIXED) ─────────────────────────────────────────────

function ScienceCarousel() {
  const [itemsVisible, setItemsVisible] = useState(4);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsVisible(4);
      else if (width >= 640) setItemsVisible(2);
      else setItemsVisible(1);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Build slides — guaranteed to have at least one slide
  const slides = [];
  for (let i = 0; i < scienceStaff.length; i += itemsVisible) {
    slides.push(scienceStaff.slice(i, i + itemsVisible));
  }

  // If for any reason slides is empty, fallback to a single slide with all staff
  const safeSlides = slides.length > 0 ? slides : [scienceStaff];

  const { index, maxIndex, progress, paused, setPaused, next, prev } =
    useCarousel(safeSlides.length, 1, 4000);

  return (
    <section
      className="max-w-6xl mx-auto px-6 mb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1 min-w-0 pr-2">
          <h2 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#033327] leading-none whitespace-nowrap">
            Natural Sciences
          </h2>
          <div className="flex-1 h-px bg-[#e5e1d8]/50 hidden sm:block"></div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Timer progress={progress} paused={paused} />
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index <= 0}
              className={`w-8 h-8 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                index <= 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#033327] hover:text-white"
              }`}
            >
              <ArrowRight size={14} className="rotate-180" />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className={`w-8 h-8 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                index >= maxIndex
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#033327] hover:text-white"
              }`}
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {safeSlides.map((slide, idx) => (
            <div
              key={idx}
              className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {slide.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-[2rem] p-8 flex flex-col items-center text-center ${
                    m.theme === "dark"
                      ? "bg-[#1b4335] text-white shadow-lg"
                      : "bg-[#F6F4EB] text-[#033327] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_10px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className={`w-14 h-14 rounded-full object-cover mb-4 shadow-sm border-[3px] max-w-full ${
                      m.theme === "dark" ? "border-white/10" : "border-white"
                    }`}
                  />
                  <h3 className="font-serif text-sm font-bold mb-1">
                    {m.name}
                  </h3>
                  <p
                    className={`text-[7px] font-bold uppercase tracking-[0.2em] mb-4 ${
                      m.theme === "dark" ? "text-[#c2aa7f]" : "text-[#b5985b]"
                    }`}
                  >
                    {m.role}
                  </p>
                  <p
                    className={`text-[11px] font-serif italic leading-relaxed mb-8 ${
                      m.theme === "dark" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {m.quote}
                  </p>
                  <span
                    className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-auto ${
                      m.theme === "dark" ? "text-white/50" : "text-gray-400"
                    }`}
                  >
                    {m.tenure}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL & LANGUAGE CAROUSEL ────────────────────────────────────────────

function SocialCarousel({ showSocial, showLanguage }) {
  const socialPairs = [];
  for (let i = 0; i < socialStaff.length; i += 2)
    socialPairs.push(socialStaff.slice(i, i + 2));
  const langPairs = [];
  for (let i = 0; i < languageStaff.length; i += 2)
    langPairs.push(languageStaff.slice(i, i + 2));

  const social = useCarousel(socialPairs.length, 1, 4500);
  const lang = useCarousel(langPairs.length, 1, 4500);

  return (
    <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {showSocial && (
        <div
          className={!showSocial ? "hidden lg:block lg:invisible" : ""}
          onMouseEnter={() => social.setPaused(true)}
          onMouseLeave={() => social.setPaused(false)}
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#033327] mb-1 leading-none">
                Social Sciences
              </h2>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                HISTORICAL PERSPECTIVES
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Timer progress={social.progress} paused={social.paused} />
              <div className="flex gap-1">
                <button
                  onClick={social.prev}
                  disabled={social.index <= 0}
                  className={`w-6 h-6 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                    social.index <= 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#033327] hover:text-white"
                  }`}
                >
                  <ArrowRight size={10} className="rotate-180" />
                </button>
                <button
                  onClick={social.next}
                  disabled={social.index >= social.maxIndex}
                  className={`w-6 h-6 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                    social.index >= social.maxIndex
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#033327] hover:text-white"
                  }`}
                >
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${social.index * 100}%)` }}
            >
              {socialPairs.map((pair, idx) => (
                <div key={idx} className="w-full shrink-0 space-y-5">
                  {pair.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-[2rem] p-4 pr-6 flex gap-6 items-center shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_2px_10px_rgba(0,0,0,0.03)] border border-[#e8e5dc]"
                    >
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-20 h-20 sm:w-[104px] sm:h-[104px] rounded-2xl object-cover shrink-0 border border-gray-100 shadow-sm max-w-full"
                      />
                      <div className="flex-1 py-2">
                        <h3 className="font-serif text-base font-bold text-[#033327] mb-0.5">
                          {m.name}
                        </h3>
                        <p className="text-[7px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-2">
                          {m.role}
                        </p>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-4 pr-4 line-clamp-2">
                          {m.bio}
                        </p>
                        <div className="flex gap-2">
                          {m.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[7px] font-bold text-gray-500 bg-[#F6F4EB] px-2.5 py-1 rounded-sm uppercase tracking-[0.15em]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showLanguage && (
        <div
          className={!showSocial ? "lg:col-start-2" : ""}
          onMouseEnter={() => lang.setPaused(true)}
          onMouseLeave={() => lang.setPaused(false)}
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#033327] mb-1 leading-none">
                Languages
              </h2>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                LINGUISTIC HERITAGE
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Timer progress={lang.progress} paused={lang.paused} />
              <div className="flex gap-1">
                <button
                  onClick={lang.prev}
                  disabled={lang.index <= 0}
                  className={`w-6 h-6 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                    lang.index <= 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#033327] hover:text-white"
                  }`}
                >
                  <ArrowRight size={10} className="rotate-180" />
                </button>
                <button
                  onClick={lang.next}
                  disabled={lang.index >= lang.maxIndex}
                  className={`w-6 h-6 rounded-full border border-[#e5e1d8] flex items-center justify-center transition-colors ${
                    lang.index >= lang.maxIndex
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#033327] hover:text-white"
                  }`}
                >
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${lang.index * 100}%)` }}
            >
              {langPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {pair.map((m, i) => (
                    <div
                      key={i}
                      className="bg-[#F6F4EB] rounded-[2rem] p-5 pb-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_10px_rgba(0,0,0,0.02)]"
                    >
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-full h-36 rounded-[1.25rem] object-cover mb-5 shadow-sm border border-white/50 max-w-full"
                      />
                      <h3 className="font-serif text-[13px] font-bold text-[#033327] mb-1">
                        {m.name}
                      </h3>
                      <p className="text-[7px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-3">
                        {m.role}
                      </p>
                      <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">
                        {m.quote}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function FacultyPage() {
  const [activeFilter, setActiveFilter] = useState("ALL FACULTY");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearchActive = searchQuery.trim().length > 0;

  const searchResults = allStaff.filter((member) => {
    if (!isSearchActive) return false;
    const q = searchQuery.toLowerCase();
    return (
      (member.name || "").toLowerCase().includes(q) ||
      (member.role || "").toLowerCase().includes(q) ||
      (member.bio || "").toLowerCase().includes(q) ||
      (member.quote || "").toLowerCase().includes(q) ||
      (member.dept || "").toLowerCase().includes(q) ||
      (member.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  });

  const showMath =
    !isSearchActive &&
    (activeFilter === "ALL FACULTY" || activeFilter === "MATHEMATICS");
  const showScience =
    !isSearchActive &&
    (activeFilter === "ALL FACULTY" || activeFilter === "SCIENCES");
  const showSocial =
    !isSearchActive &&
    (activeFilter === "ALL FACULTY" || activeFilter === "SOCIAL SCIENCES");
  const showLanguage =
    !isSearchActive &&
    (activeFilter === "ALL FACULTY" || activeFilter === "LANGUAGES");
  const showOther =
    !isSearchActive &&
    (activeFilter === "ALL FACULTY" || activeFilter === "OTHER");

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] overflow-x-hidden">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="text-center pt-24 pb-16 px-6">
        <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.25em] mb-4">
          INSTITUTIONAL RESEARCH
        </p>
        <h1 className="font-serif text-5xl md:text-[3.5rem] font-bold text-[#033327] mb-6 tracking-tight">
          Faculty Directory
        </h1>
        <p className="text-xs text-gray-500 italic max-w-xl mx-auto font-serif leading-relaxed">
          "Preserving the integrity of education through a century of scholarly
          dedication. Our faculty are the living stewards of Agaro's
          intellectual heritage."
        </p>
      </div>

      {/* ── FILTER & SEARCH ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-[9px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 ${
                  activeFilter === tab
                    ? "bg-[#033327] text-white shadow-sm"
                    : "text-gray-400 hover:text-[#033327] bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setActiveFilter("ALL FACULTY");
              }}
              placeholder="Quick Search..."
              className="w-full bg-transparent text-xs text-gray-600 placeholder:text-gray-400 focus:outline-none border-b border-gray-300 pb-2 pl-2 pr-8 transition-colors focus:border-[#033327]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 text-lg leading-none pt-0.5"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── SEARCH RESULTS ────────────────────────────────────────────────── */}
      {isSearchActive && (
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-[1.75rem] font-bold text-[#033327] leading-none">
              Search Results
            </h2>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              {searchResults.length} FOUND
            </span>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((member, idx) => (
                <ResultCard key={idx} member={member} query={searchQuery} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-[#e5e1d8]">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-serif text-xl font-bold text-[#033327] mb-2">
                No faculty found
              </p>
              <p className="text-sm text-gray-400">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </section>
      )}

      {/* ── CAROUSEL SECTIONS ────────────────────────────────────────────── */}
      {showMath && <MathCarousel />}
      {showScience && <ScienceCarousel />}
      {(showSocial || showLanguage) && (
        <SocialCarousel showSocial={showSocial} showLanguage={showLanguage} />
      )}

      {/* ── OTHER SECTIONS ───────────────────────────────────────────────── */}
      {showOther && (
        <>
          <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8 flex items-center gap-6">
                <h2 className="font-serif text-[15px] font-bold text-[#033327] leading-none">
                  Civics & Ethical Education
                </h2>
                <div className="flex-1 h-px bg-[#e5e1d8]/60"></div>
              </div>
              <div className="bg-[#b3beaf] rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 shadow-md border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                  className="w-36 h-40 sm:h-auto rounded-2xl object-cover shadow-sm border border-white/30 shrink-0 max-w-full"
                  alt="Ato Mebratu"
                />
                <div className="py-4 flex flex-col justify-center">
                  <h3 className="font-serif text-xl font-bold text-[#033327] mb-2">
                    Ato Mebratu G.
                  </h3>
                  <p className="text-[11px] text-[#033327]/80 font-serif italic leading-relaxed mb-6">
                    "Integrity is the compass that guides a scholar through the
                    complexities of society."
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-[7px] font-bold text-[#033327] bg-white/50 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                      MAJOR ETHICS
                    </span>
                    <span className="text-[7px] font-bold text-[#033327] bg-white/50 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                      22 YR TENURE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-6">
                <h2 className="font-serif text-[15px] font-bold text-[#033327] leading-none">
                  Physical Education
                </h2>
                <div className="flex-1 h-px bg-[#e5e1d8]/60"></div>
              </div>
              <div className="bg-[#F6F4EB] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center h-[calc(100%-2.5rem)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="w-16 h-16 rounded-full bg-[#e8e5dc] border-[3px] border-white mb-5 flex items-center justify-center shadow-sm">
                  <div className="w-6 h-5 bg-white/60 rounded-sm"></div>
                </div>
                <h3 className="font-serif text-[15px] font-bold text-[#033327] mb-1">
                  Coach Solomon T.
                </h3>
                <p className="text-[7px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-4">
                  SPORTS & HEALTH
                </p>
                <p className="text-[11px] text-gray-500 font-serif italic mb-8">
                  "A healthy body is the vessel of a sharp mind."
                </p>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  14 YEARS TENURE
                </span>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 mb-32">
            <div className="mb-8 flex items-center gap-6">
              <h2 className="font-serif text-[15px] font-bold text-[#033327] leading-none">
                ICT / Computer Studies
              </h2>
              <div className="flex-1 h-px bg-[#e5e1d8]/60"></div>
            </div>
            <div className="bg-[#F6F4EB] rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-12 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_10px_rgba(0,0,0,0.02)]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                className="w-48 h-48 rounded-full object-cover shadow-sm border-[6px] border-white shrink-0 max-w-full"
                alt="Ato Biruk L."
              />
              <div>
                <h3 className="font-serif text-[1.75rem] font-bold text-[#033327] mb-1">
                  Ato Biruk L.
                </h3>
                <p className="text-[8px] font-bold text-[#62b993] uppercase tracking-[0.2em] mb-4">
                  COMPUTER SCIENCE & IT SPECIALIST
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-8 max-w-xl pr-4">
                  BSc Information Systems, Addis Ababa Science and Technology
                  University. Leading the digital transformation of Agaro's
                  academic workspace.
                </p>
                <div className="flex gap-2">
                  <span className="text-[7px] font-bold text-gray-400 border border-gray-200 bg-white/50 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    SYS ADMIN
                  </span>
                  <span className="text-[7px] font-bold text-gray-400 border border-gray-200 bg-white/50 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    TECH LEAD
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── FELLOWSHIP ───────────────────────────────────────────────────── */}
      <section className="bg-[#033327] py-24 px-6 text-center shadow-inner mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#0d4a3b] flex items-center justify-center mb-6 shadow-inner">
            <Award className="text-[#FFDEA4]" size={20} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Institutional Faculty Fellowship
          </h2>
          <p className="text-[11px] text-white/70 max-w-lg mx-auto font-serif italic mb-16 leading-relaxed">
            Agaro High School prides itself on the highest caliber of academic
            excellence in the region.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "94%", label: "Pass Graduate Legacy" },
              { value: "12+", label: "Avg. Tenure Yrs." },
              { value: "1:15", label: "Faculty-Student Ratio" },
              { value: "40+", label: "Published Scholars" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="font-serif text-[2.5rem] font-bold text-[#FFDEA4] mb-2 leading-none">
                  {s.value}
                </p>
                <p className="text-[7px] font-bold text-white/50 uppercase tracking-[0.2em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
