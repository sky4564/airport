import { BoardPost, CreateBoardPost, UpdateBoardPost, BoardSearchParams, BoardListResponse } from '@/types/board';

// 임시 데이터 저장소 (실제 운영에서는 데이터베이스 사용)
let boardPosts: BoardPost[] = [
  {
    id: '1',
    title: '공항렌트24 서비스 오픈 안내',
    content: '안녕하세요! 공항렌트24가 새롭게 오픈하였습니다.\n\n저희는 인천공항에서 24시간 픽업 가능한 렌터카 서비스를 제공합니다.\n\n- 다양한 차종 보유 (경차부터 대형차까지)\n- 24시간 픽업 서비스\n- 합리적인 요금\n- 친절한 고객서비스\n\n많은 이용 부탁드립니다.',
    author: '관리자',
    category: 'notice',
    isImportant: true,
    views: 150,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    title: '추석 연휴 운영 안내',
    content: '추석 연휴 기간 중 운영 안내드립니다.\n\n- 운영기간: 9월 28일 ~ 10월 3일\n- 24시간 운영\n- 사전 예약 필수\n\n연휴 기간 중 차량 수요가 많으니 미리 예약해주시기 바랍니다.',
    author: '관리자',
    category: 'notice',
    isImportant: true,
    views: 89,
    createdAt: '2024-09-20T14:30:00Z',
    updatedAt: '2024-09-20T14:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    title: '예약 취소 및 변경은 언제까지 가능한가요?',
    content: '예약 취소 및 변경 관련 안내입니다.\n\n■ 예약 취소\n- 픽업 24시간 전까지: 무료 취소\n- 픽업 24시간 이내: 취소 수수료 50%\n- 픽업 시간 경과 후: 취소 불가\n\n■ 예약 변경\n- 픽업 12시간 전까지 가능\n- 차종 변경 시 차액 정산\n\n자세한 사항은 고객센터로 문의해주세요.',
    author: '관리자',
    category: 'faq',
    isImportant: false,
    views: 234,
    createdAt: '2024-01-20T11:15:00Z',
    updatedAt: '2024-01-20T11:15:00Z',
    status: 'active'
  },
  {
    id: '4',
    title: '보험 가입 안내',
    content: '렌터카 이용 시 보험 가입 관련 안내입니다.\n\n모든 차량에는 기본보험이 포함되어 있습니다.\n\n■ 기본보험 포함사항\n- 대인배상보험: 무제한\n- 대물배상보험: 2억원\n- 자손사고: 1,500만원\n\n■ 추가보험 (선택사항)\n- 완전보험: 일일 2만원\n- 면책금 면제: 일일 1만원\n\n안전한 운전 되세요!',
    author: '관리자',
    category: 'faq',
    isImportant: false,
    views: 156,
    createdAt: '2024-02-01T16:45:00Z',
    updatedAt: '2024-02-01T16:45:00Z',
    status: 'active'
  },
  {
    id: '5',
    title: '신규 차량 입고 안내 - 2024년형 그랜저',
    content: '신규 차량 입고 안내드립니다.\n\n2024년형 현대 그랜저가 새롭게 입고되었습니다.\n\n■ 차량 사양\n- 2.5 가솔린 엔진\n- 8단 자동변속기\n- 풀옵션 (가죽시트, 선루프, 네비게이션 등)\n- 연비: 11.2km/L\n\n예약 문의는 고객센터로 연락해주세요.',
    author: '관리자',
    category: 'general',
    isImportant: false,
    views: 78,
    createdAt: '2024-03-10T10:20:00Z',
    updatedAt: '2024-03-10T10:20:00Z',
    status: 'active'
  }
];

export class BoardDataManager {
  // 게시글 목록 조회
  static async getPosts(params: BoardSearchParams = {}): Promise<BoardListResponse> {
    const {
      page = 1,
      limit = 10,
      category = 'all',
      search = '',
      orderBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    let filteredPosts = boardPosts.filter(post => post.status === 'active');

    // 카테고리 필터
    if (category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // 검색 필터
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    // 정렬
    filteredPosts.sort((a, b) => {
      // 중요 게시글을 먼저 정렬
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;

      let aValue: any = a[orderBy as keyof BoardPost];
      let bValue: any = b[orderBy as keyof BoardPost];

      if (orderBy === 'createdAt' || orderBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });

    const totalCount = filteredPosts.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const posts = filteredPosts.slice(startIndex, endIndex).map(post => ({
      id: post.id,
      title: post.title,
      author: post.author,
      category: post.category,
      isImportant: post.isImportant,
      views: post.views,
      createdAt: post.createdAt
    }));

    return {
      posts,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  }

  // 게시글 상세 조회
  static async getPostById(id: string): Promise<BoardPost | null> {
    const post = boardPosts.find(p => p.id === id && p.status === 'active');

    if (post) {
      // 조회수 증가
      post.views += 1;
      return { ...post };
    }

    return null;
  }

  // 게시글 생성
  static async createPost(postData: CreateBoardPost): Promise<BoardPost> {
    const newPost: BoardPost = {
      id: Date.now().toString(),
      ...postData,
      isImportant: postData.isImportant || false,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };

    boardPosts.unshift(newPost);
    return newPost;
  }

  // 게시글 수정
  static async updatePost(id: string, updateData: UpdateBoardPost): Promise<BoardPost | null> {
    const postIndex = boardPosts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      return null;
    }

    const updatedPost = {
      ...boardPosts[postIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    boardPosts[postIndex] = updatedPost;
    return updatedPost;
  }

  // 게시글 삭제
  static async deletePost(id: string): Promise<boolean> {
    const postIndex = boardPosts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      return false;
    }

    // 실제로는 삭제하지 않고 status를 inactive로 변경
    boardPosts[postIndex].status = 'inactive';
    boardPosts[postIndex].updatedAt = new Date().toISOString();

    return true;
  }
}
