import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui';
import { BoardEditForm } from '@/components/board/BoardEditForm';

interface BoardEditPageProps {
  params: {
    id: string;
  };
}

// 게시글 데이터 서버사이드에서 가져오기
async function getPost(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/board/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BoardEditPageProps): Promise<Metadata> {
  const post = await getPost(params.id);

  return {
    title: post ? `${post.title} 수정 - 공지사항 - 공항렌트24` : '게시글 수정 - 공항렌트24',
    description: '게시글을 수정합니다.',
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function BoardEditPage({ params }: BoardEditPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="게시글 수정"
        subtitle="게시글을 수정합니다"
        showBreadcrumb
        breadcrumbItems={[
          { label: '홈', href: '/' },
          { label: '공지사항', href: '/board' },
          { label: post.title, href: `/board/${post.id}` },
          { label: '수정', href: `/board/${post.id}/edit` }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BoardEditForm post={post} />
      </div>
    </div>
  );
}
