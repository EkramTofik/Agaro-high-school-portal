import { useState } from "react";
import { MapPin, ZoomIn, X } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);

  const galleryItems = [
    {
      title: "Historical Campus Gate",
      category: "historic",
      date: "1972",
      location: "Main Entrance",
      image:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Chemistry Laboratory Session",
      category: "campus",
      date: "2023",
      location: "Science Block B",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Inter-School Athletics Tournament",
      category: "sports",
      date: "2021",
      location: "Jimma Stadium",
      image:
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Annual Cultural Festival",
      category: "events",
      date: "2024",
      location: "School Assembly Hall",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Inaugural Class Graduation",
      category: "historic",
      date: "1956",
      location: "Central Courtyard",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Modern IT Lab Classroom",
      category: "campus",
      date: "2022",
      location: "Admin Building 2nd Floor",
      image:
        "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Boys Football Team Championship",
      category: "sports",
      date: "2019",
      location: "Regional Sports Arena",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Tree Planting Green Initiative",
      category: "events",
      date: "2023",
      location: "South Campus Grounds",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Library Study Hall — Archives",
      category: "historic",
      date: "1988",
      location: "Main Library Building",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "historic", label: "Historic Archive" },
    { id: "campus", label: "Campus & Facilities" },
    { id: "sports", label: "Athletics & Sports" },
    { id: "events", label: "Events & Ceremonies" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxItem(null)}
          >
            <X size={20} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-serif text-lg font-semibold">
                {lightboxItem.title}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {lightboxItem.date} · {lightboxItem.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="bg-[#FAF8F5] border-b border-[#e5e1d8] pt-10 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFDEA4]/30 text-[#033327] text-xs font-semibold uppercase tracking-widest mb-4">
            Visual Archive
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#033327] mb-4">
            The Rolls of Fame
          </h1>
          <div className="w-16 h-1 bg-[#FFDEA4] mx-auto mb-6 rounded-full"></div>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Browse through seven decades of campus memories, academic
            breakthroughs, regional championships, and historical landmarks.
          </p>
        </div>
      </section>

      {/* Category Tabs + Grid */}
      <section className="max-w-7xl mx-auto px-6 py-14 pb-24">
        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                activeCategory === cat.id
                  ? "bg-[#033327] text-white border-[#033327] shadow-sm"
                  : "bg-white text-gray-500 border-[#e5e1d8] hover:border-[#033327] hover:text-[#033327]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e1d8] hover:border-[#FFDEA4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col"
              onClick={() => setLightboxItem(item)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-[#033327]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFDEA4] text-[#033327] flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={20} />
                  </div>
                </div>

                {/* Year tag */}
                <span className="absolute top-3 left-3 bg-[#FFDEA4] text-[#033327] text-xs font-bold font-serif px-3 py-1 rounded-md shadow-sm">
                  {item.date}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FFDEA4] bg-[#033327] px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#033327] leading-snug mt-2 mb-1">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-3 border-t border-[#e5e1d8] mt-3">
                  <MapPin size={12} className="text-[#FFDEA4] shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
