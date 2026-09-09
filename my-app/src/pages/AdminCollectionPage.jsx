import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import AdminFormModal from "../components/AdminFormModal";
import AdminConfirmModal from "../components/AdminConfirmModal";
import AdminFilters, {
  matchesFilter,
  matchesSearch,
} from "../components/AdminFilters";
import { useAuth } from "../context/useAuth";

const BOOL_OPTIONS = [
  { value: "", label: "All" },
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const ACTIVE_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const configs = {
  school: {
    title: "School",
    endpoint: "/school",
    searchKeys: ["name", "shortName", "city", "region", "email"],
    filterDefs: [{ key: "city", label: "City", allLabel: "All cities" }],
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
    searchKeys: ["name", "description", "headName"],
    filterDefs: [{ key: "headName", label: "Head", allLabel: "All heads" }],
    fields: [
      ["name", "Name", true],
      ["description", "Description", false, "textarea"],
      ["headName", "Head name"],
    ],
  },
  academicYear: {
    title: "Academic Year",
    endpoint: "/academicYear",
    searchKeys: ["name"],
    filterDefs: [
      {
        key: "isCurrent",
        label: "Current year",
        options: [
          { value: "", label: "All years" },
          { value: "true", label: "Current only" },
          { value: "false", label: "Past / future" },
        ],
      },
    ],
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
    searchKeys: ["title", "category", "description"],
    filterDefs: [{ key: "category", label: "Category", allLabel: "All categories" }],
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
    searchKeys: ["name", "category", "coordinatorName", "description"],
    filterDefs: [
      { key: "category", label: "Category", allLabel: "All categories" },
      { key: "isFeatured", label: "Featured", options: BOOL_OPTIONS },
    ],
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
    searchKeys: ["fileName", "mimeType", "fileUrl"],
    filterDefs: [{ key: "mimeType", label: "MIME type", allLabel: "All types" }],
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
    searchKeys: ["title", "location", "description"],
    filterDefs: [
      { key: "isFeatured", label: "Featured", options: BOOL_OPTIONS },
    ],
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
    searchKeys: ["name", "achievement", "category"],
    filterDefs: [
      {
        key: "category",
        label: "Category",
        options: [
          { value: "", label: "All categories" },
          "Football",
          "Athletics",
          "Volleyball",
        ],
      },
      { key: "isFeatured", label: "Featured", options: BOOL_OPTIONS },
    ],
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
    searchKeys: ["fullName", "role", "quote"],
    filterDefs: [
      { key: "role", label: "Role", allLabel: "All roles" },
      { key: "isFeatured", label: "Featured", options: BOOL_OPTIONS },
    ],
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
    searchKeys: ["studentName", "yearSpan", "accomplishment"],
    filterDefs: [{ key: "yearSpan", label: "Year span", allLabel: "All years" }],
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
    searchKeys: ["fullName", "email", "role"],
    filterDefs: [
      {
        key: "role",
        label: "Role",
        options: [
          { value: "", label: "All roles" },
          { value: "admin", label: "Admin" },
        ],
      },
      { key: "isActive", label: "Status", options: ACTIVE_OPTIONS },
    ],
  },
};

function uniqueOptions(items, key, allLabel = "All") {
  const values = [
    ...new Set(
      items
        .map((item) => {
          const raw = item?.[key];
          if (raw && typeof raw === "object") return raw.name || String(raw._id || "");
          return raw === undefined || raw === null || raw === "" ? null : String(raw);
        })
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));
  return [{ value: "", label: allLabel }, ...values];
}

export default function AdminCollectionPage({ collection }) {
  const config = configs[collection];
  const { user: currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [formItem, setFormItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});

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
    setError("");
    setSearch("");
    setFilterValues({});
    load();
  }, [collection]);

  const isEditing = Boolean(formItem?._id);

  const fields = useMemo(() => {
    if (collection === "users") {
      return [
        { name: "fullName", label: "Full name", required: true },
        { name: "email", label: "Email", required: true, type: "email" },
        {
          name: "role",
          label: "Role",
          required: true,
          type: "select",
          options: ["admin"],
          defaultValue: "admin",
        },
        {
          name: "password",
          label: isEditing ? "New password (optional)" : "Password",
          required: !isEditing,
          type: "password",
          minLength: 8,
          omitEmpty: true,
        },
        {
          name: "passwordConfirm",
          label: isEditing ? "Confirm new password" : "Confirm password",
          required: !isEditing,
          type: "password",
          matchField: "password",
          omitEmpty: true,
        },
        {
          name: "isActive",
          label: "Active",
          type: "checkbox",
          defaultValue: true,
        },
      ];
    }

    return (config.fields || []).map(
      ([name, label, required, type, defaultValue]) => ({
        name,
        label,
        required,
        type,
        ...(defaultValue !== undefined ? { defaultValue } : {}),
        ...(type === "number" &&
        ["foundingYear", "startYear", "endYear", "rank", "sizeBytes"].includes(name)
          ? { integer: true, min: name === "rank" ? 1 : 0 }
          : {}),
        ...(collection === "team" && name === "category"
          ? { options: ["Football", "Athletics", "Volleyball"] }
          : {}),
        ...(type === "url" ||
        ["imageUrl", "fileUrl", "logoUrl", "heroImageUrl", "website"].includes(name)
          ? { type: type || "url" }
          : {}),
      }),
    );
  }, [collection, config.fields, isEditing]);

  const filterControls = useMemo(
    () =>
      (config.filterDefs || []).map((def) => ({
        key: def.key,
        label: def.label,
        value: filterValues[def.key] ?? "",
        onChange: (value) =>
          setFilterValues((current) => ({ ...current, [def.key]: value })),
        options:
          def.options ||
          uniqueOptions(items, def.key, def.allLabel || `All ${def.label.toLowerCase()}s`),
      })),
    [config.filterDefs, filterValues, items],
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (!matchesSearch(item, search, config.searchKeys || [])) return false;
        return (config.filterDefs || []).every((def) =>
          matchesFilter(item, def.key, filterValues[def.key] ?? ""),
        );
      }),
    [items, search, filterValues, config.searchKeys, config.filterDefs],
  );

  const save = async (values) => {
    setSaving(true);
    setFormError("");
    setError("");
    try {
      const payload = { ...values };

      if (collection === "users" && !payload.password) {
        delete payload.password;
        delete payload.passwordConfirm;
      }

      await (formItem?._id
        ? api.patch(`${config.endpoint}/${formItem._id}`, payload)
        : api.post(config.endpoint, payload));
      setFormItem(null);
      await load();
    } catch (e) {
      const message =
        e.response?.data?.message ||
        `Could not save ${config.title.toLowerCase()}.`;
      setFormError(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 text-[#1a1a1a]">
      <h1 className="font-serif text-3xl font-bold text-[#033327]">
        {config.title} Management
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {collection === "users"
          ? "Add, edit, or remove administrator accounts."
          : `Manage ${config.title.toLowerCase()} records.`}
      </p>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          setFormError("");
          setFormItem(
            collection === "users" ? { role: "admin", isActive: true } : {},
          );
        }}
        className="mt-6 rounded-lg bg-[#033327] px-4 py-2 text-sm font-bold text-white"
      >
        + Add {config.title === "Users" ? "User" : config.title}
      </button>

      <AdminFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={`Search ${config.title.toLowerCase()}…`}
        filters={filterControls}
        resultCount={filteredItems.length}
        totalCount={items.length}
      />

      <div className="mt-6 grid gap-3">
        {filteredItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            No {config.title.toLowerCase()} records match your filters.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border border-[#e5e1d8] bg-white p-4"
            >
              <div>
                <p className="font-bold text-[#033327]">
                  {item.name ||
                    item.title ||
                    item.fullName ||
                    item.fileName ||
                    item.studentName}
                </p>
                <p className="text-xs text-gray-500">
                  {item.email ||
                    item.description ||
                    item.category ||
                    item.role ||
                    item.accomplishment ||
                    "—"}
                  {collection === "users" && item.isActive === false
                    ? " · Inactive"
                    : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormError("");
                    setFormItem(item);
                  }}
                  className="text-xs font-bold text-[#033327]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(item)}
                  disabled={
                    collection === "users" &&
                    currentUser?._id &&
                    String(item._id) === String(currentUser._id)
                  }
                  className="text-xs font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                  title={
                    collection === "users" &&
                    currentUser?._id &&
                    String(item._id) === String(currentUser._id)
                      ? "You cannot delete your own account"
                      : "Delete"
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {formItem && (
        <AdminFormModal
          title={`${formItem._id ? "Edit" : "Add"} ${config.title === "Users" ? "User" : config.title}`}
          initialValues={formItem}
          fields={fields}
          onSubmit={save}
          onClose={() => {
            setFormItem(null);
            setFormError("");
          }}
          submitting={saving}
          error={formError}
        />
      )}
      {confirmDelete && (
        <AdminConfirmModal
          message={`Delete ${
            confirmDelete.name ||
            confirmDelete.title ||
            confirmDelete.fullName ||
            confirmDelete.fileName ||
            confirmDelete.studentName ||
            "this record"
          }?`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={async () => {
            try {
              await api.delete(`${config.endpoint}/${confirmDelete._id}`);
              await load();
            } catch (e) {
              setError(
                e.response?.data?.message || "Could not delete record.",
              );
            } finally {
              setConfirmDelete(null);
            }
          }}
        />
      )}
    </div>
  );
}
