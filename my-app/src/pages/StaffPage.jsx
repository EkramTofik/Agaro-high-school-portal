import { Quote, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StaffPage() {
  const [leader, setLeader] = useState(null);
  const [executiveStewards, setExecutiveStewards] = useState([]);
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [secretariatStaff, setSecretariatStaff] = useState([]);
  useEffect(() => {
    Promise.all([
      api.get("/staff", { params: { isPresident: true, isActive: true } }),
      api.get("/staff", { params: { isLeadership: true } }),
      api.get("/department"),
      api.get("/staff", { params: { isAdministrative: true, isActive: true } }),
    ])
      .then(([leaderRes, leadershipRes, departmentRes, secretariatRes]) => {
        const getMembers = (res) => {
          const payload = res.data?.data?.data || res.data?.data || res.data || [];
          return Array.isArray(payload) ? payload : [payload];
        };
        const leaders = getMembers(leadershipRes);
        const members = getMembers(leaderRes);
        const departments = getMembers(departmentRes);
        const departmentById = new Map(departments.map((department) => [department._id, department]));
        const heads = leaders
          .filter((staff) => staff.department)
          .map((staff) => ({
            ...staff,
            departmentName: typeof staff.department === "object"
              ? staff.department.name
              : departmentById.get(staff.department)?.name,
          }))
          .filter((staff) => staff.departmentName);
        setLeader(members.find((member) => member.isPresident) || members[0] || null);
        setExecutiveStewards(
          leaders
            .filter((staff) => staff.isPresident || staff.isVicePresident)
            .sort((a, b) => Number(b.isPresident) - Number(a.isPresident))
            .slice(0, 2),
        );
        setDepartmentHeads(heads.slice(0, 4));
        setSecretariatStaff(getMembers(secretariatRes).slice(0, 6));
      })
      .catch(() => {
        setLeader(null);
        setExecutiveStewards([]);
        setDepartmentHeads([]);
        setSecretariatStaff([]);
      });
  }, []);

  return (
    // Root container – prevents horizontal scroll on all devices
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] flex flex-col md:flex-row overflow-x-hidden">
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
                {leader?.imageUrl ? (
                  <img
                    src={leader.imageUrl}
                    alt={leader.fullName || "Head of the Institute"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-full h-full rounded-full border-[3px] sm:border-[4px] border-[#FFDEA4] z-0 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em] mb-3">
                President
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#033327] leading-tight">
                {leader?.fullName || leader?.name || "Leadership profile unavailable"}
              </h1>
              <p className="text-sm sm:text-base text-[#033327]/80 italic font-serif mt-1 mb-6 font-medium">
                {leader?.leadershipCredentials || leader?.qualifications || "Leadership credentials unavailable"}
              </p>

              {/* Stats – now wraps and adjusts gaps on mobile */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 md:gap-10 mb-8 pb-8 border-b border-[#e5e1d8]">
                <div>
                  <p className="font-serif text-4xl sm:text-5xl font-bold text-[#033327] leading-tight">
                    {leader?.yearsAtSchool ?? "—"}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Years at Agaro
                  </p>
                </div>
                {/* Divider – hidden on small screens */}
                <div className="hidden sm:block w-px bg-[#FFDEA4]"></div>
                <div>
                  <p className="font-serif text-4xl sm:text-5xl font-bold text-[#033327] leading-tight">
                    {leader?.publishedPapers ?? "—"}
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
              {executiveStewards.map((steward) => (
              <div key={steward._id} className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start text-center sm:text-left">
                <div className="w-28 h-40 sm:w-32 sm:h-44 shrink-0 rounded-2xl overflow-hidden bg-white/10 shadow-lg border border-white/5 mx-auto sm:mx-0">
                  <img
                    src={steward.imageUrl}
                    alt={steward.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-1">
                    {steward.title}
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-4 leading-tight">
                    {steward.fullName}
                  </h3>
                  <ul className="space-y-3">
                    {(steward.bio || "Executive and academic leadership").split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean).map((item) => (
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
              ))}
            </div>
            {!executiveStewards.length && <p className="text-sm text-white/60">Executive steward profiles are not available.</p>}
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
            {departmentHeads.map((d) => (
              <div
                key={d._id}
                className="group rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-6 py-8 sm:py-10 flex flex-col items-center border bg-white border-[#e5e1d8] text-[#033327] shadow-sm hover:bg-[#033327] hover:border-[#033327] hover:text-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 sm:mb-6 shadow-md border-4 border-white/20 bg-gray-100">
                  <img
                    src={d.imageUrl}
                    alt={d.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-[#FFDEA4]">
                  {d.departmentName}
                </p>
                <h3 className="font-serif text-lg font-bold mb-4">{d.fullName}</h3>
                <p className="text-xs text-center leading-relaxed text-gray-500 group-hover:text-white/80 transition-colors duration-300 max-w-[200px]">
                  {d.bio || "Department leadership profile"}
                </p>
              </div>
            ))}
          </div>
          {!departmentHeads.length && (
            <p className="mt-8 text-sm text-gray-400">Department head profiles are not available.</p>
          )}
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
              {secretariatStaff.map((staff) => (
                <div
                  key={staff._id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#E5E1D8] bg-white p-4 sm:p-6 transition-all duration-300 hover:border-[#B5985B] hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#033327] text-base sm:text-lg font-serif font-bold text-[#FFDEA4] shrink-0 self-center sm:self-auto">
                    {(staff.fullName || "?").charAt(0)}
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-[#033327]">
                      {staff.title}
                    </h3>
                    <p className="text-sm font-medium text-[#B5985B] mt-0.5">
                      {staff.fullName}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {staff.bio || "Administrative services and institutional records."}
                    </p>
                  </div>

                  <div className="self-center sm:self-center rounded-xl border border-[#E5E1D8] bg-[#FAF8F5] px-4 sm:px-5 py-2.5 sm:py-3 text-center min-w-[80px] sm:min-w-[110px] w-full sm:w-auto">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      Office
                    </p>
                    <p className="mt-0.5 text-base sm:text-lg font-serif font-bold text-[#033327]">
                      {staff.office || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {!secretariatStaff.length && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Secretariat staff profiles are not available.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
