/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { LeadNewsSection } from './components/LeadNewsSection';
import { NewsCard } from './components/NewsCard';
import { SidebarTrending } from './components/SidebarTrending';
import { CategorySection } from './components/CategorySection';
import { ArticleDetailView } from './components/ArticleDetailView';
import { LiveTvModal } from './components/LiveTvModal';
import { SubmitNewsModal } from './components/SubmitNewsModal';
import { StaticPagesModal } from './components/StaticPagesModal';
import { Footer } from './components/Footer';
import { NewsArticle, NewsCategory, ActivePage } from './types/news';
import { newsService } from './services/newsService';
import { CATEGORIES } from './data/mockNews';
import { Search, X, Sparkles, Filter, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLiveTvOpen, setIsLiveTvOpen] = useState(false);
  const [isSubmitNewsOpen, setIsSubmitNewsOpen] = useState(false);
  const [activeStaticPage, setActiveStaticPage] = useState<ActivePage | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Force re-read from news service on updates
  const articles = newsService.getArticles(activeCategory, searchQuery);
  const allArticles = newsService.getArticles('all');
  const leadArticle = newsService.getLeadArticle() || articles[0];
  const sideLeadArticles = allArticles.filter((a) => a.id !== leadArticle?.id).slice(0, 3);
  const trendingArticles = newsService.getTrendingArticles(6);
  const latestArticles = newsService.getLatestArticles(6);
  const bookmarkedArticles = newsService.getBookmarkedArticles();

  // Scroll to top when changing article or category
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle, activeCategory]);

  const handleSelectArticle = (article: NewsArticle) => {
    newsService.incrementViews(article.id);
    setSelectedArticle(article);
  };

  const handleToggleBookmark = (e?: React.MouseEvent, articleId?: string) => {
    if (e) e.stopPropagation();
    const id = articleId || selectedArticle?.id;
    if (id) {
      newsService.toggleBookmark(id);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const handleNewsCreated = (newArticle: NewsArticle) => {
    setRefreshTrigger((prev) => prev + 1);
    handleSelectArticle(newArticle);
  };

  const handleResetData = () => {
    if (confirm('আপনি কি সকল ডেটা ডিফল্ট ডেমো অবস্থায় ফিরিয়ে নিতে চান?')) {
      newsService.resetToDefault();
      setRefreshTrigger((prev) => prev + 1);
      setSelectedArticle(null);
    }
  };

  const currentCategoryName =
    CATEGORIES.find((c) => c.id === activeCategory)?.name || 'সর্বশেষ';

  // Grouped sections for the front-page newspaper magazine layout
  const countrywideArticles = allArticles.filter((a) => a.category === 'countrywide');
  const nationalArticles = allArticles.filter((a) => a.category === 'bangladesh' || a.category === 'politics');
  const economyArticles = allArticles.filter((a) => a.category === 'economy');
  const sportsAndEntArticles = allArticles.filter((a) => a.category === 'sports' || a.category === 'entertainment');
  const techArticles = allArticles.filter((a) => a.category === 'technology');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      {/* Top Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setActiveCategory(cat);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSelectedArticle(null);
          setSearchQuery(q);
        }}
        onOpenLiveTv={() => setIsLiveTvOpen(true)}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
        onOpenBookmarks={() => setActiveStaticPage('bookmarks')}
        bookmarksCount={bookmarkedArticles.length}
        onNavigateHome={() => {
          setSelectedArticle(null);
          setActiveCategory('all');
          setSearchQuery('');
        }}
        onOpenStaticPage={(page) => setActiveStaticPage(page)}
      />

      {/* Breaking Ticker Banner */}
      <BreakingTicker
        articles={allArticles}
        onSelectArticle={handleSelectArticle}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* If viewing a single detailed article */}
        {selectedArticle ? (
          <ArticleDetailView
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onSelectRelated={handleSelectArticle}
            isBookmarked={newsService.isBookmarked(selectedArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(undefined, selectedArticle.id)}
          />
        ) : (
          <div>
            {/* Search filter indicator banner if active */}
            {searchQuery && (
              <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-semibold text-slate-800">
                    "<strong>{searchQuery}</strong>" সংক্রান্ত অনুসন্ধানের ফলাফল:
                  </span>
                  <span className="text-xs bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded-full">
                    {articles.length}টি সংবাদ পাওয়া গেছে
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>অনুসন্ধান মুছুন</span>
                </button>
              </div>
            )}

            {/* Standard Front-page layout when on 'all' and not searching */}
            {activeCategory === 'all' && !searchQuery ? (
              <div className="space-y-8">
                {/* Lead Hero News Section */}
                <LeadNewsSection
                  leadArticle={leadArticle}
                  sideArticles={sideLeadArticles}
                  onSelectArticle={handleSelectArticle}
                  onOpenLiveTv={() => setIsLiveTvOpen(true)}
                  isBookmarked={(id) => newsService.isBookmarked(id)}
                  onToggleBookmark={handleToggleBookmark}
                />

                {/* Main Two-Column News Magazine Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Categorized News Sections (8 cols) */}
                  <div className="lg:col-span-8 space-y-10">
                    {/* Special Section: বরুড়া ও কুমিল্লা প্রতিদিন / সারাদেশ */}
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-6 bg-red-700 rounded-xs"></span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                            সারাদেশ ও বরুড়া প্রতিদিন
                          </h2>
                          <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                            লোকাল স্পেশাল
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveCategory('countrywide')}
                          className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-0.5"
                        >
                          আরও সংবাদ <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {countrywideArticles.slice(0, 4).map((art) => (
                          <NewsCard
                            key={art.id}
                            article={art}
                            variant="standard"
                            onSelect={handleSelectArticle}
                            isBookmarked={newsService.isBookmarked(art.id)}
                            onToggleBookmark={handleToggleBookmark}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Section: জাতীয় ও রাজনীতি */}
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-6 bg-red-700 rounded-xs"></span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                            জাতীয় ও রাজনীতি
                          </h2>
                        </div>
                        <button
                          onClick={() => setActiveCategory('politics')}
                          className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-0.5"
                        >
                          আরও সংবাদ <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-3.5">
                        {nationalArticles.slice(0, 3).map((art) => (
                          <NewsCard
                            key={art.id}
                            article={art}
                            variant="horizontal"
                            onSelect={handleSelectArticle}
                            isBookmarked={newsService.isBookmarked(art.id)}
                            onToggleBookmark={handleToggleBookmark}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Section: অর্থনীতি ও বাণিজ্য */}
                    {economyArticles.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-6 bg-red-700 rounded-xs"></span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                              অর্থনীতি ও বাণিজ্য
                            </h2>
                          </div>
                          <button
                            onClick={() => setActiveCategory('economy')}
                            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-0.5"
                          >
                            আরও সংবাদ <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {economyArticles.slice(0, 2).map((art) => (
                            <NewsCard
                              key={art.id}
                              article={art}
                              variant="standard"
                              onSelect={handleSelectArticle}
                              isBookmarked={newsService.isBookmarked(art.id)}
                              onToggleBookmark={handleToggleBookmark}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section: খেলাধুলা, বিনোদন ও প্রযুক্তি */}
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-6 bg-red-700 rounded-xs"></span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                            খেলাধুলা ও প্রযুক্তি
                          </h2>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[...sportsAndEntArticles, ...techArticles].slice(0, 3).map((art) => (
                          <NewsCard
                            key={art.id}
                            article={art}
                            variant="standard"
                            onSelect={handleSelectArticle}
                            isBookmarked={newsService.isBookmarked(art.id)}
                            onToggleBookmark={handleToggleBookmark}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sidebar (4 cols) */}
                  <div className="lg:col-span-4">
                    <SidebarTrending
                      latestArticles={latestArticles}
                      trendingArticles={trendingArticles}
                      onSelectArticle={handleSelectArticle}
                      onOpenLiveTv={() => setIsLiveTvOpen(true)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Specific Category view or Search view */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <CategorySection
                    articles={articles}
                    categoryTitle={searchQuery ? `অনুসন্ধানের ফলাফল: "${searchQuery}"` : currentCategoryName}
                    categorySlug={activeCategory}
                    onSelectArticle={handleSelectArticle}
                    onSelectCategory={(cat) => setActiveCategory(cat)}
                    isBookmarked={(id) => newsService.isBookmarked(id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                </div>

                <div className="lg:col-span-4">
                  <SidebarTrending
                    latestArticles={latestArticles}
                    trendingArticles={trendingArticles}
                    onSelectArticle={handleSelectArticle}
                    onOpenLiveTv={() => setIsLiveTvOpen(true)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Static Modals */}
      <LiveTvModal
        isOpen={isLiveTvOpen}
        onClose={() => setIsLiveTvOpen(false)}
      />

      <SubmitNewsModal
        isOpen={isSubmitNewsOpen}
        onClose={() => setIsSubmitNewsOpen(false)}
        onNewsCreated={handleNewsCreated}
      />

      <StaticPagesModal
        page={activeStaticPage}
        onClose={() => setActiveStaticPage(null)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={handleSelectArticle}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setActiveCategory(cat);
        }}
        onOpenStaticPage={(page) => setActiveStaticPage(page)}
        onOpenLiveTv={() => setIsLiveTvOpen(true)}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
      />
    </div>
  );
}
