import React from 'react';
import { Clock, Eye, MapPin, Sparkles, Tv, ArrowRight, Bookmark } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { NewsCard } from './NewsCard';

interface LeadNewsSectionProps {
  leadArticle: NewsArticle;
  sideArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenLiveTv: () => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
}

export const LeadNewsSection: React.FC<LeadNewsSectionProps> = ({
  leadArticle,
  sideArticles,
  onSelectArticle,
  onOpenLiveTv,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!leadArticle) return null;

  return (
    <section className="mb-8">
      {/* Newspaper Section Ribbon */}
      <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-700 inline-block rounded-xs"></span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
            প্রধান সংবাদ
          </h2>
          <span className="text-xs bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded ml-2">
            আজকের শীর্ষ শিরোনাম
          </span>
        </div>
        <button
          onClick={onOpenLiveTv}
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>বরুড়া.টিভি লাইভ সম্প্রচার</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Grid: Main Big Hero Article (60%) + Side Highlights (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Big Lead Card (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            onClick={() => onSelectArticle(leadArticle)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all overflow-hidden flex-1 flex flex-col"
          >
            {/* Big Hero Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <img
                src={leadArticle.image}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded shadow-md">
                  শীর্ষ সংবাদ
                </span>
                <span className="bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded backdrop-blur-xs">
                  {leadArticle.categoryName}
                </span>
              </div>

              {/* Bookmark button on Hero */}
              <button
                onClick={(e) => onToggleBookmark(e, leadArticle.id)}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-xs text-white rounded-full transition-colors"
                title="সংরক্ষণ করুন"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked(leadArticle.id) ? 'fill-red-500 text-red-500' : 'text-white'
                  }`}
                />
              </button>

              {/* Headline overlay on bottom of image for dramatic journalism look */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-1.5">
                  {leadArticle.author.location && (
                    <span className="flex items-center gap-1 text-red-300 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {leadArticle.author.location}
                    </span>
                  )}
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {leadArticle.publishedAt}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight text-white group-hover:text-red-200 transition-colors font-serif drop-shadow-sm">
                  {leadArticle.title}
                </h1>
              </div>
            </div>

            {/* Summary & metadata */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed line-clamp-3 mb-4">
                {leadArticle.summary}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{leadArticle.author.name}</span>
                  <span className="text-slate-400">({leadArticle.author.role})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Eye className="w-4 h-4" />
                    {leadArticle.views} বার পঠিত
                  </span>
                  <span className="text-red-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    সম্পূর্ণ পড়ুন <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Lead Articles + Live Stream Card (Cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Live Bulletin Banner Card */}
          <div
            onClick={onOpenLiveTv}
            className="group cursor-pointer bg-gradient-to-r from-slate-900 to-red-950 rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                <Tv className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded tracking-wider uppercase animate-pulse">
                    Live
                  </span>
                  <h4 className="font-bold text-sm sm:text-base font-serif">
                    বরুড়া.টিভি বিশেষ বুলেটিন
                  </h4>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  বরুড়া ও দেশের সাম্প্রতিক গুরুত্বপূর্ণ ঘটনার সরাসরি ভিডিও সম্প্রচার
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-red-300 group-hover:text-white flex items-center gap-1 flex-shrink-0 ml-2">
              দেখুন <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Secondary Lead News Items */}
          <div className="flex-1 flex flex-col gap-3 justify-between">
            {sideArticles.slice(0, 3).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="lead-mini"
                onSelect={onSelectArticle}
                isBookmarked={isBookmarked(article.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
