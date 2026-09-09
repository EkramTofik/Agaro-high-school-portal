// Legacy page (full lower sections)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Newspaper, PhoneCall, Trophy, Calendar, Landmark } from 'lucide-react';
import api from '../api/axios';

export default function LegacyPage() {
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [studentVoices, setStudentVoices] = useState([]);

  useEffect(() => {
    api.get('/event').then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setEvents((Array.isArray(payload) ? payload : [payload]).filter(Boolean)
        .filter((event) => event.eventDate)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)));
    }).catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    api.get('/gallary').then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setGalleryItems((Array.isArray(payload) ? payload : [payload])
        .filter((item) => item?.imageUrl)
        .slice(0, 8));
    }).catch(() => setGalleryItems([]));
  }, []);

  useEffect(() => {
    api.get('/studentVoice').then(({ data }) => {
      const payload = data?.data?.data || data?.data || [];
      setStudentVoices((Array.isArray(payload) ? payload : [payload])
        .filter((voice) => voice?.isFeatured !== false && voice?.imageUrl)
        .slice(0, 5));
    }).catch(() => setStudentVoices([]));
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a] font-body">
      {/* ── AGARO CHAMPIONS ── */}
      <section className="bg-[#033327] py-24 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Agaro Champions</h2>
              <p className="text-[13px] text-white/70 leading-relaxed font-serif italic">Our varsity teams embody the grit and grace of the Agaro spirit. From the pitch to the track, we compete with honor.</p>
            </div>
            <button className="border border-white/20 px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#033327] transition-colors shrink-0">VIEW ALL TEAMS</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" alt="Football" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8"><h3 className="font-serif text-2xl font-bold mb-2">Varsity Football</h3><p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">Regional Champions 2023</p></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img src="https://images.unsplash.com/photo-1552674605-15c2145efa38?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" alt="Athletics" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8"><h3 className="font-serif text-2xl font-bold mb-2">Athletics</h3><p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">National Record, 400m Relay</p></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[450px] group shadow-lg">
              <img src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" alt="Volleyball" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#033327] via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8"><h3 className="font-serif text-2xl font-bold mb-2">Volleyball</h3><p className="text-[9px] font-bold text-[#FFDEA4] uppercase tracking-[0.2em]">The Grand Slams '22</p></div>
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 rounded-3xl p-10 md:p-14 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-10 justify-center md:justify-start"><Trophy size={18} className="text-[#FFDEA4]" /><h3 className="font-serif text-xl font-bold text-[#FFDEA4]">The Trophy Room</h3></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div><div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">24</div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">Inter-High Cup</p></div>
              <div><div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">12</div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">League Shield</p></div>
              <div><div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">08</div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">Most Improved Team</p></div>
              <div><div className="w-14 h-14 rounded-full bg-[#FFDEA4] text-[#033327] font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">07</div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">Centennial Excellence</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SCHOLASTIC CALENDAR ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 flex flex-col">
            <h2 className="font-serif text-3xl font-bold text-[#033327] mb-4">The Scholastic Calendar</h2>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-10 max-w-md">Marking the rhythm of our community. These are the events that steer our academic year.</p>
            <div className="bg-[#F6F4EB] rounded-3xl p-8 border border-[#e5e1d8] shadow-sm mt-auto">
              <Calendar size={20} className="text-[#b5985b] mb-4" />
              <h3 className="font-serif text-lg font-bold text-[#033327] mb-2">Upcoming: Alumni</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">Registration for the Centennial Alumni network currently underway. Check actively for scheduled meetups.</p>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col">
            {events.slice(0, 4).map((event) => {
              const date = new Date(event.eventDate);
              return (
              <div key={event._id} className="flex items-center gap-6 border-b border-[#e5e1d8] py-8 group cursor-pointer hover:border-[#b5985b] transition-colors first:pt-0">
                <div className="text-center shrink-0 w-16">
                  <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-[0.2em] mb-1">{date.toLocaleString('en-US', { month: 'short' }).toUpperCase()}</p>
                  <p className="font-serif text-4xl font-bold text-[#033327]">{String(date.getDate()).padStart(2, '0')}</p>
                </div>
                <div className="flex-1 px-4">
                  <h4 className="font-serif text-[1.25rem] font-bold text-[#033327] mb-1.5 group-hover:text-[#b5985b] transition-colors">{event.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-md">{event.desc}</p>
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#b5985b] transition-colors shrink-0" strokeWidth={3} />
              </div>
              );
            })}
            {!events.length && <p className="py-8 text-sm text-gray-500">No upcoming events have been scheduled.</p>}
          </div>
        </div>
      </section>

      {/* ── LIVING GALLERY ── */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#e5e1d8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="font-serif text-3xl font-bold text-[#033327] mb-2">Living Gallery</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Moments that define our collective memory.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((column) => (
              <div key={column} className={`flex flex-col gap-4 md:gap-6 ${column % 2 ? 'pt-0 md:pt-12' : ''}`}>
                {galleryItems.filter((_, index) => index % 4 === column).map((item, index) => (
                  <div key={item._id || index} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={item.imageUrl} className={`w-full object-cover ${index % 2 ? 'h-64' : 'h-48'}`} alt={item.title || 'Gallery asset'} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {!galleryItems.length && <p className="mt-6 text-sm text-gray-500">No gallery assets have been added yet.</p>}
        </div>
      </section>

      {/* ── STUDENT VOICE ── */}
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-t border-[#e5e1d8]">
        <h2 className="font-serif text-3xl font-bold text-[#033327] mb-5">Student Voice</h2>
        <p className="font-serif italic text-[15px] text-gray-500 mb-16">"By the students, for the legacy. We lead to serve the future of Agaro."</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-20">
          {studentVoices.map((student) => (
            <div key={student._id} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#e5e1d8] p-1 mb-5 shadow-sm bg-white hover:border-[#b5985b] transition-colors cursor-pointer">
                <img src={student.imageUrl} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt={student.fullName} />
              </div>
              <h4 className="font-serif text-[15px] font-bold text-[#033327] mb-1.5">{student.fullName}</h4>
              <p className="text-[8px] font-bold text-[#62b993] uppercase tracking-[0.2em]">{student.role}</p>
            </div>
          ))}
        </div>
        {!studentVoices.length && <p className="mt-6 text-sm text-gray-500">No student voices have been added yet.</p>}
      </section>

      {/* ── RIGHTS & RESPONSIBILITY ── */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#e5e1d8] relative overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-12"><Landmark size={800} className="text-[#033327]" /></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-[#F6F4EB] rounded-[3rem] p-12 md:p-20 border border-[#e5e1d8] shadow-sm">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-[#033327] mb-6">Rights &amp; Responsibility</h2>
              <div className="w-16 h-px bg-[#b5985b] mx-auto"></div>
            </div>
            <div className="space-y-12 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center gap-4 mb-4"><div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div><h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">I. THE RIGHT TO INQUIRY</h4></div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">Every student at Agaro High School is entitled to an environment free from prejudice, where the pursuit of knowledge is protected and curiosity is treated with the utmost respect by faculty and peers alike.</p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4"><div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div><h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">II. THE BURDEN OF INTEGRITY</h4></div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">Honor is our highest currency. Academic honesty and personal accountability are the twin pillars of our code. Any act of plagiarism or deceit is a stain upon the collective archives of our institution.</p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4"><div className="w-1.5 h-1.5 bg-[#b5985b] rotate-45"></div><h4 className="text-[10px] font-bold text-[#033327] uppercase tracking-[0.2em]">III. STEWARDSHIP OF LEGACY</h4></div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-5.5">Our students are the temporary custodians of a century‑old heritage. Respect for the school's physical grounds, its historic archives, and the reputation of its alumni is a non‑negotiable expectation.</p>
              </div>
            </div>
            <div className="mt-20 pt-10 border-t border-[#e5e1d8] text-center">
              <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">Adopted by the Agaro Board of Trustees, September 1954<br/>Reaffirmed for the Centennial Year 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
