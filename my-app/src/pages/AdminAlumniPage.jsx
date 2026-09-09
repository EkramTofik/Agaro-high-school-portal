import React, { useState, useEffect, useMemo } from 'react'
import api from '../api/axios'
import AdminFormModal from '../components/AdminFormModal'
import AdminConfirmModal from '../components/AdminConfirmModal'
import AdminFilters, { matchesSearch } from '../components/AdminFilters'

/* ── Shared admin sidebar icons (inline SVG) ─── */
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
  shield: <svg width="12" height="12" viewBox="0 0 24 24" fill="#b5985b" stroke="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  edit: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  filter: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  userPlus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
}


export default function AdminAlumniPage() {
  const [category, setCategory] = useState('')
  const [featured, setFeatured] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Year')
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formAlumnus, setFormAlumnus] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const loadAlumni = () => {
    setLoading(true); setError('')
    return api.get('/alumni').then((res) => {
      const payload = res.data?.data?.data ?? res.data?.data ?? []
      setAlumni((Array.isArray(payload) ? payload : [payload]).filter(Boolean).map((item) => ({
        id: item._id, raw: item, name: item.fullName || 'Unnamed alumnus', field: item.profession || 'General',
        year: item.graduationYear || '—', tag: item.graduationYear ? `CLASS OF ${item.graduationYear}` : 'ALUMNI',
        desc: item.bio || item.company || 'No biography provided.', img: item.imageUrl || '',
        isFeatured: Boolean(item.isFeatured),
      })))
    }).catch(() => setError('Could not load alumni records.')).finally(() => setLoading(false))
  }

  useEffect(() => { loadAlumni() }, [])
  const addAlumnus = () => setFormAlumnus({})
  const editAlumnus = (a) => setFormAlumnus(a.raw || a)
  const saveAlumnus = async (values) => {
    setSaving(true)
    try { await (formAlumnus?._id ? api.patch(`/alumni/${formAlumnus._id}`, values) : api.post('/alumni', values)); setFormAlumnus(null); await loadAlumni() }
    catch (e) { setError(e.response?.data?.message || 'Could not save alumni record.') }
    finally { setSaving(false) }
  }
  const deleteAlumnus = async (a) => {
    setConfirmDelete({ message: `Delete ${a.name}?`, action: async () => { try { await api.delete(`/alumni/${a.id}`); await loadAlumni() } catch (e) { setError(e.response?.data?.message || 'Could not delete alumni record.') } } })
  }

  const filteredAlumni = useMemo(() => {
    const list = alumni.filter((a) => {
      if (!matchesSearch(a, search, ['name', 'field', 'desc', 'year'])) return false
      if (category && a.field !== category) return false
      if (featured === 'true' && !a.isFeatured) return false
      if (featured === 'false' && a.isFeatured) return false
      return true
    })
    return [...list].sort((a, b) => sort === 'Name' ? a.name.localeCompare(b.name) : String(b.year).localeCompare(String(a.year)))
  }, [alumni, category, featured, search, sort])

  return (
    <div className="bg-[#f4f1ec]">
      {formAlumnus !== null && <AdminFormModal title={formAlumnus._id ? 'Edit alumni profile' : 'Add alumni profile'} initialValues={formAlumnus} onClose={() => setFormAlumnus(null)} onSubmit={saveAlumnus} submitting={saving} fields={[
        { name: 'fullName', label: 'Full name', required: true },
        { name: 'graduationYear', label: 'Graduation year', type: 'number', integer: true, min: 1900, max: 2100 },
        { name: 'profession', label: 'Profession', type: 'select', emptyValue: null, options: [
          { value: 'Science & Medicine', label: 'Science & Medicine' },
          { value: 'Public Affairs', label: 'Public Affairs' },
          { value: 'Technology & Business', label: 'Technology & Business' },
          { value: 'Fine Arts', label: 'Fine Arts' },
        ] }, { name: 'company', label: 'Company' }, { name: 'location', label: 'Location' },
        { name: 'imageUrl', label: 'Image URL', type: 'url' }, { name: 'bio', label: 'Biography', type: 'textarea' },
        { name: 'isFeatured', label: 'Featured alumnus', type: 'checkbox', defaultValue: false }
      ]} />}
      {confirmDelete && <AdminConfirmModal message={confirmDelete.message} onCancel={() => setConfirmDelete(null)} onConfirm={async () => { await confirmDelete.action(); setConfirmDelete(null) }} />}

{/* ── Main ──────────────────────────────────────────── */}
      <main className="bg-[#f4f1ec]">

        {/* Scrollable content */}
        <div className="px-10 py-10">

          {/* Hero */}
          <div className="text-center mb-8">
            <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.3em] mb-2">Honorary Records</p>
            <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-3">Hall of Fame</h1>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Celebrating the luminaries of Agaro High School. This living archive preserves the legacy of those who have achieved excellence across all disciplines.
            </p>
          </div>

          {/* Filter bar */}
          <div className="mb-7">
            <AdminFilters
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search alumni…"
              filters={[
                {
                  key: 'profession',
                  label: 'Profession',
                  value: category,
                  onChange: setCategory,
                  options: [
                    { value: '', label: 'All professions' },
                    'Science & Medicine',
                    'Public Affairs',
                    'Technology & Business',
                    'Fine Arts',
                  ],
                },
                {
                  key: 'isFeatured',
                  label: 'Featured',
                  value: featured,
                  onChange: setFeatured,
                  options: [
                    { value: '', label: 'All' },
                    { value: 'true', label: 'Featured' },
                    { value: 'false', label: 'Not featured' },
                  ],
                },
                {
                  key: 'sort',
                  label: 'Sort by',
                  value: sort,
                  onChange: setSort,
                  options: [
                    { value: 'Year', label: 'Year' },
                    { value: 'Name', label: 'Name' },
                  ],
                },
              ]}
              resultCount={filteredAlumni.length}
              totalCount={alumni.length}
            />
            <div className="mt-4 flex justify-end">
              <button onClick={addAlumnus} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#033327] text-[11px] font-bold text-white uppercase tracking-wider hover:bg-[#0d4a3b] transition-colors">
                {icons.userPlus} Induct New Alumni
              </button>
            </div>
          </div>

          {/* Alumni cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {loading || error || filteredAlumni.length === 0 ? (
              <p className={error ? "text-sm text-red-500" : "text-sm text-gray-500"}>
                {loading ? "Loading alumni records…" : error || "No alumni records found."}
              </p>
            ) : filteredAlumni.map((a) => (
              <div key={a.id || a.name} className="bg-white border border-[#e5e1d8] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  {/* Year tag */}
                  <span className="absolute top-3 left-3 text-[8px] font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded uppercase tracking-wider">
                    {a.tag}
                  </span>
                  {/* Edit button */}
                  <button onClick={() => editAlumnus(a)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                    {icons.edit}
                  </button>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-base font-bold text-[#1a1a1a]">{a.name}</h3>
                    <span>{icons.shield}</span>
                  </div>
                  <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-widest mb-3">{a.field}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">{a.desc}</p>
                  <div className="flex items-center justify-between border-t border-[#e5e1d8] pt-3">
                    <span className="text-[10px] text-gray-400">Inducted {a.year}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-[10px] font-bold text-[#033327] hover:text-[#b5985b] transition-colors flex items-center gap-1">Full Dossier →</button>
                      <button onClick={() => deleteAlumnus(a)} className="text-[10px] font-bold text-red-600 hover:text-red-800 transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add new card */}
          <div onClick={addAlumnus} className="border-2 border-dashed border-[#e5e1d8] rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-[#b5985b]/40 hover:bg-white/30 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full border-2 border-[#e5e1d8] flex items-center justify-center mb-4 group-hover:border-[#b5985b] group-hover:text-[#b5985b] transition-colors text-gray-300">
              <span className="text-xl font-light">+</span>
            </div>
            <p className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">Preserve a New Legacy</p>
            <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
              Click here to add an accomplished former student to the official Hall of Fame records.
            </p>
          </div>

        </div>

        {/* Footer */}
        <footer className="shrink-0 px-8 py-3 border-t border-[#e5e1d8] bg-[#f4f1ec] flex items-center justify-between">
          <p className="text-[8px] text-gray-400 uppercase tracking-widest">Est. 1962 – Agaro High School Administrative System</p>
          <div className="flex items-center gap-4">
            {['Data Privacy', 'Access Logs', 'System Status'].map(link => (
              <button key={link} className="text-[8px] font-bold text-gray-400 uppercase tracking-wider hover:text-[#033327] transition-colors">{link}</button>
            ))}
          </div>
        </footer>

      </main>
    </div>
  )
}
