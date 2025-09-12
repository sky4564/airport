'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateBoardPost, BOARD_CATEGORIES } from '@/types/board';

export const BoardWriteForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateBoardPost>({
    title: '',
    content: '',
    author: '관리자', // 실제로는 로그인된 사용자 정보 사용
    category: 'notice',
    isImportant: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('게시글이 작성되었습니다.');
        router.push(`/board/${result.data.id}`);
      } else {
        alert(result.message || '작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('작성 오류:', error);
      alert('작성 중 오류가 발생했습니다.');
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

          {/* 작성자 */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              작성자 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="작성자명을 입력하세요"
            />
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
            {formData.title.length}/100자
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
            {isSubmitting ? '작성 중...' : '게시글 작성'}
          </button>
        </div>
      </form>
    </div>
  );
};
