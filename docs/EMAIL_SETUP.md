# 이메일 전송 기능 설정 안내

예약 문의 폼에서 이메일 전송 기능을 사용하려면 다음과 같이 설정해주세요.

## 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 이메일 전송 설정
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@gmail.com
```

## 2. 환경 변수 설명

- `EMAIL_USER`: 이메일을 보낼 Gmail 계정
- `EMAIL_PASS`: Gmail 앱 비밀번호 (일반 비밀번호가 아님)
- `EMAIL_TO`: 예약 문의를 받을 이메일 주소

## 3. Gmail 앱 비밀번호 생성 방법

1. [Google 계정 관리](https://myaccount.google.com/)에 접속
2. **보안** 탭으로 이동
3. **2단계 인증** 활성화 (필수)
4. **앱 비밀번호** 생성
   - 앱 선택: 메일
   - 기기 선택: 기타 (사용자 지정 이름)
   - 이름 입력: "공항렌트24"
5. 생성된 16자리 비밀번호를 `EMAIL_PASS`에 입력

## 4. 다른 이메일 서비스 사용 시

Gmail 외의 다른 이메일 서비스를 사용하려면 `src/app/api/send-email/route.ts` 파일에서 다음 부분을 수정하세요:

```typescript
const transporter = nodemailer.createTransport({
  service: "gmail", // 다른 서비스명으로 변경 (예: 'naver', 'outlook')
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});
```

## 5. 테스트

설정 완료 후 예약 문의 폼을 통해 테스트 이메일을 보내보세요.

## 6. 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- 앱 비밀번호는 안전하게 보관하세요
- 이메일 전송이 실패하는 경우 브라우저 개발자 도구의 콘솔을 확인하세요
