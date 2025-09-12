import { NextRequest, NextResponse } from 'next/server';
import { BoardDataManager } from '@/lib/board-data';
import { CreateBoardPost, BoardApiResponse, BoardListResponse } from '@/types/board';

// GET - 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      category: searchParams.get('category') as any || 'all',
      search: searchParams.get('search') || '',
      orderBy: searchParams.get('orderBy') as any || 'createdAt',
      sortOrder: searchParams.get('sortOrder') as any || 'desc'
    };

    const result = await BoardDataManager.getPosts(params);

    return NextResponse.json({
      success: true,
      data: result
    } as BoardApiResponse<BoardListResponse>);

  } catch (error) {
    console.error('게시글 목록 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '게시글 목록을 불러오는데 실패했습니다.'
    } as BoardApiResponse<never>, { status: 500 });
  }
}

// POST - 게시글 생성
export async function POST(request: NextRequest) {
  try {
    const postData: CreateBoardPost = await request.json();

    // 간단한 검증
    if (!postData.title || !postData.content || !postData.author) {
      return NextResponse.json({
        success: false,
        message: '제목, 내용, 작성자는 필수 항목입니다.'
      } as BoardApiResponse<never>, { status: 400 });
    }

    const newPost = await BoardDataManager.createPost(postData);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: '게시글이 성공적으로 작성되었습니다.'
    } as BoardApiResponse<typeof newPost>);

  } catch (error) {
    console.error('게시글 작성 오류:', error);
    return NextResponse.json({
      success: false,
      message: '게시글 작성에 실패했습니다.'
    } as BoardApiResponse<never>, { status: 500 });
  }
}
