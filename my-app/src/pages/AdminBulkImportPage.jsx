import { useState, useRef } from "react";
import api from "../api/axios";

/* ── Inline icons, matching AdminGalleryPage's convention ─── */
const icons = {
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
  download: (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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
  alert: (
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
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export default function AdminBulkImportPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setResponse(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/admin/bulk-import", formData);
      setResponse(res.data);
    } catch (e) {
      setError(
        e.response?.data?.message || "Could not process the uploaded file.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await api.get("/admin/bulk-import/template", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Bulk_Import_Template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Could not download the template file.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setResponse(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      <div className="px-10 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#033327] mb-2">
                Bulk Import
              </h1>
              <p className="text-sm text-gray-600 max-w-xl">
                Upload one Excel file to create many records at once — News,
                Alumni, Staff, Events, and more, each on its own sheet. Every
                row is validated before anything is saved.
              </p>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2 px-4 py-2 rounded border border-[#e5e1d8] text-[11px] font-bold text-[#033327] bg-white hover:bg-gray-50"
            >
              {icons.download} Download Template
            </button>
          </div>

          {error && (
            <p className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Upload zone */}
          <div
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer border border-dashed border-[#4a8a6a] bg-[#f2f6f4] rounded-lg p-10 flex flex-col items-center justify-center text-center mb-8"
          >
            <div className="mb-3">{icons.cloud}</div>
            <p className="font-serif text-lg font-bold text-[#033327] mb-1">
              {file ? file.name : "Click to select a file"}
            </p>
            <p className="text-xs text-gray-500">
              Excel (.xlsx) or CSV, one sheet per section — max 10MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex gap-3 mb-10">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-5 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white hover:bg-[#0d4a3b] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {uploading ? "Validating & Importing…" : "Upload & Import"}
            </button>
            {(file || response) && (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded border border-[#e5e1d8] text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50"
              >
                Reset
              </button>
            )}
          </div>

          {/* Results */}
          {response && (
            <div>
              {response.skippedSheets?.length > 0 && (
                <div className="mb-6 rounded-lg bg-[#FFF8E1] p-3 text-xs text-[#8A6D00]">
                  Skipped unrecognized sheet name(s):{" "}
                  {response.skippedSheets.join(", ")}
                </div>
              )}

              <div className="space-y-6">
                {Object.entries(response.results).map(([modelName, result]) => (
                  <ModelResultCard
                    key={modelName}
                    modelName={modelName}
                    result={result}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ModelResultCard({ modelName, result }) {
  const { totalRows, validCount, errorCount, errors, created } = result;

  if (totalRows === 0) return null;

  return (
    <div className="bg-white border border-[#e5e1d8] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-[#033327]">
          {modelName}
        </h3>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wide">
          <span className="text-gray-400">{totalRows} rows</span>
          <span className="flex items-center gap-1 text-emerald-700">
            {icons.check} {validCount} created
          </span>
          {errorCount > 0 && (
            <span className="flex items-center gap-1 text-red-600">
              {icons.alert} {errorCount} failed
            </span>
          )}
        </div>
      </div>

      {errorCount > 0 && (
        <table className="w-full text-xs mb-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase tracking-wide text-[9px]">
              <th className="py-1 pr-3">Row</th>
              <th className="py-1 pr-3">Item</th>
              <th className="py-1">Problems</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((e) => (
              <tr
                key={`${modelName}-${e.row}`}
                className="border-t border-[#f0ede6]"
              >
                <td className="py-2 pr-3 text-gray-500">{e.row}</td>
                <td className="py-2 pr-3 text-[#1a1a1a]">{e.identifier}</td>
                <td className="py-2 text-red-600">{e.messages.join("; ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {validCount > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
            View {validCount} created item{validCount !== 1 ? "s" : ""}
          </summary>
          <table className="w-full text-xs mt-3">
            <thead>
              <tr className="text-left text-gray-400 uppercase tracking-wide text-[9px]">
                <th className="py-1 pr-3">Row</th>
                <th className="py-1">Item</th>
              </tr>
            </thead>
            <tbody>
              {created.map((c) => (
                <tr key={c.id} className="border-t border-[#f0ede6]">
                  <td className="py-2 pr-3 text-gray-500">{c.row}</td>
                  <td className="py-2 text-[#1a1a1a]">{c.identifier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </div>
  );
}
