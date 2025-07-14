# 개발자 가이드

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp docs/EMAIL_SETUP.md .env.local
# .env.local 파일을 열어서 실제 Gmail 정보 입력

# 개발 서버 실행
npm run dev
```

### 2. 프로젝트 구조

```
code_airport/
├── docs/                    # 📄 문서 모음
│   ├── README.md           # 인수인계 메인 문서
│   ├── EMAIL_SETUP.md      # 이메일 설정 가이드
│   ├── DESIGN_RULES.md     # 디자인 규칙
│   └── COMPONENT_STRUCTURE.md # 컴포넌트 구조
├── src/
│   ├── app/                # 📱 Next.js App Router
│   │   ├── layout.tsx      # 전역 레이아웃
│   │   ├── page.tsx        # 홈페이지
│   │   ├── search/         # 차량 검색 페이지
│   │   ├── reservation/    # 예약 문의 페이지
│   │   ├── vehicles/       # 차량 안내 페이지
│   │   ├── about/          # 회사 소개 페이지
│   │   ├── pickup/         # 픽업 안내 페이지
│   │   └── api/            # API 엔드포인트
│   │       └── send-email/ # 이메일 전송 API
│   ├── components/         # 🧩 재사용 컴포넌트
│   │   ├── forms/          # 폼 컴포넌트
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   ├── reservation/    # 예약 관련 컴포넌트
│   │   ├── search/         # 검색 관련 컴포넌트
│   │   ├── seo/            # SEO 컴포넌트
│   │   └── ui/             # 기본 UI 컴포넌트
│   ├── lib/                # 🔧 유틸리티 및 데이터
│   │   └── vehicles.ts     # 차량 데이터
│   └── types/              # 📝 TypeScript 타입 정의
├── public/                 # 🖼️ 정적 파일
│   ├── images/
│   │   ├── cars/           # 차량 이미지
│   │   └── terminals/      # 터미널 이미지
│   └── ...
└── vehicle_options.csv     # 차량 옵션 데이터
```

## 🔧 주요 기술 스택

### Frontend

- **Next.js 15**: App Router 사용
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 CSS 프레임워크

### 폼 처리

- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증
- **React DatePicker**: 날짜/시간 선택

### 이메일

- **Nodemailer**: 이메일 전송
- **Gmail SMTP**: 이메일 서비스

## 📋 주요 기능 상세

### 1. 차량 검색 시스템 (`/search`)

**파일**: `src/components/search/CarSearchPage.tsx`

**기능**:

- 4단계 필터링 시스템
- 자동/수동 단계 이동
- 실시간 검색 결과 업데이트
- 반응형 디자인

**메모리 패턴** (ID: 2708220):

```typescript
// 네비게이션 버튼 스타일
const navButtonStyle = "가운데 정렬된 원통(캡슐) 모양 컨테이너";
// 아이콘: text-3xl 크기, p-4 패딩
// 컨텐츠 영역: min-h-[280px] 고정 높이
```

### 2. 예약 문의 시스템 (`/reservation`)

**파일**: `src/components/forms/ReservationForm.tsx`

**기능**:

- React Hook Form + Zod 검증
- 차량 정보 자동 입력
- 이메일 전송 API 연동
- 성공/실패 상태 처리

**API**: `src/app/api/send-email/route.ts`

- HTML + 텍스트 이메일 동시 전송
- 여러 수신자 지원 (TO, CC, BCC)
- 에러 핸들링

### 3. 차량 데이터 관리

**파일**: `src/lib/vehicles.ts`

**구조**:

```typescript
interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  price: string;
  seating: number;
  features: string[];
  image: string;
  priceValue: number;
}
```

**카테고리**:

- 경차, 준중형, 중형, 준대형, 대형, SUV, 승합차

## 🎨 스타일링 가이드

### 색상 시스템

```css
/* Primary Colors */
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--blue-800: #1e40af;

/* Success Colors */
--green-600: #16a34a;
--green-700: #15803d;

/* Text Colors */
--gray-900: #111827;
--gray-800: #1f2937;
--gray-700: #374151;
```

### 반응형 디자인

```css
/* Mobile First */
.container {
  @apply px-2 sm:px-6 lg:px-8;
}

/* Grid Systems */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
```

## 🔍 컴포넌트 설계 원칙

### 1. 재사용성

```typescript
// Good: Props를 통한 유연성
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

// Bad: 하드코딩된 스타일
const Button = () => <button className="bg-blue-600">Click</button>;
```

### 2. 타입 안전성

```typescript
// 모든 컴포넌트에 명시적 타입 정의
export default function ReservationForm({
  simplified = false,
}: {
  simplified?: boolean;
}) {
  // ...
}
```

### 3. 성능 최적화

```typescript
// Suspense를 사용한 코드 스플리팅
function ReservationFormWrapper() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
      }
    >
      <ReservationForm />
    </Suspense>
  );
}
```

## 🐛 디버깅 가이드

### 일반적인 문제

1. **이메일 전송 실패**

   ```bash
   # 환경 변수 확인
   echo $EMAIL_USER

   # 개발자 도구 콘솔 확인
   # Network 탭에서 /api/send-email 요청 상태 확인
   ```

2. **이미지 로딩 문제**

   ```typescript
   // Next.js Image 컴포넌트 사용
   import Image from "next/image";

   // 올바른 경로 확인
   <Image src="/images/cars/vehicle-name.png" alt="..." />;
   ```

3. **빌드 에러**

   ```bash
   # 타입 에러 확인
   npm run build

   # Lint 에러 확인
   npm run lint
   ```

## 🚀 배포 가이드

### Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정 (Vercel 대시보드에서)
EMAIL_USER=charent@charentcar.com
EMAIL_PASS=your-app-password
EMAIL_TO=charent@charentcar.com
```

### 수동 배포

```bash
# 빌드
npm run build

# 정적 파일 확인
npm run start
```

## 📈 성능 최적화

### 이미지 최적화

- WebP 포맷 사용 권장
- Next.js Image 컴포넌트 활용
- 적절한 사이즈 설정

### 코드 분할

- 페이지별 자동 코드 분할
- Dynamic import 활용
- Suspense 경계 설정

## 🔐 보안 고려사항

### 환경 변수

- `.env.local` 파일은 Git에 커밋하지 않음
- 프로덕션에서는 안전한 환경 변수 관리

### 이메일 보안

- Gmail 앱 비밀번호 사용 (2FA 필수)
- SMTP 연결 암호화

---

**개발 시 참고사항**:

- 코드 변경 시 기존 메모리 설정 유지
- 새로운 기능 추가 시 문서 업데이트
- 테스트 후 커밋
