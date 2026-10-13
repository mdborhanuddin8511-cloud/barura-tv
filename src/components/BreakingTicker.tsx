import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, AlertCircle } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface BreakingTickerProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  articles,
  onSelectArticle,
}) => {
  const breakingList = articles.filter((a) => a.isBreaking || a.isLead);
  const displayArticles = breakingList.length > 0 ? breakingList : articles.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || displayArticles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, displayArticles.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
  };

  const currentArticle = displayArticles[currentIndex] || displayArticles[0];

  if (!currentArticle) return null;

  return (
    <div className="bg-red-50 border-y border-red-200/80 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        {/* Breaking Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
          <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>ব্রেকিং নিউজ</span>
        </div>

        {/* Headline text */}
        <div className="flex-1 overflow-hidden">
          <button
            onClick={() => onSelectArticle(currentArticle)}
            className="text-left w-full group flex items-center gap-2 truncate"
            title={currentArticle.title}
          >
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded flex-shrink-0">
              {currentArticle.categoryName}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-red-700 group-hover:underline truncate transition-colors">
              {currentArticle.title}
            </span>
          </button>
        </div>

        {/* Controls: Prev / Next / Pause / Index */}
        <div className="flex-shrink-0 flex items-center space-x-1 border-l border-red-200 pl-2">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline mr-1">
            {currentIndex + 1}/{displayArticles.length}
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-600 hover:text-red-700 hover:bg-red-100 transition-colors"
            title={isPaused ? 'চালু করুন' : 'থামান'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1 rounded text-slate-600 hover:text-red-700 hover:bg-red-100 transition-colors"
            title="পূর্ববর্তী"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded text-slate-600 hover:text-red-700 hover:bg-red-100 transition-colors"
            title="পরবর্তী"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
