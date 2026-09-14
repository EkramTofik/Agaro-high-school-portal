import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import AdminFormModal from "../components/AdminFormModal";
import AdminConfirmModal from "../components/AdminConfirmModal";
import AdminFilters, {
  matchesSearch,
  matchesFilter,
} from "../components/AdminFilters";

/* ── Inline SVG icons ─── */
const icons = {
  search: (
    <svg
      width="13"
      height="13"
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
      width="15"
      height="15"
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
  grid: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  archive: (
    <svg
      width="15"
      height="15"
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
      width="13"
      height="13"
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
  doc: (
    <svg
      width="13"
      height="13"
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
  globe: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  alumni: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  gallery: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  megaphone: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 13" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  settings: (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
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
  cloud: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#033327"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="M12 15V8" />
      <path d="m9 11 3-3 3 3" />
    </svg>
  ),
  check: (
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  filter: (
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  play: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
};

export default function AdminGalleryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formAsset, setFormAsset] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadAssets = () => {
    setLoading(true);
    setError("");
    return api
      .get("/gallary")
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        setAssets(
          (Array.isArray(payload) ? payload : [payload]).filter(Boolean),
        );
      })
      .catch(() => setError("Could not load gallery assets."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let ignore = false;

    async function fetchAssets() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/gallary");
        if (ignore) return;
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        setAssets(
          (Array.isArray(payload) ? payload : [payload]).filter(Boolean),
        );
      } catch {
        if (!ignore) setError("Could not load gallery assets.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchAssets();

    return () => {
      ignore = true;
    };
  }, []);

  const addAsset = () => setFormAsset({});
  const editAsset = (asset) => setFormAsset(asset);

  const saveAsset = async (values) => {
    if (!values.category) {
      setError("Please select a gallery category.");
      return;
    }
    setSaving(true);
    try {
      await (formAsset?._id
        ? api.patch(`/gallary/${formAsset._id}`, values)
        : api.post("/gallary", values));
      setFormAsset(null);
      await loadAssets();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save gallery asset.");
    } finally {
      setSaving(false);
    }
  };

  const deleteAsset = async (asset) => {
    setConfirmDelete({
      message: `Delete ${asset.title || "this asset"}?`,
      action: async () => {
        try {
          await api.delete(`/gallary/${asset._id}`);
          await loadAssets();
        } catch (e) {
          setError(
            e.response?.data?.message || "Could not delete gallery asset.",
          );
        }
      },
    });
  };

  const visibleAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (!matchesSearch(asset, search, ["title", "caption"])) return false;
      if (!matchesFilter(asset, "category", categoryFilter)) return false;
      return true;
    });
  }, [assets, search, categoryFilter]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
      {formAsset !== null && (
        <AdminFormModal
          title={formAsset._id ? "Edit gallery asset" : "Add gallery asset"}
          initialValues={formAsset}
          onClose={() => setFormAsset(null)}
          onSubmit={saveAsset}
          submitting={saving}
          fields={[
            { name: "title", label: "Title", required: true },
            {
              name: "imageUrl",
              label: "Image URL",
              required: true,
              type: "url",
            },
            {
              name: "category",
              label: "Category",
              type: "select",
              required: true,
              options: [
                { value: "historic", label: "Historic Archive" },
                { value: "campus", label: "Campus & Facilities" },
                { value: "sports", label: "Athletics & Sports" },
                { value: "events", label: "Events & Ceremonies" },
              ],
            },
            { name: "caption", label: "Caption", type: "textarea" },
          ]}
        />
      )}

      {confirmDelete && (
        <AdminConfirmModal
          message={confirmDelete.message}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={async () => {
            await confirmDelete.action();
            setConfirmDelete(null);
          }}
        />
      )}

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="bg-[#FAF8F5] flex-1 flex flex-col">
        {/* Scrollable content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 flex-1">
          <div className="max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex-1 min-w-0">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#033327] mb-2 leading-tight">
                  Institutional Media Archive
                </h1>
                <p className="text-sm text-gray-600 max-w-xl">
                  Curate and preserve the visual history of Agaro High School.
                  Manage collection metadata, academic year albums, and digital
                  assets.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2.5 rounded border border-[#e5e1d8] text-[11px] font-bold text-[#033327] bg-white hover:bg-gray-50 transition-colors">
                  Manage Albums
                </button>
                <button
                  onClick={addAsset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white hover:bg-[#0d4a3b] transition-colors"
                >
                  Publish Updates
                </button>
              </div>
            </div>

            {/* Drag & Drop */}
            <div
              onClick={addAsset}
              className="border border-dashed border-[#4a8a6a] bg-[#f2f6f4] rounded-lg p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center mb-8 sm:mb-10 cursor-pointer hover:bg-[#e8f0ec] transition-colors"
            >
              <div className="mb-3">{icons.cloud}</div>
              <p className="font-serif text-base sm:text-lg font-bold text-[#033327] mb-1">
                Drag and Drop Media
              </p>
              <p className="text-xs text-gray-500 max-w-sm px-2">
                Support for High-Resolution JPG, PNG, and 4K MP4 assets (Max
                500MB per file)
              </p>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <AdminFilters
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search assets…"
                filters={[
                  {
                    key: "category",
                    label: "Category",
                    value: categoryFilter,
                    onChange: setCategoryFilter,
                    options: [
                      { value: "", label: "All categories" },
                      { value: "historic", label: "Historic Archive" },
                      { value: "campus", label: "Campus & Facilities" },
                      { value: "sports", label: "Athletics & Sports" },
                      { value: "events", label: "Events & Ceremonies" },
                    ],
                  },
                ]}
                resultCount={visibleAssets.length}
                totalCount={assets.length}
              />
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {loading || error || visibleAssets.length === 0 ? (
                <p
                  className={
                    error
                      ? "col-span-1 sm:col-span-2 lg:col-span-3 text-sm text-red-500"
                      : "col-span-1 sm:col-span-2 lg:col-span-3 text-sm text-gray-500"
                  }
                >
                  {loading
                    ? "Loading gallery assets…"
                    : error || "No gallery assets found."}
                </p>
              ) : (
                visibleAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="bg-white border border-[#e5e1d8] rounded-lg overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                      <img
                        src={asset.imageUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <p className="text-[11px] font-bold text-[#1a1a1a] line-clamp-2">
                        {asset.title}
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                        {asset.category || "ARCHIVE ASSET"}
                      </p>
                      <div className="flex gap-3 mt-auto pt-2">
                        <button
                          onClick={() => editAsset(asset)}
                          className="text-xs text-[#033327] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAsset(asset)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load Previous */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center">
              <button className="px-4 sm:px-5 py-2.5 rounded border border-[#e5e1d8] text-[10px] font-bold text-[#1a1a1a] bg-white hover:bg-gray-50 flex items-center gap-2 mb-3 transition-colors">
                LOAD PREVIOUS ARCHIVES
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <p className="text-[10px] text-gray-500">
                Showing {visibleAssets.length} digital assets
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 px-4 sm:px-6 md:px-8 py-3 bg-[#033327] flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] shrink-0"></span>
            <span className="text-[9px] font-bold uppercase tracking-wider">
              SERVER ONLINE
            </span>
            <span className="text-[9px] text-white/60">
              LAST BACKUP: 24/02/2023
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] font-semibold text-white/80">
              12 Items Selected
            </span>
            <button className="px-3 sm:px-4 py-1.5 rounded bg-[#FFDEA4] text-[10px] font-bold text-[#033327] uppercase tracking-wider hover:bg-[#ffe9c0] transition-colors">
              Action Bar
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
