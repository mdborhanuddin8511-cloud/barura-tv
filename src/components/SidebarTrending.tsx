import React, { useState } from 'react';
import { Flame, Clock, TrendingUp, CheckCircle, BarChart2, Radio, Vote } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { NewsCard } from './NewsCard';

interface SidebarTrendingProps {
  latestArticles: NewsArticle[];
  trendingArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenLiveTv: () => void;
}

export const SidebarTrending: React.FC<SidebarTrendingProps> = ({
  latestArticles,
  trendingArticles,
  onSelectArticle,
  onOpenLiveTv,
}) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('trending');

  // Reader opinion poll state
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  const [pollStats, setPollStats] = useState({ yes: 84, no: 12, neutral: 4 });

  const handleVote = (option: 'yes' | 'no' | 'neutral') => {
    if (pollVoted) return;
    setPollVoted(option);
    setPollStats((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
  };

  const totalVotes = pollStats.yes + pollStats.no + pollStats.neutral;
  const yesPct = Math.round((pollStats.yes / totalVotes) * 100);
  const noPct = Math.round((pollStats.no / totalVotes) * 100);
  const neutralPct = Math.round((pollStats.neutral / totalVotes) * 100);

  const displayList = activeTab === 'trending' ? trendingArticles : latestArticles;

  return (
    <aside className="space-y-6">
      {/* Latest / Trending Tabbed Box */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-sm font-bold">
          <button
            onClick={() => setActiveTab('trending')}
            className={`py-3 px-4 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'trending'
                ? 'bg-white text-red-700 border-red-700'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Flame className="w-4 h-4 text-red-600" />
            <span>জনপ্রিয় সংবাদ</span>
          </button>
          <button
            onClick={() => setActiveTab('latest')}
            className={`py-3 px-4 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'latest'
                ? 'bg-white text-red-700 border-red-700'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>সর্বশেষ সংবাদ</span>
          </button>
        </div>

        {/* List items with numbers */}
        <div className="divide-y divide-slate-100 p-2">
          {displayList.slice(0, 5).map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer p-2.5 rounded hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                  index === 0
                    ? 'bg-red-600 text-white'
                    : index === 1
                    ? 'bg-amber-500 text-white'
                    : index === 2
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
                  <span className="font-semibold text-red-600">{article.categoryName}</span>
                  <span>·</span>
                  <span>{article.publishedAt.split(',')[0]}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barura TV Live Studio Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-xl p-4 shadow-sm border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <h3 className="font-bold text-sm tracking-wide font-serif text-white">
              বরুড়া.টিভি সরাসরি
            </h3>
          </div>
          <span className="text-[10px] bg-red-600 font-bold px-2 py-0.5 rounded text-white animate-pulse">
            অন-এয়ার
          </span>
        </div>

        <div
          onClick={onOpenLiveTv}
          className="relative aspect-video rounded-lg overflow-hidden bg-black/60 cursor-pointer group flex items-center justify-center border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
            alt="Live TV Studio"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-70"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-left">
            <p className="text-xs font-semibold text-white drop-shadow">
              বিশেষ সংবাদ বুলেটিন ও সরাসরি আলোচনা
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLiveTv}
          className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
        >
          <span>লাইভ স্ট্রিম চালু করুন</span>
        </button>
      </div>

      {/* Reader Opinion Poll */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
          <Vote className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-sm text-slate-800 font-serif">
            পাঠকের মতামত পোল
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 leading-relaxed">
          "আপনি কি মনে করেন আধুনিক কৃষি প্রযুক্তির বিস্তার বরুড়া উপজেলার অর্থনীতিতে আমূল পরিবর্তন আনবে?"
        </p>

        {!pollVoted ? (
          <div className="space-y-2">
            <button
              onClick={() => handleVote('yes')}
              className="w-full py-2 px-3 text-xs font-bold text-left rounded border border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors flex items-center justify-between"
            >
              <span>১. হ্যাঁ, অবশ্যই</span>
              <span className="text-[11px] text-slate-400">ভোট দিন</span>
            </button>
            <button
              onClick={() => handleVote('no')}
              className="w-full py-2 px-3 text-xs font-bold text-left rounded border border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors flex items-center justify-between"
            >
              <span>২. না, মনে হয় না</span>
              <span className="text-[11px] text-slate-400">ভোট দিন</span>
            </button>
            <button
              onClick={() => handleVote('neutral')}
              className="w-full py-2 px-3 text-xs font-bold text-left rounded border border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors flex items-center justify-between"
            >
              <span>৩. মন্তব্য নেই</span>
              <span className="text-[11px] text-slate-400">ভোট দিন</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mb-2">
              <CheckCircle className="w-3.5 h-3.5" />
              আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>হ্যাঁ</span>
                <span>{yesPct}% ({pollStats.yes} ভোট)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${yesPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>না</span>
                <span>{noPct}% ({pollStats.no} ভোট)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${noPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>মন্তব্য নেই</span>
                <span>{neutralPct}% ({pollStats.neutral} ভোট)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: `${neutralPct}%` }}></div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-right mt-1">
              মোট ভোট: {totalVotes}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
