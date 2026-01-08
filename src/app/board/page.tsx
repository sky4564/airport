import { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { BoardList } from '@/components/board/BoardList';

export const metadata: Metadata = {
  title: '공지사항 - 공항렌트24',
  description: '공항렌트24의 최신 공지사항과 자주묻는질문을 확인하세요.',
  keywords: '공지사항, FAQ, 자주묻는질문, 공항렌트24',
};

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="공지사항"
        subtitle="공항렌트24의 최신 소식과 안내사항을 확인하세요"
        showBreadcrumb
        breadcrumbItems={[
          { label: '홈', href: '/' },
          { label: '공지사항', href: '/board' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BoardList />
      </div>
    </div>
  );
}
