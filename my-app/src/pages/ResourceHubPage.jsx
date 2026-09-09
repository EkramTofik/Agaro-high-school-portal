import { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  BookOpen,
  Calendar,
  ExternalLink,
  X,
  Download,
  Users,
  Monitor,
} from "lucide-react";
import api from "../api/axios";

export default function ResourceHubPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ICT Lab booking has no backend model yet — kept as UI-only for now.
  const [booked, setBooked] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  useEffect(() => {
    api
      .get("/resource")
      .then((res) => {
        const payload =
          res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        setResources(Array.isArray(payload) ? payload : [payload]);
      })
      .catch(() => setError("Could not load resources right now."))
      .finally(() => setLoading(false));
  }, []);

  // Categories are derived from real resource data
  const categories = useMemo(() => {
    const map = {};
    resources.forEach((r) => {
      const cat = r.category || "General";
      if (!map[cat]) map[cat] = [];
      map[cat].push(r);
    });
    return map;
  }, [resources]);

  const categoryList = Object.keys(categories);
  const gatewayLinks = resources.filter((resource) => resource.url || resource.link).slice(0, 3).map((resource) => ({
    title: resource.title || resource.name,
    sub: resource.description || resource.category || "Resource",
    count: resource.downloads || 0,
    href: resource.url || resource.link,
  }));
  const vaultStats = [
    { icon: Users, label: `${resources.length} Items Uploaded` },
    { icon: BookOpen, label: `${Object.keys(categories).length} Verified Modules` },
    { icon: BookOpen, label: `${resources.filter((resource) => resource.type === "reading-list").length} Reading Lists Available` },
    { icon: Monitor, label: `${resources.filter((resource) => resource.type === "case-study").length} Map Case Studies` },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-[#1a1a1a]">
      <main className="flex-1 overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8]">
          <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.3em] mb-3">
            The Living Branch
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 max-w-2xl leading-snug">
            Student &amp; Teacher Resource Hub
          </h1>
          <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
            Preserving the past, cultivating the future. Your gateway to the
            intellectual heritage of Agaro High.
          </p>
        </section>

        {/* ── Exam Repository (from /api/v1/resource) ── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8]">
          <div className="flex items-start justify-between mb-1">
            <h2 className="font-serif text-xl font-bold text-[#1a1a1a]">
              The Exam Repository
            </h2>
          </div>
          <p className="text-[11px] text-gray-400 mb-7">
            All Final National Examinations &amp; Preparation Assessments
          </p>

          {loading ? (
            <p className="text-sm text-gray-400">Loading resources…</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : categoryList.length === 0 ? (
            <p className="text-sm text-gray-400">
              No resources uploaded yet. Add some via the admin panel.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {categoryList.map((cat) => (
                <div
                  key={cat}
                  className="bg-white border border-[#e5e1d8] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <span className="self-start text-[9px] font-bold px-2 py-0.5 rounded bg-[#2d6a4a] text-white uppercase">
                    {cat}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#1a1a1a] leading-snug">
                    {categories[cat][0].title} resource
                    {categories[cat].length === 1 ? "" : "s"}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed flex-1">
                    {categories[cat][0]?.description ||
                      "Study materials and past exams."}
                  </p>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className="self-start text-[10px] font-bold text-[#033327] uppercase tracking-wider flex items-center gap-1 hover:text-[#b5985b] transition-colors mt-1"
                  >
                    View Resources <ChevronRight size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Knowledge Vault ── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8] bg-white">
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">
            Knowledge Vault
          </h2>
          <p className="text-[11px] text-gray-400 mb-8">
            Subject-Specific Study Materials &amp; Faculty Contributions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {vaultStats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 border border-[#e5e1d8] rounded-xl p-5 hover:border-[#033327]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center">
                  <Icon size={16} className="text-[#033327]" />
                </div>
                <p className="text-[11px] font-semibold text-[#1a1a1a] text-center leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Digital Gateway + Stone Hall Library ── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Digital Gateway */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
              <span className="text-[#b5985b]">✦</span> Digital Gateway
            </h2>
            <p className="text-[10px] text-gray-400 mb-6">
              Curated External Learning Resources
            </p>
            <div className="space-y-4">
              {gatewayLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 border border-[#e5e1d8] rounded-xl bg-white hover:shadow-sm hover:border-[#033327]/30 transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center shrink-0 group-hover:bg-[#033327] group-hover:border-[#033327] transition-colors">
                    <ExternalLink
                      size={13}
                      className="text-[#b5985b] group-hover:text-[#FFDEA4] transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1a1a] leading-snug group-hover:text-[#033327] transition-colors">
                      {link.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                      {link.sub}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#b5985b] shrink-0 bg-[#FFDEA4]/30 px-1.5 py-0.5 rounded">
                    {link.count}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Stone Hall Library */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
              <span className="text-[#033327]">⊕</span> The Stone Hall Library
            </h2>
            <p className="text-[10px] text-gray-400 mb-5">
              A Legacy of Knowledge &amp; Learning
            </p>

            {/* Library image */}
            <div className="rounded-xl overflow-hidden border border-[#e5e1d8] mb-4 aspect-video">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800"
                alt="Stone Hall Library"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Article preview */}
            <div className="bg-white border border-[#e5e1d8] rounded-xl p-4">
              <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-wider mb-1">
                Featured Read
              </p>
              <p className="font-serif text-sm font-bold text-[#1a1a1a] mb-1">
                The Electricity of Blueprint
              </p>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                First-year reads. Curated for those who love to explore the
                beautiful and bibliographic stones.
              </p>
              <div className="flex gap-6 border-t border-[#e5e1d8] pt-3">
                {[
                  ["Today's Visits", "142"],
                  ["Regular Patrons", "89"],
                  ["Library Staff", "12"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[8px] text-gray-400 uppercase tracking-wide">
                      {k}
                    </p>
                    <p className="text-sm font-bold text-[#033327]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ICT Lab Reservation ── */}
        <section className="px-10 py-12 bg-[#033327]">
          <div className="max-w-4xl flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <p className="text-[9px] font-bold text-[#FFDEA4]/60 uppercase tracking-[0.25em] mb-3">
                Digital Division
              </p>
              <h2 className="font-serif text-2xl font-bold text-white mb-4 leading-snug">
                ICT Lab Reservation
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-sm">
                Manage Agaro's learning sessions for your classes. Check the day
                availability and leisure time slots for the upcoming academic
                week.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => {
                    if (!booked) setIsBookingModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider text-[#033327] transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#b5985b" }}
                >
                  <Calendar size={13} />
                  {booked ? "Session Booked ✓" : "Book a Session"}
                </button>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="text-[10px] font-bold text-white/50 uppercase tracking-wider border border-white/20 px-4 py-2.5 rounded-lg hover:border-white/40 hover:text-white transition-colors"
                >
                  View Full Schedule
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-4 italic">
                Note: bookings aren't saved yet — this needs a backend model.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Category Resources Modal ── */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  Exam Materials
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#033327]">
                  {selectedCategory}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              <div className="space-y-4">
                {categories[selectedCategory]?.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between p-4 border border-[#e5e1d8] rounded-xl hover:border-[#033327]/30 hover:bg-[#FAF8F5] transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#033327]/5 flex items-center justify-center shrink-0">
                        <BookOpen size={18} className="text-[#033327]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-[#1a1a1a] mb-1 group-hover:text-[#033327] transition-colors">
                          {doc.title}
                        </h4>
                        {doc.description && (
                          <p className="text-[11px] text-gray-500">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold text-[#033327] bg-[#FAF8F5] border border-[#e5e1d8] hover:bg-[#033327] hover:text-[#FFDEA4] hover:border-[#033327] transition-all"
                    >
                      <Download size={14} />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#e5e1d8] bg-[#FAF8F5] text-center">
              <p className="text-[10px] text-gray-500">
                These materials are strictly for Agaro High School students. Do
                not distribute externally.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Modal (UI only) ── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  ICT Lab
                </p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">
                  Reserve a Session
                </h3>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
                setIsBookingModalOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Date
                </label>
                <input
                  required
                  type="date"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Time Slot
                </label>
                <select
                  required
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors"
                >
                  <option value="">Select a time...</option>
                  <option value="08:00">08:00 AM - 10:00 AM</option>
                  <option value="10:30">10:30 AM - 12:30 PM</option>
                  <option value="14:00">02:00 PM - 04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Purpose
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Briefly describe the purpose of your reservation..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-sm text-white bg-[#033327] hover:bg-[#044a38] transition-colors"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Schedule Modal ── */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  Weekly Calendar
                </p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">
                  Lab Schedule
                </h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 text-sm text-gray-500 text-center">
              Schedule data isn't backed by the database yet — this is a
              placeholder view.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
