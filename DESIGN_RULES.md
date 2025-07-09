# 🎨 Design Rules & Memory

> 이 파일은 프로젝트의 디자인 규칙과 설정된 메모리를 관리합니다.  
> AI와 개발자가 함께 참고하여 일관된 UI/UX를 유지할 수 있습니다.

## 📋 현재 활성 메모리

### 1. 파일 명명 규칙

- **ID**: 2546530, 2546536
- **규칙**:
  - 파일명은 한국어보다 영어 사용 선호
  - 차량 이미지는 케밥케이스 사용 (예: `morning-black.png`)
  - 공백이나 특수문자 사용 금지

### 2. 이미지 선호 사항

- **ID**: 2546533
- **규칙**: VehicleGallery 컴포넌트에서는 배경이 없는 차량 이미지만 사용

### 3. CarSearchPage UI/UX 패턴

- **ID**: 2708220
- **규칙**:
  - 네비게이션 버튼: 가운데 정렬된 원통(캡슐) 모양 컨테이너
  - 버튼들 사이에 구분선(`w-px h-12 bg-gray-300`) 사용
  - 배경색 없이 아이콘만 표시
  - 아이콘 크기: `text-3xl`, 패딩: `p-4`
  - 마지막 단계에서도 다음 버튼 유지 (검색완료와 동일 동작)
  - 단계별 콘텐츠 영역: `min-h-[280px]` 고정 높이
  - 모든 단계에서 일관된 UI 유지

## 🎯 디자인 시스템

### 색상 팔레트

```css
/* Primary Colors */
--blue-primary: #2563eb; /* bg-blue-600 */
--blue-hover: #1d4ed8; /* bg-blue-700 */
--blue-light: #dbeafe; /* bg-blue-100 */

/* Secondary Colors */
--green-primary: #16a34a; /* bg-green-600 */
--red-primary: #dc2626; /* bg-red-600 */
--purple-primary: #9333ea; /* bg-purple-600 */
--orange-primary: #ea580c; /* bg-orange-600 */

/* Neutral Colors */
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-600: #4b5563;
--gray-900: #111827;
```

### 컴포넌트 패턴

#### 1. 버튼 컨테이너

```tsx
<div className="flex justify-center">
  <div className="border-2 border-gray-200 rounded-full p-3 shadow-lg">
    <div className="flex items-center">{/* 버튼들 */}</div>
  </div>
</div>
```

#### 2. 구분선

```tsx
<div className="w-px h-12 bg-gray-300 mx-2"></div>
```

#### 3. 아이콘 버튼

```tsx
<button className="p-4 text-{color}-600 hover:text-{color}-800 transition-all duration-300 text-3xl">
  {icon}
</button>
```

#### 4. 고정 높이 콘텐츠 영역

```tsx
<div className="mb-8 min-h-[280px] flex items-start">
  <div className="w-full">{/* 콘텐츠 */}</div>
</div>
```

## 📐 레이아웃 규칙

### 1. 컨테이너

- 최대 너비: `max-w-7xl mx-auto`
- 패딩: `px-4 sm:px-6 lg:px-8 py-8`

### 2. 카드 디자인

- 배경: `bg-white`
- 그림자: `shadow-xl`
- 모서리: `rounded-2xl`
- 패딩: `p-8`

### 3. 그리드 시스템

- 모바일: `grid-cols-1`
- 태블릿: `md:grid-cols-2` 또는 `md:grid-cols-3`
- 데스크톱: `lg:grid-cols-3` 또는 `lg:grid-cols-4`
- 대형 화면: `xl:grid-cols-4`

## 🚀 애니메이션 & 인터랙션

### 1. 기본 트랜지션

```css
transition-all duration-300
```

### 2. 호버 효과

- 버튼: 색상 변화 + `hover:scale-105`
- 카드: `hover:shadow-2xl` + `hover:scale-105`

### 3. 스크롤 애니메이션

```javascript
element?.scrollIntoView({ behavior: "smooth" });
```

## 📝 메모리 관리

### 업데이트 방법

1. 이 파일을 직접 수정
2. AI에게 "DESIGN_RULES.md 파일의 X 규칙을 Y로 변경해줘" 요청
3. 새로운 규칙 추가 시 해당 섹션에 추가

### 삭제 방법

1. 해당 항목을 이 파일에서 제거
2. AI에게 "X 규칙 삭제해줘"라고 요청

---

> **마지막 업데이트**: 2024년 12월  
> **다음 리뷰 예정**: 새로운 컴포넌트 추가 시
