import React, { useState } from 'react';
import { LayoutGrid, List, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { NewsCard } from './NewsCard';

interface CategorySectionProps {
  articles: NewsArticle[];
  categoryTitle: string;
  categorySlug: NewsCategory;
  onSelectArticle: (article: NewsArticle) => void;
  onSelectCategory?: (category: NewsCategory) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  articles,
  categoryTitle,
  categorySlug,
  onSelectArticle,
  onSelectCategory,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
        <p className="text-slate-500 text-sm">
          এই বিভাগে এই মুহূর্তে কোনো সংবাদ পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* Category Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-red-700 pb-2.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-700 rounded-xs"></span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
            {categoryTitle}
          </h2>
          <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full">
            {articles.length}টি সংবাদ
          </span>
        </div>

        {/* Layout toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded transition-colors ${
              layoutMode === 'grid'
                ? 'bg-white text-red-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="গ্রিড ভিউ"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutMode('list')}
            className={`p-1.5 rounded transition-colors ${
              layoutMode === 'list'
                ? 'bg-white text-red-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="তালিকা ভিউ"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards list/grid */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant="standard"
              onSelect={onSelectArticle}
              isBookmarked={isBookmarked(article.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant="horizontal"
              onSelect={onSelectArticle}
              isBookmarked={isBookmarked(article.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};
