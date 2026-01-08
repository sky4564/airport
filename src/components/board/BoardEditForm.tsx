'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BoardPost, UpdateBoardPost, BOARD_CATEGORIES } from '@/types/board';

interface BoardEditFormProps {
  post: BoardPost;
}

export const BoardEditForm = ({ post }: BoardEditFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UpdateBoardPost>({
    title: post.title,
    content: post.content,
    category: post.category,
    isImportant: post.isImportant,
    status: post.status
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim() || !formData.content?.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/board/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('게시글이 수정되었습니다.');
        router.push(`/board/${post.id}`);
      } else {
        alert(result.message || '수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('수정 오류:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 카테고리 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(BOARD_CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* 상태 */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              상태 <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>

        {/* 중요 게시글 여부 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isImportant"
            name="isImportant"
            checked={formData.isImportant}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isImportant" className="ml-2 block text-sm text-gray-700">
            중요 게시글로 설정 (목록 상단에 고정됩니다)
          </label>
        </div>

        {/* 제목 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="게시글 제목을 입력하세요"
            maxLength={100}
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.title?.length}/100자
          </p>
        </div>

        {/* 내용 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={15}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="게시글 내용을 입력하세요"
          />
          <p className="mt-1 text-sm text-gray-500">
            줄바꿈은 자동으로 적용됩니다.
          </p>
        </div>

        {/* 메타 정보 표시 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">게시글 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>작성자: {post.author}</div>
            <div>조회수: {post.views}</div>
            <div>작성일: {new Date(post.createdAt).toLocaleString('ko-KR')}</div>
            <div>수정일: {new Date(post.updatedAt).toLocaleString('ko-KR')}</div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '수정 중...' : '게시글 수정'}
          </button>
        </div>
      </form>
    </div>
  );
};
