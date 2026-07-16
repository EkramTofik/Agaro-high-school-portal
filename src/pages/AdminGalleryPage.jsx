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
  cloud: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#033327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M12 15V8"/><path d="m9 11 3-3 3 3"/></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  filter: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  play: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
}

const navItems = [
  { icon: icons.users, label: 'Faculty' },
  { icon: icons.globe, label: 'News' },
  { icon: icons.doc, label: 'Academic Records' },
  { icon: icons.alumni, label: 'Alumni' },
  { icon: icons.gallery, label: 'Gallery' },
  { icon: icons.megaphone, label: 'Inquiries' },
]

export default function AdminGalleryPage() {
  const [activeNav, setActiveNav] = useState('Gallery')
  const [activeTab, setActiveTab] = useState('ALL ASSETS')

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5]">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 flex flex-col h-full bg-[#FAF8F5] border-r border-[#e5e1d8]">
        <div className="px-6 py-8">
          <p className="font-serif text-lg font-bold text-[#033327] leading-tight">Agaro High<br/>Admin</p>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">Living Archive Portal</p>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-[12px] font-semibold transition-colors ${
                activeNav === item.label ? 'bg-[#f0ede8] text-[#033327] border-l-[3px] border-[#b5985b]' : 'text-gray-600 hover:text-[#033327] hover:bg-[#f0ede8]/50'
              }`}>
              <span className={activeNav === item.label ? 'text-[#033327]' : 'text-gray-500'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4">
          <button className="w-full py-3 rounded-md bg-[#033327] text-[11px] font-bold text-white tracking-wider hover:bg-[#0d4a3b] transition-colors flex items-center justify-center gap-2">
            <span className="text-lg leading-none mb-0.5">+</span> New Entry
          </button>
        </div>
        <div className="px-6 pb-6 space-y-4 pt-4 border-t border-[#e5e1d8]">
          {[['Settings', icons.settings], ['Support', icons.support]].map(([label, icon]) => (
            <button key={label} className="flex items-center gap-3 text-[12px] font-semibold text-gray-500 hover:text-[#033327] transition-colors w-full">
              {icon} {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F5]">

        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-4 px-8 py-4 bg-[#FAF8F5] border-b border-[#e5e1d8]">
          <div className="flex items-center gap-2 bg-[#f0ede8] rounded-md px-3 py-2 w-64">
            <span className="text-gray-400">{icons.search}</span>
            <input placeholder="Search archive..." className="flex-1 bg-transparent text-[12px] outline-none text-[#1a1a1a] placeholder:text-gray-400" />
          </div>
          <p className="flex-1 text-center font-serif text-lg font-bold text-[#033327]">Administrative Dashboard</p>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-[#033327]">{icons.bell}</button>
            <button className="hover:text-[#033327]">{icons.grid}</button>
            <button className="hover:text-[#033327]">{icons.archive}</button>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ml-2 border border-[#e5e1d8]">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-10 py-10">

          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#033327] mb-2">Institutional Media Archive</h1>
                <p className="text-sm text-gray-600 max-w-xl">
                  Curate and preserve the visual history of Agaro High School. Manage collection metadata, academic year albums, and digital assets.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded border border-[#e5e1d8] text-[11px] font-bold text-[#033327] bg-white hover:bg-gray-50">
                  Manage Albums
                </button>
                <button className="px-4 py-2 rounded bg-[#033327] text-[11px] font-bold text-white hover:bg-[#0d4a3b]">
                  Publish Updates
                </button>
              </div>
            </div>

            {/* Drag & Drop */}
            <div className="border border-dashed border-[#4a8a6a] bg-[#f2f6f4] rounded-lg p-10 flex flex-col items-center justify-center text-center mb-10">
              <div className="mb-3">{icons.cloud}</div>
              <p className="font-serif text-lg font-bold text-[#033327] mb-1">Drag and Drop Media</p>
              <p className="text-xs text-gray-500">Support for High-Resolution JPG, PNG, and 4K MP4 assets (Max 500MB per file)</p>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mb-6 border-b border-[#e5e1d8] pb-4">
              <div className="flex items-center gap-4">
                <div className="flex bg-white border border-[#e5e1d8] rounded overflow-hidden">
                  {['ALL ASSETS', 'PHOTOS', 'VIDEOS'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase ${activeTab === tab ? 'bg-[#f0ede8] text-[#033327]' : 'text-gray-500 hover:bg-gray-50'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#e5e1d8] rounded pl-3 pr-8 py-2 text-[11px] font-bold text-gray-600 outline-none">
                    <option>Album: All Albums</option>
                  </select>
                  <svg className="absolute right-2 top-2.5 w-3 h-3 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-600">
                <button className="flex items-center gap-1.5 hover:text-[#033327]">{icons.check} Bulk Actions</button>
                <button className="flex items-center gap-1.5 hover:text-[#033327]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg> Sort By: Newest</button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-5">
              {/* Main large item */}
              <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Gala" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#FFDEA4] text-[#033327] text-[9px] font-bold px-2 py-0.5 rounded">FEATURED</span>
                    <span className="text-white text-[10px] font-semibold uppercase tracking-wider">CENTENNIAL GALA</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">Grand Opening Ceremony: 100 Years of Academic Excellence</h3>
                  <p className="text-[11px] text-white/70">Uploaded by Arthur Smith • 24 Oct 2023</p>
                </div>
              </div>

              {/* Right column items */}
              <div className="relative rounded-lg overflow-hidden bg-white border border-[#e5e1d8] p-2">
                <img src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&q=80&w=400" alt="Sports" className="w-full h-[140px] object-cover rounded" />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded">SPORTS DAY 2024</div>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552554763-958a7f45778a?auto=format&fit=crop&q=80&w=400" alt="Arts" className="w-full h-[160px] object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded">ARTS & MUSIC</div>
              </div>

              {/* Bottom row */}
              <div className="bg-white border border-[#e5e1d8] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400" alt="Trophies" className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#1a1a1a]">Honor Hall Trophies.png</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">ARCHIVE ASSETS</p>
                </div>
              </div>
              <div className="bg-white border border-[#e5e1d8] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400" alt="Library" className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#1a1a1a]">Main Library Desk.jpg</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">CAMPUS VIEWS</p>
                </div>
              </div>
              <div className="bg-[#365c4e] rounded-lg p-5 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 mb-3">
                  {icons.play}
                </div>
                <p className="font-serif text-lg font-bold text-white mb-1">Convocation<br/>2023 Video</p>
                <p className="text-[10px] text-white/50">4K MP4 • 12:45</p>
              </div>
              <div className="bg-white border border-[#e5e1d8] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=400" alt="Ledger" className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#1a1a1a]">Founding_Ledger_01.jpg</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">HISTORICAL ARCHIVE</p>
                </div>
              </div>
            </div>

            {/* Load Previous */}
            <div className="mt-10 flex flex-col items-center justify-center">
              <button className="px-5 py-2.5 rounded border border-[#e5e1d8] text-[10px] font-bold text-[#1a1a1a] bg-white hover:bg-gray-50 flex items-center gap-2 mb-3">
                LOAD PREVIOUS ARCHIVES <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <p className="text-[10px] text-gray-500">Showing 8 of 1,240 digital assets</p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 px-8 py-3 bg-[#033327] flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00]"></span>
            <span className="text-[9px] font-bold uppercase tracking-wider">SERVER SYNCED</span>
            <span className="text-[9px] text-white/60 ml-2">LAST BACKUP: 24/02/2023</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold text-white/80">12 Items Selected</span>
            <button className="px-4 py-1.5 rounded bg-[#FFDEA4] text-[10px] font-bold text-[#033327] uppercase tracking-wider">
              ACTION BAR
            </button>
          </div>
        </footer>

      </main>
    </div>
  )
}
