import React from 'react';
import { Tv, MapPin, Phone, Mail, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/mockNews';
import { NewsCategory, ActivePage } from '../types/news';

interface FooterProps {
  onSelectCategory: (category: NewsCategory) => void;
  onOpenStaticPage: (page: ActivePage) => void;
  onOpenLiveTv: () => void;
  onOpenSubmitNews: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStaticPage,
  onOpenLiveTv,
  onOpenSubmitNews,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-16 border-t-4 border-red-700">
      {/* Disclaimer Alert Box */}
      <div className="bg-red-950/70 border-b border-red-900/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-red-200 text-center">
          <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>
            <strong>সতর্কবার্তা ও ঘোষণা:</strong> এটি বরুড়া.টিভি-এর প্রথম সংস্করণের পরীক্ষামূলক ইন্টারফেস। প্রদর্শিত সংবাদসমূহ ডেমো হিসেবে অন্তর্ভুক্ত করা হয়েছে এবং এগুলো কোনো যাচাইকৃত বা বাস্তব চলমান ঘটনার প্রতিনিধিত্ব করে না।
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Brand & Editorial Identity (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white font-serif tracking-tight">
                  বরুড়া<span className="text-red-500">.টিভি</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">বস্তুনিষ্ঠ সংবাদের বিশ্বস্ত ঠিকানা</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              কুমিল্লার বরুড়া উপজেলা, স্বদেশ ও প্রবাসের সর্বশেষ সংবাদ সবার আগে নিরপেক্ষভাবে পরিবেশনে বরুড়া.টিভি সদা নিবেদিত। সত্য ও ন্যায়ের পক্ষে নির্ভীক সাংবাদিকতাই আমাদের অঙ্গীকার।
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <p>
                <strong className="text-white">প্রধান সম্পাদক ও প্রকাশক:</strong> এম. কে. ভূঁইয়া
              </p>
              <p>
                <strong className="text-white">নির্বাহী সম্পাদক:</strong> কাজী শামসুল আলম
              </p>
            </div>
          </div>

          {/* News Sections (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-red-600 pl-2.5 font-serif">
              সংবাদ বিভাগসমূহ
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onSelectCategory(cat.id);
                  }}
                  className="text-left text-slate-400 hover:text-red-400 transition-colors py-1 flex items-center gap-1"
                >
                  <span className="text-slate-600">›</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links & Services (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-red-600 pl-2.5 font-serif">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenStaticPage('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenStaticPage('contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  যোগাযোগ ও দপ্তর
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenStaticPage('privacy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  গোপনীয়তা নীতি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenStaticPage('ad-rates')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  বিজ্ঞাপন মূল্য তালিকা
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLiveTv}
                  className="text-red-400 hover:text-red-300 font-bold transition-colors flex items-center gap-1"
                >
                  <span>লাইভ সম্প্রচার</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubmitNews}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                >
                  <span>নাগরিক সাংবাদিকতা</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-red-600 pl-2.5 font-serif">
              যোগাযোগের ঠিকানা
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>বরুড়া বাজার রোড, পৌরসভা এলাকা, বরুড়া, কুমিল্লা-৩৫৫০</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>+৮৮০ ১৭০০-০০০০০০, ০১৮০০-০০০০০০</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>news@barura.tv, info@barura.tv</span>
              </div>
            </div>

            {/* Social presence */}
            <div className="pt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                সামাজিক মাধ্যমে বরুড়া টিভি
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="ফেসবুক"
                >
                  f
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="ইউটিউব"
                >
                  ▶
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="এক্স"
                >
                  𝕏
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="হোয়াটসঅ্যাপ"
                >
                  WA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright line */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © ২০২৬ বরুড়া.টিভি (Barura TV)। সর্বস্বত্ব সংরক্ষিত। অনুমতি ব্যতীত কোনো অংশ পুনঃপ্রকাশ দণ্ডনীয় অপরাধ।
          </p>
          <p className="flex items-center gap-1">
            <span>নির্মিত হয়েছে বরুড়া ও বাংলাদেশের পাঠকদের জন্য</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
