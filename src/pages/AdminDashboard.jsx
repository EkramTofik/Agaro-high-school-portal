import React, { useState } from 'react'

/* ── Inline SVG icons ─────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)
const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
)
const ArchiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="5" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/>
  </svg>
)
const UserPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
)
const MegaphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 11 18-5v12L3 13"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
  </svg>
)
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const ChevronRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)
const DocIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const AlumniIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)
const SupportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

/* ── Data ─────────────────────────────────────────────────── */
const stats = [
  { value: '120+', label: 'Total Faculty Members' },
  { value: '12', label: 'Recent Announcements', dot: true },
  { value: '05', label: 'New Contact Inquiries' },
  { value: '08', label: 'Pending Alumni Submissions' },
]

const activities = [
  {
    icon: <UsersIcon />, iconBg: '#e8f0ec',
    title: 'Dr. Elias Tadesse profile updated in History Department',
    time: '2 hours ago', by: 'By Administrator Tadesse',
  },
  {
    icon: <DocIcon />, iconBg: '#e8f0ec',
    title: 'Q3 National Exam Papers uploaded to Digital Vault',
    time: '5 hours ago', by: 'By Registrar Office',
  },
  {
    icon: <MegaphoneIcon />, iconBg: '#e8f0ec',
    title: 'Centennial Gala announcement scheduled for publication',
    time: 'Yesterday', by: 'By Communications Head',
  },
  {
    icon: <AlumniIcon />, iconBg: '#e8f0ec',
    title: 'Class of 1985 archive donation added to Alumni records',
    time: '2 days ago', by: 'By Archivist Assistant',
  },
]

const quickActions = [
  { icon: <UserPlusIcon />, label: 'Add New Faculty' },
  { icon: <MegaphoneIcon />, label: 'Post Announcement' },
  { icon: <UploadIcon />, label: 'Upload Exam Results' },
  { icon: <UsersIcon />, label: 'Update Student Council' },
]

const navItems = [
  { icon: <UsersIcon />, label: 'Faculty' },
  { icon: <GlobeIcon />, label: 'News' },
  { icon: <DocIcon />, label: 'Academic Records' },
  { icon: <AlumniIcon />, label: 'Alumni' },
  { icon: <GridIcon />, label: 'Gallery' },
  { icon: <MegaphoneIcon />, label: 'Inquiries' },
]

/* ── Page ─────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('Faculty')
  const [search, setSearch] = useState('')

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e] text-[#1a1a1a]">

      {/* ── Left Sidebar ──────────────────────────────────── */}
      <aside className="w-44 shrink-0 flex flex-col h-full bg-[#111] border-r border-white/5">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/5">
          <p className="font-serif text-sm font-bold text-white leading-tight">Agaro High Admin</p>
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] mt-0.5">Living Archive Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[11px] font-semibold transition-colors ${
                activeNav === item.label
                  ? 'bg-white/10 text-white border-l-2 border-[#FFDEA4]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}>
              <span className={activeNav === item.label ? 'text-[#FFDEA4]' : 'text-white/30'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* New Entry CTA */}
        <div className="px-4 py-4 border-t border-white/5">
          <button className="w-full py-2.5 rounded-lg bg-[#033327] text-[10px] font-bold text-[#FFDEA4] uppercase tracking-wider hover:bg-[#0d4a3b] transition-colors">
            + New Entry
          </button>
        </div>

        {/* Bottom links */}
        <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
          {[['Settings', <SettingsIcon />], ['Support', <SupportIcon />]].map(([label, icon]) => (
            <button key={label} className="flex items-center gap-2 text-[11px] text-white/30 hover:text-white/60 transition-colors w-full">
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f1ec]">

        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-4 px-8 py-3 bg-[#f4f1ec] border-b border-[#e5e1d8]">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-white border border-[#e5e1d8] rounded-lg px-3 py-2">
            <span className="text-gray-300"><SearchIcon /></span>
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search the archive..."
              className="flex-1 bg-transparent text-[12px] outline-none text-[#1a1a1a] placeholder:text-gray-300"
            />
          </div>
          {/* Icons */}
          <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-[#033327] transition-colors"><BellIcon /></button>
            <button className="hover:text-[#033327] transition-colors"><GridIcon /></button>
            <button className="hover:text-[#033327] transition-colors"><ArchiveIcon /></button>
          </div>
          {/* User */}
          <div className="flex items-center gap-2 border-l border-[#e5e1d8] pl-4">
            <div className="text-right">
              <p className="text-[7px] text-gray-400 uppercase tracking-widest">Logged in as</p>
              <p className="text-[11px] font-bold text-[#1a1a1a]">Admin Tadesse</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#033327] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#FFDEA4]">AT</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-7 space-y-7">

          {/* Welcome Banner */}
          <div className="relative bg-[#033327] rounded-2xl overflow-hidden px-8 py-8">
            {/* Decorative grid dots */}
            <div className="absolute top-4 right-6 opacity-20">
              <svg width="80" height="60" viewBox="0 0 80 60">
                {[0,1,2,3].map(row => [0,1,2,3,4].map(col => (
                  <circle key={`${row}-${col}`} cx={col * 18 + 5} cy={row * 15 + 5} r="1.5" fill="#FFDEA4"/>
                )))}
              </svg>
            </div>
            <p className="text-[9px] font-bold text-[#FFDEA4]/60 uppercase tracking-[0.25em] mb-3">The Living Archive</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">Welcome, Administrator.</h2>
            <p className="text-[11px] text-white/55 max-w-md leading-relaxed">
              The Living Archive is under your stewardship. From here, you manage the legacy, faculty, and intellectual pulse of Agaro High School. Ensure every entry reflects our heritage of excellence.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white border border-[#e5e1d8] rounded-xl p-5 relative hover:shadow-sm transition-shadow">
                {s.dot && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-400"/>
                )}
                <div className="w-8 h-8 rounded-lg bg-[#e8f0ec] flex items-center justify-center mb-3">
                  <ArchiveIcon />
                </div>
                <p className="font-serif text-2xl font-bold text-[#033327]">{s.value}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-[#1a1a1a]">Recent Activity</h3>
                <button className="text-[10px] font-bold text-[#b5985b] uppercase tracking-wider hover:underline">
                  View Full Log
                </button>
              </div>
              <div className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white border border-[#e5e1d8] rounded-xl p-4 hover:shadow-sm transition-shadow group cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[#4a8a6a]"
                      style={{ background: a.iconBg }}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#1a1a1a] leading-snug line-clamp-2">{a.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.time} · {a.by}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-[#033327] transition-colors shrink-0">
                      <ChevronRightIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions + Featured */}
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map(({ icon, label }) => (
                    <button key={label}
                      className="flex flex-col items-center gap-2 bg-white border border-[#e5e1d8] rounded-xl p-5 hover:border-[#033327]/30 hover:shadow-sm transition-all text-center group">
                      <span className="text-[#4a8a6a] group-hover:text-[#033327] transition-colors">{icon}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-tight group-hover:text-[#033327] transition-colors">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured archive card */}
              <div className="relative bg-[#033327] rounded-2xl overflow-hidden min-h-[120px] p-6 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600"
                  alt="Archive"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="relative z-10">
                  <span className="text-[8px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">Archive</span>
                  <p className="font-serif text-base font-bold text-white mt-1 mb-2">Preserve the Legacy</p>
                  <p className="text-[10px] text-white/50 leading-relaxed max-w-xs">
                    Ensure each historical archive entry meets the guidelines set forth by the 1962 charter of excellence.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer bar */}
        <footer className="shrink-0 px-8 py-3 border-t border-[#e5e1d8] bg-[#f4f1ec] flex items-center justify-between">
          <p className="text-[8px] text-gray-400 uppercase tracking-widest">
            Est. 1962 – Agaro High School Administrative System
          </p>
          <div className="flex items-center gap-4">
            {['Data Privacy', 'Access Logs', 'System Status'].map(link => (
              <button key={link} className="text-[8px] font-bold text-gray-400 uppercase tracking-wider hover:text-[#033327] transition-colors">
                {link}
              </button>
            ))}
          </div>
        </footer>

      </main>
    </div>
  )
}
