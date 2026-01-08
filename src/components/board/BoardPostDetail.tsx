'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BoardPost, BOARD_CATEGORIES, CATEGORY_COLORS } from '@/types/board';
import { PageHeader } from '@/components/ui';

interface BoardPostDetailProps {
  post: BoardPost;
}

export const BoardPostDetail = ({ post }: BoardPostDetailProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 내용에서 줄바꿈을 <br>로 변환
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  // 게시글 삭제 (관리자용 - 실제로는 권한 체크 필요)
  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/board/${post.id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        alert('게시글이 삭제되었습니다.');
        router.push('/board');
      } else {
        alert(result.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="공지사항"
        subtitle="게시글 상세보기"
        showBreadcrumb
        breadcrumbItems={[
          { label: '홈', href: '/' },
          { label: '공지사항', href: '/board' },
          { label: post.title, href: `/board/${post.id}` }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* 게시글 헤더 */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col gap-4">
              {/* 카테고리와 중요 표시 */}
              <div className="flex items-center gap-2">
                <span className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${CATEGORY_COLORS[post.category]}`}>
                  {BOARD_CATEGORIES[post.category]}
                </span>
                {post.isImportant && (
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                    중요
                  </span>
                )}
              </div>

              {/* 제목 */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {post.title}
              </h1>

              {/* 메타 정보 */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>작성자: {post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>작성일: {formatDate(post.createdAt)}</span>
                </div>
                {post.createdAt !== post.updatedAt && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>수정일: {formatDate(post.updatedAt)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>조회수: {post.views}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="p-6">
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {formatContent(post.content)}
            </div>
          </div>

          {/* 관리자 액션 버튼 (실제로는 권한 체크 필요) */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              {/* 목록으로 돌아가기 */}
              <Link
                href="/board"
                className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                목록으로
              </Link>

              {/* 관리자 버튼들 (개발용) */}
              <div className="flex gap-2">
                <Link
                  href={`/board/${post.id}/edit`}
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 이전/다음 게시글 네비게이션 (추후 구현 가능) */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center text-gray-500">
            <p>다른 게시글을 보려면 목록으로 돌아가세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
