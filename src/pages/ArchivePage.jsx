import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  FileText,
  Calendar,
  Users,
  Archive,
  Bell,
  Send,
  AlertCircle,
} from 'lucide-react'

/* ─── Sample Articles ─────────────────────────────────────────── */
const articles = [
  {
    id: 1,
    category: 'Academic Milestone',
    filter: 'Achievements',
    date: 'September 15, 2024',
    title: 'Class of 2021 Excellents Released',
    excerpt:
      'The annual honor roll has been finalized. We celebrate our top-performing students whose dedication and academic excellence continue to inspire the entire school community.',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    img2: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    category: 'Campus Updates',
    filter: 'Events',
    date: 'September 12, 2024',
    title: 'Centennial Bell Restoration Complete',
    excerpt:
      'Our historic bell, originally installed in 1924, has been meticulously restored and will ring once more during the centennial celebrations next month.',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    category: 'Construction Notice',
    filter: 'General',
    date: 'September 15, 2024',
    title: 'Study Hall Expanded; Library for National Exams',
    excerpt:
      'To support our candidates, the central archive and main library will remain open on extended hours throughout the national exam period.',
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
  },
]

const archiveYears = {
  '2024 RECORDS': [
    'Q1 Academic Reports',
    'Mid-Year Exam Results',
    'Sports Day Summary',
    'Annual Staff Review',
  ],
  '2023 RECORDS': [
    'End-of-Year Results',
    'National Exam Data',
    'Alumni Reunion Notes',
    'Library Expansion Report',
  ],
}

const filters = ['All Entries', 'Exams', 'Events', 'Achievements', 'General']

const sidebarLinks = [
  { label: 'Current News', icon: Bell, href: '#' },
  { label: 'Exam Notices', icon: FileText, href: '#' },
  { label: 'Event Calendar', icon: Calendar, href: '#' },
  { label: 'Student Names', icon: Users, href: '#' },
  { label: 'Digital Archive', icon: Archive, href: '#' },
]

/* ─── Category colour map ─────────────────────────────────────── */
const categoryColor = {
  'Academic Milestone': 'text-[#b5985b]',
  'Campus Updates': 'text-[#4a8a6a]',
  'Construction Notice': 'text-[#7a6a5a]',
}

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState('All Entries')
  const [activeSidebar, setActiveSidebar] = useState('Current News')
  const [openYear, setOpenYear] = useState('2024 RECORDS')
  const [email, setEmail] = useState('')
  const [page, setPage] = useState(1)
  const totalPages = 12

  const filtered =
    activeFilter === 'All Entries'
      ? articles
      : articles.filter((a) => a.filter === activeFilter)

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">

      {/* ── Announcement Bar ──────────────────────────────────── */}
      <div className="bg-[#FFDEA4] border-b border-[#e0be84] py-2 px-4 flex items-center justify-center gap-3 text-[11px] font-semibold text-[#5a3a0a]">
        <AlertCircle size={14} className="shrink-0 text-[#b5985b]" />
        <span className="uppercase tracking-wider font-bold text-[10px] bg-[#b5985b] text-white px-2 py-0.5 rounded">
          Urgent Notice
        </span>
        <span>
          National Exam Registration Deadline: October 15. Please verify details in the Student Portal.
        </span>
      </div>

      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section className="bg-[#033327] py-12 px-6 text-center">
        <p className="text-[10px] font-bold text-[#FFDEA4]/70 uppercase tracking-[0.3em] mb-3">
          Agaro High School
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold italic text-[#FFDEA4] mb-4 leading-tight">
          The Daily Archive
        </h1>
        <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
          Preserving the contemporary history of Agaro High School. From academic milestones to
          community festivities, every entry is a thread in our evolving legacy.
        </p>
      </section>

      {/* ── Main Layout ───────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-0">

        {/* ══ LEFT SIDEBAR ══════════════════════════════════════ */}
        <aside className="lg:w-56 shrink-0 border-r border-[#e5e1d8] bg-white px-5 py-8 lg:min-h-[calc(100vh-200px)]">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-[#033327] flex items-center justify-center shrink-0">
              <Archive size={14} className="text-[#FFDEA4]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#033327] leading-tight">The Living Archive</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Agaro High School</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {sidebarLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setActiveSidebar(label)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  activeSidebar === label
                    ? 'bg-[#033327]/8 text-[#033327]'
                    : 'text-gray-500 hover:bg-[#f0ece4] hover:text-[#033327]'
                }`}
              >
                <Icon
                  size={14}
                  className={activeSidebar === label ? 'text-[#b5985b]' : 'text-gray-400'}
                />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* ══ CENTER CONTENT ════════════════════════════════════ */}
        <main className="flex-1 px-6 py-8 min-w-0">

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-[#e5e1d8] mb-8 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors -mb-px ${
                  activeFilter === f
                    ? 'border-[#033327] text-[#033327]'
                    : 'border-transparent text-gray-400 hover:text-[#033327]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Article List */}
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 py-12 text-center">No entries in this category yet.</p>
            ) : (
              filtered.map((article) => (
                <article
                  key={article.id}
                  className="flex gap-4 border border-[#e5e1d8] rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail(s) */}
                  <div className="flex shrink-0 w-36 md:w-48">
                    {article.img2 ? (
                      <div className="flex w-full">
                        <img src={article.img} alt="" className="w-1/2 h-full object-cover" />
                        <img src={article.img2} alt="" className="w-1/2 h-full object-cover" />
                      </div>
                    ) : (
                      <img src={article.img} alt={article.title} className="w-full h-full object-cover min-h-[130px]" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 py-4 pr-4">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${categoryColor[article.category] || 'text-[#b5985b]'}`}>
                        {article.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{article.date}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1a1a1a] leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <button className="text-[10px] font-bold text-[#033327] uppercase tracking-wider flex items-center gap-1.5 hover:text-[#b5985b] transition-colors">
                      Read Entry <ArrowRight size={11} strokeWidth={2.5} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 rounded-full border border-[#d0cdc7] flex items-center justify-center text-[#5a5a5a] hover:border-[#033327] hover:text-[#033327] transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[11px] text-gray-500 font-semibold tracking-wider">
              Page {String(page).padStart(2, '0')} of {String(totalPages).padStart(2, '0')}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 rounded-full border border-[#d0cdc7] flex items-center justify-center text-[#5a5a5a] hover:border-[#033327] hover:text-[#033327] transition-colors disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </main>

        {/* ══ RIGHT SIDEBAR ═════════════════════════════════════ */}
        <aside className="lg:w-64 shrink-0 border-l border-[#e5e1d8] bg-[#FAF8F5] px-5 py-8 space-y-6">

          {/* Past Archives dropdown trigger */}
          <div>
            <button className="w-full flex items-center justify-between text-[11px] font-bold text-[#033327] uppercase tracking-widest px-3 py-2.5 border border-[#e5e1d8] rounded-lg bg-white hover:border-[#033327] transition-colors">
              Past Archives
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Year Accordions */}
          <div className="space-y-2">
            {Object.entries(archiveYears).map(([year, items]) => (
              <div key={year} className="border border-[#e5e1d8] rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setOpenYear(openYear === year ? null : year)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold text-[#033327] uppercase tracking-widest hover:bg-[#f0ece4] transition-colors"
                >
                  {year}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${openYear === year ? 'rotate-180' : ''}`}
                  />
                </button>
                {openYear === year && (
                  <ul className="px-4 pb-3 space-y-1 border-t border-[#e5e1d8]">
                    {items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-[11px] text-gray-500 hover:text-[#033327] py-1.5 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#b5985b] shrink-0" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Stay Connected card */}
          <div className="bg-[#033327] rounded-2xl p-5 relative overflow-hidden">
            {/* decorative rings */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-white/5" />
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border border-white/5" />

            <h4 className="font-serif text-base font-bold text-white mb-1">Stay Connected!</h4>
            <p className="text-[10px] text-white/60 leading-relaxed mb-4">
              Receive the latest annals and urgent updates directly to your device.
            </p>
            <p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-2">
              Your Email Here
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="archive@school.edu"
                className="flex-1 bg-[#FFDEA4]/10 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white placeholder-white/30 focus:outline-none focus:border-[#FFDEA4]/40 min-w-0"
              />
              <button className="w-8 h-8 rounded-lg bg-[#FFDEA4] flex items-center justify-center shrink-0 hover:bg-white transition-colors">
                <Send size={13} className="text-[#033327]" />
              </button>
            </div>
            <p className="text-[8px] text-white/30 mt-3 text-center uppercase tracking-widest">
              No Unwanted Messages
            </p>
          </div>

          {/* Floating gold circular badge */}
          <div className="flex justify-end">
            <button className="w-14 h-14 rounded-full bg-[#FFDEA4] border-4 border-[#e0be84] shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
              <div className="text-center">
                <p className="text-[7px] font-bold text-[#033327] uppercase leading-none">View</p>
                <p className="text-[7px] font-bold text-[#033327] uppercase leading-none">All</p>
              </div>
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
