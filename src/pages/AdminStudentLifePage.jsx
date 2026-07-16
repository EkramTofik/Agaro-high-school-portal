import React, { useState } from 'react'

/* ── Inline SVG icons ─── */
const icons = {
  search: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  bell: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  grid: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  archive: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="5" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>,
  users: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  doc: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  globe: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  alumni: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  gallery: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  megaphone: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  settings: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  support: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  school: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#033327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  edit: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  userPlus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  mail: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  calendar: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  history: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  speaker: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  palette: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="5.5" r="2.5"/><circle cx="8.5" cy="8.5" r="2.5"/><circle cx="8.5" cy="15.5" r="2.5"/><circle cx="13.5" cy="18.5" r="2.5"/><path d="M16 12a4 4 0 0 0 4-4"/><path d="M16 12a4 4 0 0 1 4 4"/></svg>,
}

const navItems = [
  { icon: icons.globe, label: 'News' },
  { icon: icons.doc, label: 'Academic Records' },
  { icon: icons.alumni, label: 'Alumni' },
  { icon: icons.users, label: 'Faculty & Life', active: true },
  { icon: icons.gallery, label: 'Gallery' },
  { icon: icons.megaphone, label: 'Inquiries' },
]

const clubs = [
  {
    name: 'Archival Society', founded: 'FOUNDED 1962', icon: icons.history,
    desc: "Dedicated to preserving the school's heritage through meticulous documentation and student-led museum tours of our 19th-century wing.",
    initials: 'JM', lead: 'Julian Moore', role: 'Faculty Lead'
  },
  {
    name: 'Debate Union', founded: 'ESTABLISHED 1978', icon: icons.speaker,
    desc: 'A rigorous intellectual forum participating in regional and national circuits, focusing on ethics, policy, and public speaking.',
    initials: 'AS', lead: 'Anna Sterling', role: 'Secretary'
  },
  {
    name: 'Classical Arts Guild', founded: 'RENEWED 2018', icon: icons.palette,
    desc: 'Exploration of traditional fine arts mediums with a special focus on oil painting and anatomical sketching in the North Atrium.',
    initials: 'RK', lead: 'Robert King', role: 'Faculty Lead'
  }
]

export default function AdminStudentLifePage() {
  const [activeNav, setActiveNav] = useState('Faculty & Life')

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5]">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 flex flex-col h-full bg-[#f4f1ec] border-r border-[#e5e1d8]">
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#b5985b] flex items-center justify-center shrink-0">
            {icons.school}
          </div>
          <div>
            <p className="font-serif text-[15px] font-bold text-[#033327] leading-tight">Agaro Admin</p>
            <p className="text-[7px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Living Archive Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-[11px] font-semibold transition-colors ${
                activeNav === item.label ? 'bg-[#e5e1d8] text-[#033327] border-l-[3px] border-[#b5985b]' : 'text-gray-600 hover:text-[#033327] hover:bg-[#e5e1d8]/50'
              }`}>
              <span className={activeNav === item.label ? 'text-[#033327]' : 'text-gray-500'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 pt-4 border-t border-[#e5e1d8]">
          <button className="w-full py-3 rounded-md bg-[#033327] text-[10px] font-bold text-white tracking-wider hover:bg-[#0d4a3b] transition-colors flex items-center justify-center gap-2">
            <span className="text-sm leading-none mb-0.5">+</span> New Entry
          </button>
        </div>
        <div className="px-6 pb-6 space-y-4 pt-4">
          {[['Settings', icons.settings], ['Support', icons.support]].map(([label, icon]) => (
            <button key={label} className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 hover:text-[#033327] transition-colors w-full">
              {icon} {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F5] relative">

        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-4 px-8 py-3 bg-[#FAF8F5] border-b border-[#e5e1d8]">
          <div className="flex items-center gap-2 bg-[#f0ede8] rounded-md px-3 py-2 w-72">
            <span className="text-gray-400">{icons.search}</span>
            <input placeholder="Search archive..." className="flex-1 bg-transparent text-[11px] outline-none text-[#1a1a1a] placeholder:text-gray-400" />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4 text-gray-500 mr-4">
            <button className="hover:text-[#033327]">{icons.bell}</button>
            <button className="hover:text-[#033327]">{icons.grid}</button>
            <button className="hover:text-[#033327]">{icons.archive}</button>
          </div>
          <div className="flex items-center gap-3 border-l border-[#e5e1d8] pl-5">
            <div className="text-right">
              <p className="text-[11px] font-bold text-[#1a1a1a] leading-tight">Admin User</p>
              <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-0.5">Registrar Office</p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#e5e1d8]">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-10 py-10 pb-24">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-10">
              <h1 className="font-serif text-3xl font-bold text-[#033327] mb-2">Student Life Management</h1>
              <p className="text-sm text-gray-600 max-w-2xl">
                Updating the pulse of our institution. Manage the leadership and community organisms that define the Agaro student experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

              {/* Student Council Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[#033327]">
                    {icons.users}
                    <h2 className="font-serif text-xl font-bold">Student Council</h2>
                  </div>
                  <button className="flex items-center gap-1.5 text-[9px] font-bold text-[#033327] uppercase tracking-wider hover:text-[#b5985b]">
                    {icons.edit} MANAGE ROLES
                  </button>
                </div>

                <div className="pl-4 border-l-2 border-[#b5985b] mb-8">
                  <p className="text-[11px] text-gray-500 italic leading-relaxed">
                    The Student Council serves as the representative voice of the student body, fostering communication between the administration and students.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* President */}
                  <div className="bg-white border border-[#e5e1d8] rounded-lg p-4 flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" alt="President" className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="text-[8px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">PRESIDENT</p>
                      <p className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">Elias Vance</p>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">{icons.mail} e.vance@agaro.edu</span>
                        <span className="flex items-center gap-1">{icons.calendar} Senior '25</span>
                      </div>
                    </div>
                  </div>

                  {/* Vice President */}
                  <div className="bg-white border border-[#e5e1d8] rounded-lg p-4 flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" alt="VP" className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="text-[8px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">VICE PRESIDENT</p>
                      <p className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">Sofia Martinez</p>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">{icons.mail} s.martinez@agaro.edu</span>
                        <span className="flex items-center gap-1">{icons.calendar} Senior '25</span>
                      </div>
                    </div>
                  </div>

                  {/* Appoint New */}
                  <button className="w-full border border-dashed border-[#b5985b]/40 bg-[#f4f1ec] rounded-lg p-5 flex flex-col items-center justify-center gap-2 hover:bg-[#e5e1d8]/50 transition-colors">
                    <span className="text-gray-400">{icons.userPlus}</span>
                    <span className="text-[10px] font-semibold text-gray-500">Appoint New Council Member</span>
                  </button>
                </div>
              </div>

              {/* Clubs & Orgs Section */}
              <div className="bg-[#f0ede8] rounded-xl p-6 border border-[#e5e1d8]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[#033327]">
                    {icons.users}
                    <h2 className="font-serif text-xl font-bold">Clubs & Orgs</h2>
                  </div>
                  <button className="flex items-center gap-1.5 text-[9px] font-bold text-[#033327] uppercase tracking-wider hover:text-[#b5985b]">
                    <span className="text-sm leading-none">+</span> NEW CLUB
                  </button>
                </div>

                <div className="space-y-4">
                  {clubs.map((club, i) => (
                    <div key={i} className="bg-white border border-[#e5e1d8] rounded-lg p-5 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1">{club.name}</h3>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{club.founded}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-[#b5985b] flex items-center justify-center shrink-0">
                          {club.icon}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed mb-5">
                        {club.desc}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#f0ede8]">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#e5e1d8] text-[#033327] text-[9px] font-bold flex items-center justify-center">
                            {club.initials}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#1a1a1a] leading-tight">{club.lead}</p>
                            <p className="text-[8px] text-gray-500">{club.role}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 bg-[#033327] text-white text-[8px] font-bold uppercase tracking-wider rounded hover:bg-[#0d4a3b]">
                          EDIT DETAILS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'ACTIVE CLUBS', value: '24' },
                { label: 'STUDENT PARTICIPATION', value: '88%' },
                { label: 'SCHEDULED EVENTS', value: '12' },
                { label: 'COUNCIL TERMS', value: '2025' }
              ].map(stat => (
                <div key={stat.label} className="bg-transparent border border-[#e5e1d8] rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className="font-serif text-3xl font-bold text-[#033327]">{stat.value}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Floating Action Button */}
        <button className="absolute bottom-8 right-8 w-12 h-12 bg-[#b5985b] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#967d4a] hover:scale-105 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>

      </main>
    </div>
  )
}
