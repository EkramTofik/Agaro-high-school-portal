import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminFormModal from "../components/AdminFormModal";
import AdminConfirmModal from "../components/AdminConfirmModal";

const configs = {
  school: {
    title: "School",
    endpoint: "/school",
    fields: [
      ["name", "Name", true],
      ["shortName", "Short name"],
      ["motto", "Motto"],
      ["foundingYear", "Founding year", false, "number"],
      ["description", "Description", false, "textarea"],
      ["address", "Address"],
      ["city", "City"],
      ["region", "Region"],
      ["phone", "Phone"],
      ["email", "Email", false, "email"],
      ["website", "Website", false, "url"],
      ["logoUrl", "Logo URL", false, "url"],
      ["heroImageUrl", "Hero image URL", false, "url"],
    ],
  },
  department: {
    title: "Department",
    endpoint: "/department",
    fields: [
      ["name", "Name", true],
      ["description", "Description", false, "textarea"],
      ["headName", "Head name"],
    ],
  },
  academicYear: {
    title: "Academic Year",
    endpoint: "/academicYear",
    fields: [
      ["name", "Name", true],
      ["startYear", "Start year", true, "number"],
      ["endYear", "End year", true, "number"],
      ["isCurrent", "Current year", false, "checkbox"],
    ],
  },
  resource: {
    title: "Resource",
    endpoint: "/resource",
    fields: [
      ["title", "Title", true],
      ["category", "Category"],
      ["description", "Description", false, "textarea"],
      ["fileUrl", "File URL", true, "url"],
    ],
  },
  club: {
    title: "Club",
    endpoint: "/club",
    fields: [
      ["name", "Name", true],
      ["description", "Description", false, "textarea"],
      ["coordinatorName", "Coordinator"],
      ["imageUrl", "Image URL", false, "url"],
      ["category", "Category"],
      ["isFeatured", "Featured", false, "checkbox"],
    ],
  },
  mediaFile: {
    title: "Media File",
    endpoint: "/mediaFile",
    fields: [
      ["fileName", "File name", true],
      ["fileUrl", "File URL", true, "url"],
      ["mimeType", "MIME type"],
      ["sizeBytes", "Size (bytes)", false, "number", 0],
    ],
  },
  event: {
    title: "Event",
    endpoint: "/event",
    fields: [
      ["title", "Title", true],
      ["description", "Description", false, "textarea"],
      ["location", "Location"],
      ["eventDate", "Event date", true, "datetime-local"],
      ["imageUrl", "Image URL", false, "url"],
      ["isFeatured", "Featured", false, "checkbox"],
    ],
  },
  team: {
    title: "Team",
    endpoint: "/team",
    fields: [
      ["name", "Team name", true],
      ["category", "Category", true, "select"],
      ["achievement", "Achievement", true],
      ["imageUrl", "Image URL", false, "url"],
      ["isFeatured", "Featured", false, "checkbox"],
    ],
  },
  studentVoice: {
    title: "Student Voice",
    endpoint: "/studentVoice",
    fields: [
      ["fullName", "Full name", true],
      ["role", "Role", true],
      ["imageUrl", "Image URL", true, "url"],
      ["quote", "Quote", false, "textarea"],
      ["isFeatured", "Featured", false, "checkbox"],
    ],
  },
  honorRoll: {
    title: "Honor Roll",
    endpoint: "/honorRoll",
    fields: [
      ["rank", "Rank", true, "number"],
      ["studentName", "Student name", true],
      ["yearSpan", "Year span", true],
      ["accomplishment", "Accomplishment", true, "textarea"],
    ],
  },
  users: {
    title: "Users",
    endpoint: "/users",
    readOnly: true,
    fields: [
      ["fullName", "Full name", true],
      ["email", "Email", true, "email"],
      ["role", "Role", true],
    ],
  },
};

export default function AdminCollectionPage({ collection }) {
  const config = configs[collection];
  const [items, setItems] = useState([]);
  const [formItem, setFormItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const load = () =>
    api
      .get(config.endpoint)
      .then((res) => {
        const payload = res.data?.data?.data ?? res.data?.data ?? [];
        setItems(
          (Array.isArray(payload) ? payload : [payload]).filter(Boolean),
        );
      })
      .catch((e) =>
        setError(
          e.response?.data?.message ||
            `Could not load ${config.title.toLowerCase()} records.`,
        ),
      );
  useEffect(() => {
    load();
  }, [collection]);
  const fields = config.fields.map(([name, label, required, type]) => ({
    name,
    label,
    required,
    type,
    min,
    max,
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(collection === "team" && name === "category"
      ? { options: ["Football", "Athletics", "Volleyball"] }
      : {}),
  }));
  const save = async (values) => {
    setSaving(true);
    try {
      await (formItem?._id
        ? api.patch(`${config.endpoint}/${formItem._id}`, values)
        : api.post(config.endpoint, values));
      setFormItem(null);
      await load();
    } catch (e) {
      setError(
        e.response?.data?.message ||
          `Could not save ${config.title.toLowerCase()}.`,
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF8F5] p-8 text-[#1a1a1a]">
      <h1 className="font-serif text-3xl font-bold text-[#033327]">
        {config.title} Management
      </h1>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {!config.readOnly && (
        <button
          onClick={() => setFormItem({})}
          className="mt-6 rounded-lg bg-[#033327] px-4 py-2 text-sm font-bold text-white"
        >
          + Add {config.title}
        </button>
      )}
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-xl border border-[#e5e1d8] bg-white p-4"
          >
            <div>
              <p className="font-bold text-[#033327]">
                {item.name || item.title || item.fullName || item.fileName}
              </p>
              <p className="text-xs text-gray-500">
                {item.email ||
                  item.description ||
                  item.category ||
                  item.role ||
                  "—"}
              </p>
            </div>
            {!config.readOnly && (
              <div className="flex gap-2">
                <button
                  onClick={() => setFormItem(item)}
                  className="text-xs font-bold text-[#033327]"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(item)}
                  className="text-xs font-bold text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {formItem && (
        <AdminFormModal
          title={`${formItem._id ? "Edit" : "Add"} ${config.title}`}
          initialValues={formItem}
          fields={fields}
          onSubmit={save}
          onClose={() => setFormItem(null)}
          submitting={saving}
        />
      )}
      {confirmDelete && (
        <AdminConfirmModal
          message={`Delete ${confirmDelete.name || confirmDelete.title || confirmDelete.fileName || "this record"}?`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={async () => {
            try {
              await api.delete(`${config.endpoint}/${confirmDelete._id}`);
              await load();
            } catch (e) {
              setError(e.response?.data?.message || "Could not delete record.");
            } finally {
              setConfirmDelete(null);
            }
          }}
        />
      )}
    </div>
  );
}
