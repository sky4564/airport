// Instagram API 연동을 위한 유틸리티 함수들

export interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

export interface InstagramApiResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
    previous?: string;
  };
}

/**
 * Instagram Basic Display API를 사용하여 사용자의 미디어를 가져옵니다.
 * @param accessToken - Instagram 액세스 토큰
 * @param userId - Instagram 사용자 ID
 * @param limit - 가져올 포스트 수 (기본값: 25)
 * @returns Promise<InstagramPost[]>
 */
export async function fetchInstagramPosts(
  accessToken: string,
  userId: string,
  limit: number = 25
): Promise<InstagramPost[]> {
  try {
    const fields = 'id,media_url,media_type,caption,permalink,timestamp,thumbnail_url';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data: InstagramApiResponse = await response.json();

    return data.data || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
}

/**
 * Instagram Graph API를 사용하여 비즈니스 계정의 미디어를 가져옵니다.
 * @param accessToken - Instagram 액세스 토큰
 * @param userId - Instagram 비즈니스 계정 ID
 * @param limit - 가져올 포스트 수 (기본값: 25)
 * @returns Promise<InstagramPost[]>
 */
export async function fetchInstagramBusinessPosts(
  accessToken: string,
  userId: string,
  limit: number = 25
): Promise<InstagramPost[]> {
  try {
    const fields = 'id,media_url,media_type,caption,permalink,timestamp,thumbnail_url';
    const url = `https://graph.facebook.com/v18.0/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Instagram Graph API error: ${response.status} ${response.statusText}`);
    }

    const data: InstagramApiResponse = await response.json();

    return data.data || [];
  } catch (error) {
    console.error('Error fetching Instagram business posts:', error);
    throw error;
  }
}

/**
 * 액세스 토큰의 유효성을 확인합니다.
 * @param accessToken - Instagram 액세스 토큰
 * @returns Promise<boolean>
 */
export async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const url = `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`;
    const response = await fetch(url);

    return response.ok;
  } catch (error) {
    console.error('Error validating access token:', error);
    return false;
  }
}

/**
 * 사용자 정보를 가져옵니다.
 * @param accessToken - Instagram 액세스 토큰
 * @returns Promise<{id: string, username: string}>
 */
export async function fetchUserInfo(accessToken: string): Promise<{ id: string, username: string }> {
  try {
    const url = `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      username: data.username
    };
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}

/**
 * 환경 변수에서 Instagram 설정을 가져옵니다.
 */
export function getInstagramConfig() {
  return {
    accessToken: process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || '',
    userId: process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID || '',
    clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '', // 서버 사이드에서만 사용
    redirectUri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || '',
  };
}

/**
 * 토큰 갱신 URL을 생성합니다.
 * @param accessToken - 현재 액세스 토큰
 * @returns string
 */
export function generateTokenRefreshUrl(accessToken: string): string {
  return `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
}

/**
 * 인스타그램 OAuth 인증 URL을 생성합니다.
 * @param clientId - Instagram 클라이언트 ID
 * @param redirectUri - 리다이렉트 URI
 * @param scope - 권한 범위 (기본값: 'user_profile,user_media')
 * @returns string
 */
export function generateAuthUrl(
  clientId: string,
  redirectUri: string,
  scope: string = 'user_profile,user_media'
): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    response_type: 'code',
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

/**
 * 인스타그램 미디어 타입에 따른 아이콘을 반환합니다.
 * @param mediaType - 미디어 타입
 * @returns string (SVG 아이콘)
 */
export function getMediaTypeIcon(mediaType: string): string {
  switch (mediaType) {
    case 'VIDEO':
      return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>`;
    case 'CAROUSEL_ALBUM':
      return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6L8 13h12l-3.5-5-2.5 3.01L10.5 10z"/>
        <path d="M2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
      </svg>`;
    default: // IMAGE
      return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>`;
  }
}

/**
 * 날짜를 한국어 형식으로 포맷팅합니다.
 * @param timestamp - ISO 8601 타임스탬프
 * @returns string
 */
export function formatKoreanDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * 상대적인 시간을 반환합니다. (예: "2시간 전")
 * @param timestamp - ISO 8601 타임스탬프
 * @returns string
 */
export function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}달 전`;
  }
} 