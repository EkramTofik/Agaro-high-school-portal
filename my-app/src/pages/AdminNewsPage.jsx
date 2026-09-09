import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import AdminFormModal from "../components/AdminFormModal";
import AdminConfirmModal from "../components/AdminConfirmModal";
import AdminFilters, { matchesSearch, matchesFilter } from "../components/AdminFilters";

/* ── Inline SVG icons ─── */
const icons = {
  search: (
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  bell: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  history: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  archiveHome: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="5" rx="2" />
      <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      <path d="M10 13h4" />
    </svg>
  ),
  users: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  news: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
    </svg>
  ),
  star: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  resource: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  settings: (
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  support: (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  eye: (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  bold: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  ),
  italic: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  ),
  list: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  link: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  file: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  image: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
      <line x1="15" y1="3" x2="15" y2="5" />
      <line x1="18" y1="6" x2="20" y2="6" />
    </svg>
  ),
  plusImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
      <line x1="16" y1="2" x2="16" y2="8" />
      <line x1="13" y1="5" x2="19" y2="5" />
    </svg>
  ),
};


export default function AdminNewsPage() {
  const [isUrgent, setIsUrgent] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Other",
    body: "",
    status: "draft",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");
  const [editingNews, setEditingNews] = useState(null);
  const [savingNews, setSavingNews] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadNews = () => {
    setNewsLoading(true);
    api.get("/news")
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        setNews(Array.isArray(payload) ? payload : [payload]);
      })
      .catch(() => setNewsError("Could not load news records."))
      .finally(() => setNewsLoading(false));
  };

  useEffect(() => { loadNews(); }, []);

  const handlePublish = async () => {
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.body.trim()) {
      setError(
        "Please fill in both the headline and the announcement content.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/news", {
        title: form.title,
        slug: form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        category: form.category,
        body: form.body,
        isUrgent,
        status: "published",
      });
      setSuccess("Announcement published successfully.");
      loadNews();
      setForm({ title: "", category: "Other", body: "", status: "draft" });
      setIsUrgent(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to publish. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    setForm({ title: "", category: "Other", body: "", status: "draft" });
    setIsUrgent(false);
    setError("");
    setSuccess("");
  };
  const handleDeleteNews = async (item) => {
    setConfirmDelete({ message: `Delete "${item.title}"?`, action: async () => { try { await api.delete(`/news/${item._id}`); loadNews(); } catch (err) { setError(err.response?.data?.message || "Failed to delete news."); } } });
  };
  const handleEditNews = (item) => setEditingNews(item);
  const saveNews = async (values) => {
    setSavingNews(true);
    try { await api.patch(`/news/${editingNews._id}`, { ...values, slug: values.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }); setEditingNews(null); loadNews(); }
    catch (err) { setError(err.response?.data?.message || "Failed to update news."); }
    finally { setSavingNews(false); }
  };

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      if (!matchesSearch(item, search, ["title", "body", "summary", "category"])) return false;
      if (!matchesFilter(item, "category", categoryFilter)) return false;
      if (!matchesFilter(item, "status", statusFilter)) return false;
      return true;
    });
  }, [news, search, categoryFilter, statusFilter]);

  return (
    <div className="bg-[#FAF8F5] text-[#1a1a1a]">
      {editingNews && <AdminFormModal title="Edit news update" initialValues={editingNews} onClose={() => setEditingNews(null)} onSubmit={saveNews} submitting={savingNews} fields={[
        { name: "title", label: "Headline", required: true },
        { name: "category", label: "Category", type: "select", options: ["Academic", "Sports", "Cultural", "Meeting", "Event", "Other"] },
        { name: "body", label: "Announcement content", required: true, type: "textarea" },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "imageUrl", label: "Image URL", type: "url" },
        { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
        { name: "isUrgent", label: "Urgent announcement", type: "checkbox", defaultValue: false },
        { name: "publishedAt", label: "Published at", type: "datetime-local", emptyValue: null }
      ]} />}
      {confirmDelete && <AdminConfirmModal message={confirmDelete.message} onCancel={() => setConfirmDelete(null)} onConfirm={async () => { await confirmDelete.action(); setConfirmDelete(null) }} />}

{/* ── Main ──────────────────────────────────────────── */}
      <main className="bg-[#FAF8F5]">
        {/* Scrollable Content */}
        <div className="px-12 py-12 pb-24">
          <div className="max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="w-16 h-[2px] bg-[#b5985b]/30 mx-auto mb-6"></div>
              <h1 className="font-serif text-[42px] font-bold text-[#033327] mb-2 leading-tight">
                Create Announcement
              </h1>
              <p className="text-[12px] text-gray-500 italic">
                Draft a new record for the Agaro High School Living Archive
              </p>
              <p className={newsError ? "mt-3 text-xs text-red-500" : "mt-3 text-xs text-gray-500"}>
                {newsLoading ? "Loading news records…" : newsError || `${filteredNews.length} of ${news.length} news records`}
              </p>
              <div className="w-16 h-[2px] bg-[#b5985b]/30 mx-auto mt-6"></div>
            </div>

            {/* Form Container */}
            <div className="border border-[#e5e1d8] bg-transparent rounded-lg p-10">
              {/* Category & Urgent Toggle */}
              <div className="flex items-start gap-12 mb-8">
                <div className="flex-1 max-w-sm">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    NOTICE CATEGORY
                  </label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className="w-full appearance-none bg-white border border-[#e5e1d8] rounded-md pl-4 pr-10 py-2.5 text-[12px] font-bold text-gray-700 outline-none cursor-pointer"
                    >
                      <option>Other</option>
                      <option>Academic</option>
                      <option>Sports</option>
                      <option>Cultural</option>
                      <option>Meeting</option>
                      <option>Event</option>
                    </select>
                    <svg
                      className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                  <div className="mt-8 space-y-2">
                    <AdminFilters
                      search={search}
                      onSearchChange={setSearch}
                      searchPlaceholder="Search news…"
                      filters={[
                        {
                          key: "category",
                          label: "Category",
                          value: categoryFilter,
                          onChange: setCategoryFilter,
                          options: [
                            { value: "", label: "All categories" },
                            "Academic",
                            "Sports",
                            "Cultural",
                            "Meeting",
                            "Event",
                            "Other",
                          ],
                        },
                        {
                          key: "status",
                          label: "Status",
                          value: statusFilter,
                          onChange: setStatusFilter,
                          options: [
                            { value: "", label: "All statuses" },
                            "draft",
                            "published",
                            "archived",
                          ],
                        },
                      ]}
                      resultCount={filteredNews.length}
                      totalCount={news.length}
                    />
                    {filteredNews.map((item) => (
                      <div key={item._id} className="flex items-center justify-between bg-white border border-[#e5e1d8] rounded-md px-4 py-3">
                        <span className="text-[12px] font-bold">{item.title}</span>
                        <span className="flex gap-3 text-[10px]"><button onClick={() => handleEditNews(item)} className="text-[#033327]">Edit</button><button onClick={() => handleDeleteNews(item)} className="text-red-600">Delete</button></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-7">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsUrgent(!isUrgent)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${isUrgent ? "bg-[#b5985b]" : "bg-[#e5e1d8]"}`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isUrgent ? "translate-x-5" : ""}`}
                      ></div>
                    </button>
                    <div>
                      <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-0.5">
                        URGENT NOTICE
                      </p>
                      <p className="text-[8px] text-gray-400">
                        Pin to global top banner
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status messages */}
              {error && (
                <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200 text-[12px] text-red-700 font-semibold">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 p-3 rounded-md bg-[#4a8a6a]/10 border border-[#4a8a6a]/20 text-[12px] text-[#4a8a6a] font-semibold">
                  {success}
                </div>
              )}

              {/* Headline */}
              <div className="mb-8">
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g., Annual Founder's Day Commemoration 2024"
                  className="w-full bg-white border border-[#e5e1d8] rounded-md px-4 py-3 text-[14px] outline-none text-[#1a1a1a] placeholder:text-gray-300 font-serif italic"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="mb-8">
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  ANNOUNCEMENT CONTENT
                </label>
                <div className="border border-[#e5e1d8] rounded-md bg-white overflow-hidden flex flex-col">
                  {/* Toolbar (visual only — formatting isn't persisted, body is saved as plain text) */}
                  <div className="bg-[#fcfbfa] border-b border-[#e5e1d8] px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-600">
                      <button type="button" className="hover:text-[#033327]">
                        {icons.bold}
                      </button>
                      <button type="button" className="hover:text-[#033327]">
                        {icons.italic}
                      </button>
                      <button type="button" className="hover:text-[#033327]">
                        {icons.list}
                      </button>
                      <div className="w-[1px] h-4 bg-[#e5e1d8] mx-1"></div>
                      <button type="button" className="hover:text-[#033327]">
                        {icons.link}
                      </button>
                      <button type="button" className="hover:text-[#033327]">
                        {icons.file}
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {icons.history}
                    </button>
                  </div>
                  {/* Textarea */}
                  <textarea
                    value={form.body}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, body: e.target.value }))
                    }
                    className="w-full min-h-[220px] p-5 text-[13px] text-gray-700 leading-relaxed outline-none resize-y"
                    placeholder="Begin writing your announcement here..."
                  ></textarea>
                </div>
              </div>

              {/* Visual Records (Attachment) */}
              <div className="mb-10">
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  VISUAL RECORDS (ATTACHMENT)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Upload Box — file upload wiring needs a storage backend (S3/Cloudinary); not yet connected */}
                  <div className="border border-dashed border-[#d1cdbd] rounded-lg bg-[#fcfbfa] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white transition-colors h-[180px]">
                    <div className="text-gray-400 mb-3">{icons.plusImage}</div>
                    <p className="text-[12px] font-bold text-gray-700 mb-1">
                      Upload Featured Image
                    </p>
                    <p className="text-[8px] text-gray-400 uppercase tracking-wider">
                      Recommended: 1200x800px, under 2MB
                    </p>
                  </div>
                  {/* Preview Box */}
                  <div className="border border-[#e5e1d8] rounded-lg bg-[#f0ede8] overflow-hidden flex items-center justify-center relative h-[180px]">
                    <div className="absolute inset-0 opacity-40">
                      <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
                        alt="Building preview"
                        className="w-full h-full object-cover blur-[2px]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#f0ede8]/30 mix-blend-overlay"></div>
                    <p className="relative text-[10px] font-bold text-white uppercase tracking-widest z-10 drop-shadow-md">
                      Preview will appear here
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="pt-6 border-t border-[#e5e1d8] flex items-center justify-between">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded border border-[#e5e1d8] bg-white text-[11px] font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  {icons.eye} Preview Record
                </button>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    DISCARD DRAFT
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white hover:bg-[#0d4a3b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Publishing..." : "Commit to Archive"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="mt-8 text-center flex items-center justify-center gap-4 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
              <span>DRAFT AUTO-SAVED: 10:15 PM</span>
              <span className="w-1 h-1 rounded-full bg-[#b5985b]"></span>
              <span>ADMIN: ARTHUR J. STERLING</span>
              <span className="w-1 h-1 rounded-full bg-[#b5985b]"></span>
              <span>ID: ARCH-7729-N</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
