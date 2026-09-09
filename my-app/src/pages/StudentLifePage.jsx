import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Book,
  Lightbulb,
  PenTool,
  MessageSquare,
  Trophy,
  Calendar,
  Landmark,
  Cpu,
  Leaf,
} from "lucide-react";
import api from "../api/axios";

export default function StudentLifePage() {
  const [clubsData, setClubsData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [studentVoices, setStudentVoices] = useState([]);
  const [activeClubIndex, setActiveClubIndex] = useState(0);

  useEffect(() => {
    api.get("/club").then(({ data }) => {
      const payload = data?.data?.data || data?.data?.clubs || data?.data || [];
      setClubsData((Array.isArray(payload) ? payload : [payload]).filter(Boolean).map((club, index) => ({
        ...club,
        title: club.title || club.name,
        name: club.coordinatorName || "",
        image: club.image || club.imageUrl,
        icon: [Book, Lightbulb, PenTool, MessageSquare, Cpu, Leaf][index % 6],
        role: club.category || "COORDINATOR",
      })));
    }).catch(() => setClubsData([]));
  }, []);

  useEffect(() => {
    api.get("/team").then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setTeams((Array.isArray(payload) ? payload : [payload]).filter(Boolean));
    }).catch(() => setTeams([]));
  }, []);

  useEffect(() => {
    api.get("/event").then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setEvents((Array.isArray(payload) ? payload : [payload]).filter(Boolean)
        .filter((event) => event.eventDate)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)));
    }).catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    api.get("/gallary").then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setGalleryItems((Array.isArray(payload) ? payload : [payload])
        .filter((item) => item?.imageUrl)
        .slice(0, 8));
    }).catch(() => setGalleryItems([]));
  }, []);

  useEffect(() => {
    api.get("/studentVoice").then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setStudentVoices((Array.isArray(payload) ? payload : [payload])
        .filter((voice) => voice?.isFeatured !== false && voice?.imageUrl)
        .slice(0, 5));
    }).catch(() => setStudentVoices([]));
  }, []);

  useEffect(() => {
    if (!clubsData.length) return undefined;
    const timer = setInterval(() => {
      setActiveClubIndex((prev) => (prev + 1) % clubsData.length);
    }, 4000); // Rotates every 4 seconds
    return () => clearInterval(timer);
  }, [clubsData.length]);

  // Calculate which 4 cards to show (with wrap-around)
  const displayedClubs = clubsData.length
    ? Array.from({ length: Math.min(4, clubsData.length) }, (_, i) => clubsData[(activeClubIndex + i) % clubsData.length])
    : [];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section className="relative h-[85vh] flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={undefined}
            alt="School Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-3xl mt-20">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em] mb-4">
            STUDENT LIFE AT AGARO
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5rem] text-white font-bold mb-6 leading-tight">
            The Spirit of <span className="italic font-light">Agaro</span>
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-lg mb-10 font-serif">
            Forging character and community through our clubs, societies, and
            the relentless pursuit of excellence.
          </p>
          <Link
            to="/about#archives"
            className="inline-flex items-center gap-2 bg-white text-[#033327]  px-8 py-3.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#74bba8] transition-colors shadow-lg"
          >
            EXPLORE THE ARCHIVE <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* â”€â”€ CLUBS & ORGANIZATIONS â”€â”€ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-px bg-[#b5985b]"></div>
        </div>
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-[#033327] mb-3">
            Clubs &amp; Organizations
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Cultivating Passion, Intellectual Curiosity, and Leadership
          </p>
        </div>

        {clubsData.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No clubs are currently available.</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {displayedClubs.map((club) => {
            const Icon = club.icon;
            return (
              <div
                key={`${club.title}-${activeClubIndex}`}
                className="bg-[#FAF8F5] border border-[#e5e1d8] rounded-[2rem] p-8 flex flex-col hover:border-[#b5985b] transition-colors shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_2px_10px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <div className="text-[#b5985b] mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#033327] mb-4">
                  {club.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed flex-1 mb-8">
                  {club.description}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#e5e1d8]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0">
                    <img
                      src={club.image}
                      className="w-full h-full rounded-full object-cover grayscale"
                      alt={club.name}
                    />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      {club.role}
                    </p>
                    <p className="text-[10px] font-bold text-[#033327] whitespace-nowrap">
                      {club.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {clubsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveClubIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeClubIndex === idx ? "w-6 bg-[#b5985b]" : "w-1.5 bg-[#e5e1d8] hover:bg-[#b5985b]/50"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* â”€â”€ AGARO CHAMPIONS â”€â”€ */}
      <section className="bg-[#033327] py-24 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Agaro Champions
              </h2>
              <p className="text-[13px] text-white/70 leading-relaxed font-serif italic">
                Our varsity teams embody the grit and grace of the Agaro spirit.
                From the pitch to the track, we compete with honor.
              </p>
            </div>
            <button className="border border-white/20 px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#033327] transition-colors shrink-0">
              VIEW ALL TEAMS
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {(teams.length ? teams.slice(0, 3) : [
              { name: "Team data unavailable", category: "Football", achievement: "Regional Champions 2023" },
              { name: "Team data unavailable", category: "Athletics", achievement: "National Record, 400m Relay" },
              { name: "Team data unavailable", category: "Volleyball", achievement: "The Grand Slams '22" },
            ]).map((team) => (
            <div key={`${team._id || team.name}-${team.category}`} className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img
                src={team.imageUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt={team.category}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-2xl font-bold mb-2">{team.name}</h3>
                <p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">
                  {team.achievement}
                </p>
              </div>
            </div>
            ))}
          </div>

          <div className="border border-white/10 bg-white/5 rounded-3xl p-10 md:p-14 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
              <Trophy size={18} className="text-[#FFDEA4]" />
              <h3 className="font-serif text-xl font-bold text-[#FFDEA4]">
                The Trophy Room
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                  24
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Inter-High Cup
                </p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                  12
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                  League Shield
                </p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                  08
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Most Improved Team
                </p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                  07
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Centennial Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ THE SCHOLASTIC CALENDAR â”€â”€ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 flex flex-col">
            <h2 className="font-serif text-3xl font-bold text-[#033327] mb-4">
              The Scholastic Calendar
            </h2>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-10 max-w-md">
              Marking the rhythm of our community. These are the events that
              steer our academic year.
            </p>

            <div className="bg-[#F6F4EB] rounded-3xl p-8 border border-[#e5e1d8] shadow-sm mt-auto">
              <Calendar size={20} className="text-[#b5985b] mb-4" />
              <h3 className="font-serif text-lg font-bold text-[#033327] mb-2">
                Upcoming: Alumni
              </h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Registration for the Centennial Alumni network currently
                underway. Check actively for scheduled meetups.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            {events.slice(0, 4).map((event) => {
              const date = new Date(event.eventDate);
              return (
              <div
                key={event._id}
                className="flex items-center gap-6 border-b border-[#e5e1d8] py-8 group cursor-pointer hover:border-[#b5985b] transition-colors first:pt-0"
              >
                <div className="text-center shrink-0 w-16">
                  <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-1">
                    {date.toLocaleString("en-US", { month: "short" }).toUpperCase()}
                  </p>
                  <p className="font-serif text-4xl font-bold text-[#033327]">
                    {String(date.getDate()).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex-1 px-4">
                  <h4 className="font-serif text-[1.25rem] font-bold text-[#033327] mb-1.5 group-hover:text-[#b5985b] transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-md">
                    {event.desc}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-gray-300 group-hover:text-[#b5985b] transition-colors shrink-0"
                  strokeWidth={3}
                />
              </div>
              );
            })}
            {!events.length && (
              <p className="py-8 text-sm text-gray-500">No upcoming events have been scheduled.</p>
            )}
          </div>
        </div>
      </section>

      {/* â”€â”€ LIVING GALLERY â”€â”€ */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#e5e1d8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="font-serif text-3xl font-bold text-[#033327] mb-2">
              Living Gallery
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Moments that define our collective memory.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((column) => (
              <div key={column} className={`flex flex-col gap-4 md:gap-6 ${column % 2 ? "pt-0 md:pt-12" : ""}`}>
                {galleryItems.filter((_, index) => index % 4 === column).map((item, index) => (
                  <div key={item._id || index} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={item.imageUrl} className={`w-full object-cover ${index % 2 ? "h-64" : "h-48"}`} alt={item.title || "Gallery asset"} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {!galleryItems.length && <p className="mt-6 text-sm text-gray-500">No gallery assets have been added yet.</p>}
        </div>
      </section>

      {/* â”€â”€ STUDENT VOICE â”€â”€ */}
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-t border-[#e5e1d8]">
        <h2 className="font-serif text-3xl font-bold text-[#033327] mb-5">
          Student Voice
        </h2>
        <p className="font-serif italic text-[15px] text-gray-500 mb-16">
          "By the students, for the legacy. We lead to serve the future of
          Agaro."
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-20">
          {studentVoices.map((student) => (
            <div key={student._id} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#e5e1d8] p-1 mb-5 shadow-sm bg-white hover:border-[#b5985b] transition-colors cursor-pointer">
                <img
                  src={student.imageUrl}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt={student.fullName}
                />
              </div>
              <h4 className="font-serif text-[15px] font-bold text-[#033327] mb-1.5">
                {student.fullName}
              </h4>
              <p className="text-[8px] font-bold text-[#62b993] uppercase tracking-[0.2em]">
                {student.role}
              </p>
            </div>
          ))}
        </div>
        {!studentVoices.length && <p className="mt-6 text-sm text-gray-500">No student voices have been added yet.</p>}
      </section>

      {/* â”€â”€ RIGHTS & RESPONSIBILITY â”€â”€ */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#e5e1d8] relative overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-12">
          <Landmark size={800} className="text-[#033327]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-[#F6F4EB] rounded-[3rem] p-12 md:p-20 border border-[#e5e1d8] shadow-sm">
            <div className="text-center mb-16">
              <h2 className="font-serif text-2xl font-bold text-[#033327] mb-6">
                Rights &amp; Responsibility
              </h2>
              <div className="w-16 h-px bg-[#b5985b] mx-auto"></div>
            </div>

            <div className="space-y-12 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div>
                  <h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">
                    I. THE RIGHT TO INQUIRY
                  </h4>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">
                  Every student at Agaro High School is entitled to an
                  environment free from prejudice, where the pursuit of
                  knowledge is protected and curiosity is treated with the
                  utmost respect by faculty and peers alike.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div>
                  <h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">
                    II. THE BURDEN OF INTEGRITY
                  </h4>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">
                  Honor is our highest currency. Academic honesty and personal
                  accountability are the twin pillars of our code. Any act of
                  plagiarism or deceit is a stain upon the collective archives
                  of our institution.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div>
                  <h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">
                    III. STEWARDSHIP OF LEGACY
                  </h4>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">
                  Our students are the temporary custodians of a century-old
                  heritage. Respect for the school's physical grounds, its
                  historic archives, and the reputation of its alumni is a
                  non-negotiable expectation.
                </p>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-[#e5e1d8] text-center">
              <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">
                Adopted by the Agaro Board of Trustees, September 1954
                <br />
                Reaffirmed for the Centennial Year 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
