import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import api from "../api/axios";

export default function NewsDetailPage() {
  const { slug: id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadArticle = async () => {
      try {
        // Try single-article endpoint
        try {
          const res = await api.get(`/news/${id}`);
          const data =
            res.data?.data?.news ||
            res.data?.data?.data ||
            res.data?.data ||
            res.data;

          if (!cancelled) {
            setArticle(Array.isArray(data) ? data[0] : data);
            setError("");
            setLoading(false);
          }
          return;
        } catch {
          // fall through to list lookup
        }

        // Fallback: published list
        const res = await api.get("/news/published-news");
        const list = res.data?.data?.news ?? [];
        const found = list.find((n) => n._id === id || n.slug === id);

        if (!cancelled) {
          if (found) {
            setArticle(found);
            setError("");
          } else {
            setArticle(null);
            setError("Article not found.");
          }
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setArticle(null);
          setError("Could not load this article.");
          setLoading(false);
        }
      }
    };

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center text-gray-400">
        Loading article…
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-red-500">{error || "Article not found."}</p>
        <button
          onClick={() => navigate("/news")}
          className="text-sm font-bold text-[#033327] uppercase tracking-wider"
        >
          ← Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1a1a1a]">
      <div className="bg-[#033327] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/news")}
            className="flex items-center gap-2 text-[#FFDEA4] text-xs font-bold uppercase tracking-wider mb-6 hover:opacity-80"
          >
            <ArrowLeft size={14} /> Back to News
          </button>

          {article.category && (
            <span className="inline-block px-3 py-1 bg-white/10 text-[#FFDEA4] text-[10px] font-bold uppercase tracking-widest rounded mb-4">
              {article.category}
            </span>
          )}

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-white/60 text-sm flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(article.publishedAt || article.createdAt)}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full rounded-2xl border border-[#e5e1d8] mb-10 object-cover max-h-[420px]"
          />
        )}

        {article.summary && (
          <p className="text-lg text-gray-600 italic mb-8 leading-relaxed border-l-4 border-[#b5985b] pl-4">
            {article.summary}
          </p>
        )}

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {article.body}
        </div>
      </div>
    </div>
  );
}
