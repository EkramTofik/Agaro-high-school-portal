import { useState, useMemo, useEffect } from "react";
import { Search, Calendar, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Must match backend enum:
// ["Academic", "Sports", "Cultural", "Meeting", "Event", "Other"]
const CATEGORIES = [
  "All",
  "Academic",
  "Sports",
  "Cultural",
  "Meeting",
  "Event",
  "Other",
];

export default function NewsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data?.news ?? res.data?.data ?? [];
        const items = Array.isArray(payload) ? payload : [payload];
        setNews(items.filter((item) => item && item.status === "published"));
      })
      .catch(() => setError("Could not load news right now."))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return news.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const summary = (item.summary || item.body || "").toLowerCase();
      const category = item.category || "";

      const matchesSearch =
        !q ||
        title.includes(q) ||
        summary.includes(q) ||
        category.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "All" || category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [news, searchQuery, activeCategory]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const openArticle = (item) => {
    navigate(`/news/${item._id || item.slug}`);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* â”€â”€ HEADER â”€â”€ */}
      <div className="bg-[#033327] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src={undefined}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.25em] mb-4">
            The Campus Pulse
          </p>
          <h1 className="font-serif text-3xl md:text-[4rem] font-bold text-white mb-6 tracking-tight">
            News & Announcements
          </h1>
          <p className="text-sm text-white/70 italic max-w-2xl mx-auto font-serif leading-relaxed">
            Stay informed with the latest developments, upcoming events, and
            stories from our vibrant student and alumni community.
          </p>
        </div>
      </div>

      {/* â”€â”€ CONTROLS â”€â”€ */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#e5e1d8] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#033327] text-white shadow-md"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-[#e5e1d8] border border-[#e5e1d8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#033327] transition-colors"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full md:w-64 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#b5985b] focus:ring-1 focus:ring-[#b5985b] transition-all"
            />
          </div>
        </div>
      </div>

      {/* â”€â”€ NEWS GRID â”€â”€ */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="text-center py-24 text-gray-400">Loading newsâ€¦</div>
        ) : error ? (
          <div className="text-center py-24 text-red-500">{error}</div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#e5e1d8]">
            <p className="text-4xl mb-4">ðŸ“°</p>
            <h3 className="font-serif text-2xl font-bold text-[#033327] mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              We couldn't find any news matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-[#e5e1d8] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden relative bg-gray-100">
                  {item.isUrgent && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest rounded shadow-md">
                      Urgent Notice
                    </div>
                  )}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {item.category && (
                      <span className="px-2.5 py-1 bg-[#e5e1d8] text-gray-700 text-[9px] font-bold uppercase tracking-widest rounded">
                        {item.category}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                      <Calendar size={12} />{" "}
                      {formatDate(item.publishedAt || item.createdAt)}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#033327] mb-3 group-hover:text-[#b5985b] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-1">
                    {item.summary || item.body}
                  </p>

                  <button
                    type="button"
                    onClick={() => openArticle(item)}
                    className="flex items-center gap-2 text-xs font-bold text-[#033327] hover:text-[#b5985b] transition-colors mt-auto w-max uppercase tracking-wider"
                  >
                    Read Article <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
