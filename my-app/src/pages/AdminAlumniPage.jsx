import { useState, useMemo, useEffect } from "react";
import api from "../api/axios";
import AdminFormModal from "../components/AdminFormModal";
import AdminConfirmModal from "../components/AdminConfirmModal";
import AdminFilters, { matchesSearch } from "../components/AdminFilters";

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
  edit: (
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
};

/* ── Profession enum (must match the schema) ─── */
const PROFESSION_OPTIONS = [
  "Science & Medicine",
  "Public Affairs",
  "Technology & Business",
  "Fine Arts",
];

export default function AdminAlumniDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [professionFilter, setProfessionFilter] = useState("All Alumni");
  const [featuredFilter, setFeaturedFilter] = useState("");
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [formPerson, setFormPerson] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadAlumni = () => {
    setLoading(true);
    setError("");
    return api
      .get("/alumni")
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        setAlumni(
          (Array.isArray(payload) ? payload : [payload])
            .filter(Boolean)
            .map((item) => ({
              id: item._id,
              name: item.fullName || "Unnamed alumnus",
              role: item.profession || "Alumnus",
              profession: item.profession || "Other",
              company: item.company || "",
              location: item.location || "",
              year: item.graduationYear ?? "—",
              featured: !!item.isFeatured,
              avatar: item.imageUrl || null,
              raw: item,
            })),
        );
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Could not load alumni records."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let cancelled = false;
    // Deferred to a microtask so the initial setState calls made by
    // loadAlumni() don't happen synchronously within the effect body itself
    // (avoids cascading-render warnings).
    queueMicrotask(() => {
      if (cancelled) return;
      loadAlumni();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const addAlumni = () => {
    setFormError("");
    setFormPerson({});
  };
  const editAlumni = (person) => {
    setFormError("");
    setFormPerson(person.raw || person);
  };
  const saveAlumni = async (values) => {
    setSaving(true);
    setFormError("");
    setError("");
    try {
      const payload = {
        fullName: values.fullName,
        graduationYear: values.graduationYear
          ? Number(values.graduationYear)
          : undefined,
        profession: values.profession || undefined,
        company: values.company || undefined,
        location: values.location || undefined,
        bio: values.bio || undefined,
        imageUrl: values.imageUrl || undefined,
        isFeatured: !!values.isFeatured,
      };
      await (formPerson?._id
        ? api.patch(`/alumni/${formPerson._id}`, payload)
        : api.post("/alumni", payload));
      setFormPerson(null);
      await loadAlumni();
    } catch (e) {
      const status = e.response?.status;
      const message =
        status === 401
          ? "Your session expired. Please log in again, then retry."
          : e.response?.data?.message || "Could not save alumni record.";
      setFormError(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };
  const deleteAlumni = async (person) => {
    setConfirmDelete({
      message: `Delete ${person.name}?`,
      action: async () => {
        try {
          await api.delete(`/alumni/${person.id}`);
          await loadAlumni();
        } catch (e) {
          setError(
            e.response?.data?.message || "Could not delete alumni record.",
          );
        }
      },
    });
  };

  /* ── Form fields — mapped 1:1 to the Mongoose schema (minus refs) ── */
  const alumniFields = useMemo(
    () => [
      { name: "fullName", label: "Full name", required: true },
      {
        name: "graduationYear",
        label: "Graduation year",
        type: "number",
        min: 1900,
        integer: true,
      },
      {
        name: "profession",
        label: "Profession",
        type: "select",
        emptyValue: "",
        options: PROFESSION_OPTIONS,
      },
      { name: "company", label: "Company" },
      { name: "location", label: "Location" },
      { name: "imageUrl", label: "Image URL", type: "url" },
      { name: "bio", label: "Biography", type: "textarea" },
      {
        name: "isFeatured",
        label: "Featured alumnus",
        type: "checkbox",
        defaultValue: false,
      },
    ],
    [],
  );

  /* ── Filter options — Profession enum + "All Alumni" ── */
  const professionFilters = useMemo(
    () => ["All Alumni", ...PROFESSION_OPTIONS],
    [],
  );

  const filteredAlumni = useMemo(() => {
    return alumni.filter((person) => {
      const raw = person.raw || person;
      if (
        !matchesSearch(person, searchQuery, [
          "name",
          "company",
          "location",
          "profession",
        ])
      )
        return false;
      if (
        professionFilter !== "All Alumni" &&
        person.profession !== professionFilter
      )
        return false;
      if (featuredFilter === "true" && !raw.isFeatured) return false;
      if (featuredFilter === "false" && raw.isFeatured) return false;
      return true;
    });
  }, [alumni, searchQuery, professionFilter, featuredFilter]);

  return (
    <div className="bg-[#FAF8F5] text-[#1a1a1a]">
      {formPerson !== null && (
        <AdminFormModal
          title={formPerson._id ? "Edit alumnus record" : "Add alumnus record"}
          initialValues={formPerson}
          onClose={() => {
            setFormPerson(null);
            setFormError("");
          }}
          onSubmit={saveAlumni}
          submitting={saving}
          error={formError}
          fields={alumniFields}
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
      <main className="bg-[#FAF8F5]">
        {/* Scrollable Content */}
        <div className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[42px] font-bold text-[#033327] mb-3 leading-tight">
                  Alumni Directory
                </h1>
                <p className="text-[13px] text-gray-600 max-w-xl leading-relaxed">
                  The living registry of our esteemed graduates. Manage
                  professional profiles and celebrate the legacy of Agaro High
                  School's alumni.
                </p>
              </div>
              <button
                onClick={addAlumni}
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white tracking-wide hover:bg-[#0d4a3b] transition-colors flex items-center justify-center gap-2 sm:mt-2 shadow-md shrink-0"
              >
                <span className="text-sm leading-none">+</span> New Alumnus
                Record
              </button>
            </div>

            {error && (
              <p className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {/* Filter & Status Area */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-8">
              <div className="flex-1 border border-[#e5e1d8] rounded-xl p-4 sm:p-5 bg-[#fcfbfa] shadow-sm min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    Filter by Profession
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {professionFilters.map((prof) => (
                    <button
                      key={prof}
                      onClick={() => setProfessionFilter(prof)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-bold transition-all
                        ${
                          professionFilter === prof
                            ? "bg-[#033327] text-white shadow-sm"
                            : "bg-white border border-[#e5e1d8] text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {prof}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-64 shrink-0 bg-[#e8f0ec] rounded-xl p-6 border border-[#d6e3dc] flex flex-col justify-center shadow-sm">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  CURRENT ALUMNI COUNT
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[36px] sm:text-[42px] font-bold text-[#033327] leading-none">
                    {filteredAlumni.length}
                  </span>
                  <span className="text-[11px] font-medium text-gray-600">
                    alumni
                  </span>
                </div>
              </div>
            </div>

            <AdminFilters
              search={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search by name, company, location…"
              filters={[
                {
                  key: "profession",
                  label: "Profession",
                  value:
                    professionFilter === "All Alumni" ? "" : professionFilter,
                  onChange: (value) =>
                    setProfessionFilter(value || "All Alumni"),
                  options: [
                    { value: "", label: "All" },
                    ...PROFESSION_OPTIONS.map((p) => ({ value: p, label: p })),
                  ],
                },
                {
                  key: "isFeatured",
                  label: "Featured",
                  value: featuredFilter,
                  onChange: setFeaturedFilter,
                  options: [
                    { value: "", label: "All" },
                    { value: "true", label: "Featured" },
                    { value: "false", label: "Not featured" },
                  ],
                },
              ]}
              resultCount={filteredAlumni.length}
              totalCount={alumni.length}
            />

            {/* Table */}
            <div className="border border-[#e5e1d8] rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#fcfbfa] border-b border-[#e5e1d8]">
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24">
                        Honor Seal
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Alumnus
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Profession
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Company
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Graduation
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Featured
                      </th>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e1d8]">
                    {filteredAlumni.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center">
                          <p
                            className={
                              error
                                ? "text-sm text-red-500"
                                : "text-sm text-gray-500"
                            }
                          >
                            {loading
                              ? "Loading alumni records…"
                              : error ||
                                "No alumni members found matching your criteria."}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredAlumni.map((person, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors group"
                        >
                          <td className="py-4 px-6">
                            <div className="w-8 h-8 rounded-full border border-[#033327]/30 flex items-center justify-center transition-transform group-hover:scale-110">
                              {icons.users}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {person.avatar ? (
                                <img
                                  src={person.avatar}
                                  alt={person.name}
                                  className="w-9 h-9 rounded-full object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[#e8f0ec] text-[#033327] text-[11px] font-bold flex items-center justify-center shrink-0">
                                  {person.name.trim().charAt(0).toUpperCase() ||
                                    "?"}
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-serif text-[14px] font-bold text-[#033327] truncate">
                                  {person.name}
                                </p>
                                {person.location && (
                                  <p className="text-[10px] text-gray-500 truncate">
                                    {person.location}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[12px] font-medium text-gray-700">
                            {person.profession}
                          </td>
                          <td className="py-4 px-4 text-[12px] font-medium text-gray-700">
                            {person.company || "—"}
                          </td>
                          <td className="py-4 px-4 text-[12px] font-serif font-bold text-gray-700">
                            {person.year}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-widest whitespace-nowrap ${
                                person.featured
                                  ? "bg-[#ffe4b3] text-[#a36b00]"
                                  : "bg-[#e5e1d8] text-gray-600"
                              }`}
                            >
                              {person.featured ? "FEATURED" : "STANDARD"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-3 text-gray-400">
                              <button
                                className="hover:text-[#b5985b] transition-colors"
                                title="View Profile"
                              >
                                {icons.eye}
                              </button>
                              <button
                                onClick={() => editAlumni(person)}
                                className="hover:text-[#033327] transition-colors"
                                title="Edit Record"
                              >
                                {icons.edit}
                              </button>
                              <button
                                onClick={() => deleteAlumni(person)}
                                className="hover:text-red-600 transition-colors"
                                title="Delete Record"
                              >
                                ×
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-[#fcfbfa] border-t border-[#e5e1d8] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10px] font-bold text-gray-500">
                  Showing {filteredAlumni.length > 0 ? 1 : 0}-
                  {filteredAlumni.length} of {alumni.length} records
                </p>
                <div className="flex items-center gap-1">
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded border border-[#e5e1d8] bg-white text-gray-400 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled
                  >
                    &lt;
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-[#033327] text-white text-[11px] font-bold">
                    1
                  </button>
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded border border-[#e5e1d8] bg-white text-gray-400 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="max-w-md">
                <h3 className="font-serif text-[17px] font-bold text-[#033327] mb-2">
                  Preserving Academic Legacy
                </h3>
                <p className="text-[11px] text-gray-600 leading-relaxed italic">
                  "An archive is not just a collection of names, but a living
                  testament to the minds that shaped the future of Agaro High
                  School." — 1924 Administrative Manual.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 sm:gap-12 text-left md:text-right w-full md:w-auto">
                <div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                    Audit Logs
                  </p>
                  <p className="text-[9px] text-gray-500 leading-relaxed">
                    Last Modified:{" "}
                    {new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <br />
                    By: Registrar Sterling
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                    Integrity Check
                  </p>
                  <p className="text-[9px] text-gray-500 flex items-center md:justify-end gap-1">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>{" "}
                    Verified Secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
