# Instagram API 연동 설정 가이드

이 문서는 프로젝트에서 Instagram API를 사용하여 인스타그램 피드를 표시하는 방법을 안내합니다.

## 1. Instagram API 설정

### 1.1 Facebook Developer Console 설정

1. [Facebook Developer Console](https://developers.facebook.com/)에 접속
2. 새 앱 생성 또는 기존 앱 선택
3. "Instagram Basic Display" 또는 "Instagram Graph API" 제품 추가

### 1.2 Instagram Basic Display API 설정 (개인 계정용)

1. Facebook Developer Console에서 Instagram Basic Display 설정
2. Valid OAuth Redirect URIs 추가: `http://localhost:3000/auth/instagram/callback`
3. Instagram 테스터 사용자 추가
4. Access Token 생성

### 1.3 Instagram Graph API 설정 (비즈니스 계정용)

1. Facebook Developer Console에서 Instagram Graph API 설정
2. Instagram 비즈니스 계정과 Facebook 페이지 연결
3. 필요한 권한 설정: `instagram_basic`, `pages_show_list`
4. Access Token 생성

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Instagram API 설정
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
NEXT_PUBLIC_INSTAGRAM_USER_ID=your_instagram_user_id_here
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_instagram_client_id_here
NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback

# 비공개 환경 변수 (서버 사이드에서만 사용)
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret_here

# 기타 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. 컴포넌트 사용법

### 3.1 기본 사용법 (모킹 데이터)

```tsx
import InstagramFeed from "@/components/ui/InstagramFeed";

export default function MyPage() {
  return (
    <div>
      <InstagramFeed useMockData={true} limit={6} />
    </div>
  );
}
```

### 3.2 실제 API 사용

```tsx
import InstagramFeed from "@/components/ui/InstagramFeed";

export default function MyPage() {
  return (
    <div>
      <InstagramFeed
        accessToken="your_access_token"
        userId="your_user_id"
        limit={6}
        useMockData={false}
      />
    </div>
  );
}
```

### 3.3 환경 변수 사용

```tsx
import InstagramFeed from "@/components/ui/InstagramFeed";
import { getInstagramConfig } from "@/lib/instagram";

export default function MyPage() {
  const config = getInstagramConfig();

  return (
    <div>
      <InstagramFeed
        accessToken={config.accessToken}
        userId={config.userId}
        limit={6}
        useMockData={false}
      />
    </div>
  );
}
```

## 4. API 제한사항 및 주의사항

### 4.1 Rate Limiting

- Instagram Basic Display API: 200 calls per hour per user
- Instagram Graph API: 다양한 제한 (계정 타입에 따라 다름)

### 4.2 Access Token 만료

- Basic Display API: 60일 후 만료
- Graph API: 다양한 만료 시간 설정 가능
- 토큰 갱신 기능 구현 권장

### 4.3 권한 및 승인

- 개인 계정: 개발자 본인의 계정만 접근 가능
- 비즈니스 계정: 앱 리뷰 후 공개 사용 가능

## 5. 테스트 페이지

개발 중에는 `/test-instagram` 페이지를 사용하여 Instagram 피드 컴포넌트를 테스트할 수 있습니다.

```
http://localhost:3000/test-instagram
```

이 페이지에서는:

- 모킹 데이터와 실제 API 간 전환 가능
- 다양한 설정 옵션 테스트
- 컴포넌트 사용법 확인

## 6. 유틸리티 함수

`src/lib/instagram.ts`에서 제공하는 유틸리티 함수들:

### 6.1 API 호출 함수

- `fetchInstagramPosts()`: Basic Display API 호출
- `fetchInstagramBusinessPosts()`: Graph API 호출
- `validateAccessToken()`: 토큰 유효성 확인
- `fetchUserInfo()`: 사용자 정보 조회

### 6.2 헬퍼 함수

- `getInstagramConfig()`: 환경 변수 설정 조회
- `generateAuthUrl()`: OAuth 인증 URL 생성
- `formatKoreanDate()`: 한국어 날짜 포맷팅
- `getRelativeTime()`: 상대적 시간 표시

## 7. 문제 해결

### 7.1 일반적인 오류

**"Instagram API error: 400 Bad Request"**

- Access Token이 잘못되었거나 만료됨
- User ID가 올바르지 않음
- API 엔드포인트 URL 확인

**"CORS 에러"**

- 클라이언트 사이드에서 직접 Instagram API 호출 시 발생
- 서버 사이드에서 API 호출 후 결과 전달 권장

**"Rate limit exceeded"**

- API 호출 제한 초과
- 캐싱 구현 또는 호출 빈도 조절 필요

### 7.2 디버깅 팁

1. 브라우저 개발자 도구 콘솔 확인
2. 네트워크 탭에서 API 요청/응답 확인
3. Access Token 유효성 확인
4. 환경 변수 설정 확인

## 8. 보안 고려사항

1. **Access Token 보호**: 클라이언트 사이드에서 토큰 노출 최소화
2. **환경 변수 관리**: `.env.local` 파일을 git에 커밋하지 않음
3. **토큰 갱신**: 주기적인 토큰 갱신 구현
4. **에러 처리**: 민감한 정보가 포함된 에러 메시지 필터링

## 9. 프로덕션 배포

1. 프로덕션 환경 변수 설정
2. Instagram 앱 리뷰 및 승인 (필요한 경우)
3. 도메인 변경에 따른 Redirect URI 업데이트
4. 모니터링 및 로깅 설정

## 10. 참고 자료

- [Instagram Basic Display API 문서](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API 문서](https://developers.facebook.com/docs/instagram-api)
- [Facebook Developer Console](https://developers.facebook.com/)
- [Instagram API 정책](https://developers.facebook.com/docs/instagram-api/overview#instagram-api-permissions)
