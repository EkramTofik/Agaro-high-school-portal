import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const quickActions = [
  { label: "Manage Faculty", route: "/admin/faculty" },
  { label: "Post Announcement", route: "/admin/news" },
  { label: "Academic Records", route: "/admin/academic-records" },
  { label: "Manage Alumni", route: "/admin/alumni" },
  { label: "Student Life", route: "/admin/student-life" },
  { label: "Gallery", route: "/admin/gallery" },
  { label: "Messages", route: "/admin/messages" },
  { label: "User Management", route: "/admin/users" },
  { label: "School Settings", route: "/admin/school" },
  { label: "Departments", route: "/admin/departments" },
  { label: "Resources", route: "/admin/resources" },
  { label: "Teams", route: "/admin/teams" },
  { label: "Bulk Import", route: "/admin/bulk-import" },
  { label: "Academic Performance", route: "/admin/academic-performance" },
  { label: "My Profile", route: "/admin/profile" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    faculty: 0,
    news: 0,
    records: 0,
    alumni: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/staff"),
      api.get("/news"),
      api.get("/academicRecord"),
      api.get("/alumni"),
      api.get("/contact"),
    ])
      .then((responses) => {
        const count = (res) =>
          res.data?.results ??
          (Array.isArray(res.data?.data?.data) ? res.data.data.data.length : 0);
        setCounts({
          faculty: count(responses[0]),
          news: count(responses[1]),
          records: count(responses[2]),
          alumni: count(responses[3]),
          messages: count(responses[4]),
        });
      })
      .catch(() => setError("Could not load dashboard metrics."))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Faculty Members",
      value: counts.faculty,
      route: "/admin/faculty",
    },
    { label: "News Updates", value: counts.news, route: "/admin/news" },
    {
      label: "Academic Records",
      value: counts.records,
      route: "/admin/academic-records",
    },
    { label: "Alumni Profiles", value: counts.alumni, route: "/admin/alumni" },
    {
      label: "Inbox Messages",
      value: counts.messages,
      route: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-5 px-4 py-5 sm:space-y-7 sm:px-6 sm:py-7 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#033327] px-5 py-6 sm:px-8 sm:py-8">
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFDEA4]/60">
          The Living Archive
        </p>
        <h2 className="mb-3 font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl">
          Welcome, {user?.fullName || "Administrator"}.
        </h2>
        <p className="max-w-xl text-[12px] leading-relaxed text-white/55">
          Manage faculty, news, academic records, alumni, and school content
          from one organized console. Use the sidebar to open any admin page.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {(loading ? [] : stats).map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => navigate(stat.route)}
            className="rounded-xl border border-[#e5e1d8] bg-white p-4 text-left transition hover:border-[#033327]/30 hover:shadow-sm sm:p-5"
          >
            <p className="font-serif text-2xl font-bold text-[#033327]">
              {stat.value}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
              {stat.label}
            </p>
          </button>
        ))}
        {loading && (
          <p className="col-span-full text-sm text-gray-500">
            Loading metrics…
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-4 font-serif text-lg font-bold text-[#1a1a1a]">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickActions.map(({ label, route }) => (
            <button
              key={label}
              type="button"
              onClick={() => navigate(route)}
              className="rounded-xl border border-[#e5e1d8] bg-white p-4 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600 transition hover:border-[#033327]/30 hover:text-[#033327] sm:p-5"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
