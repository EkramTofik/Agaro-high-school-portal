import { useState, useEffect } from "react";
import { Award, Trophy, BookOpen, Star, ChevronRight } from "lucide-react";
import api from "../api/axios";

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

/* ── Bar Chart (driven by real /academicPerformance/trend data) ──── */
const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="mt-6 text-xs text-gray-400 text-center py-6">
        No pass rate history has been published yet.
      </p>
    );
  }
  return (
    <div className="mt-6">
      <div className="flex items-end gap-1.5" style={{ height: 120 }}>
        {data.map((entry, i) => (
          <div
            key={entry._id || entry.year}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${entry.passRate}%`,
              background: i === data.length - 1 ? "#033327" : "#b8d4c8",
            }}
            title={`${entry.year}: ${entry.passRate}%`}
          />
        ))}
      </div>
      <div className="border-t border-[#ccc8c0] mt-1 pt-2 flex justify-between items-center">
        <span className="text-[9px] text-gray-400">{data[0]?.year}</span>
        <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
          Pass Rate Trend
        </span>
        <span className="text-[9px] text-gray-400">
          {data[data.length - 1]?.year}
        </span>
      </div>
    </div>
  );
};

const honorIcons = [Award, Trophy, Star, BookOpen];

/* ── Page ────────────────────────────────────────────────── */
export default function AchievementsPage() {
  const [educators, setEducators] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [performanceTrend, setPerformanceTrend] = useState([]);
  const [honorsList, setHonorsList] = useState([]);
  const [honorsLoading, setHonorsLoading] = useState(true);
  const [honorsError, setHonorsError] = useState("");

  const currentYearStats =
    performanceTrend[performanceTrend.length - 1] || null;

  useEffect(() => {
    api
      .get("/alumni")
      .then((alumniRes) => {
        const alumni = alumniRes.data?.data?.data || alumniRes.data?.data || [];
        const list = Array.isArray(alumni) ? alumni : [alumni];
        setUniversities(
          list
            .filter(Boolean)
            .filter((item) => item.location || item.company)
            .map((item) => ({
              name: item.company || item.location,
              sub: item.profession || "Alumni placement",
              bgColor: "#033327",
              icon: Award,
            })),
        );
      })
      .catch(() => setUniversities([]));
  }, []);

  useEffect(() => {
    api
      .get("/academicPerformance/trend", { params: { limit: 3 } })
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        const items = (Array.isArray(payload) ? payload : [payload]).filter(
          Boolean,
        );
        // Sort ascending by year, then keep only the 3 most recent years —
        // regardless of what order/limit the API itself applies. This
        // guarantees the chart/photo row reads oldest → newest (left to
        // right) and that the last entry is always the latest year.
        const sorted = items.slice().sort((a, b) => a.year - b.year);
        setPerformanceTrend(sorted.slice(-3));
      })
      .catch(() => setPerformanceTrend([]));
  }, []);

  useEffect(() => {
    api
      .get("/staff?", { params: { isDistinguished: true } })
      .then((res) => {
        const payload =
          res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        const items = Array.isArray(payload) ? payload : [payload];

        // Map staff backend → design shape (name, role, img, award)
        setEducators(items);
      })
      .catch(() => setEducators([]));
  }, []);

  useEffect(() => {
    setHonorsLoading(true);
    setHonorsError("");
    api
      .get("/honorRoll", { params: { sort: "rank" } })
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        const items = (Array.isArray(payload) ? payload : [payload])
          .filter(Boolean)
          .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
          .map((item, index) => ({
            id: item._id,
            title: item.studentName || "Honor",
            sub: item.accomplishment || item.yearSpan || "",
            yearSpan: item.yearSpan || "",
            icon: honorIcons[index % honorIcons.length],
          }));
        setHonorsList(items);
      })
      .catch(() => {
        setHonorsList([]);
        setHonorsError("Could not load institutional honors.");
      })
      .finally(() => setHonorsLoading(false));
  }, []);

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
          <div className="lg:w-[45%]">
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-2">
              National Exam History
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-xs">
              A record of sustained consistency, reflecting our commitment to
              rigorous academic standards.
            </p>
            <div className="border border-[#e5e1d8] rounded-xl p-5 bg-white shadow-sm mb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                Pass Rate {currentYearStats ? `(${currentYearStats.year})` : ""}
              </p>
              <div className="flex items-end gap-4 mb-4">
                <p className="font-serif text-5xl font-bold text-[#033327]">
                  {currentYearStats ? `${currentYearStats.passRate}%` : "—"}
                </p>
                {currentYearStats && (
                  <span className="text-[10px] font-bold text-[#4a8a6a] mb-2 bg-[#4a8a6a]/10 px-2 py-0.5 rounded">
                    ↑ Pass Rate
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                <span className="text-gray-400">Distinctions</span>
                <span className="font-bold text-[#033327] text-right">
                  {currentYearStats?.distinctionsPercent != null
                    ? `${currentYearStats.distinctionsPercent}%`
                    : "—"}
                </span>
                <span className="text-gray-400">Average Score</span>
                <span className="font-bold text-[#033327] text-right">
                  {currentYearStats?.averageGPA != null
                    ? `${currentYearStats.averageGPA} / 700`
                    : "—"}
                </span>
              </div>
            </div>
            <BarChart data={performanceTrend} />
          </div>

          <div className="flex-1">
            <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-5">
              Top Grade, Year by Year
            </p>
            {performanceTrend.filter((p) => p.topStudentImageUrl).length ===
            0 ? (
              <p className="text-xs text-gray-400">
                No top-grade photos have been published yet.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {performanceTrend
                  .filter((p) => p.topStudentImageUrl)
                  .map((p) => (
                    <div
                      key={p._id}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-[#e5e1d8] bg-[#f4f1ea]">
                        <img
                          src={p.topStudentImageUrl}
                          alt={p.topStudentName || `Top grade ${p.year}`}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <p className="mt-2 text-[9px] font-bold text-[#b5985b] uppercase tracking-widest">
                        {p.year}
                      </p>
                      <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
                        {p.topStudentName || "—"}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {p.averageGPA != null
                          ? `GPA ${p.averageGPA}`
                          : p.passRate != null
                            ? `${p.passRate}% Pass Rate`
                            : ""}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── University Placements ──────────────────────────── */}
      <section className="bg-[#FAF8F5] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl border border-dashed border-[#9AB8B0]/70 bg-[#C8D8D0] p-6 sm:p-8 md:p-10 lg:p-14">
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
            <div className="flex-1 w-full">
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[#6A8A7E] mb-3">
                Alumni Success
              </p>
              <h2 className="font-serif font-bold text-[#1A1A1A] text-3xl sm:text-4xl lg:text-5xl leading-tight">
                University Placements
              </h2>
              <p className="mt-5 text-[#3A5248] leading-relaxed text-sm sm:text-base max-w-xl">
                Our graduates continue their academic journey at leading
                universities across Ethiopia and around the world, carrying the
                Agaro High School legacy into higher education and professional
                excellence.
              </p>
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
        {honorsLoading ? (
          <p className="text-sm text-gray-500">Loading honors…</p>
        ) : honorsError ? (
          <p className="text-sm text-red-600">{honorsError}</p>
        ) : honorsList.length === 0 ? (
          <p className="text-sm text-gray-500">
            No institutional honors have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {honorsList.map(({ id, icon: Icon, title, sub, yearSpan }) => (
              <div key={id} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center shadow-sm">
                  <Icon size={22} className="text-[#033327]" />
                </div>
                <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
                  {title}
                </p>
                {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
                {yearSpan && yearSpan !== sub && (
                  <p className="text-[10px] text-[#b5985b] font-semibold tracking-wide">
                    {yearSpan}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Scholastic Competitions ────────────────────────── */}
      <section className="bg-[#f5f2ec] border-t border-[#e5e1d8] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-8">
            Scholastic Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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

      {/* ── Distinguished Educators (from /api/v1/staff) ───── */}
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
                  src={e.imageUrl}
                  alt={e.fullName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
                {e.fullName}{" "}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {e.qualifications}
              </p>
              <p className="text-[12px] text-[#b5985b] font-semibold mt-1 flex items-center gap-1">
                <Award size={10} /> {e.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
