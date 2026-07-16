import React from 'react'
import {
  BookOpen, Users, UserCheck, Shield, BookMarked, Quote, ArrowRight, MapPin
} from 'lucide-react'

export default function StaffPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] flex flex-col md:flex-row">

      {/* ── SIDEBAR NAVIGATION ───────────────────────────── */}
      <aside className="w-full md:w-64 lg:w-72 border-r border-[#e5e1d8] bg-[#FAF8F5] p-8 shrink-0">
        <div className="mb-10">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em] mb-2">About</p>
          <h2 className="font-serif text-2xl font-bold text-[#033327] leading-tight">The Living Archive</h2>
        </div>

        <nav className="space-y-2 text-sm font-medium">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#033327] text-white rounded-lg shadow-sm">
            <Shield size={16} className="text-[#FFDEA4]" />
            Administration
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#033327] hover:bg-black/5 rounded-lg transition-colors">
            <BookOpen size={16} />
            Faculty
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#033327] hover:bg-black/5 rounded-lg transition-colors">
            <UserCheck size={16} />
            Board of Governors
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#033327] hover:bg-black/5 rounded-lg transition-colors">
            <Users size={16} />
            Student Council
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#033327] hover:bg-black/5 rounded-lg transition-colors">
            <BookMarked size={16} />
            Staff Directory
          </a>
        </nav>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <main className="flex-1 overflow-x-hidden">
        
        {/* HEAD OF THE INSTITUTE */}
        <section className="px-8 py-16 lg:px-20 lg:py-28 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Image with Gold Offset Ring */}
            <div className="relative shrink-0">
              <div className="w-72 h-72 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-[8px] border-white shadow-lg relative z-10 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Abebe Bikila" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold ring offset to bottom-left */}
              <div className="absolute -bottom-6 -left-6 w-full h-full rounded-full border-[3px] border-[#FFDEA4] z-0"></div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em] mb-4">Head of the Institute</p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#033327] mb-3">Dr. Abebe Bikila</h1>
              <p className="text-base text-[#033327]/80 italic font-serif mb-10 font-medium">PhD in Educational Leadership, Oxford University</p>

              {/* Stats with Gold Divider */}
              <div className="flex gap-10 mb-10 pb-10 border-b border-[#e5e1d8]">
                <div>
                  <p className="font-serif text-5xl font-bold text-[#033327] mb-1">15</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Years at Agaro</p>
                </div>
                <div className="w-px bg-[#FFDEA4]"></div>
                <div>
                  <p className="font-serif text-5xl font-bold text-[#033327] mb-1">32</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Published Papers</p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="relative">
                <Quote size={28} className="text-[#FFDEA4] mb-4 fill-current" />
                <p className="font-serif text-base text-[#033327] leading-relaxed italic mb-8 font-medium">
                  "At Agaro High School, we don't just teach history; we live it. Our mission is to curate the intellectual growth of every student, ensuring they carry the torch of our heritage into the innovations of tomorrow."
                </p>
                <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-wider">
                  <a href="#" className="text-[#033327] hover:text-[#0d4a3b] transition-colors border-b border-[#033327] pb-0.5">
                    Official Biography (Archived, 2021)
                  </a>
                  <a href="#" className="text-[#FFDEA4] hover:text-[#e0be84] transition-colors flex items-center gap-1.5">
                    Read Full Address <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EXECUTIVE STEWARDS */}
        <section className="bg-[#033327] text-white px-8 py-20 lg:px-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Executive <span className="text-[#FFDEA4] italic font-medium">Stewards</span>
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-16">
              The executive and academic team of Agaro High School, overseeing the rigorous journey of our scholars.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Profile 1 */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-44 shrink-0 rounded-2xl overflow-hidden bg-white/10 shadow-lg border border-white/5">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Ms. Selamawit Tadesse" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-1">Vice Principal</p>
                  <h3 className="font-serif text-2xl font-bold mb-4">Ms.<br/>Selamawit<br/>Tadesse</h3>
                  <ul className="space-y-3">
                    {['Curriculum Innovations', 'Teacher Development', 'Administrative Operations'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-xs text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full border border-[#FFDEA4]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Profile 2 */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-44 shrink-0 rounded-2xl overflow-hidden bg-white/10 shadow-lg border border-white/5">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Mr. Dawit Lemma" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-1">Vice Principal</p>
                  <h3 className="font-serif text-2xl font-bold mb-4">Mr.<br/>Dawit<br/>Lemma</h3>
                  <ul className="space-y-3">
                    {['Student Disciplinary Affairs', 'Extracurricular Programs', 'Alumni Relations Networks'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-xs text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full border border-[#FFDEA4]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent"></div>
        </section>

        {/* DEPARTMENT HEADS */}
        <section className="px-8 py-20 lg:px-16 lg:py-24 max-w-6xl mx-auto text-center">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-3">Academic Core</p>
          <h2 className="font-serif text-4xl font-bold text-[#033327] mb-16">Department Heads</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                dept: 'Science', name: 'Dr. Hirut Zewdu', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
                desc: 'Pioneering new methods in lab protocols and practical research for advanced students.'
              },
              {
                dept: 'Mathematics', name: 'Prof. Yonas Bekele', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
                desc: 'Leading advanced calculus curricula and coordinating regional math olympiads.'
              },
              {
                dept: 'Languages', name: 'Ms. Bethlehem Tadesse', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
                desc: 'Championing multilingual development and diverse literature integration.'
              },
              {
                dept: 'Humanities', name: 'Mr. Samuel Tulu', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
                desc: 'Expert in historical archives, overseeing modern civic studies and global history.'
              }
            ].map((d, i) => (
              <div key={i} className="group rounded-[3rem] p-6 py-10 flex flex-col items-center border bg-white border-[#e5e1d8] text-[#033327] shadow-sm hover:bg-[#033327] hover:border-[#033327] hover:text-white hover:shadow-xl transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white/20 bg-gray-100">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-[#FFDEA4]">{d.dept}</p>
                <h3 className="font-serif text-lg font-bold mb-4">{d.name}</h3>
                <p className="text-xs text-center leading-relaxed text-gray-500 group-hover:text-white/80 transition-colors duration-300">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INSTITUTIONAL SECRETARIAT */}
        <section className="px-8 pb-24 lg:px-16 max-w-5xl mx-auto">
          <div className="bg-[#EFE8DC]/60 rounded-[2rem] p-10 lg:p-14 border border-[#e5e1d8]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-widest mb-2">Facility Log</p>
                <h2 className="font-serif text-3xl font-bold text-[#033327] mb-2">Institutional Secretariat</h2>
                <p className="text-sm text-gray-600">The operational backbone of the Living Archive.</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-[#033327] shadow-sm border border-[#e5e1d8]">
                RECORDS DATED <span className="text-[#FFDEA4]">1974 - 2024</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { role: 'Registrar', name: 'Mrs. Aster Mekuria', desc: 'Admissions, Transcripts, and Academic Records', room: '104' },
                { role: 'Financial Secretary', name: 'Mr. Girma Tekle', desc: 'Tuition, Scholarships, and Resource Planning', room: '20A' },
                { role: 'Director of Archives', name: 'Ms. Hiwot Hailu', desc: 'Heritage, Archive Direction, and Historical Appraisal', room: '30B' },
              ].map((s, i) => (
                <div key={i} className="flex items-center flex-wrap gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#e5e1d8] hover:border-[#FFDEA4] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#033327] flex items-center justify-center shrink-0">
                    <span className="font-serif font-bold text-[#FFDEA4]">{s.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-xs text-gray-500 mb-0.5 font-medium"><span className="text-[#033327] font-bold">{s.role}</span> — {s.name}</p>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                  <div className="px-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#e5e1d8] text-center min-w-[90px]">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Office Number</p>
                    <p className="font-serif font-bold text-[#033327]">{s.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
