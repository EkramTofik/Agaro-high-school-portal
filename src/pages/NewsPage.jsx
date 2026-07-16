import React, { useState, useMemo } from 'react'
import { Search, Calendar, ChevronRight } from 'lucide-react'

const ALL_NEWS = [
  {
    id: 1,
    title: "Annual Founder's Day Commemoration",
    category: "General",
    date: "Oct 24, 2024",
    urgent: true,
    desc: "Join us as we celebrate 70 years of academic excellence and community impact with special guest speakers and performances.",
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "National Science Fair Winners",
    category: "Academic",
    date: "Oct 18, 2024",
    urgent: false,
    desc: "Congratulations to our senior robotics team for taking first place in the regional technology showcase. They will be moving to the national finals.",
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Championship Finals Scheduled",
    category: "Athletics",
    date: "Oct 15, 2024",
    urgent: false,
    desc: "The Agaro Eagles are heading to the state finals. Get your tickets now to support our student athletes in their historic run.",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "New Library Wing Opening",
    category: "Campus",
    date: "Oct 10, 2024",
    urgent: false,
    desc: "The newly renovated East Wing of the library opens next week, featuring state-of-the-art research terminals and quiet study zones.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Alumni Scholarship Fund Announcement",
    category: "Alumni",
    date: "Oct 05, 2024",
    urgent: false,
    desc: "The Class of 1998 has generously donated to establish a new scholarship fund for promising students in the arts and humanities.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "End of Semester Exam Schedule",
    category: "Academic",
    date: "Sep 28, 2024",
    urgent: true,
    desc: "The final examination schedule for the Fall semester has been released. Please check the student portal for your specific time slots.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  }
]

const CATEGORIES = ["All", "Academic", "Athletics", "Campus", "Alumni", "General"]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = useMemo(() => {
    return ALL_NEWS.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            news.desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "All" || news.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="bg-[#033327] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <p className="text-[10px] font-bold text-[#FFDEA4] uppercase tracking-[0.25em] mb-4">The Campus Pulse</p>
          <h1 className="font-serif text-5xl md:text-[4rem] font-bold text-white mb-6 tracking-tight">News & Announcements</h1>
          <p className="text-sm text-white/70 italic max-w-2xl mx-auto font-serif leading-relaxed">
            Stay informed with the latest developments, upcoming events, and stories from our vibrant student and alumni community.
          </p>
        </div>
      </div>

      {/* ── CONTROLS ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#e5e1d8] flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#033327] text-white shadow-md' 
                    : 'bg-[#FAF8F5] text-gray-600 hover:bg-[#e5e1d8] border border-[#e5e1d8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#033327] transition-colors" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full md:w-64 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#b5985b] focus:ring-1 focus:ring-[#b5985b] transition-all"
            />
          </div>

        </div>
      </div>

      {/* ── NEWS GRID ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        
        {filteredNews.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#e5e1d8]">
            <p className="text-4xl mb-4">📰</p>
            <h3 className="font-serif text-2xl font-bold text-[#033327] mb-2">No articles found</h3>
            <p className="text-gray-500">We couldn't find any news matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(news => (
              <div key={news.id} className="bg-white border border-[#e5e1d8] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="h-56 overflow-hidden relative">
                  {news.urgent && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest rounded shadow-md">
                      Urgent Notice
                    </div>
                  )}
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-[#e5e1d8] text-gray-700 text-[9px] font-bold uppercase tracking-widest rounded">
                      {news.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                      <Calendar size={12}/> {news.date}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-[#033327] mb-3 group-hover:text-[#b5985b] transition-colors leading-tight">
                    {news.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-1">
                    {news.desc}
                  </p>
                  
                  <button className="flex items-center gap-2 text-xs font-bold text-[#033327] hover:text-[#b5985b] transition-colors mt-auto w-max uppercase tracking-wider">
                    Read Article <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
