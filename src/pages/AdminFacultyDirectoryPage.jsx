import React, { useState, useMemo } from 'react'

/* ── Inline SVG icons ─── */
const icons = {
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  history: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  archiveHome: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="5" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  news: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/></svg>,
  star: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  resource: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  support: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  starFilled: <svg width="14" height="14" viewBox="0 0 24 24" fill="#b5985b" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a8a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  minusCircle: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  award: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a8a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
}

const navItems = [
  { icon: icons.archiveHome, label: 'Archive Home' },
  { icon: icons.users, label: 'Faculty Directory', active: true },
  { icon: icons.news, label: 'News Updates' },
  { icon: icons.star, label: 'Student Results' },
  { icon: icons.resource, label: 'Resource Manager' },
]

const initialFaculty = [
  {
    seal: icons.starFilled, sealColor: '#b5985b',
    name: 'Dr. Elena Vance', role: 'Head of Literature',
    dept: 'Humanities', year: 1998, status: 'PERMANENT',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
  },
  {
    seal: icons.shield, sealColor: '#4a8a6a',
    name: 'Julian Thorne', role: 'Physics & Astronomy',
    dept: 'Natural Sciences', year: 2005, status: 'PERMANENT',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
  },
  {
    seal: icons.minusCircle, sealColor: '#6b7280',
    name: 'Maya Patel', role: 'Assistant Coach',
    dept: 'Athletics', year: 2021, status: 'PROBATION',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100'
  },
  {
    seal: icons.award, sealColor: '#4a8a6a',
    name: 'Dr. Samuel Okoro', role: 'Emeritus Math',
    dept: 'Mathematics', year: 1982, status: 'RETIRED',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  }
]

export default function AdminFacultyDirectoryPage() {
  const [activeNav, setActiveNav] = useState('Faculty Directory')
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All Faculty')

  const filteredFaculty = useMemo(() => {
    return initialFaculty.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            person.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDept = departmentFilter === 'All Faculty' || person.dept === departmentFilter
      return matchesSearch && matchesDept
    })
  }, [searchQuery, departmentFilter])

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5] text-[#1a1a1a]">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className="w-60 shrink-0 flex flex-col h-full bg-[#f4f1ec] border-r border-[#e5e1d8]">
        {/* Logo Area */}
        <div className="px-6 py-8 flex flex-col items-center justify-center border-b border-[#e5e1d8] mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#b5985b] bg-white flex items-center justify-center mb-3">
            <div className="w-6 h-6 bg-[#033327] rounded-sm flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">A</span>
            </div>
          </div>
          <h1 className="font-serif text-[17px] font-bold text-[#033327] text-center leading-tight">Agaro High School</h1>
          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">ADMINISTRATIVE PANEL</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-[12px] font-semibold transition-colors ${
                activeNav === item.label ? 'bg-[#e5e1d8] text-[#033327] border-r-[3px] border-[#033327]' : 'text-gray-600 hover:text-[#033327] hover:bg-[#e5e1d8]/50'
              }`}>
              <span className={activeNav === item.label ? 'text-[#033327]' : 'text-gray-500'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Links */}
        <div className="px-6 pb-6 space-y-4 pt-6 border-t border-[#e5e1d8] mx-4">
          {[['Settings', icons.settings], ['Support', icons.support]].map(([label, icon]) => (
            <button key={label} className="flex items-center gap-3 text-[12px] font-semibold text-gray-600 hover:text-[#033327] transition-colors w-full">
              {icon} {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F5]">

        {/* Top Header */}
        <header className="shrink-0 flex items-center px-8 py-4 bg-[#FAF8F5] border-b border-[#e5e1d8]">
          <div className="flex items-center gap-6">
            <h2 className="font-serif text-[19px] font-bold text-[#033327] leading-tight w-24">Admin<br/>Console</h2>
            <div className="flex items-center gap-5 border-l border-[#e5e1d8] pl-6 text-[11px] font-bold text-gray-700">
              <button className="text-[#033327]">Directories</button>
              <button className="hover:text-[#033327]">Registrar</button>
              <button className="hover:text-[#033327]">Archives</button>
            </div>
          </div>
          <div className="flex-1 px-8">
            <div className="flex items-center gap-2 bg-white border border-[#e5e1d8] rounded-md px-3 py-2 w-full max-w-sm focus-within:border-[#b5985b] transition-colors shadow-sm">
              <span className="text-gray-400">{icons.search}</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Faculty Records..." 
                className="flex-1 bg-transparent text-[11px] font-medium outline-none text-[#1a1a1a] placeholder:text-gray-400" 
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-600 hover:text-[#033327] relative">
              {icons.bell}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#b5985b] rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-[#033327]">{icons.history}</button>
            <div className="flex items-center gap-3 pl-5 border-l border-[#e5e1d8]">
              <div className="text-right">
                <p className="text-[11px] font-bold text-[#1a1a1a] leading-tight">A. Sterling</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-0.5">HEAD REGISTRAR</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-12 py-10 pb-20">
          <div className="max-w-6xl mx-auto">

            {/* Title Section */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-serif text-[42px] font-bold text-[#033327] mb-3">Faculty Directory</h1>
                <p className="text-[13px] text-gray-600 max-w-xl leading-relaxed">
                  The living registry of our esteemed educators and scholars. Manage professional profiles, academic assignments, and historical contributions.
                </p>
              </div>
              <button className="px-5 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white tracking-wide hover:bg-[#0d4a3b] transition-colors flex items-center gap-2 mt-2 shadow-md">
                <span className="text-sm leading-none">+</span> New Faculty Member
              </button>
            </div>

            {/* Filter & Status Area */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1 border border-[#e5e1d8] rounded-xl p-5 bg-[#fcfbfa] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Filter by Department</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All Faculty', 'Mathematics', 'Natural Sciences', 'Humanities', 'Athletics'].map(dept => (
                    <button 
                      key={dept}
                      onClick={() => setDepartmentFilter(dept)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all
                        ${departmentFilter === dept 
                          ? 'bg-[#033327] text-white shadow-sm' 
                          : 'bg-white border border-[#e5e1d8] text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-64 shrink-0 bg-[#e8f0ec] rounded-xl p-6 border border-[#d6e3dc] flex flex-col justify-center shadow-sm">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">CURRENT STAFF COUNT</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[42px] font-bold text-[#033327] leading-none">{filteredFaculty.length}</span>
                  <span className="text-[11px] font-medium text-gray-600">scholars</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#e5e1d8] rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#fcfbfa] border-b border-[#e5e1d8]">
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24">Honor Seal</th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Faculty Member</th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Department</th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tenure</th>
                      <th className="py-4 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e1d8]">
                    {filteredFaculty.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-12 text-center">
                          <p className="text-sm text-gray-500">No faculty members found matching your criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredFaculty.map((person, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110" style={{ borderColor: `${person.sealColor}40` }}>
                              {person.seal}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={person.avatar} alt={person.name} className="w-9 h-9 rounded-full object-cover" />
                              <div>
                                <p className="font-serif text-[14px] font-bold text-[#033327]">{person.name}</p>
                                <p className="text-[10px] text-gray-500">{person.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[12px] font-medium text-gray-700">{person.dept}</td>
                          <td className="py-4 px-4 text-[12px] font-serif font-bold text-gray-700">{person.year}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-widest
                              ${person.status === 'PERMANENT' ? 'bg-[#c6ebd4] text-[#033327]' :
                                person.status === 'PROBATION' ? 'bg-[#ffe4b3] text-[#a36b00]' :
                                'bg-[#e5e1d8] text-gray-600'}`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-3 text-gray-400">
                              <button className="hover:text-[#b5985b] transition-colors" title="View Profile">{icons.eye}</button>
                              <button className="hover:text-[#033327] transition-colors" title="Edit Record">{icons.edit}</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-[#fcfbfa] border-t border-[#e5e1d8] px-6 py-3 flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-500">
                  Showing {filteredFaculty.length > 0 ? 1 : 0}-{filteredFaculty.length} of {initialFaculty.length} records
                </p>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-[#e5e1d8] bg-white text-gray-400 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>&lt;</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-[#033327] text-white text-[11px] font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-[#e5e1d8] bg-white text-gray-400 text-xs hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>&gt;</button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="max-w-md">
                <h3 className="font-serif text-[17px] font-bold text-[#033327] mb-2">Preserving Academic Legacy</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed italic">
                  "An archive is not just a collection of names, but a living testament to the minds that shaped the future of Agaro High School." — 1924 Administrative Manual.
                </p>
              </div>
              <div className="flex gap-12 text-right">
                <div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Audit Logs</p>
                  <p className="text-[9px] text-gray-500 leading-relaxed">Last Modified: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}<br/>By: Registrar Sterling</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Integrity Check</p>
                  <p className="text-[9px] text-gray-500 flex items-center justify-end gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verified Secure</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
