import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  Tv,
  PlusCircle,
  Menu,
  X,
  CloudSun,
  Share2,
  Newspaper,
  PhoneCall,
  Info,
  Calendar,
  Clock,
  Radio
} from 'lucide-react';
import { NewsCategory } from '../types/news';
import { CATEGORIES } from '../data/mockNews';
import { getFormattedBengaliDate } from '../utils/dateUtils';

interface HeaderProps {
  activeCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLiveTv: () => void;
  onOpenSubmitNews: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  onNavigateHome: () => void;
  onOpenStaticPage: (page: 'about' | 'contact' | 'privacy' | 'ad-rates') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenLiveTv,
  onOpenSubmitNews,
  onOpenBookmarks,
  bookmarksCount,
  onNavigateHome,
  onOpenStaticPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);

  const { fullBengaliDate, banglaEraDate } = getFormattedBengaliDate();

  const handleCategoryClick = (id: NewsCategory) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Topmost Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left: Date & Time */}
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="flex items-center gap-1 font-medium text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              {fullBengaliDate}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">{banglaEraDate}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-amber-300">
              <CloudSun className="w-3.5 h-3.5" />
              বরুড়া, কুমিল্লা: ২৮° সে. (পরিষ্কার আকাশ)
            </span>
          </div>

          {/* Right: Quick actions & Live TV */}
          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={onOpenLiveTv}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-medium text-[11px] transition-colors shadow-sm"
              title="বরুড়া টিভি সরাসরি সম্প্রচার দেখুন"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>লাইভ টিভি</span>
            </button>

            <button
              onClick={onOpenSubmitNews}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors border border-slate-700"
              title="নাগরিক সাংবাদিকতা - আপনার এলাকার খবর পাঠান"
            >
              <PlusCircle className="w-3 h-3 text-emerald-400" />
              <span>সংবাদ পাঠান</span>
            </button>

            <div className="hidden lg:flex items-center gap-2 border-l border-slate-700 pl-3 text-slate-400">
              <button
                onClick={() => onOpenStaticPage('about')}
                className="hover:text-white transition-colors"
              >
                আমাদের সম্পর্কে
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenStaticPage('contact')}
                className="hover:text-white transition-colors"
              >
                যোগাযোগ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Logo & Search Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('all');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-tr from-red-700 via-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
              <Tv className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-serif">
                  বরুড়া<span className="text-red-600">.টিভি</span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 bg-slate-900 text-white rounded uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight">
                আপডেট বিশ্ব ও লোকাল সংবাদ | বস্তুনিষ্ঠ সংবাদের ঠিকানা
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right: Desktop Search Box & Bookmarks */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন (যেমন: বরুড়া, কৃষি, রাজনীতি, খেলাধুলা)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white rounded-full pl-10 pr-10 py-1.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bookmarks quick button */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            title="সংরক্ষিত সংবাদসমূহ"
          >
            <Bookmark className="w-5 h-5 text-slate-600" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => setSearchOpenMobile(!searchOpenMobile)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Bookmarks"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarksCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search expanded bar */}
      {searchOpenMobile && (
        <div className="md:hidden px-4 pb-3 border-t border-slate-100 pt-2 bg-slate-50">
          <div className="relative">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-red-600 rounded-full pl-9 pr-8 py-1.5 text-sm outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation Bar (Categories) */}
      <nav className="bg-red-700 text-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-2 text-sm sm:text-base font-semibold whitespace-nowrap transition-all rounded-md ${
                    isActive
                      ? 'bg-red-800 text-white shadow-inner font-bold'
                      : 'text-red-50 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  {cat.name}
                  {cat.id === 'countrywide' && (
                    <span className="ml-1 text-[10px] bg-red-900/80 px-1.5 py-0.5 rounded text-amber-300">
                      বরুড়া
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-2 pl-3">
            <button
              onClick={onOpenSubmitNews}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>প্রেস রিলিজ / খবর দিন</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Off-Canvas Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white">
                    <Tv className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg font-serif">বরুড়া.টিভি</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Action buttons inside drawer */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLiveTv();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-600 text-white text-xs font-bold rounded"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  লাইভ টিভি দেখুন
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubmitNews();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-800 text-white text-xs font-medium rounded"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                  সংবাদ জমা দিন
                </button>
              </div>

              {/* Category links */}
              <div className="p-2">
                <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  সংবাদ বিভাগসমূহ
                </p>
                <div className="space-y-0.5">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-red-50 text-red-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.id === 'countrywide' && (
                          <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                            বরুড়া স্পেশাল
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Links */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-2">
              <div className="flex flex-wrap gap-2 text-slate-500">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaticPage('about');
                  }}
                  className="hover:underline"
                >
                  আমাদের সম্পর্কে
                </button>
                <span>·</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaticPage('contact');
                  }}
                  className="hover:underline"
                >
                  যোগাযোগ
                </button>
                <span>·</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaticPage('privacy');
                  }}
                  className="hover:underline"
                >
                  গোপনীয়তা নীতি
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                © ২০২৬ বরুড়া.টিভি। সর্বস্বত্ব সংরক্ষিত।
              </p>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};
