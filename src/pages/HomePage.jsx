import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Newspaper,
  PhoneCall,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#FFDEA4] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"
              alt="Agaro High School Campus"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/45" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full flex justify-center px-4 sm:px-8">
            <div className="w-full max-w-3xl bg-[#FAF8F5]/95 backdrop-blur-md border border-[#FFDEA4]/60 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-14 text-center">
              <p className="uppercase tracking-[0.35em] text-[#B5985B] font-bold text-xs sm:text-sm mb-4">
                Est. 1954
              </p>

              <h1
                className="font-serif font-bold text-[#033327] leading-tight
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl"
              >
                The Living Archive
              </h1>

              <p
                className="mt-6 max-w-2xl mx-auto text-[#4A554A] italic leading-relaxed
          text-base
          sm:text-lg
          md:text-xl"
              >
                "Education is the most powerful weapon which you can use to
                change the world."
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#033327] text-white font-semibold hover:bg-[#0B4A3A] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Discover Agaro
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border-2 border-[#033327] text-[#033327] font-semibold bg-white/70 hover:bg-[#033327] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access Cards ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e5e1d8] hover:border-[#FFDEA4] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group">
            <FileText
              className="text-[#033327] mb-4 group-hover:scale-110 transition-transform"
              size={24}
            />
            <h3 className="font-serif text-xl font-bold text-[#033327] mb-3">
              Academic Excellence
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Explore decades of scholarly achievements, historical documents,
              and the enduring academic traditions that define Agaro High.
            </p>
            <Link
              to="/academic-results"
              className="text-sm font-semibold text-[#033327] flex items-center gap-2 hover:text-[#b5985b] transition-colors"
            >
              View Results <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-white border border-[#e5e1d8] hover:border-[#FFDEA4] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group">
            <Newspaper
              className="text-[#033327] mb-4 group-hover:scale-110 transition-transform"
              size={24}
            />
            <h3 className="font-serif text-xl font-bold text-[#033327] mb-3">
              News & Announcements
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Stay informed with the latest developments, upcoming events, and
              stories from our vibrant student and alumni community.
            </p>
            <Link
              to="/news"
              className="text-sm font-semibold text-[#033327] flex items-center gap-2 hover:text-[#b5985b] transition-colors"
            >
              Read More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-white border border-[#e5e1d8] hover:border-[#FFDEA4] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group">
            <PhoneCall
              className="text-[#033327] mb-4 group-hover:scale-110 transition-transform"
              size={24}
            />
            <h3 className="font-serif text-xl font-bold text-[#033327] mb-3">
              Admissions & Contact
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Reach out to our admissions office. Learn about our application
              process and important dates for the upcoming academic year.
            </p>
            <Link
              to="/contact"
              className="text-sm font-semibold text-[#033327] flex items-center gap-2 hover:text-[#b5985b] transition-colors"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── School Statistics ── */}
      <section className="bg-[#033327] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {[
              { value: "1954", label: "Year Founded" },
              { value: "1,200+", label: "Active Students" },
              { value: "142", label: "Expert Faculty" },
              { value: "99.8%", label: "Pass Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="font-serif text-4xl md:text-5xl font-bold text-[#FFDEA4] mb-2 leading-none group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/60 uppercase tracking-widest font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principal's Welcome ── */}
      <section className="bg-[#FAF8F5] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-[42%] shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#e5e1d8] aspect-[3/4] max-h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                alt="Principal at Agaro High School"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-[0.25em] mb-3">
              Principal's Welcome
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6">
              Preserving 70 Years of Educational Excellence
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-xl">
              Agaro High School is more than an institution: it is a living
              document of progress. From our humble beginnings in 1954 to our
              current standing as a regional leader in academics and arts, we
              meticulously document every milestone and celebrate every
              student's potential.
            </p>
            <div className="flex items-start gap-4 bg-white border border-[#e5e1d8] rounded-xl p-5 shadow-sm max-w-xl hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-full bg-[#033327] flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFDEA4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-serif italic text-[#1a1a1a] leading-relaxed mb-2">
                  "We don't just teach history; we create it every day within
                  these walls."
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  — Dr. Arthur J. Sterling, Principal
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/leadership"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#033327] hover:text-[#b5985b] transition-colors"
              >
                Meet the Leadership Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest News & Events ── */}
      <section className="bg-white py-20 px-6 border-t border-[#e5e1d8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-[0.25em] mb-3">
                Campus Pulse
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                Latest Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#033327] hover:text-[#b5985b] transition-colors flex items-center gap-2"
            >
              View All News <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="border border-[#e5e1d8] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
                  alt="Event"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-[#f4e2b8] text-[#9a7a22] text-[9px] font-bold uppercase tracking-widest rounded">
                    Urgent
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <Calendar size={12} /> Oct 24, 2024
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
                  Annual Founder's Day Commemoration
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Join us as we celebrate 70 years of academic excellence and
                  community impact with special guest speakers and performances.
                </p>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="border border-[#e5e1d8] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
                  alt="Academic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-[#e5e1d8] text-gray-700 text-[9px] font-bold uppercase tracking-widest rounded">
                    Academic
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <Calendar size={12} /> Oct 18, 2024
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
                  National Science Fair Winners
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Congratulations to our senior robotics team for taking first
                  place in the regional technology showcase.
                </p>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="border border-[#e5e1d8] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800"
                  alt="Sports"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-[#e5e1d8] text-gray-700 text-[9px] font-bold uppercase tracking-widest rounded">
                    Athletics
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <Calendar size={12} /> Oct 15, 2024
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
                  Championship Finals Scheduled
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  The Agaro Eagles are heading to the state finals. Get your
                  tickets now to support our student athletes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
