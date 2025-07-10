# 컴포넌트 구조 및 인수인계 가이드

이 문서는 프로젝트의 컴포넌트 구조와 개발 원칙을 정리하여, 인수인계 및 협업 시 참고할 수 있도록 작성되었습니다.

---

## 1. 전체 구조 개요

- **page**: 라우트 단위의 최상위 파일. 실제 화면을 구성할 때 최대한 컴포넌트만 import해서 사용합니다.
- **section**: 페이지 내 주요 영역(섹션)을 담당하는 중간 단위 컴포넌트입니다. (예: HeroSection, FooterSection)
- **card / banner / item**: section을 구성하는 세부 단위 컴포넌트입니다. (예: InfoCard, HeroMessageCard, HeroEventCard)
- **ui**: 여러 곳에서 재사용 가능한 아주 작은 단위의 UI 컴포넌트입니다. (예: Button, Input 등)

## 2. 계층적 컴포넌트 구조 예시

```
(page)
└─ SectionA (ex. HeroSection)
   ├─ CardA (ex. HeroMessageCard)
   └─ CardB (ex. HeroEventCard)
└─ SectionB (ex. InfoCards)
   ├─ CardC (ex. InfoCard)
   └─ ...
└─ SectionC (ex. SocialButtons)
   ├─ SocialButton
   └─ ...
```

- **page**는 레이아웃과 각 section 컴포넌트만 import해서 조립합니다.
- **section**은 내부적으로 여러 card/banner/item 컴포넌트를 조합해 영역을 만듭니다.
- **card/banner/item**은 실제 UI의 세부 단위입니다.

## 3. 개발 원칙

- **최대한 작은 단위로 분리**: 재사용성과 유지보수를 위해 section, card, banner 등으로 쪼갭니다.
- **props로 데이터 전달**: 상위 컴포넌트가 하위 컴포넌트에 필요한 데이터만 props로 전달합니다.
- **폴더 구조와 import 경로 일치**: 컴포넌트 파일명과 import 경로는 대소문자까지 정확히 맞춥니다.
- **스타일은 컴포넌트 내부에**: tailwind 등으로 각 컴포넌트별 스타일을 관리합니다.

## 4. 예시 코드

### page 예시 (src/app/page.tsx)

```tsx
import HeroSection from "@/components/reservation/HeroSection";
import InfoCards from "@/components/reservation/InfoCards";
import SocialButtons from "@/components/reservation/SocialButtons";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InfoCards />
      <SocialButtons />
    </main>
  );
}
```

### section 예시 (HeroSection)

```tsx
import HeroMessageCard from "@/components/reservation/HeroMessageCard";
import HeroEventCard from "@/components/reservation/HeroEventCard";

export default function HeroSection() {
  return (
    <div>
      <HeroMessageCard />
      <HeroEventCard />
    </div>
  );
}
```

### card 예시 (HeroMessageCard)

```tsx
export default function HeroMessageCard() {
  return <div>...</div>;
}
```

## 5. 인수인계 TIP

- 새로 추가되는 UI는 반드시 section/card/banner 등으로 쪼개서 작성합니다.
- page에는 비즈니스 로직/JSX를 직접 작성하지 않고, 오직 컴포넌트만 import해서 조립합니다.
- 컴포넌트 이름은 역할이 명확하게 드러나도록 짓습니다.
- 컴포넌트/폴더 구조가 바뀌면 이 문서도 꼭 업데이트 해주세요!

---

## 6. 커밋 메시지 규칙 (Conventional Commits)

- **feat:** 새로운 기능 추가
- **fix:** 버그 수정
- **refac:** 리팩토링 (기능 변화 없음)
- **style:** 코드 포맷/스타일 변경 (로직 변화 없음)
- **docs:** 문서 추가/수정
- **test:** 테스트 코드 추가/수정
- **chore:** 빌드, 설정, 기타 잡일

### 예시

```
feat: SocialButton 컴포넌트 분리
fix: InfoCard에서 이미지 경로 오류 수정
refactor: HeroSection 구조 개선
style: Footer 컴포넌트 tailwind 정리
```

- 커밋 메시지는 한글 또는 영어로, 명확하게 작성합니다.
- 여러 변경이 섞일 경우, 커밋을 쪼개는 것이 좋습니다.
- 커밋 메시지 앞에 태그(feat, fix 등)를 꼭 붙여주세요.

---

문의/피드백: 담당 개발자에게 직접 문의 바랍니다.
