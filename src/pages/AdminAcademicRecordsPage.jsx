import React, { useState } from 'react'

/* ── Inline SVG icons ─── */
const icons = {
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  history: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  school: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  news: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/></svg>,
  doc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  alumni: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  gallery: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  bookOpen: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  cloudUpload: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M12 15V8"/><path d="m9 11 3-3 3 3"/></svg>,
  archiveBox: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
  download: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  fileText: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  edit: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  lock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  checkCircle: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
}

const navItems = [
  { icon: icons.users, label: 'Faculty' },
  { icon: icons.news, label: 'News' },
  { icon: icons.doc, label: 'Academic Records', active: true },
  { icon: icons.alumni, label: 'Alumni' },
  { icon: icons.gallery, label: 'Gallery' },
]

export default function AdminAcademicRecordsPage() {
  const [activeNav, setActiveNav] = useState('Academic Records')

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5] text-[#1a1a1a]">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 flex flex-col h-full bg-[#f4f1ec] border-r border-[#e5e1d8]">
        <div className="px-6 py-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#033327] text-white flex items-center justify-center shrink-0">
            {icons.school}
          </div>
          <div>
            <p className="font-serif text-[15px] font-bold text-[#033327] leading-tight">Agaro High<br/>Admin</p>
            <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mt-1">Living Archive Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-[12px] font-semibold transition-colors ${
                activeNav === item.label ? 'bg-white text-[#033327] border-l-[3px] border-[#033327] shadow-sm' : 'text-gray-600 hover:text-[#033327] hover:bg-white/50'
              }`}>
              <span className={activeNav === item.label ? 'text-[#033327]' : 'text-gray-500'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-6 pb-8 pt-4">
          <button className="w-full py-3 rounded-md bg-[#033327] text-[10px] font-bold text-white tracking-wider hover:bg-[#0d4a3b] transition-colors flex items-center justify-center gap-2">
            <span className="text-sm leading-none">+</span> Quick Upload
          </button>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F5]">

        {/* Top Header */}
        <header className="shrink-0 flex items-center justify-between px-10 py-4 bg-[#FAF8F5] border-b border-[#e5e1d8]">
          <div className="flex items-center gap-2 bg-white border border-[#e5e1d8] rounded-full px-4 py-2 w-80">
            <span className="text-gray-400">{icons.search}</span>
            <input placeholder="Search archive records..." className="flex-1 bg-transparent text-[11px] font-medium outline-none text-[#1a1a1a] placeholder:text-gray-400" />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-[#033327] relative">
              {icons.bell}
            </button>
            <button className="text-gray-500 hover:text-[#033327]">{icons.history}</button>
            <div className="flex items-center gap-3 pl-6 border-l border-[#e5e1d8]">
              <div className="text-right">
                <p className="text-[11px] font-bold text-[#1a1a1a] leading-tight">Admin Faculty</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-0.5">REGISTRAR'S OFFICE</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#e5e1d8]">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-12 py-10 pb-20">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between mb-10 pb-10 border-b border-[#e5e1d8]">
              <div className="max-w-xl">
                <h1 className="font-serif text-[32px] font-bold text-[#033327] mb-3">Academic Repository</h1>
                <p className="text-[14px] text-gray-500 leading-relaxed italic">
                  Preserving excellence through a living administrative ledger of historical records and academic benchmarks.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="px-6 py-2.5 rounded-md border border-[#033327] text-[11px] font-bold text-[#033327] bg-white hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">{icons.bookOpen} Upload</div>
                  <span>Study Guide</span>
                </button>
                <button className="px-6 py-2.5 rounded-md bg-[#033327] text-[11px] font-bold text-white hover:bg-[#0d4a3b] transition-colors flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">{icons.cloudUpload} Upload</div>
                  <span>Exam Result</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (National Exams) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-[18px] font-bold text-[#033327] flex items-center gap-2">
                    {icons.archiveBox} National Exams
                  </h2>
                  <button className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest hover:underline">
                    FULL ARCHIVE
                  </button>
                </div>
                
                {/* Card 1 */}
                <div className="bg-white border border-[#e5e1d8] rounded-xl p-6 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded bg-[#f4e2b8] text-[#9a7a22] text-[9px] font-bold uppercase tracking-widest">
                      GRADE 12 (ESLCE)
                    </span>
                    <div className="w-10 h-10 rounded-full border border-[#e5e1d8] flex flex-col items-center justify-center text-[10px] font-bold text-[#b5985b] leading-tight">
                      <span>E.C</span><span>2015</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[20px] font-bold text-[#1a1a1a] mb-3">Entrance Examination</h3>
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-6">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published</span>
                    <span className="flex items-center gap-1">{icons.fileText} PDF • 13.4MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2.5 rounded bg-[#033327] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#0d4a3b] flex items-center justify-center gap-2">
                      {icons.download} DOWNLOAD PDF
                    </button>
                    <button className="w-10 h-10 rounded border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327]">
                      {icons.eye}
                    </button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-[#e5e1d8] rounded-xl p-6 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded bg-[#fcfbfa] border border-[#e5e1d8] text-gray-600 text-[9px] font-bold uppercase tracking-widest">
                      GRADE 10
                    </span>
                    <div className="w-10 h-10 rounded-full border border-[#e5e1d8] flex flex-col items-center justify-center text-[10px] font-bold text-[#b5985b] leading-tight">
                      <span>E.C</span><span>2014</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[20px] font-bold text-[#1a1a1a] mb-3">Regional Final Examination</h3>
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-6">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published</span>
                    <span className="flex items-center gap-1">{icons.fileText} Excel • 2.1MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2.5 rounded bg-[#033327] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#0d4a3b] flex items-center justify-center gap-2">
                      {icons.download} DOWNLOAD XL
                    </button>
                    <button className="w-10 h-10 rounded border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327]">
                      {icons.eye}
                    </button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-[#e5e1d8] rounded-xl p-6 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded bg-[#ffebe6] text-[#cc4422] text-[9px] font-bold uppercase tracking-widest">
                      INTERNAL ONLY
                    </span>
                    <div className="w-10 h-10 rounded-full border border-[#e5e1d8] flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 leading-tight">
                      <span>E.C</span><span>2013</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[20px] font-bold text-gray-400 mb-3">Entrance Examination</h3>
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-6">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Restricted</span>
                    <span className="flex items-center gap-1">{icons.fileText} PDF • 10.8MB</span>
                  </div>
                  <button className="w-full py-2.5 rounded bg-[#e5e1d8] text-gray-500 text-[10px] font-bold uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2">
                    {icons.lock} REQUEST ACCESS
                  </button>
                </div>
              </div>

              {/* Right Column (Study Guides + Stats) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Academic Study Guides Box */}
                <div className="bg-white border border-[#e5e1d8] rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-[#e5e1d8] flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-[18px] font-bold text-[#033327] flex items-center gap-2">
                        {icons.bookOpen} Academic Study Guides
                      </h2>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">REPOSITORY DATABASE V2.4</p>
                    </div>
                    <div className="relative">
                      <select className="appearance-none bg-white border border-[#e5e1d8] rounded-full pl-4 pr-8 py-1.5 text-[9px] font-bold text-gray-600 uppercase tracking-wider outline-none cursor-pointer">
                        <option>ALL DEPARTMENTS</option>
                      </select>
                      <svg className="absolute right-3 top-2 w-3 h-3 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                  
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#fcfbfa] border-b border-[#e5e1d8]">
                        <th className="py-3 px-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Resource Identifier</th>
                        <th className="py-3 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Specialization</th>
                        <th className="py-3 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="py-3 px-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e1d8]">
                      <tr className="hover:bg-gray-50">
                        <td className="py-4 px-6 flex items-start gap-3">
                          <span className="text-gray-400 mt-0.5">{icons.fileText}</span>
                          <div>
                            <p className="text-[12px] font-bold text-[#1a1a1a]">Advanced Biology 101</p>
                            <p className="text-[9px] text-gray-400 italic mt-0.5">Updated 2 days ago</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#fcfbfa] border border-[#e5e1d8] text-[9px] font-bold text-[#033327] uppercase tracking-widest">
                            NATURAL SCIENCE
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1a1a1a]">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                          </div>
                          <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1 ml-3">DOWNLOADABLE</p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#033327] hover:text-[#b5985b]">{icons.download}</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-4 px-6 flex items-start gap-3">
                          <span className="text-gray-400 mt-0.5">{icons.fileText}</span>
                          <div>
                            <p className="text-[12px] font-bold text-[#1a1a1a]">Global Economics Review</p>
                            <p className="text-[9px] text-gray-400 italic mt-0.5">Grade 12 Cohort</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#f4e2b8]/30 border border-[#f4e2b8] text-[#9a7a22] text-[9px] font-bold uppercase tracking-widest">
                            SOCIAL SCIENCE
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1a1a1a]">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-[#033327] hover:text-[#b5985b]">{icons.download}</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-4 px-6 flex items-start gap-3">
                          <span className="text-gray-300 mt-0.5">{icons.fileText}</span>
                          <div>
                            <p className="text-[12px] font-bold text-gray-400">Amharic Literature Anthology</p>
                            <p className="text-[9px] text-gray-300 italic mt-0.5">Archived Copy</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#e5e1d8]/50 text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                            LANGUAGES
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Draft
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-300">
                            <button className="hover:text-gray-500">{icons.edit}</button>
                            <button className="hover:text-gray-500">{icons.trash}</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="bg-[#fcfbfa] px-6 py-4 flex items-center justify-between border-t border-[#e5e1d8]">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Displaying 1-3 of 28 historical resources</p>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded border border-[#e5e1d8] bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50">&lt;</button>
                      <button className="w-7 h-7 rounded border border-[#e5e1d8] bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Total Downloads */}
                  <div className="bg-[#033327] rounded-xl p-6 relative overflow-hidden text-white">
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </div>
                    <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">KNOWLEDGE DISSEMINATION</p>
                    <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider mb-4">TOTAL DOWNLOADS</p>
                    <div className="flex items-end gap-4 mb-4">
                      <h3 className="font-serif text-[42px] font-bold leading-none">1,248</h3>
                      <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-[#b5985b] mb-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> +12%
                      </span>
                    </div>
                    <p className="text-[9px] text-white/50 italic">Reflecting semester-over-semester engagement</p>
                  </div>

                  {/* Archive Integrity */}
                  <div className="bg-[#fcfbfa] border border-[#e5e1d8] rounded-xl p-6 relative">
                    <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">INSTITUTIONAL TRUST</p>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">ARCHIVE INTEGRITY</p>
                    <h3 className="font-serif text-[42px] font-bold text-[#1a1a1a] leading-none mb-4">99.8%</h3>
                    <div className="w-full h-1 bg-[#e5e1d8] rounded-full mb-4">
                      <div className="w-[99.8%] h-full bg-[#b5985b] rounded-full"></div>
                    </div>
                    <p className="text-[9px] text-gray-500 flex items-center gap-1.5">
                      {icons.checkCircle} Cryptographically signed records since 1998
                    </p>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Page Footer */}
            <div className="mt-16 pt-10 flex flex-col items-center text-center">
              <p className="font-serif text-[18px] text-[#4a8a6a] italic max-w-lg mb-4">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <div className="text-[#b5985b] mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                AGARO HIGH SCHOOL LIVING ARCHIVE - EST. 1962
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
