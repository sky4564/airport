# 공항렌트24 프로젝트 인수인계 문서

## 📋 프로젝트 개요

**공항렌트24**는 인천공항 렌터카 예약 서비스를 제공하는 Next.js 웹 애플리케이션입니다.

### 🛠 기술 스택

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Email**: Nodemailer (Gmail)
- **Deployment**: Vercel (추정)

## 📁 문서 구조

### 1. [EMAIL_SETUP.md](./EMAIL_SETUP.md)

이메일 전송 기능 설정 방법

- Gmail 앱 비밀번호 생성 방법
- 환경 변수 설정
- 여러 수신자 설정 방법

### 2. [DESIGN_RULES.md](./DESIGN_RULES.md)

UI/UX 디자인 가이드라인

- 컬러 팔레트
- 타이포그래피
- 레이아웃 규칙

### 3. [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md)

컴포넌트 구조 및 아키텍처

- 폴더 구조
- 컴포넌트 설계 원칙
- 재사용 가능한 컴포넌트 목록

## 🚀 주요 기능

### ✅ 구현된 기능

1. **차량 검색 시스템** (`/search`)

   - 단계별 필터링 (차종, 승차인원, 가격, 특별기능)
   - 실시간 검색 결과
   - 차량 상세 정보 표시

2. **예약 문의 시스템** (`/reservation`)

   - 폼 validation (React Hook Form + Zod)
   - 이메일 자동 전송 (HTML + 텍스트 버전)
   - 선택된 차량 정보 자동 입력

3. **차량 갤러리** (`/vehicles`)

   - 카테고리별 필터링
   - 반응형 그리드 레이아웃
   - 무한 스크롤 (더보기 버튼)

4. **회사 소개** (`/about`, `/pickup`)
   - 픽업 서비스 안내
   - 연락처 정보

### 📧 이메일 시스템

- **API 경로**: `/api/send-email`
- **기능**:
  - HTML과 텍스트 버전 동시 전송
  - 여러 수신자 지원 (TO, CC, BCC)
  - 예약 정보 포맷팅
  - 에러 핸들링

## 🔧 환경 설정

### 필수 환경 변수 (`.env.local`)

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@gmail.com
EMAIL_CC=additional@gmail.com (선택사항)
EMAIL_BCC=secret@gmail.com (선택사항)
```

### 개발 환경 실행

```bash
npm install
npm run dev
```

## 📱 페이지 구조

| 경로           | 페이지    | 기능                   |
| -------------- | --------- | ---------------------- |
| `/`            | 홈        | 메인 랜딩 페이지       |
| `/search`      | 차량 찾기 | 단계별 차량 검색       |
| `/reservation` | 예약 문의 | 예약 폼 및 이메일 전송 |
| `/vehicles`    | 차량 안내 | 보유 차량 갤러리       |
| `/about`       | 회사 소개 | 회사 정보 및 위치      |
| `/pickup`      | 공항 픽업 | 픽업 서비스 안내       |

## 🎨 디자인 시스템

### 메인 컬러

- **Primary**: Blue (#2563eb, #1e40af, #1e3a8a)
- **Success**: Green (#16a34a, #15803d)
- **Warning**: Yellow (#f59e0b, #d97706)
- **Text**: Gray (#111827, #1f2937, #374151)

### 반응형 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 주요 컴포넌트

### `/src/components/`

- **forms/ReservationForm.tsx**: 예약 문의 폼
- **search/CarSearchPage.tsx**: 차량 검색 페이지
- **ui/VehicleGallery.tsx**: 차량 갤러리
- **layout/Navigation.tsx**: 네비게이션 바
- **layout/Footer.tsx**: 푸터

### `/src/lib/`

- **vehicles.ts**: 차량 데이터 및 유틸리티 함수

## ⚠️ 중요 참고사항

### 메모리 설정

프로젝트에는 다음과 같은 디자인 메모리가 설정되어 있습니다:

1. **CarSearchPage 디자인 패턴**: 네비게이션 버튼, 단계별 UI 일관성
2. **차량 이미지**: kebab-case 파일명, 배경 제거된 이미지 선호
3. **파일명**: 영어 사용 선호

### 차량 이미지 관리

- **경로**: `/public/images/cars/`
- **명명 규칙**: `{차량명}-{색상}-{크기}.png`
- **예시**: `morning-black-compact.png`

### SEO 설정

- JSON-LD 구조화 데이터 적용
- 각 페이지별 메타데이터 설정
- 사이트맵 자동 생성

## 🐛 알려진 이슈

1. **이미지 설정 경고**: Next.js config에서 `images.domains` 대신 `images.remotePatterns` 사용 권장
2. **채널톡**: 현재 테스트 키 사용 중 (실제 서비스 시 변경 필요)

## 📞 개발 지원

추가 문의나 기능 개발이 필요한 경우:

1. 각 문서의 상세 가이드 참조
2. 코드 내 주석 확인
3. Git 커밋 히스토리 참조

---

**마지막 업데이트**: 2024년 12월
**개발 완료 기능**: 차량 검색, 예약 문의, 이메일 전송, 반응형 UI
