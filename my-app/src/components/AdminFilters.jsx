export default function AdminFilters({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search…",
  filters = [],
  resultCount,
  totalCount,
}) {
  return (
    <div className="mt-6 rounded-xl border border-[#e5e1d8] bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
          {onSearchChange && (
            <label className="min-w-[180px] flex-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Search
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="mt-1.5 w-full rounded-lg border border-[#e5e1d8] bg-[#FAF8F5] px-3 py-2 text-sm font-normal text-[#1a1a1a] outline-none focus:border-[#033327]"
              />
            </label>
          )}
          {filters.map((filter) => (
            <label
              key={filter.key}
              className="min-w-[140px] text-[10px] font-bold uppercase tracking-wider text-gray-500"
            >
              {filter.label}
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#e5e1d8] bg-[#FAF8F5] px-3 py-2 text-sm font-normal text-[#1a1a1a] outline-none focus:border-[#033327]"
              >
                {(filter.options || []).map((option) => {
                  const value = option.value ?? option;
                  const label = option.label ?? option;
                  return (
                    <option key={String(value)} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          ))}
        </div>
        {(resultCount !== undefined || totalCount !== undefined) && (
          <p className="shrink-0 text-[11px] font-semibold text-gray-500">
            Showing {resultCount ?? 0}
            {totalCount !== undefined ? ` of ${totalCount}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}

/** Match item against search text across listed keys. */
export function matchesSearch(item, search, keys = []) {
  const q = String(search || "")
    .trim()
    .toLowerCase();
  if (!q) return true;
  return keys.some((key) =>
    String(item?.[key] ?? "")
      .toLowerCase()
      .includes(q),
  );
}

/** Compare filter value to item field (supports boolean string filters). */
export function matchesFilter(item, key, value) {
  if (value === "" || value === undefined || value === null) return true;
  const raw = item?.[key];
  if (value === "true" || value === "false") {
    return String(Boolean(raw)) === value;
  }
  if (raw && typeof raw === "object") {
    return String(raw._id ?? raw.name ?? "") === String(value);
  }
  return String(raw ?? "") === String(value);
}
