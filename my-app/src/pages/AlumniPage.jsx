import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Award, MapPin, Briefcase } from "lucide-react";
import api from "../api/axios";

const FIELDS = [
  "All",
  "Science & Medicine",
  "Public Affairs",
  "Technology & Business",
  "Fine Arts",
];

export default function AlumniPage() {
  const navigate = useNavigate();
  const [alumniData, setAlumniData] = useState([]);
  const [activeField, setActiveField] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("year-desc");

  useEffect(() => {
    api
      .get("/alumni")
      .then((res) => {
        const payload =
          res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        const items = Array.isArray(payload) ? payload : [payload];

        // Map backend fields â†’ original design shape
        setAlumniData(
          items.map((item) => ({
            name: item.fullName,
            field: item.profession || "General",
            year: item.graduationYear,
            location: item.location || "",
            role: item.company
              ? `${item.profession} at ${item.company}`
              : item.profession || "",
            desc: item.bio || "",
            img: item.imageUrl,
          })),
        );
      })
      .catch(() => setAlumniData([]));
  }, []);

  const filteredAlumni = useMemo(() => {
    let result = alumniData.filter((alumnus) => {
      const matchesSearch =
        alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.role.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesField = activeField === "All";
      if (activeField === "Science & Medicine") {
        matchesField =
          /physics|medicine|medical|science|health|biology|chemistry|environmental/i.test(
            alumnus.field,
          );
      } else if (activeField === "Public Affairs") {
        matchesField =
          /public|affairs|politics|government|policy|education|minister/i.test(
            alumnus.field,
          );
      } else if (activeField === "Technology & Business") {
        matchesField =
          /tech|software|engineer|business|founder|ceo|it|developer|startup/i.test(
            alumnus.field,
          );
      } else if (activeField === "Fine Arts") {
        matchesField =
          /art|music|fine|design|creative|philharmonic|maestro/i.test(
            alumnus.field,
          );
      }

      return matchesSearch && matchesField;
    });

    result.sort((a, b) => {
      if (sortBy === "year-desc") return b.year - a.year;
      if (sortBy === "year-asc") return a.year - b.year;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [alumniData, searchQuery, activeField, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* â”€â”€ HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-[#0e0e0e] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={undefined}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.25em] mb-4">
            Honorary Records
          </p>
          <h1 className="font-serif text-5xl md:text-[4rem] font-bold text-white mb-6 tracking-tight">
            Alumni Network
          </h1>
          <p className="text-sm text-white/70 italic max-w-2xl mx-auto font-serif leading-relaxed">
            Celebrating the legacy of our graduates who continue to shape the
            world across various disciplines.
          </p>
        </div>
      </div>

      {/* â”€â”€ CONTROLS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e1d8] flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
            {FIELDS.map((field) => (
              <button
                key={field}
                onClick={() => setActiveField(field)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeField === field
                    ? "bg-[#033327] text-white shadow-md"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-[#e5e1d8] border border-[#e5e1d8]"
                }`}
              >
                {field}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#033327] transition-colors"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alumni..."
                className="w-full bg-[#FAF8F5] border border-[#e5e1d8] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#b5985b] focus:ring-1 focus:ring-[#b5985b] transition-all"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#e5e1d8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#b5985b] focus:ring-1 focus:ring-[#b5985b] transition-all text-gray-600 font-medium cursor-pointer"
            >
              <option value="year-desc">Newest First</option>
              <option value="year-asc">Oldest First</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* â”€â”€ ALUMNI GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#e5e1d8] shadow-sm">
            <p className="text-4xl mb-4">ðŸŽ“</p>

            <h3 className="font-serif text-2xl font-bold text-[#033327] mb-2">
              No alumni found
            </h3>

            <p className="text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredAlumni.map((alumnus, idx) => (
              <div
                key={idx}
                className="
          bg-white
          rounded-[2rem]
          overflow-hidden
          border border-[#e5e1d8]
          shadow-sm
          hover:shadow-2xl
          hover:-translate-y-2
          hover:border-[#b5985b]
          transition-all
          duration-500
          group
          flex
          flex-col
          "
              >
                {/* IMAGE AREA */}
                <div
                  className="
            relative
            h-[360px]
            overflow-hidden
            bg-[#f4f1ea]
          "
                >
                  <img
                    src={alumnus.img}
                    alt={alumnus.name}
                    className="
              w-full
              h-full
              object-cover
              object-top
              grayscale-[15%]
              group-hover:grayscale-0
              group-hover:scale-110
              transition-all
              duration-700
              "
                  />

                  {/* Soft image overlay */}
                  <div
                    className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
            "
                  ></div>

                  {/* Graduation Badge */}
                  <div
                    className="
              absolute
              top-5
              left-5
              px-4
              py-2
              rounded-full
              bg-[#033327]/90
              backdrop-blur-md
              text-white
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              shadow-lg
              "
                  >
                    Class of {alumnus.year}
                  </div>

                  {/* Field Badge */}
                  <div
                    className="
              absolute
              bottom-5
              left-5
              "
                  >
                    <span
                      className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-white/90
                backdrop-blur-md
                text-[#033327]
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                shadow-md
                "
                    >
                      {alumnus.field}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="
            p-7
            flex
            flex-col
            flex-1
          "
                >
                  <div
                    className="
              flex
              items-start
              justify-between
              gap-3
            "
                  >
                    <h3
                      className="
                font-serif
                text-2xl
                font-bold
                text-[#033327]
                leading-tight
                "
                    >
                      {alumnus.name}
                    </h3>

                    <Award size={22} className="text-[#b5985b] flex-shrink-0" />
                  </div>

                  <p
                    className="
              mt-3
              text-[11px]
              font-bold
              text-[#b5985b]
              uppercase
              tracking-[0.18em]
              "
                  >
                    {alumnus.role}
                  </p>

                  <p
                    className="
              mt-5
              text-sm
              text-gray-600
              leading-relaxed
              line-clamp-4
              "
                  >
                    {alumnus.desc}
                  </p>

                  {/* DETAILS */}
                  <div
                    className="
              mt-7
              pt-5
              border-t
              border-[#e5e1d8]
              space-y-3
              "
                  >
                    <div
                      className="
                flex
                items-center
                gap-3
                text-xs
                text-gray-500
                font-medium
                "
                    >
                      <Briefcase size={15} className="text-[#b5985b]" />

                      {alumnus.role}
                    </div>

                    <div
                      className="
                flex
                items-center
                gap-3
                text-xs
                text-gray-500
                font-medium
                "
                    >
                      <MapPin size={15} className="text-[#b5985b]" />

                      {alumnus.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* â”€â”€ CALL TO ACTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-[#1b4335] py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b5985b] rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b5985b] rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Are you a former student?
          </h2>
          <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
            We are always looking to reconnect with our alumni. Update your
            contact information to stay informed.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 bg-[#FFDEA4] text-[#033327] rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-black/20 cursor-pointer"
          >
            Join the Alumni Network
          </button>
        </div>
      </section>
    </div>
  );
}
