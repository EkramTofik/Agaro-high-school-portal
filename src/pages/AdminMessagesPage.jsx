import React, { useState } from 'react'

/* ── Inline SVG icons ─── */
const icons = {
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  history: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  archiveHome: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="5" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  news: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/></svg>,
  messages: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  star: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  resource: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  support: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  filter: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  download: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  moreVert: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  reply: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>,
  printer: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  historySmall: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#033327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  folder: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#033327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  flag: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5985b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  user: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
}

const navItems = [
  { icon: icons.archiveHome, label: 'Archive Home' },
  { icon: icons.users, label: 'Faculty Directory' },
  { icon: icons.news, label: 'News Updates' },
  { icon: icons.messages, label: 'Messages', active: true },
  { icon: icons.star, label: 'Student Results' },
  { icon: icons.resource, label: 'Resource Manager' },
]

export default function AdminMessagesPage() {
  const [activeNav, setActiveNav] = useState('Messages')

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5] text-[#1a1a1a]">

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className="w-60 shrink-0 flex flex-col h-full bg-[#f4f1ec] border-r border-[#e5e1d8]">
        {/* Logo Area */}
        <div className="px-6 py-10 flex flex-col items-start justify-center">
          <h1 className="font-serif text-[22px] font-bold text-[#033327] leading-tight mb-2">Agaro High<br/>School</h1>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Administrative Panel</p>
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

        {/* Footer Area */}
        <div className="px-6 pb-8 space-y-4 pt-6 border-t border-[#e5e1d8] mx-4">
          <button className="w-full py-2.5 rounded-md bg-[#033327] text-[10px] font-bold text-white tracking-wider hover:bg-[#0d4a3b] transition-colors flex items-center justify-center gap-2 mb-4">
            <span className="text-sm leading-none">+</span> New Archive Entry
          </button>
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
          <h2 className="font-serif text-[18px] font-bold text-[#033327] leading-tight mr-8">Communication Archive</h2>
          
          <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500">
            <button className="text-[#033327] border-b-2 border-[#033327] pb-1">Messages</button>
            <button className="hover:text-[#033327] pb-1">Inquiries</button>
            <button className="hover:text-[#033327] pb-1">Feedback</button>
          </div>
          
          <div className="flex-1 px-8"></div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-[#f4f1ec] border border-[#e5e1d8] rounded-full px-3 py-1.5 w-64 mr-2">
              <span className="text-gray-400">{icons.search}</span>
              <input placeholder="Search archive records..." className="flex-1 bg-transparent text-[11px] font-medium outline-none text-[#1a1a1a] placeholder:text-gray-400" />
            </div>
            <button className="text-gray-600 hover:text-[#033327] relative">
              {icons.bell}
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#033327] rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-[#033327]">{icons.history}</button>
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#e5e1d8] ml-2">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-serif text-[26px] font-bold text-[#033327] mb-1">Manage Inquiries</h1>
              <p className="text-[13px] text-gray-600">
                Review and respond to institutional communications.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-md bg-white border border-[#e5e1d8] text-[11px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                {icons.filter} Filter
              </button>
              <button className="px-4 py-2 rounded-md bg-white border border-[#e5e1d8] text-[11px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                {icons.download} Export Log
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 mb-8 h-[500px]">
            
            {/* Left Column (Inbox) */}
            <div className="col-span-3 bg-[#fcfbfa] border border-[#e5e1d8] rounded-xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e5e1d8] flex items-center justify-between bg-white">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">INBOX (12)</span>
                <span className="text-gray-400 rotate-90 scale-x-150">&lt;&gt;</span>
              </div>
              
              <div className="flex-1 overflow-y-auto divide-y divide-[#e5e1d8]">
                {/* Active Item */}
                <div className="p-4 bg-white border-l-[3px] border-[#033327] cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[13px] font-bold text-[#033327] truncate pr-2">Eleanor H. Sterlin...</p>
                    <span className="text-[9px] text-gray-500 shrink-0">10:45 AM</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">HISTORICAL RECORDS ACCESS</p>
                  <span className="px-2 py-0.5 rounded bg-[#fff0b3] text-[#b38600] text-[8px] font-bold uppercase tracking-wider">NEW</span>
                </div>
                
                <div className="p-4 bg-[#fcfbfa] hover:bg-white cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[13px] font-bold text-gray-700 truncate pr-2">Julian Marcus</p>
                    <span className="text-[9px] text-gray-500 shrink-0">Yesterday</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">SCHOLARSHIP FUND INQUIRY</p>
                  <span className="px-2 py-0.5 rounded bg-[#e5e1d8] text-gray-600 text-[8px] font-bold uppercase tracking-wider">READ</span>
                </div>
                
                <div className="p-4 bg-[#fcfbfa] hover:bg-white cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[13px] font-bold text-gray-700 truncate pr-2">Dr. Sarah Thorne</p>
                    <span className="text-[9px] text-gray-500 shrink-0">Oct 24</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">GUEST LECTURE PROPOSAL</p>
                  <span className="px-2 py-0.5 rounded bg-[#c6ebd4] text-[#033327] text-[8px] font-bold uppercase tracking-wider">REPLIED</span>
                </div>
                
                <div className="p-4 bg-[#fcfbfa] hover:bg-white cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[13px] font-bold text-gray-700 truncate pr-2">B. Whittaker</p>
                    <span className="text-[9px] text-gray-500 shrink-0">Oct 22</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">ADMISSIONS QUESTION</p>
                  <span className="px-2 py-0.5 rounded bg-[#c6ebd4] text-[#033327] text-[8px] font-bold uppercase tracking-wider">REPLIED</span>
                </div>
              </div>
            </div>

            {/* Middle Column (Message Content) */}
            <div className="col-span-6 bg-white border border-[#e5e1d8] rounded-xl flex flex-col relative overflow-hidden">
              <div className="px-8 py-6 border-b border-[#e5e1d8] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c6ebd4] text-[#033327] flex items-center justify-center font-bold text-[14px]">
                    EH
                  </div>
                  <div>
                    <h2 className="font-serif text-[17px] font-bold text-[#1a1a1a]">Eleanor H. Sterling</h2>
                    <p className="text-[12px] text-gray-500">eleanor.sterling@heritage.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-[#033327]">{icons.star}</button>
                  <button className="hover:text-[#033327]">{icons.moreVert}</button>
                </div>
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">SUBJECT HEADER</p>
                <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-6 pb-6 border-b border-[#e5e1d8]">
                  Inquiry: Historical Records Access (Class of 1964)
                </h3>
                
                <div className="text-[13px] text-gray-700 leading-relaxed space-y-4">
                  <p>Dear Administrator,</p>
                  <p>I am writing to formally request access to the graduation records and school yearbooks specifically for the Class of 1964. My family is currently conducting extensive genealogical research on my late grandfather, Arthur P. Sterling, who we believe was a valedictorian at Agaro High during that year.</p>
                  <p>We are particularly interested in any high-resolution scans of athletic achievement records or faculty commendations that might still be held within your historical archives. Please let me know the standard procedure for requesting these digital copies or if a physical visit to the Archive Hall is</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="shrink-0 p-6 pt-2 flex items-center justify-center gap-3">
                <button className="px-6 py-2.5 rounded bg-[#033327] text-[11px] font-bold text-white tracking-wider hover:bg-[#0d4a3b] transition-colors flex items-center gap-2">
                  {icons.reply} Draft Reply
                </button>
                <button className="px-6 py-2.5 rounded bg-white border border-[#033327] text-[11px] font-bold text-[#033327] tracking-wider hover:bg-[#f4f1ec] transition-colors flex items-center gap-2">
                  {icons.printer} Print Record
                </button>
              </div>
            </div>

            {/* Right Column (Context Notes) */}
            <div className="col-span-3 space-y-5">
              
              <div className="bg-[#f0ede8] border border-[#e5e1d8] rounded-xl p-5">
                <p className="text-[12px] font-bold text-gray-700 mb-5 flex items-center gap-2">
                  {icons.user} Sender Profile Notes
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#e5e1d8] flex items-center justify-center shrink-0">
                      {icons.historySmall}
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#033327] leading-tight mb-1">3rd<br/>Interaction</p>
                      <p className="text-[10px] text-gray-500">Last contact: July 12, 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#e5e1d8] flex items-center justify-center shrink-0">
                      {icons.folder}
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-[#033327] leading-tight mb-1">Category</p>
                      <p className="text-[10px] text-gray-500">Alumni Research / Genealogy</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#f4e2b8] flex items-center justify-center shrink-0">
                      {icons.flag}
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-[#b5985b] leading-tight mb-1">Priority:<br/>Medium</p>
                      <p className="text-[10px] text-gray-500 leading-tight">Requires Archive Retrieval</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#fcfbfa] border border-[#e5e1d8] rounded-xl p-5">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-4">ARCHIVE CONTEXT</p>
                
                <div className="bg-white border border-[#e5e1d8] rounded-lg p-3 mb-3">
                  <p className="text-[10px] font-bold text-[#1a1a1a] mb-1">Related Record</p>
                  <p className="text-[10px] text-gray-500 leading-tight">Class of 1964 Commencement Ledger (#AL-1964-01)</p>
                </div>
                
                <div className="bg-white border border-[#e5e1d8] rounded-lg p-3">
                  <p className="text-[10px] font-bold text-[#1a1a1a] mb-1">Staff Note</p>
                  <p className="text-[10px] text-gray-500 leading-tight">Physical scanning scheduled for Friday wing visit.</p>
                </div>
              </div>

            </div>

          </div>
          
          {/* Footer Area */}
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-8">
              <div>
                <p className="font-serif text-[32px] font-bold text-[#033327] leading-none mb-1">124</p>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Total Oct Submissions</p>
              </div>
              <div>
                <p className="font-serif text-[32px] font-bold text-[#b5985b] leading-none mb-1">4.2h</p>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Avg. Response Time</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[9px] text-gray-500">Institutional Archive v4.2.0</p>
              <p className="text-[9px] text-gray-500">Property of Agaro High School Administration</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}
