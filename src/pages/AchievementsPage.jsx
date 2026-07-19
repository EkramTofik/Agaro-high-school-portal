import { Award, Trophy, BookOpen, Star, ChevronRight } from "lucide-react";

/* ── Donut Chart ─────────────────────────────────────────── */
const DonutChart = () => {
  const r = 72,
    cx = 100,
    cy = 100,
    circ = 2 * Math.PI * r;
  const segs = [
    { pct: 40, color: "#033327", label: "Medicine & Bio (40%)" },
    { pct: 35, color: "#8b7535", label: "Engineering (35%)" },
    { pct: 15, color: "#8ab5a8", label: "Social Sci (15%)" },
    { pct: 10, color: "#d0cdc7", label: "Other (10%)" },
  ];
  let acc = 0;
  return (
    <div>
      <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
        <svg width="200" height="200">
          {segs.map((s, i) => {
            const dash = (s.pct / 100) * circ;
            const offset = circ * 0.25 - (acc / 100) * circ;
            acc += s.pct;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="26"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-serif text-3xl font-bold text-[#033327] leading-none">
            100%
          </p>
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1">
            Admission
          </p>
        </div>
      </div>
      {/* 2×2 legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-5">
        {segs.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-[11px] text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Bar Chart ───────────────────────────────────────────── */
const BarChart = () => {
  const bars = [
    { val: 38 },
    { val: 45 },
    { val: 50 },
    { val: 55 },
    { val: 60 },
    { val: 64 },
    { val: 69 },
    { val: 74 },
    { val: 79 },
    { val: 85 },
    { val: 100 },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-end gap-1.5" style={{ height: 120 }}>
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${b.val}%`,
              background: i === bars.length - 1 ? "#033327" : "#b8d4c8",
            }}
          />
        ))}
      </div>
      {/* X-axis line + labels */}
      <div className="border-t border-[#ccc8c0] mt-1 pt-2 flex justify-between items-center">
        <span className="text-[9px] text-gray-400">2014</span>
        <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
          Pass Rate Trend
        </span>
        <span className="text-[9px] text-gray-400">2023</span>
      </div>
    </div>
  );
};

/* ── Data ────────────────────────────────────────────────── */
const students = [
  {
    name: "Alisha Haile Jr.",
    role: "Top Graduate, 2024",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Eyerith Baider",
    role: "Science Award, 2024",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Eyerith Solomon",
    role: "Arts Excellence, 2024",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
];

const universities = [
  {
    name: "Addis Ababa University",
    sub: "45% of 2023 Cohort Placed",
    bgColor: "#033327",
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFDEA4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "International Placements",
    sub: "North America, Europe & Asia",
    bgColor: "#8b7535",
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: "STEM Specialized Institutes",
    sub: "Jimma University, ASTU",
    bgColor: "#2d5a4a",
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
  },
];

const honors = [
  {
    icon: Award,
    title: "School of Excellence",
    sub: "Ministry of Education Award",
  },
  {
    icon: Trophy,
    title: "Regional Academic Prize",
    sub: "East Africa Education Forum",
  },
  {
    icon: Star,
    title: "Lagos State International",
    sub: "Academic Achievement Award",
  },
];

const educators = [
  {
    name: "Mrs. Abreya Tadesse",
    role: "Social 2024",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    award: "Head Educator, 12 yrs",
  },
  {
    name: "Mr. Solomon G.",
    role: "Social 2023",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    award: "Research Scientist",
  },
  {
    name: "Dr. Elias Worku",
    role: "PE, Physical Coach",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    award: "Physical Coach",
  },
  {
    name: "Mrs. Genet Ayenu",
    role: "Guidance Counsellor",
    img: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?auto=format&fit=crop&q=80&w=400",
    award: "Student Welfare Exec",
  },
];

/* ── Page ────────────────────────────────────────────────── */
export default function AchievementsPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1a1a1a]">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="text-center py-16 px-6 border-b border-[#e5e1d8]">
        <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.3em] mb-3">
          University of Wonder
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5">
          The Hall of Excellence
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          A testament of academic solidarity, first-trickle, contemporary
          growth, and the enduring legacy of Agaro High School's most
          accomplished minds.
        </p>
      </section>

      {/* ── National Exam History ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left */}
          <div className="lg:w-[45%]">
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-2">
              National Exam History
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-xs">
              A record of sustained consistency, reflecting our commitment to
              rigorous academic standards.
            </p>
            {/* Stats box */}
            <div className="border border-[#e5e1d8] rounded-xl p-5 bg-white shadow-sm mb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                Pass Rate
              </p>
              <div className="flex items-end gap-4 mb-4">
                <p className="font-serif text-5xl font-bold text-[#033327]">
                  98.4%
                </p>
                <span className="text-[10px] font-bold text-[#4a8a6a] mb-2 bg-[#4a8a6a]/10 px-2 py-0.5 rounded">
                  ↑ Pass Rate
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                <span className="text-gray-400">Distinctions</span>
                <span className="font-bold text-[#033327] text-right">40%</span>
                <span className="text-gray-400">Average GPA</span>
                <span className="font-bold text-[#033327] text-right">
                  3.79
                </span>
              </div>
            </div>
            <BarChart />
          </div>
          {/* Right – portraits */}
          <div className="flex-1">
            <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-5">
              Top Year Minds
            </p>
            <div className="grid grid-cols-3 gap-4">
              {students.map((s) => (
                <div key={s.name} className="text-center">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden border border-[#e5e1d8] mb-2">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-[#033327] leading-tight">
                    {s.name}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{s.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── University Placements ──────────────────────────── */}
      <section className="bg-[#FAF8F5] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl border border-dashed border-[#9AB8B0]/70 bg-[#C8D8D0] p-6 sm:p-8 md:p-10 lg:p-14">
          {/* Decorative Shape */}
          <svg
            className="absolute top-0 right-0 w-32 sm:w-40 md:w-52 opacity-20 pointer-events-none"
            viewBox="0 0 160 80"
            fill="none"
          >
            <polyline
              points="0,80 80,10 160,80"
              stroke="#8AAB9E"
              strokeWidth="2"
            />
            <polyline
              points="40,80 110,30 160,60"
              stroke="#8AAB9E"
              strokeWidth="1.5"
            />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* LEFT CONTENT */}

            <div className="flex-1 w-full">
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[#6A8A7E] mb-3">
                Alumni Success
              </p>

              <h2
                className="font-serif font-bold text-[#1A1A1A]
          text-3xl
          sm:text-4xl
          lg:text-5xl
          leading-tight"
              >
                University Placements
              </h2>

              <p
                className="mt-5 text-[#3A5248] leading-relaxed
          text-sm
          sm:text-base
          max-w-xl"
              >
                Our graduates continue their academic journey at leading
                universities across Ethiopia and around the world, carrying the
                Agaro High School legacy into higher education and professional
                excellence.
              </p>

              {/* Universities */}

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {universities.map((u) => (
                  <li
                    key={u.name}
                    className="flex items-center gap-4 rounded-xl bg-white/70 backdrop-blur-sm p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full shrink-0"
                      style={{ background: u.bgColor }}
                    >
                      <u.icon />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#1A1A1A]">{u.name}</h3>

                      <p className="text-sm text-[#4A6A5A]">{u.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT CARD */}

            <div className="w-full sm:max-w-md lg:max-w-sm shrink-0">
              <div className="rounded-3xl bg-[#FAF8F5] shadow-xl p-6 sm:p-8">
                <p className="text-center uppercase tracking-[0.25em] text-xs font-semibold text-gray-400 mb-6">
                  Career Path Distribution
                </p>

                <div className="flex justify-center">
                  <DonutChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Institutional Honors ───────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-12">
          Institutional Honors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {honors.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center shadow-sm">
                <Icon size={22} className="text-[#033327]" />
              </div>
              <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
                {title}
              </p>
              <p className="text-[10px] text-gray-400">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scholastic Competitions ────────────────────────── */}
      <section className="bg-[#f5f2ec] border-t border-[#e5e1d8] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-8">
            Scholastic Competitions
          </h2>
          {/* Top 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Featured – dark */}
            <div className="bg-[#033327] rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-widest bg-[#FFDEA4]/10 px-2 py-0.5 rounded">
                  First Place
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-3 mb-3 leading-snug">
                  National Science &amp; Innovation Fair
                </h3>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Our robotics team achieved 2nd place in the 2023 National
                  Finals with their sustainable energy irrigation prototype,
                  marking our third consecutive year in the top three.
                </p>
              </div>
              <button className="mt-6 self-start text-[9px] font-bold text-[#FFDEA4] uppercase tracking-wider flex items-center gap-1 hover:opacity-80 transition-opacity">
                See Entry <ChevronRight size={11} />
              </button>
            </div>
            {/* Light card */}
            <div className="bg-white border border-[#e5e1d8] rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest">
                  Runner-Up
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mt-3 mb-3 leading-snug">
                  Debate Championships
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Regional third place and national runner-up at the 2023
                  Inter-Secondary Debate championships.
                </p>
              </div>
              <button className="mt-6 self-start text-[9px] font-bold text-[#033327] uppercase tracking-wider flex items-center gap-1 hover:text-[#b5985b] transition-colors">
                See Entry <ChevronRight size={11} />
              </button>
            </div>
          </div>
          {/* Bottom 2 small cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Trophy,
                tag: "Mathematics",
                title: "Math Olympiad",
                desc: "Top 5 ranked National Mathematics competition.",
              },
              {
                icon: BookOpen,
                tag: "Literature",
                title: "Linguistic Excellence",
                desc: "Our literature club received the 'Best Student Anthology' award for our annual publication 'The Chorus'.",
              },
            ].map(({ icon: Icon, tag, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#e5e1d8] rounded-2xl p-6 flex gap-4 items-start hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#b5985b]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-wider mb-1">
                    {tag}
                  </p>
                  <h4 className="font-serif text-base font-bold text-[#1a1a1a] mb-1">
                    {title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Distinguished Educators ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.25em] mb-2">
              An Agaro High
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a]">
              Distinguished Educators
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
            Recognizing the work of our scholastic intellectuals and their
            contribution to distinguished research.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {educators.map((e) => (
            <div key={e.name} className="group">
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#e5e1d8] mb-3">
                <img
                  src={e.img}
                  alt={e.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
                {e.name}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{e.role}</p>
              <p className="text-[9px] text-[#b5985b] font-semibold mt-1 flex items-center gap-1">
                <Award size={10} /> {e.award}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
