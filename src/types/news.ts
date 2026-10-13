export type NewsCategory =
  | 'all'
  | 'bangladesh'
  | 'international'
  | 'politics'
  | 'economy'
  | 'countrywide'
  | 'sports'
  | 'entertainment'
  | 'technology';

export interface CategoryInfo {
  id: NewsCategory;
  name: string;
  englishName: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string; // paragraphs separated by double newline
  category: NewsCategory;
  categoryName: string;
  author: {
    name: string;
    role: string;
    location?: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  imageCaption?: string;
  isBreaking?: boolean;
  isLead?: boolean;
  isTrending?: boolean;
  views: number;
  likes: number;
  tags: string[];
}

export interface ArticleComment {
  id: string;
  articleId: string;
  authorName: string;
  text: string;
  date: string;
}

export type ActivePage = 'home' | 'about' | 'contact' | 'privacy' | 'ad-rates' | 'bookmarks';
