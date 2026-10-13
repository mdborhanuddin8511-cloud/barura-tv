import React from 'react';
import { X, Building2, Mail, Phone, MapPin, Shield, DollarSign, Bookmark, ArrowLeft } from 'lucide-react';
import { ActivePage, NewsArticle } from '../types/news';
import { NewsCard } from './NewsCard';

interface StaticPagesModalProps {
  page: ActivePage | null;
  onClose: () => void;
  bookmarkedArticles?: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
  onToggleBookmark?: (e: React.MouseEvent, id: string) => void;
}

export const StaticPagesModal: React.FC<StaticPagesModalProps> = ({
  page,
  onClose,
  bookmarkedArticles = [],
  onSelectArticle,
  onToggleBookmark,
}) => {
  if (!page || page === 'home') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl text-slate-800 my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg font-serif">
              {page === 'about' && 'আমাদের সম্পর্কে (About Us)'}
              {page === 'contact' && 'যোগাযোগ ও সম্পাদকীয় দপ্তর (Contact)'}
              {page === 'privacy' && 'গোপনীয়তা ও ব্যবহারের নীতিমালা (Privacy Policy)'}
              {page === 'ad-rates' && 'বিজ্ঞাপন মূল্য তালিকা ও যোগাযোগ (Advertisement)'}
              {page === 'bookmarks' && `সংরক্ষিত সংবাদসমূহ (${bookmarkedArticles.length})`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-sm sm:text-base leading-relaxed text-slate-700">
          {page === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
                <h4 className="font-bold text-red-900 text-base font-serif">
                  বরুড়া.টিভি (Barura TV) – সত্যের সন্ধানে নির্ভীক কণ্ঠস্বর
                </h4>
                <p className="text-xs text-red-800 mt-1">
                  কুমিল্লার বরুড়া উপজেলাসহ দেশ ও বিদেশের সর্বশেষ, বস্তুনিষ্ঠ ও নিরপেক্ষ সংবাদ পরিবেশনে অঙ্গীকারবদ্ধ ডিজিটাল প্ল্যাটফর্ম।
                </p>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-serif">আমাদের লক্ষ্য ও উদ্দেশ্য</h3>
              <p>
                ‘বরুড়া.টিভি’ মূলত তৃণমূলের কণ্ঠস্বরকে জাতীয় ও আন্তর্জাতিক পরিসরে তুলে ধরার এক অনন্য প্রয়াস। স্থানীয় কৃষি, শিক্ষা, সংস্কৃতি, যোগাযোগ ব্যবস্থা ও মানুষের দৈনন্দিন সমস্যা-সম্ভাবনার কথা দায়িত্বশীল সাংবাদিকতার মাধ্যমে প্রকাশ করাই আমাদের প্রধান লক্ষ্য।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <h5 className="font-bold text-slate-900 text-sm">বস্তুনিষ্ঠ সাংবাদিকতা</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    গুজব ও পক্ষপাতিত্বমুক্ত নির্ভরযোগ্য সংবাদ প্রকাশে আমরা অবিচল।
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <h5 className="font-bold text-slate-900 text-sm">আধুনিক ডিজিটাল অভিজ্ঞতা</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    মোবাইল ও ওয়েব প্ল্যাটফর্মে দ্রুততম সময়ে লাইভ ও ভিডিও সংবাদ পৌঁছে দেওয়া।
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'contact' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <MapPin className="w-5 h-5" />
                    <span>প্রধান কার্যালয় (বরুড়া অফিস)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    বরুড়া বাজার রোড, পৌরসভা এলাকা, বরুড়া, কুমিল্লা-৩৫৫০, বাংলাদেশ।
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <Building2 className="w-5 h-5" />
                    <span>ঢাকা ব্যুরো ও সম্প্রচার কেন্দ্র</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    কারওয়ান বাজার মিডিয়া সেন্টার, ঢাকা-১২১৫।
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold">নিউজ রুম ও হটলাইন: +৮৮০ ১৭০০-০০০০০০, ০১৮০০-০০০০০০</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold">ইমেইল: news@barura.tv / info@barura.tv</span>
                </div>
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>গোপনীয়তা ও ডেটা সুরক্ষার অঙ্গীকার</span>
              </div>
              <p className="text-sm">
                বরুড়া.টিভি পাঠকদের ব্যক্তিগত তথ্যের সর্বোচ্চ গোপনীয়তা রক্ষা করে। আমাদের ওয়েবসাইট ব্রাউজিংয়ের সময় ব্যবহারকারীর কোনো ব্যক্তিগত সংবেদনশীল তথ্য বিনা অনুমতিতে সংরক্ষণ বা তৃতীয় পক্ষের সাথে আদান-প্রদান করা হয় না।
              </p>
              <h4 className="font-bold text-slate-800 text-sm">১. তথ্যের ব্যবহার</h4>
              <p className="text-xs text-slate-600">
                পাঠকদের মতামত প্রদান ও বুকমার্ক সুবিধা নির্বিঘ্ন রাখতে লোকাল স্টোরেজ ব্যবহার করা হয়।
              </p>
              <h4 className="font-bold text-slate-800 text-sm">২. কপিরাইট নীতি</h4>
              <p className="text-xs text-slate-600">
                বরুড়া.টিভি-তে প্রকাশিত সকল সংবাদ ও ছবির স্বত্ব সংরক্ষিত। যথাযথ অনুমতি ও কৃতজ্ঞতা স্বীকার ব্যতীত যেকোনো বাণিজ্যিক পুনরুৎপাদন আইনত নিষিদ্ধ।
              </p>
            </div>
          )}

          {page === 'ad-rates' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span>বিজ্ঞাপন ও স্পন্সরশিপ</span>
              </div>
              <p className="text-sm">
                আপনার ব্যবসা, শিক্ষা প্রতিষ্ঠান বা পণ্যের প্রচার পৌঁছে দিন বরুড়া, কুমিল্লা এবং বিশ্বব্যাপী বাংলাভাষী পাঠকদের কাছে।
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="p-2.5 border">বিজ্ঞাপনের অবস্থান</th>
                      <th className="p-2.5 border">সাইজ</th>
                      <th className="p-2.5 border">মাসিক মূল্য (আলোচনা সাপেক্ষে)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 border font-medium">টপ হেডার ব্যানার</td>
                      <td className="p-2 border">৭২৮ x ৯০ px</td>
                      <td className="p-2 border text-red-600 font-bold">১০,০০০ - ১৫,০০০ ৳</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 border font-medium">হোমপেজ সাইডবার ব্যানার</td>
                      <td className="p-2 border">৩০০ x ২৫০ px</td>
                      <td className="p-2 border text-red-600 font-bold">৭,০০০ - ১০,০০০ ৳</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-medium">সংবাদের ভেতরে ব্যানার</td>
                      <td className="p-2 border">৬০০ x ২০০ px</td>
                      <td className="p-2 border text-red-600 font-bold">৮,০০০ - ১২,০০০ ৳</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500">
                বিজ্ঞাপনের জন্য যোগাযোগ করুন: <strong>ads@barura.tv</strong> অথবা <strong>+৮৮০ ১৭০০-০০০০০০</strong>
              </p>
            </div>
          )}

          {page === 'bookmarks' && (
            <div>
              {bookmarkedArticles.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-slate-500 font-medium">
                    আপনি এখনও কোনো সংবাদ সংরক্ষণ করেননি।
                  </p>
                  <p className="text-xs text-slate-400">
                    যেকোনো সংবাদ পড়ার সময় বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে পড়ার জন্য সংরক্ষণ করতে পারেন।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarkedArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="standard"
                      onSelect={(art) => {
                        onClose();
                        if (onSelectArticle) onSelectArticle(art);
                      }}
                      isBookmarked={true}
                      onToggleBookmark={onToggleBookmark}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
