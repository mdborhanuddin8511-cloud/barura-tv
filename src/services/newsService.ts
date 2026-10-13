import { NewsArticle, NewsCategory, ArticleComment } from '../types/news';
import { INITIAL_NEWS, INITIAL_COMMENTS } from '../data/mockNews';

const STORAGE_KEYS = {
  ARTICLES: 'baruratv_articles_v1',
  BOOKMARKS: 'baruratv_bookmarks_v1',
  LIKES: 'baruratv_likes_v1',
  COMMENTS: 'baruratv_comments_v1',
};

/**
 * Service layer for Barura TV News Portal.
 * Architecture Note:
 * This service currently persists locally via localStorage and in-memory mock data.
 * When integrating Supabase later:
 * 1. Initialize Supabase client: const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 * 2. Replace 'getAllArticles' with `supabase.from('articles').select('*')`
 * 3. Replace 'createArticle' with `supabase.from('articles').insert([...])`
 */
class NewsService {
  private articles: NewsArticle[] = [];
  private bookmarks: Set<string> = new Set();
  private userLikes: Set<string> = new Set();
  private comments: Record<string, ArticleComment[]> = {};

  constructor() {
    this.initData();
  }

  private initData() {
    try {
      const storedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (storedArticles) {
        this.articles = JSON.parse(storedArticles);
      } else {
        this.articles = [...INITIAL_NEWS];
        this.saveArticles();
      }

      const storedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (storedBookmarks) {
        this.bookmarks = new Set(JSON.parse(storedBookmarks));
      }

      const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
      if (storedLikes) {
        this.userLikes = new Set(JSON.parse(storedLikes));
      }

      const storedComments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (storedComments) {
        this.comments = JSON.parse(storedComments);
      } else {
        this.comments = { ...INITIAL_COMMENTS };
        this.saveComments();
      }
    } catch {
      this.articles = [...INITIAL_NEWS];
      this.comments = { ...INITIAL_COMMENTS };
    }
  }

  private saveArticles() {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(this.articles));
    } catch (e) {
      console.warn('Storage quota or disabled', e);
    }
  }

  private saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(this.bookmarks)));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }

  private saveLikes() {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(Array.from(this.userLikes)));
    } catch (e) {
      console.warn('Failed to save likes', e);
    }
  }

  private saveComments() {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(this.comments));
    } catch (e) {
      console.warn('Failed to save comments', e);
    }
  }

  // Get all articles (filterable by category, search query)
  public getArticles(category: NewsCategory = 'all', searchQuery: string = ''): NewsArticle[] {
    let result = [...this.articles];

    if (category !== 'all') {
      result = result.filter((item) => item.category === category);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.tags.some((t) => t.toLowerCase().includes(query)) ||
          item.author.name.toLowerCase().includes(query) ||
          (item.author.location && item.author.location.toLowerCase().includes(query))
      );
    }

    return result;
  }

  public getArticleById(id: string): NewsArticle | undefined {
    return this.articles.find((item) => item.id === id);
  }

  public getLeadArticle(): NewsArticle | undefined {
    return this.articles.find((item) => item.isLead) || this.articles[0];
  }

  public getTrendingArticles(limit: number = 5): NewsArticle[] {
    return [...this.articles]
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  public getLatestArticles(limit: number = 6): NewsArticle[] {
    return [...this.articles].slice(0, limit);
  }

  public getRelatedArticles(currentArticle: NewsArticle, limit: number = 4): NewsArticle[] {
    return this.articles
      .filter((item) => item.id !== currentArticle.id && item.category === currentArticle.category)
      .slice(0, limit);
  }

  public incrementViews(id: string): void {
    const article = this.articles.find((item) => item.id === id);
    if (article) {
      article.views += 1;
      this.saveArticles();
    }
  }

  public toggleLike(id: string): { liked: boolean; count: number } {
    const article = this.articles.find((item) => item.id === id);
    if (!article) return { liked: false, count: 0 };

    let liked = false;
    if (this.userLikes.has(id)) {
      this.userLikes.delete(id);
      article.likes = Math.max(0, article.likes - 1);
    } else {
      this.userLikes.add(id);
      article.likes += 1;
      liked = true;
    }

    this.saveLikes();
    this.saveArticles();
    return { liked, count: article.likes };
  }

  public isLiked(id: string): boolean {
    return this.userLikes.has(id);
  }

  public toggleBookmark(id: string): boolean {
    let bookmarked = false;
    if (this.bookmarks.has(id)) {
      this.bookmarks.delete(id);
    } else {
      this.bookmarks.add(id);
      bookmarked = true;
    }
    this.saveBookmarks();
    return bookmarked;
  }

  public isBookmarked(id: string): boolean {
    return this.bookmarks.has(id);
  }

  public getBookmarkedArticles(): NewsArticle[] {
    return this.articles.filter((item) => this.bookmarks.has(item.id));
  }

  public getComments(articleId: string): ArticleComment[] {
    return this.comments[articleId] || [];
  }

  public addComment(articleId: string, authorName: string, text: string): ArticleComment {
    const newComment: ArticleComment = {
      id: 'c_' + Date.now(),
      articleId,
      authorName: authorName.trim() || 'সম্মানিত পাঠক',
      text: text.trim(),
      date: 'আজ, এইমাত্র',
    };

    if (!this.comments[articleId]) {
      this.comments[articleId] = [];
    }
    this.comments[articleId].unshift(newComment);
    this.saveComments();
    return newComment;
  }

  // Citizen submission / Demo new article creator
  public createArticle(articleData: Omit<NewsArticle, 'id' | 'views' | 'likes' | 'publishedAt'>): NewsArticle {
    const newArticle: NewsArticle = {
      ...articleData,
      id: 'user_' + Date.now(),
      publishedAt: 'আজ, এইমাত্র',
      views: 1,
      likes: 0,
    };

    this.articles.unshift(newArticle);
    this.saveArticles();
    return newArticle;
  }

  public resetToDefault(): void {
    this.articles = [...INITIAL_NEWS];
    this.comments = { ...INITIAL_COMMENTS };
    this.bookmarks.clear();
    this.userLikes.clear();
    this.saveArticles();
    this.saveComments();
    this.saveBookmarks();
    this.saveLikes();
  }
}

export const newsService = new NewsService();
