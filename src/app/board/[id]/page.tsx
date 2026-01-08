import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardPostDetail } from '@/components/board/BoardPostDetail';

interface BoardPostPageProps {
  params: {
    id: string;
  };
}

// 게시글 데이터 서버사이드에서 가져오기
async function getPost(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/board/${id}`, {
      cache: 'no-store' // 항상 최신 데이터 가져오기
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

export async function generateMetadata({ params }: BoardPostPageProps): Promise<Metadata> {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없음 - 공항렌트24'
    };
  }

  return {
    title: `${post.title} - 공지사항 - 공항렌트24`,
    description: post.content.slice(0, 160) + '...',
    keywords: `공지사항, ${post.title}, 공항렌트24`,
    openGraph: {
      title: `${post.title} - 공항렌트24`,
      description: post.content.slice(0, 160) + '...',
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BoardPostPage({ params }: BoardPostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <BoardPostDetail post={post} />;
}
