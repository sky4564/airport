import { NextRequest, NextResponse } from 'next/server';
import { BoardDataManager } from '@/lib/board-data';
import { UpdateBoardPost, BoardApiResponse, BoardPost } from '@/types/board';

// GET - 게시글 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await BoardDataManager.getPostById(params.id);

    if (!post) {
      return NextResponse.json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      } as BoardApiResponse<never>, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: post
    } as BoardApiResponse<BoardPost>);

  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '게시글을 불러오는데 실패했습니다.'
    } as BoardApiResponse<never>, { status: 500 });
  }
}

// PUT - 게시글 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData: UpdateBoardPost = await request.json();

    const updatedPost = await BoardDataManager.updatePost(params.id, updateData);

    if (!updatedPost) {
      return NextResponse.json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      } as BoardApiResponse<never>, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: '게시글이 성공적으로 수정되었습니다.'
    } as BoardApiResponse<BoardPost>);

  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return NextResponse.json({
      success: false,
      message: '게시글 수정에 실패했습니다.'
    } as BoardApiResponse<never>, { status: 500 });
  }
}

// DELETE - 게시글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await BoardDataManager.deletePost(params.id);

    if (!success) {
      return NextResponse.json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      } as BoardApiResponse<never>, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: '게시글이 성공적으로 삭제되었습니다.'
    } as BoardApiResponse<never>);

  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json({
      success: false,
      message: '게시글 삭제에 실패했습니다.'
    } as BoardApiResponse<never>, { status: 500 });
  }
}
