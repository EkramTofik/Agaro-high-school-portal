import React, { useState } from 'react'
import { MapPin, Award, FileText, Archive, ArrowRight, Trophy, Users, X } from 'lucide-react'

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('The Hall of Fame')
  const [isMemoirModalOpen, setIsMemoirModalOpen] = useState(false)
  const [isHonorRollModalOpen, setIsHonorRollModalOpen] = useState(false)
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)

  const sidebarLinks = [
    { name: 'The Hall of Fame', icon: MapPin, href: '#hall-of-fame' },
    { name: 'Distinguished Alumni', icon: Award, href: '#alumni' },
    { name: 'Architects of Minds', icon: FileText, href: '#architects' },
    { name: 'The Archives', icon: Archive, href: '#archives' },
  ]

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] pt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 lg:border-r border-[#e5e1d8] px-6 lg:pr-8 py-8 lg:py-12 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <h2 className="font-serif text-2xl font-bold text-[#033327] mb-1">Agaro Archive</h2>
            <p className="text-[8px] font-bold text-[#b5985b] uppercase tracking-[0.2em]">DISCOVER THE HERITAGE</p>
          </div>
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            {sidebarLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider px-4 py-3 rounded-lg transition-colors whitespace-nowrap lg:whitespace-normal shrink-0 ${
                  activeTab === link.name 
                    ? 'bg-[#e9e6df] text-[#033327]' 
                    : 'text-gray-500 hover:bg-[#e9e6df]/50 hover:text-[#033327]'
                }`}
              >
                <link.icon size={16} className={activeTab === link.name ? 'text-[#b5985b]' : 'text-gray-400'} />
                {link.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:pl-16 py-8 lg:py-12">
          
          {/* Section 1: The Hall of Fame */}
          <section id="hall-of-fame" className="mb-24 lg:mb-32 pt-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.25em] mb-4">CULTURAL BEACON</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#033327] mb-6">The Hall of Fame</h1>
              <p className="text-[13px] text-gray-500 italic font-serif leading-relaxed max-w-xl mx-auto">
                Throughout its history, Agaro has seen leaders, scholars, and innovators who have shaped the nation. The living archive preserves the excellence we nurture. The Hall of Fame stands as proof.
              </p>
            </div>

            {/* Feature Card */}
            <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden max-w-4xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e5e1d8]">
              {/* Left Image */}
              <div className="md:w-1/2 relative bg-gray-200 min-h-[300px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 text-[7px] font-bold text-[#033327] uppercase tracking-[0.2em] z-10 rounded-b-md shadow-sm whitespace-nowrap">
                  AGARO HIGH SCHOOL - DEPT. OF HISTORICAL ARCHIVES
                </div>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-90" alt="Dr. Selamawit Bekele" />
                <div className="absolute inset-0 bg-[#033327]/10 mix-blend-multiply"></div>
              </div>
              {/* Right Content */}
              <div className="md:w-1/2 bg-[#dce8de] p-10 md:p-12 flex flex-col justify-center">
                <p className="text-[8px] font-bold text-[#86a78f] uppercase tracking-widest mb-1">FOUNDER & HEADMISTRESS</p>
                <h3 className="font-serif text-[1.75rem] font-bold text-[#033327] mb-1">Dr. Selamawit Bekele</h3>
                <p className="text-[9px] text-[#033327]/60 font-bold uppercase tracking-wider mb-8">Served 1965 - 1982 | Addis Ababa, Ethiopia</p>
                
                <div className="border-l-2 border-[#b5985b] pl-5 mb-6">
                  <p className="font-serif italic text-[13px] text-[#033327] leading-relaxed">
                    "True education transcends the classroom. It is the steadying force that shapes a nation, and the gentle hand that guides an individual."
                  </p>
                </div>
                
                <p className="text-[11px] text-[#033327]/80 leading-relaxed mb-8">
                  Dr. Selamawit Bekele founded Agaro High School with the vision of establishing an institution that would cultivate not just academic rigor, but profound philosophical inquiry. Her early initiatives shaped the foundational principles of study.
                </p>
                
                <button 
                  onClick={() => setIsMemoirModalOpen(true)}
                  className="text-[9px] font-bold text-[#033327] uppercase tracking-[0.2em] flex items-center gap-1.5 hover:text-[#b5985b] transition-colors mt-auto">
                  READ HER MEMOIRS <ArrowRight size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Distinguished Alumni */}
          <section id="alumni" className="mb-24 lg:mb-32 pt-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between border-b border-[#e5e1d8] pb-4 mb-10">
                <h2 className="font-serif text-2xl font-bold text-[#033327]">Distinguished Alumni</h2>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">LEADERS IN SOCIETY</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ato Mulu Getahun', role: 'MINISTER OF EDUCATION (1998)', desc: 'Spearheaded regional education reform policies with a vision heavily influenced by his formative years at Agaro High.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
                  { name: 'Wzro. Tigist S.', role: 'CEO, PAN-AFRICAN BANK', desc: 'Starting from the Agaro commerce club, she went on to redefine financial empowerment across the continent.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300' },
                  { name: 'Dr. Dawit Bekele', role: 'MEDICAL RESEARCHER', desc: 'A global innovator in epidemiology, leading research initiatives that continue to save millions of lives.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300' }
                ].map((alumni, i) => (
                  <div key={i} className="bg-[#F6F4EB] border border-[#e5e1d8] p-7 rounded-2xl relative shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#b5985b] transition-colors group flex flex-col">
                    <div className="w-14 h-14 rounded-full border-[3px] border-[#d8c596] p-0.5 mb-5 shadow-sm bg-white">
                      <img src={alumni.img} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={alumni.name} />
                    </div>
                    <h3 className="font-serif text-[15px] font-bold text-[#033327] mb-1.5">{alumni.name}</h3>
                    <p className="text-[7px] font-bold text-[#62b993] uppercase tracking-[0.2em] mb-4">{alumni.role}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed flex-1">{alumni.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Architects of Minds */}
          <section id="architects" className="mb-24 lg:mb-32 pt-8">
            <div className="bg-[#F6F4EB] rounded-[3rem] p-10 md:p-16 max-w-5xl mx-auto shadow-sm border border-[#e5e1d8]">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl font-bold text-[#033327] mb-2">The Architects of Minds</h2>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">BUILDERS OF INTELLECT</p>
              </div>
              
              <div className="space-y-16">
                {/* Person 1 */}
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                  <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-[#d8c596] p-1 shrink-0 shadow-lg bg-white">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" className="w-full h-full rounded-full object-cover grayscale opacity-90" alt="Ato Kaleb Desta" />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-4">
                      <h3 className="font-serif text-[1.75rem] font-bold text-[#033327] leading-none">Ato Kaleb Desta</h3>
                      <span className="text-[8px] font-bold text-[#b5985b] uppercase tracking-[0.2em] md:mb-1">Head of Sciences | 1990s</span>
                    </div>
                    <p className="font-serif italic text-sm text-[#033327] leading-relaxed mb-5 border-l-2 border-[#b5985b] pl-4">
                      "Education is not the filling of a pail, but the lighting of a fire. The laboratory was our hearth and logic."
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-xl">
                      Ato Kaleb's tenure saw Agaro High School win the National Science Fair three times. His rigorous methodology continues to influence the modern curriculum, blending deep theoretical frameworks with hands-on practice.
                    </p>
                  </div>
                </div>
                
                {/* Person 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-14 md:text-right">
                  <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-[#d8c596] p-1 shrink-0 shadow-lg bg-white">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" className="w-full h-full rounded-full object-cover grayscale opacity-90" alt="Wzro. Almaz Tadesse" />
                  </div>
                  <div className="flex flex-col md:items-end">
                    <div className="flex flex-col md:flex-row-reverse md:items-end gap-2 md:gap-4 mb-4">
                      <h3 className="font-serif text-[1.75rem] font-bold text-[#033327] leading-none">Wzro. Almaz Tadesse</h3>
                      <span className="text-[8px] font-bold text-[#b5985b] uppercase tracking-[0.2em] md:mb-1">Languages | 1980s - 2000s</span>
                    </div>
                    <p className="font-serif italic text-sm text-[#033327] leading-relaxed mb-5 md:border-r-2 md:border-l-0 border-l-2 border-[#b5985b] md:pr-4 pl-4 md:pl-0">
                      "The soul of our history is carried in the tongue of our ancestors. To speak well is to think clearly."
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-xl">
                      Spearheading the linguistic arts division, Wzro. Almaz instilled a passion for both local dialects and global literature, bridging the gap between traditional wisdom and international readiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: The Archives */}
          <section id="archives" className="mb-12 pt-8">
            
            {/* Community Champions */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="flex items-center justify-between border-b border-[#e5e1d8] pb-4 mb-8">
                <h2 className="font-serif text-2xl font-bold text-[#033327]">Community Champions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#e9e6df] rounded-[2rem] p-8 flex flex-col shadow-sm border border-[#e5e1d8]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-6 shadow-sm border border-white">
                    <Award size={16} className="text-[#033327]" />
                  </div>
                  <h3 className="text-[11px] font-bold text-[#033327] uppercase tracking-[0.15em] mb-3">The PTA Council</h3>
                  <p className="text-[10px] text-gray-600 leading-relaxed mb-8 flex-1">
                    The unsung heroes of our developmental programs, funding new laboratories, library extensions, and student welfare initiatives throughout the decades.
                  </p>
                  <button className="text-[8px] font-bold text-[#033327] uppercase tracking-[0.2em] text-left hover:text-[#b5985b] transition-colors flex items-center gap-1">
                    READ REPORTS <ArrowRight size={10} strokeWidth={2.5} />
                  </button>
                </div>
                
                <div className="bg-[#243e36] rounded-[2rem] p-8 flex flex-col shadow-lg border border-[#1a2d27]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/5">
                    <Users size={16} className="text-white/90" />
                  </div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-3">Student Guild</h3>
                  <p className="text-[10px] text-white/70 leading-relaxed mb-8 flex-1">
                    Pioneering peer mentorship and organizing community service campaigns that cemented the school's reputation as a civic pillar.
                  </p>
                </div>
                
                <div className="bg-[#f0c356] rounded-[2rem] p-8 flex flex-col shadow-md border border-[#e5b23d]">
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mb-6 border border-white/20">
                    <Trophy size={16} className="text-[#033327]" />
                  </div>
                  <h3 className="text-[11px] font-bold text-[#033327] uppercase tracking-[0.15em] mb-3">Sports Trophies</h3>
                  <p className="text-[10px] text-[#033327]/80 leading-relaxed mb-8 flex-1">
                    From regional football cups to national athletics championships, our athletes have brought home glory and fostered unparalleled school spirit.
                  </p>
                </div>
              </div>
            </div>

            {/* THE NATIONAL HONOR ROLL */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="bg-[#F6F4EB] border border-[#e5e1d8] rounded-[2.5rem] p-10 md:p-14 shadow-sm">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-xl font-bold text-[#033327] tracking-[0.15em] uppercase mb-2">The National Honor Roll</h2>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em]">Acknowledging Outstanding Achievements</p>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-[11px] min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-[#033327]/20 text-[8px] font-bold text-[#033327] uppercase tracking-[0.15em]">
                        <th className="py-4 px-4 w-20">Rank</th>
                        <th className="py-4 px-4">Student Name</th>
                        <th className="py-4 px-4">Year Span</th>
                        <th className="py-4 px-4">Accomplishment</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-[#e5e1d8] hover:bg-white/50 transition-colors">
                        <td className="py-5 px-4 font-bold text-[#b5985b]">1ST</td>
                        <td className="py-5 px-4 font-bold text-[#033327]">Ephrem Tilahun</td>
                        <td className="py-5 px-4 font-serif">1974 - 1978</td>
                        <td className="py-5 px-4">AAU, Doctor of Philosophy</td>
                      </tr>
                      <tr className="border-b border-[#e5e1d8] hover:bg-white/50 transition-colors">
                        <td className="py-5 px-4 font-bold text-[#b5985b]">2ND</td>
                        <td className="py-5 px-4 font-bold text-[#033327]">Fikre Bekele</td>
                        <td className="py-5 px-4 font-serif">1982 - 1986</td>
                        <td className="py-5 px-4">Space Aviation College</td>
                      </tr>
                      <tr className="border-b border-[#e5e1d8] hover:bg-white/50 transition-colors">
                        <td className="py-5 px-4 font-bold text-[#b5985b]">3RD</td>
                        <td className="py-5 px-4 font-bold text-[#033327]">Abebe Worku</td>
                        <td className="py-5 px-4 font-serif">1995 - 1999</td>
                        <td className="py-5 px-4">Cambridge Univ, Engineering</td>
                      </tr>
                      <tr className="border-b border-[#e5e1d8] hover:bg-white/50 transition-colors">
                        <td className="py-5 px-4 font-bold text-[#b5985b]">4TH</td>
                        <td className="py-5 px-4 font-bold text-[#033327]">Samuel Tadesse</td>
                        <td className="py-5 px-4 font-serif">2001 - 2005</td>
                        <td className="py-5 px-4">Harvard University, Public Health</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setIsHonorRollModalOpen(true)}
                    className="border border-[#b5985b] text-[#033327] px-6 py-2.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] hover:bg-[#b5985b] hover:text-white transition-colors">
                    VIEW FULL HONOR ROLL
                  </button>
                </div>
              </div>
            </div>

            {/* Contribute to the Living Archive */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-white border border-[#e5e1d8] rounded-[2.5rem] p-12 text-center relative shadow-sm">
                <div className="absolute top-8 right-8 opacity-5">
                  <FileText size={80} className="text-[#033327]" />
                </div>
                <h2 className="font-serif text-[1.75rem] font-bold text-[#033327] mb-4">Contribute to the Living Archive</h2>
                <p className="text-[11px] text-gray-500 leading-relaxed max-w-md mx-auto mb-10">
                  Do you have an old photograph, a textbook from the 60s, or a memory? Help us build the most comprehensive digital archive of Agaro High School's legacy.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                  <button 
                    onClick={() => setIsDonateModalOpen(true)}
                    className="bg-[#033327] text-white px-8 py-3.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#0d4a3b] transition-colors shadow-md">
                    DONATE ARTIFACT
                  </button>
                  <button 
                    onClick={() => setIsStoryModalOpen(true)}
                    className="bg-transparent border border-[#033327] text-[#033327] px-8 py-3.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#FAF8F5] transition-colors">
                    SHARE A STORY
                  </button>
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>

      {/* Memoir Modal */}
      {isMemoirModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-white">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Excerpt</p>
                <h3 className="font-serif text-2xl font-bold text-[#033327]">The Bekele Memoirs</h3>
              </div>
              <button 
                onClick={() => setIsMemoirModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 text-[#1a1a1a]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-[#e5e1d8]">
                  <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover grayscale opacity-90" alt="Dr. Selamawit Bekele" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#033327]">Dr. Selamawit Bekele</h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Entry from 1974</p>
                </div>
              </div>

              <div className="space-y-6 font-serif leading-relaxed text-[15px] text-gray-700">
                <p>
                  "When we laid the first stone for Agaro High School, it was not merely brick and mortar we were assembling, but the very scaffolding of a future society. I watched the first cohort of students walk through those wooden gates, their faces a mixture of trepidation and boundless hope."
                </p>
                <p>
                  "True education transcends the classroom. It is the steadying force that shapes a nation, and the gentle hand that guides an individual. I have always believed that if we teach them to question the world with courage, they will rebuild it with compassion."
                </p>
                <p>
                  "There were days when the funds ran low, when the rains flooded the lower courtyards, and when political tides threatened our autonomy. But the spirit of Agaro was never confined to its walls. It lives in the relentless intellectual curiosity of our youth. To them, I dedicate my life's work."
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Honor Roll Modal */}
      {isHonorRollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Agaro Archives</p>
                <h3 className="font-serif text-2xl font-bold text-[#033327]">Full National Honor Roll</h3>
              </div>
              <button 
                onClick={() => setIsHonorRollModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-0 overflow-y-auto flex-1">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-[#FAF8F5] border-b border-[#e5e1d8] sticky top-0 z-10">
                  <tr>
                    <th className="py-4 px-6 font-bold text-gray-500 uppercase tracking-widest">Rank</th>
                    <th className="py-4 px-6 font-bold text-gray-500 uppercase tracking-widest">Student Name</th>
                    <th className="py-4 px-6 font-bold text-gray-500 uppercase tracking-widest">Year Span</th>
                    <th className="py-4 px-6 font-bold text-gray-500 uppercase tracking-widest">Accomplishment</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    { rank: '1ST', name: 'Ephrem Tilahun', years: '1974 - 1978', desc: 'AAU, Doctor of Philosophy' },
                    { rank: '2ND', name: 'Fikre Bekele', years: '1982 - 1986', desc: 'Space Aviation College' },
                    { rank: '3RD', name: 'Abebe Worku', years: '1995 - 1999', desc: 'Cambridge Univ, Engineering' },
                    { rank: '4TH', name: 'Samuel Tadesse', years: '2001 - 2005', desc: 'Harvard University, Public Health' },
                    { rank: '5TH', name: 'Almaz Zewde', years: '2006 - 2010', desc: 'Oxford Univ, International Law' },
                    { rank: '6TH', name: 'Kaleb Getachew', years: '2012 - 2016', desc: 'Tech Entrepreneur, Forbes 30 under 30' },
                    { rank: '7TH', name: 'Sara Yosef', years: '2017 - 2021', desc: 'National Journalism Award Winner' },
                    { rank: '8TH', name: 'Lila Vance', years: '2022 - Present', desc: 'Rhodes Scholar Candidate' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#e5e1d8] hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 font-bold text-[#b5985b]">{row.rank}</td>
                      <td className="py-5 px-6 font-bold text-[#033327] text-sm">{row.name}</td>
                      <td className="py-5 px-6 font-serif text-sm">{row.years}</td>
                      <td className="py-5 px-6 text-[12px]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-[#e5e1d8] bg-[#FAF8F5] text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                End of Current Records (1974 - Present)
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Donate Artifact Modal */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Contribute</p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">Donate an Artifact</h3>
              </div>
              <button 
                onClick={() => setIsDonateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsDonateModalOpen(false);
                alert('Thank you! Your artifact donation request has been submitted to the archives department.');
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Your Name</label>
                <input required type="text" placeholder="John Doe" className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Artifact Type</label>
                <select required className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors">
                  <option value="">Select type...</option>
                  <option value="photo">Photograph</option>
                  <option value="document">Document / Letter</option>
                  <option value="book">Textbook / Publication</option>
                  <option value="other">Other Physical Item</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Estimated Year</label>
                <input required type="text" placeholder="e.g. 1978" className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Brief Description</label>
                <textarea required rows="3" placeholder="Tell us about the artifact and its significance..." className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors resize-none"></textarea>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="w-full py-3 rounded-lg font-bold text-[11px] text-white bg-[#033327] uppercase tracking-[0.2em] hover:bg-[#044a38] transition-colors">
                  Submit Donation Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share a Story Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">Contribute</p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">Share a Memory</h3>
              </div>
              <button 
                onClick={() => setIsStoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsStoryModalOpen(false);
                alert('Thank you! Your story has been submitted for review by the archives team.');
              }}
              className="p-6 space-y-4"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Your Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors" />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Graduation Year</label>
                  <input type="text" placeholder="e.g. 1995" className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Title of your story</label>
                <input required type="text" placeholder="A day in the Great Hall..." className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">Your Story</label>
                <textarea required rows="6" placeholder="Write your memory here..." className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors resize-none"></textarea>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="w-full py-3 rounded-lg font-bold text-[11px] text-[#033327] bg-[#b5985b] uppercase tracking-[0.2em] hover:bg-[#cba86b] transition-colors">
                  Submit to Archives
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
