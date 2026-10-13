import React, { useState } from 'react';
import { X, Send, Image, PlusCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { NewsCategory, NewsArticle } from '../types/news';
import { CATEGORIES } from '../data/mockNews';
import { newsService } from '../services/newsService';

interface SubmitNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewsCreated: (newArticle: NewsArticle) => void;
}

export const SubmitNewsModal: React.FC<SubmitNewsModalProps> = ({
  isOpen,
  onClose,
  onNewsCreated,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<NewsCategory>('countrywide');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [location, setLocation] = useState('বরুড়া, কুমিল্লা');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) return;

    const categoryObj = CATEGORIES.find((c) => c.id === category);
    const categoryName = categoryObj ? categoryObj.name : 'সারাদেশ';

    // Default image if not provided
    const chosenImage =
      imageUrl.trim() ||
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';

    const newArticle = newsService.createArticle({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      summary: summary.trim(),
      content: content.trim(),
      category,
      categoryName,
      author: {
        name: reporterName.trim() || 'নাগরিক প্রতিবেদক',
        role: 'বিশেষ সংবাদদাতা',
        location: location.trim() || 'বরুড়া, কুমিল্লা',
      },
      readTimeMinutes: 3,
      image: chosenImage,
      imageCaption: title.trim(),
      tags: ['বরুড়া', categoryName, 'নাগরিক সংবাদ'],
      isBreaking: false,
    });

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onNewsCreated(newArticle);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl text-slate-800 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-bold text-base font-serif">নাগরিক সাংবাদিকতা ও সংবাদ জমা</h3>
              <p className="text-xs text-slate-400">বরুড়া ও আপনার এলাকার খবর বরুড়া.টিভি-তে প্রকাশ করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">সংবাদ সফলভাবে প্রকাশিত হয়েছে!</h4>
            <p className="text-sm text-slate-600">
              আপনার সংবাদটি এখন বরুড়া.টিভি নিউজ পোর্টালে যুক্ত হয়েছে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Disclaimer box */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>নোট:</strong> এটি প্রথম সংস্করণের ইন্টারফেস। এখানে সংবাদ পোস্ট করলে তা সরাসরি লোকাল ডেটাবেসে যুক্ত হয়ে সাইটে প্রদর্শিত হবে। পরবর্তীতে এটি সরাসরি Supabase অ্যাডমিন রিভিউ প্যানেলের সাথে যুক্ত হবে।
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সংবাদের শিরোনাম <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: বরুড়ায় নতুন গ্রন্থাগার উদ্বোধন..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সংবাদ বিভাগ <span className="text-red-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as NewsCategory)}
                  className="w-full border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none bg-white"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  স্থান / এলাকা
                </label>
                <input
                  type="text"
                  placeholder="যেমন: বরুড়া সদর, কুমিল্লা"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সংক্ষিপ্ত সারসংক্ষেপ (Summary) <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="১-২ লাইনে সংবাদের মূল কথা..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full border border-slate-300 focus:border-red-600 rounded-lg p-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সম্পূর্ণ সংবাদ বিবরণী <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="এখানে বিস্তারিত সংবাদ প্রতিবেদন লিখুন..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-slate-300 focus:border-red-600 rounded-lg p-2.5 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রতিবেদকের নাম / উৎস
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম বা প্রতিষ্ঠানের নাম"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ছবির লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>সংবাদ প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
