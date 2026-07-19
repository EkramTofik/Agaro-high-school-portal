import { Quote, ArrowRight } from "lucide-react";

export default function StaffPage() {
  return (
    // Root container – prevents horizontal scroll on all devices
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] flex flex-col md:flex-row overflow-x-hidden">
      {/* ── SIDEBAR NAVIGATION ───────────────────────────── */}
      <aside className="w-full md:w-[220px] lg:w-[260px] md:min-h-screen bg-white/80 backdrop-blur-sm border-b md:border-b-0 md:border-r border-[#e5e1d8] sticky top-0 z-50 md:static flex-shrink-0 px-4 py-3 md:px-6 md:py-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3 md:gap-8 overflow-x-auto md:overflow-x-visible">
        <div className="flex items-center gap-3 md:gap-0 md:flex-col md:items-start shrink-0">
          <span className="text-xl font-serif font-bold text-[#033327] tracking-tight whitespace-nowrap">
            Agaro<span className="text-[#FFDEA4]">.</span>
          </span>
          <span className="hidden md:block text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold mt-0.5">
            High School
          </span>
        </div>

        <nav className="flex md:flex-col gap-3 md:gap-4 text-[10px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap">
          <a href="#" className="nav-link">
            Institute
          </a>
          <a href="#" className="nav-link active">
            Staff
          </a>
          <a href="#" className="nav-link">
            Academics
          </a>
          <a href="#" className="nav-link">
            Archives
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-2 text-[9px] text-gray-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFDEA4]"></span>
          <span>menu</span>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {" "}
        {/* min-w-0 prevents flex overflow */}
        {/* HEAD OF THE INSTITUTE */}
        <section className="px-4 sm:px-8 py-12 sm:py-16 lg:px-20 lg:py-28 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Image with Gold Offset Ring – added overflow-hidden to clip the ring */}
            <div className="relative shrink-0 overflow-hidden rounded-full w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px]">
              <div className="w-full h-full rounded-full overflow-hidden border-[6px] sm:border-[8px] border-white shadow-lg relative z-10 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                  alt="Dr. Abebe Bikila"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-full h-full rounded-full border-[3px] sm:border-[4px] border-[#FFDEA4] z-0 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em] mb-3">
                Head of the Institute
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#033327] leading-tight">
                Dr. Abebe Bikila
              </h1>
              <p className="text-sm sm:text-base text-[#033327]/80 italic font-serif mt-1 mb-6 font-medium">
                PhD in Educational Leadership, Oxford University
              </p>

              {/* Stats – now wraps and adjusts gaps on mobile */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 md:gap-10 mb-8 pb-8 border-b border-[#e5e1d8]">
                <div>
                  <p className="font-serif text-4xl sm:text-5xl font-bold text-[#033327] leading-tight">
                    15
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Years at Agaro
                  </p>
                </div>
                {/* Divider – hidden on small screens */}
                <div className="hidden sm:block w-px bg-[#FFDEA4]"></div>
                <div>
                  <p className="font-serif text-4xl sm:text-5xl font-bold text-[#033327] leading-tight">
                    32
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Published Papers
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="relative max-w-2xl mx-auto lg:mx-0">
                <Quote size={28} className="text-[#FFDEA4] mb-3 fill-current" />
                <p className="font-serif text-sm sm:text-base text-[#033327] leading-relaxed italic font-medium">
                  "At Agaro High School, we don't just teach history; we live
                  it. Our mission is to curate the intellectual growth of every
                  student, ensuring they carry the torch of our heritage into
                  the innovations of tomorrow."
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 mt-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <a
                    href="#"
                    className="text-[#033327] hover:text-[#0d4a3b] transition-colors border-b border-[#033327] pb-0.5"
                  >
                    Official Biography (Archived, 2021)
                  </a>
                  <a
                    href="#"
                    className="text-[#FFDEA4] hover:text-[#e0be84] transition-colors flex items-center gap-1.5"
                  >
                    Read Full Address <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* EXECUTIVE STEWARDS */}
        <section className="bg-[#033327] text-white px-4 sm:px-8 py-16 sm:py-20 lg:px-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left">
              Executive{" "}
              <span className="text-[#FFDEA4] italic font-medium">
                Stewards
              </span>
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-12 sm:mb-16 text-center sm:text-left mx-auto sm:mx-0">
              The executive and academic team of Agaro High School, overseeing
              the rigorous journey of our scholars.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {/* Profile 1 */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start text-center sm:text-left">
                <div className="w-28 h-40 sm:w-32 sm:h-44 shrink-0 rounded-2xl overflow-hidden bg-white/10 shadow-lg border border-white/5 mx-auto sm:mx-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                    alt="Ms. Selamawit Tadesse"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-1">
                    Vice Principal
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-4 leading-tight">
                    Ms. Selamawit Tadesse
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Curriculum Innovations",
                      "Teacher Development",
                      "Administrative Operations",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-center sm:justify-start gap-3 text-xs text-white/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full border border-[#FFDEA4] shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Profile 2 */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start text-center sm:text-left">
                <div className="w-28 h-40 sm:w-32 sm:h-44 shrink-0 rounded-2xl overflow-hidden bg-white/10 shadow-lg border border-white/5 mx-auto sm:mx-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                    alt="Mr. Dawit Lemma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-1">
                    Vice Principal
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-4 leading-tight">
                    Mr. Dawit Lemma
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Student Disciplinary Affairs",
                      "Extracurricular Programs",
                      "Alumni Relations Networks",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-center sm:justify-start gap-3 text-xs text-white/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full border border-[#FFDEA4] shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
        </section>
        {/* DEPARTMENT HEADS */}
        <section className="px-4 sm:px-8 py-16 sm:py-20 lg:px-16 lg:py-24 max-w-6xl mx-auto text-center">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-3">
            Academic Core
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#033327] mb-12 sm:mb-16">
            Department Heads
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                dept: "Science",
                name: "Dr. Hirut Zewdu",
                img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300",
                desc: "Pioneering new methods in lab protocols and practical research for advanced students.",
              },
              {
                dept: "Mathematics",
                name: "Prof. Yonas Bekele",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
                desc: "Leading advanced calculus curricula and coordinating regional math olympiads.",
              },
              {
                dept: "Languages",
                name: "Ms. Bethlehem Tadesse",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
                desc: "Championing multilingual development and diverse literature integration.",
              },
              {
                dept: "Humanities",
                name: "Mr. Samuel Tulu",
                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
                desc: "Expert in historical archives, overseeing modern civic studies and global history.",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="group rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-6 py-8 sm:py-10 flex flex-col items-center border bg-white border-[#e5e1d8] text-[#033327] shadow-sm hover:bg-[#033327] hover:border-[#033327] hover:text-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 sm:mb-6 shadow-md border-4 border-white/20 bg-gray-100">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-[#FFDEA4]">
                  {d.dept}
                </p>
                <h3 className="font-serif text-lg font-bold mb-4">{d.name}</h3>
                <p className="text-xs text-center leading-relaxed text-gray-500 group-hover:text-white/80 transition-colors duration-300 max-w-[200px]">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* INSTITUTIONAL SECRETARIAT */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="bg-[#EFE8DC]/70 backdrop-blur-sm rounded-3xl border border-[#E5E1D8] p-5 sm:p-8 md:p-10 lg:p-14">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl text-center lg:text-left">
                <p className="uppercase tracking-[0.3em] text-[#B5985B] font-semibold text-[10px] sm:text-xs mb-3">
                  Facility Log
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#033327] leading-tight">
                  Institutional Secretariat
                </h2>

                <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                  The operational backbone of the Living Archive, providing
                  essential administrative services and preserving the
                  institution's academic records.
                </p>
              </div>

              <div className="self-center lg:self-auto">
                <div className="inline-flex items-center rounded-full border border-[#E5E1D8] bg-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm">
                  <span className="uppercase tracking-wider text-[9px] sm:text-[10px] font-semibold text-gray-500">
                    Records
                  </span>

                  <span className="mx-2 text-gray-300">|</span>

                  <span className="font-semibold text-[#B5985B] text-xs sm:text-sm">
                    1974 – 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Staff Cards */}
            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  role: "Registrar",
                  name: "Mrs. Aster Mekuria",
                  desc: "Admissions, transcripts, academic records, and student documentation.",
                  room: "104",
                },
                {
                  role: "Financial Secretary",
                  name: "Mr. Girma Tekle",
                  desc: "Tuition management, scholarships, budgeting, and financial planning.",
                  room: "20A",
                },
                {
                  role: "Director of Archives",
                  name: "Ms. Hiwot Hailu",
                  desc: "Historical preservation, institutional archives, and heritage documentation.",
                  room: "30B",
                },
              ].map((staff, index) => (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#E5E1D8] bg-white p-4 sm:p-6 transition-all duration-300 hover:border-[#B5985B] hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#033327] text-base sm:text-lg font-serif font-bold text-[#FFDEA4] shrink-0 self-center sm:self-auto">
                    {staff.name.charAt(0)}
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-[#033327]">
                      {staff.role}
                    </h3>
                    <p className="text-sm font-medium text-[#B5985B] mt-0.5">
                      {staff.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {staff.desc}
                    </p>
                  </div>

                  <div className="self-center sm:self-center rounded-xl border border-[#E5E1D8] bg-[#FAF8F5] px-4 sm:px-5 py-2.5 sm:py-3 text-center min-w-[80px] sm:min-w-[110px] w-full sm:w-auto">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      Office
                    </p>
                    <p className="mt-0.5 text-base sm:text-lg font-serif font-bold text-[#033327]">
                      {staff.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
