import React from 'react';
import { Clock, Eye, Bookmark, Share2, MapPin, User } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'standard' | 'horizontal' | 'compact' | 'lead-mini';
  onSelect: (article: NewsArticle) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, articleId: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = 'standard',
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(e, article.id);
    }
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors px-2 rounded"
      >
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span className="font-semibold text-red-600">{article.categoryName}</span>
          <span>·</span>
          <span>{article.publishedAt.split(',')[1] || article.publishedAt}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white p-3 rounded-lg border border-slate-200/80 hover:border-red-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-3.5"
      >
        <div className="sm:w-48 sm:h-32 w-full h-44 flex-shrink-0 overflow-hidden rounded bg-slate-100 relative">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 left-2 bg-slate-900/85 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
            {article.categoryName}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedAt}
              </span>
              {article.author.location && (
                <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {article.author.location}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug mb-1.5">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {article.author.name}
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-400">
                <Eye className="w-3.5 h-3.5" />
                {article.views}
              </span>
              {onToggleBookmark && (
                <button
                  onClick={handleBookmarkClick}
                  className="p-1 hover:text-red-600 transition-colors"
                  title="সংরক্ষণ করুন"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? 'fill-red-600 text-red-600' : 'text-slate-400'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'lead-mini') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white rounded-lg p-3 border border-slate-200/90 hover:border-red-300 hover:shadow transition-all flex gap-3"
      >
        <div className="w-24 h-20 sm:w-28 sm:h-20 flex-shrink-0 overflow-hidden rounded bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-0.5">
              {article.categoryName}
            </span>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-700 leading-snug line-clamp-2 transition-colors">
              {article.title}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {article.publishedAt.split(',')[0]}
          </span>
        </div>
      </div>
    );
  }

  // Default Standard Vertical Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white rounded-lg border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all flex flex-col overflow-hidden h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
            {article.categoryName}
          </span>
          {article.isBreaking && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
              ব্রেকিং
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2.5 right-2.5 p-1.5 bg-white/80 hover:bg-white backdrop-blur-xs rounded-full shadow transition-colors"
            title="সংরক্ষণ করুন"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                isBookmarked ? 'fill-red-600 text-red-600' : 'text-slate-700'
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.publishedAt.split(',')[1] || article.publishedAt}
            </span>
            {article.author.location && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin className="w-3 h-3 text-red-500" />
                {article.author.location}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2 mb-2 font-serif">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-700 truncate max-w-[140px]">
            {article.author.name}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Eye className="w-3.5 h-3.5" />
            {article.views}
          </span>
        </div>
      </div>
    </article>
  );
};
