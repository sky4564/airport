import { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { BoardWriteForm } from '@/components/board/BoardWriteForm';

export const metadata: Metadata = {
  title: '게시글 작성 - 공지사항 - 공항렌트24',
  description: '새로운 게시글을 작성합니다.',
  robots: {
    index: false,
    follow: false
  }
};

export default function BoardWritePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="게시글 작성"
        subtitle="새로운 게시글을 작성합니다"
        showBreadcrumb
        breadcrumbItems={[
          { label: '홈', href: '/' },
          { label: '공지사항', href: '/board' },
          { label: '게시글 작성', href: '/board/write' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BoardWriteForm />
      </div>
    </div>
  );
}
