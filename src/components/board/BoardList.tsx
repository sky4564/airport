'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BoardPostListItem, BoardSearchParams, BoardListResponse, BOARD_CATEGORIES, CATEGORY_COLORS } from '@/types/board';

interface BoardListProps {
  initialPage?: number;
  initialCategory?: string;
}

export const BoardList = ({ initialPage = 1, initialCategory = 'all' }: BoardListProps) => {
  const [posts, setPosts] = useState<BoardPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<BoardSearchParams>({
    page: initialPage,
    limit: 10,
    category: initialCategory === 'all' ? 'all' : initialCategory as any,
    search: '',
    orderBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [listData, setListData] = useState<BoardListResponse | null>(null);

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/board?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data.posts);
        setListData(result.data);
      } else {
        setError(result.message || '게시글을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 로딩 오류:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => ({ ...prev, category: category as any, page: 1 }));
  };

  // 검색
  const handleSearch = (search: string) => {
    setSearchParams(prev => ({ ...prev, search, page: 1 }));
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* 게시글 작성 버튼 (관리자용) */}
          <div className="lg:order-3">
            <Link
              href="/board/write"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              게시글 작성
            </Link>
          </div>
          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 lg:order-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchParams.category === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              전체
            </button>
            {Object.entries(BOARD_CATEGORIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchParams.category === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* 검색 */}
          <div className="w-full lg:w-auto lg:order-2">
            <div className="relative">
              <input
                type="text"
                placeholder="제목, 내용으로 검색..."
                value={searchParams.search || ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-white rounded-lg shadow-sm border">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 테이블 헤더 (데스크톱) */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-6">제목</div>
              <div className="col-span-2">카테고리</div>
              <div className="col-span-2">작성자</div>
              <div className="col-span-1">조회수</div>
              <div className="col-span-1">작성일</div>
            </div>

            {/* 게시글 목록 */}
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <Link href={`/board/${post.id}`}>
                    <div className="md:grid md:grid-cols-12 gap-4 items-center">
                      {/* 제목 */}
                      <div className="col-span-6 mb-2 md:mb-0">
                        <div className="flex items-center gap-2">
                          {post.isImportant && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                              중요
                            </span>
                          )}
                          <h3 className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      {/* 카테고리 (모바일에서는 제목 아래) */}
                      <div className="col-span-2 mb-1 md:mb-0">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[post.category]}`}>
                          {BOARD_CATEGORIES[post.category]}
                        </span>
                      </div>

                      {/* 작성자 */}
                      <div className="col-span-2 text-sm text-gray-600 mb-1 md:mb-0">
                        {post.author}
                      </div>

                      {/* 조회수 */}
                      <div className="col-span-1 text-sm text-gray-500 mb-1 md:mb-0">
                        <span className="md:hidden">조회 </span>
                        {post.views}
                      </div>

                      {/* 작성일 */}
                      <div className="col-span-1 text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 페이지네이션 */}
      {listData && listData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-6">
          <button
            onClick={() => handlePageChange(listData.currentPage - 1)}
            disabled={!listData.hasPrevPage}
            className="px-3 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            이전
          </button>

          {Array.from({ length: listData.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === listData.currentPage
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(listData.currentPage + 1)}
            disabled={!listData.hasNextPage}
            className="px-3 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
