import { useState, useMemo } from "react";
import { Search, Award, MapPin, Briefcase } from "lucide-react";

const ALUMNI_DATA = [
  {
    name: "Dr. Elena Vance",
    field: "Quantum Physics",
    year: 2001,
    location: "Geneva, Switzerland",
    role: "Lead Researcher at CERN",
    desc: "Renowned for her groundbreaking research in non-linear dynamics and quantum computational modeling. Dr. Vance regularly returns to mentor our senior physics students.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Hon. Julian Sterling",
    field: "Public Affairs",
    year: 1998,
    location: "Addis Ababa, Ethiopia",
    role: "Former Minister of Education",
    desc: "Served as the Minister of Education for three consecutive terms, revolutionizing rural school access and establishing the national technology curriculum.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Maestro Sarah Chen",
    field: "Fine Arts",
    year: 2010,
    location: "New York, USA",
    role: "Philharmonic Director",
    desc: "First alumna to lead the Metropolitan Philharmonic. Known for her innovative fusion compositions that bridge classical European and East African traditions.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Ato Samuel Tadesse",
    field: "Technology & Business",
    year: 2005,
    location: "Nairobi, Kenya",
    role: "Founder & CEO, TechHub Africa",
    desc: "Pioneered one of East Africa's largest tech incubators, helping launch over 200 successful startups in the region.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Dr. Liya Kebede",
    field: "Medicine",
    year: 1995,
    location: "London, UK",
    role: "Chief of Surgery, Global Health",
    desc: "Leading expert in pediatric cardiology and founder of the Pan-African Health Initiative, providing free surgical care to thousands.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Mr. David Okoro",
    field: "Environmental Science",
    year: 2014,
    location: "Addis Ababa, Ethiopia",
    role: "Director, Green Earth Alliance",
    desc: "Leading national conservation efforts and instrumental in the recent passing of the comprehensive Climate Resilience Act.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
];

const FIELDS = [
  "All",
  "Science & Medicine",
  "Public Affairs",
  "Technology & Business",
  "Fine Arts",
];

export default function AlumniPage() {
  const [activeField, setActiveField] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("year-desc");

  const filteredAlumni = useMemo(() => {
    let result = ALUMNI_DATA.filter((alumnus) => {
      const matchesSearch =
        alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.role.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesField = activeField === "All";
      if (activeField === "Science & Medicine") {
        matchesField =
          alumnus.field === "Quantum Physics" ||
          alumnus.field === "Medicine" ||
          alumnus.field === "Environmental Science";
      } else if (activeField === "Public Affairs") {
        matchesField = alumnus.field === "Public Affairs";
      } else if (activeField === "Technology & Business") {
        matchesField = alumnus.field === "Technology & Business";
      } else if (activeField === "Fine Arts") {
        matchesField = alumnus.field === "Fine Arts";
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
  }, [searchQuery, activeField, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="bg-[#0e0e0e] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920"
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

      {/* ── CONTROLS ─────────────────────────────────────────────────────── */}
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

      {/* ── ALUMNI GRID ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#e5e1d8] shadow-sm">
            <p className="text-4xl mb-4">🎓</p>

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

      {/* ── CALL TO ACTION ───────────────────────────────────────────────── */}
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
          <button className="px-8 py-4 bg-[#FFDEA4] text-[#033327] rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-black/20">
            Join the Alumni Network
          </button>
        </div>
      </section>
    </div>
  );
}
