import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center px-6 py-20 text-[#1a1a1a]">
      <div className="max-w-2xl w-full text-center">
        
        {/* Error Code */}
        <div className="relative inline-block mb-6">
          <h1 className="font-serif text-8xl md:text-9xl font-bold text-[#033327] opacity-10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#033327]">Page Not Found</h2>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in our archives.
        </p>

        {/* Search Suggestion */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center gap-2 bg-white border border-[#e5e1d8] rounded-full px-4 py-3 shadow-sm focus-within:border-[#b5985b] focus-within:ring-1 focus-within:ring-[#b5985b] transition-all">
            <Search className="text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search our website..." 
              className="flex-1 bg-transparent text-sm outline-none text-[#1a1a1a] placeholder:text-gray-400"
            />
            <button className="text-[10px] font-bold text-[#033327] uppercase tracking-widest hover:text-[#b5985b] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e5e1d8] text-[#033327] font-semibold rounded-lg hover:border-[#FFDEA4] hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-3 bg-[#033327] text-white font-semibold rounded-lg hover:bg-[#0d4a3b] transition-all w-full sm:w-auto justify-center shadow-md"
          >
            <Home size={16} /> Return Home
          </Link>
        </div>

      </div>
    </div>
  )
}
