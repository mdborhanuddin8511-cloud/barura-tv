import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MapPin,
  User,
  MessageSquare,
  Copy,
  Check,
  Facebook,
  Twitter,
  Send,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { NewsArticle, ArticleComment } from '../types/news';
import { newsService } from '../services/newsService';
import { NewsCard } from './NewsCard';

interface ArticleDetailViewProps {
  article: NewsArticle;
  onBack: () => void;
  onSelectRelated: (article: NewsArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectRelated,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [likesCount, setLikesCount] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(newsService.isLiked(article.id));
  const [copySuccess, setCopySuccess] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>(newsService.getComments(article.id));
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const relatedArticles = newsService.getRelatedArticles(article, 3);

  const handleToggleLike = () => {
    const result = newsService.toggleLike(article.id);
    setIsLiked(result.liked);
    setLikesCount(result.count);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleShareFacebook = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(article.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}`, '_blank');
  };

  const handleShareTwitter = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`${article.title} - বরুড়া.টিভি`);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(`${article.title}\n\nবিস্তারিত পড়ুন বরুড়া.টিভি-তে: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const created = newsService.addComment(article.id, newCommentName, newCommentText);
    setComments([created, ...comments]);
    setNewCommentText('');
    setNewCommentName('');
    setIsSubmittingComment(false);
  };

  const handleSpeechToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে স্পিচ সিন্থেসিস সমর্থন করে না।');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${article.title}। ${article.summary}`);
      utterance.lang = 'bn-BD';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Font size class mapper
  const contentFontSize =
    fontSizeLevel === 'large'
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
      : fontSizeLevel === 'xlarge'
      ? 'text-xl sm:text-2xl leading-loose'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-4">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-red-600 hover:text-red-700 text-sm font-semibold text-slate-700 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরুন</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>হোম</span>
          <span>/</span>
          <span className="text-red-600 font-semibold">{article.categoryName}</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline text-slate-400 truncate max-w-[200px]">
            {article.title}
          </span>
        </div>
      </div>

      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
            {article.categoryName}
          </span>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedAt}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {article.views} বার পঠিত
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3 font-serif">
          {article.title}
        </h1>

        {/* Subtitle if available */}
        {article.subtitle && (
          <h2 className="text-base sm:text-lg font-medium text-slate-600 leading-snug mb-5 border-l-4 border-red-600 pl-3">
            {article.subtitle}
          </h2>
        )}

        {/* Reporter info and reading controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-100 my-5 bg-slate-50/70 px-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{article.author.role}</span>
                {article.author.location && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-slate-600 font-medium">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {article.author.location}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls: Font Resizer & Audio Reader */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeechToggle}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                isPlayingAudio
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="সংবাদ শুনে শুনুন (অডিও)"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'থামান' : 'সংবাদ শুনুন'}
              </span>
            </button>

            {/* Font size toggles */}
            <div className="flex items-center border border-slate-200 bg-white rounded-lg p-0.5 text-xs font-bold text-slate-700">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded ${
                  fontSizeLevel === 'normal' ? 'bg-red-600 text-white' : 'hover:bg-slate-100'
                }`}
                title="সাধারণ ফন্ট"
              >
                অ
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded text-sm ${
                  fontSizeLevel === 'large' ? 'bg-red-600 text-white' : 'hover:bg-slate-100'
                }`}
                title="বড় ফন্ট"
              >
                অ+
              </button>
              <button
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-2 py-1 rounded text-base ${
                  fontSizeLevel === 'xlarge' ? 'bg-red-600 text-white' : 'hover:bg-slate-100'
                }`}
                title="আরও বড় ফন্ট"
              >
                অ++
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <figure className="mb-6 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={article.image}
            alt={article.title}
            className="w-full max-h-[500px] object-cover"
          />
          {article.imageCaption && (
            <figcaption className="text-xs text-slate-500 p-2.5 bg-slate-50 border-t border-slate-200 text-center italic">
              ছবি: {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Article Full Body */}
        <div className={`space-y-4 text-slate-800 ${contentFontSize}`}>
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">ট্যাগ:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share & Engagement Bar */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
          {/* Like & Bookmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
                isLiked
                  ? 'bg-rose-50 border border-rose-200 text-rose-600'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-rose-400'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-slate-500'}`}
              />
              <span>পছন্দ ({likesCount})</span>
            </button>

            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
                isBookmarked
                  ? 'bg-amber-50 border border-amber-200 text-amber-700'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-amber-400'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-500'
                }`}
              />
              <span>{isBookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}</span>
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">
              শেয়ার করুন:
            </span>

            <button
              onClick={handleShareFacebook}
              className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
              title="ফেসবুকে শেয়ার করুন"
            >
              <Facebook className="w-4 h-4" />
            </button>

            <button
              onClick={handleShareTwitter}
              className="p-2 rounded-full bg-slate-900 text-white hover:opacity-90 transition-opacity"
              title="টুইটার/এক্সে শেয়ার করুন"
            >
              <Twitter className="w-4 h-4" />
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity font-bold text-xs"
              title="হোয়াটসঅ্যাপে শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              title="লিংক কপি করুন"
            >
              {copySuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>লিংক কপি</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Reader Comments Section */}
      <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <MessageSquare className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-black text-slate-900 font-serif">
            পাঠকের মন্তব্য ({comments.length})
          </h3>
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handleCommentSubmit} className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-600 mb-3">
            আপনার মতামত আমাদের সাথে ভাগ করুন (শালীন ও দায়িত্বশীল মন্তব্য কাম্য)
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="আপনার নাম বা পরিচয়..."
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-red-600 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <textarea
              rows={3}
              placeholder="এখানে আপনার মন্তব্য লিখুন..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              className="w-full bg-white border border-slate-300 focus:border-red-600 rounded-lg p-3 text-sm outline-none resize-none"
            />
            <button
              type="submit"
              disabled={isSubmittingComment || !newCommentText.trim()}
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition-colors ml-auto shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>মন্তব্য প্রকাশ করুন</span>
            </button>
          </div>
        </form>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              এখনও কোনো মন্তব্য করা হয়নি। আপনার মতামত দিয়ে প্রথম মন্তব্যকারী হোন!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-600" />
                    {comment.authorName}
                  </span>
                  <span>{comment.date}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-8">
          <div className="border-b-2 border-red-700 pb-2 mb-4">
            <h3 className="text-lg font-black text-slate-900 font-serif">
              সম্পর্কিত সংবাদ
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <NewsCard
                key={rel.id}
                article={rel}
                variant="standard"
                onSelect={onSelectRelated}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
