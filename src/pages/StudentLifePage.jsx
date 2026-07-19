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

const clubsData = [
  {
    icon: Book,
    title: "Heritage Club",
    description:
      "Preserving the rich oral and cultural histories of Agaro. Illuminating our physical archives for future generations.",
    role: "PATRON",
    name: "Wzro. Almaz",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
  },
  {
    icon: Lightbulb,
    title: "Science & Innovation",
    description:
      "A space for hands-on discovery and STEM advocacy, incubating young inventors for real-world solutions.",
    role: "COORDINATOR",
    name: "Ato Kaleb",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
  },
  {
    icon: PenTool,
    title: "Literary Society",
    description:
      "The voice of The Agaro Record. Our student journalists chronicle campus life and creative poetry.",
    role: "EDITOR",
    name: "Sara Yosef",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  },
  {
    icon: MessageSquare,
    title: "Debate Club",
    description:
      "Sharpening logic and rhetoric. The heart of intellectual discourse and public speaking excellence.",
    role: "CHAIR",
    name: "Elias Mulu",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
  },
  {
    icon: Cpu,
    title: "Robotics Society",
    description:
      "Building the future through automation. Students design, program, and compete in national robotics leagues.",
    role: "LEAD ENGINEER",
    name: "Aman Tadesse",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
  },
  {
    icon: Leaf,
    title: "Eco-Warriors",
    description:
      "Leading campus sustainability initiatives. Dedicated to environmental conservation and green energy awareness.",
    role: "ADVISOR",
    name: "Mr. Dawit",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
];

export default function StudentLifePage() {
  const [activeClubIndex, setActiveClubIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveClubIndex((prev) => (prev + 1) % clubsData.length);
    }, 4000); // Rotates every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Calculate which 4 cards to show (with wrap-around)
  const displayedClubs = Array.from({ length: 4 }).map((_, i) => {
    return clubsData[(activeClubIndex + i) % clubsData.length];
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[85vh] flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920"
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

      {/* ── CLUBS & ORGANIZATIONS ── */}
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

      {/* ── AGARO CHAMPIONS ── */}
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
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt="Football"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Varsity Football
                </h3>
                <p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">
                  Regional Champions 2023
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt="Athletics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Athletics
                </h3>
                <p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">
                  National Record, 400m Relay
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt="Volleyball"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Volleyball
                </h3>
                <p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">
                  The Grand Slams '22
                </p>
              </div>
            </div>
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

      {/* ── THE SCHOLASTIC CALENDAR ── */}
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
            {[
              {
                month: "SEP",
                day: "12",
                title: "School Founding Day",
                desc: "A commemorative address leading the school's historical archive showcase.",
              },
              {
                month: "OCT",
                day: "05",
                title: "Inter-School Sports Meet",
                desc: "The major athletic event of the season at the Main Agaro Field.",
              },
              {
                month: "NOV",
                day: "20",
                title: "Cultural Festival",
                desc: "Three days of music, theater, and visual arts celebrating student talent.",
              },
              {
                month: "JAN",
                day: "15",
                title: "Graduation Ceremony",
                desc: "Celebrating the Class of 2024. A formal commencement in the Great Hall.",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-6 border-b border-[#e5e1d8] py-8 group cursor-pointer hover:border-[#b5985b] transition-colors first:pt-0"
              >
                <div className="text-center shrink-0 w-16">
                  <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-1">
                    {event.month}
                  </p>
                  <p className="font-serif text-4xl font-bold text-[#033327]">
                    {event.day}
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
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVING GALLERY ── */}
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
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-48 object-cover"
                  alt="Gallery 1"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                  className="w-full h-64 object-cover"
                  alt="Gallery 2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 pt-0 md:pt-12">
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-80 object-cover"
                  alt="Gallery 3"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-40 object-cover"
                  alt="Gallery 4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-64 object-cover"
                  alt="Gallery 5"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
                  className="w-full h-48 object-cover"
                  alt="Gallery 6"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 pt-0 md:pt-12">
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-40 object-cover"
                  alt="Gallery 7"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-80 object-cover"
                  alt="Gallery 8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT VOICE ── */}
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-t border-[#e5e1d8]">
        <h2 className="font-serif text-3xl font-bold text-[#033327] mb-5">
          Student Voice
        </h2>
        <p className="font-serif italic text-[15px] text-gray-500 mb-16">
          "By the students, for the legacy. We lead to serve the future of
          Agaro."
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-20">
          {[
            {
              name: "Marcus Thorne",
              role: "President",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Lila Vance",
              role: "Vice President",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Sofia Rossi",
              role: "Arts & Culture",
              img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Jordan Wu",
              role: "Sports Captain",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Amara Okafor",
              role: "Treasurer",
              img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200",
            },
          ].map((student, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#e5e1d8] p-1 mb-5 shadow-sm bg-white hover:border-[#b5985b] transition-colors cursor-pointer">
                <img
                  src={student.img}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt={student.name}
                />
              </div>
              <h4 className="font-serif text-[15px] font-bold text-[#033327] mb-1.5">
                {student.name}
              </h4>
              <p className="text-[8px] font-bold text-[#62b993] uppercase tracking-[0.2em]">
                {student.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RIGHTS & RESPONSIBILITY ── */}
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
