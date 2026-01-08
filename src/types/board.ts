export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'notice' | 'faq' | 'general';
  isImportant: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

export interface CreateBoardPost {
  title: string;
  content: string;
  author: string;
  category: 'notice' | 'faq' | 'general';
  isImportant?: boolean;
}

export interface UpdateBoardPost {
  title?: string;
  content?: string;
  category?: 'notice' | 'faq' | 'general';
  isImportant?: boolean;
  status?: 'active' | 'inactive';
}

export interface BoardPostListItem {
  id: string;
  title: string;
  author: string;
  category: 'notice' | 'faq' | 'general';
  isImportant: boolean;
  views: number;
  createdAt: string;
}

export interface BoardApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface BoardListResponse {
  posts: BoardPostListItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BoardSearchParams {
  page?: number;
  limit?: number;
  category?: 'notice' | 'faq' | 'general' | 'all';
  search?: string;
  orderBy?: 'createdAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export const BOARD_CATEGORIES = {
  notice: '공지사항',
  faq: '자주묻는질문',
  general: '일반게시판'
} as const;

export const CATEGORY_COLORS = {
  notice: 'bg-red-100 text-red-800',
  faq: 'bg-blue-100 text-blue-800',
  general: 'bg-green-100 text-green-800'
} as const;
