# API 레퍼런스

## 📧 이메일 전송 API

### `POST /api/send-email`

예약 문의 정보를 이메일로 전송합니다.

#### 요청 (Request)

**Content-Type**: `application/json`

**Body Parameters**:

```typescript
{
  name: string;          // 고객 이름 (필수)
  phone: string;         // 전화번호 (필수)
  email: string;         // 이메일 주소 (필수)
  pickupDate: string;    // 픽업 날짜 (YYYY-MM-DD)
  pickupTime: string;    // 픽업 시간 (HH:mm)
  returnDate: string;    // 반납 날짜 (YYYY-MM-DD)
  returnTime: string;    // 반납 시간 (HH:mm)
  carType: string;       // 차종 (카테고리)
  message?: string;      // 추가 요청사항 (선택)
}
```

#### 요청 예시

```javascript
const response = await fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "홍길동",
    phone: "010-1234-5678",
    email: "customer@example.com",
    pickupDate: "2024-12-25",
    pickupTime: "10:30",
    returnDate: "2024-12-27",
    returnTime: "15:00",
    carType: "중형",
    message: "공항 픽업 서비스 요청드립니다.",
  }),
});
```

#### 응답 (Response)

**성공 (200)**:

```json
{
  "message": "이메일이 성공적으로 전송되었습니다."
}
```

**실패 (500)**:

```json
{
  "error": "이메일 전송에 실패했습니다."
}
```

또는

```json
{
  "error": "이메일 설정이 완료되지 않았습니다."
}
```

## 🔧 환경 변수 설정

API가 정상 작동하려면 다음 환경 변수가 설정되어야 합니다:

| 변수명       | 필수 | 설명               | 예시                    |
| ------------ | ---- | ------------------ | ----------------------- |
| `EMAIL_USER` | ✅   | 발신자 Gmail 주소  | `sender@gmail.com`      |
| `EMAIL_PASS` | ✅   | Gmail 앱 비밀번호  | `abcd efgh ijkl mnop`   |
| `EMAIL_TO`   | ✅   | 수신자 이메일 주소 | `recipient@company.com` |
| `EMAIL_CC`   | ❌   | 참조 수신자        | `manager@company.com`   |
| `EMAIL_BCC`  | ❌   | 숨은 참조 수신자   | `archive@company.com`   |

## 📤 이메일 형식

### HTML 버전

- 깔끔한 테이블 형식
- 색상 구분된 섹션
- 반응형 디자인
- 브랜딩 요소 포함

### 텍스트 버전

- 유니코드 문자를 사용한 구분선
- 정렬된 테이블 형식
- 이모지 아이콘으로 섹션 구분
- 모든 이메일 클라이언트 호환

## 🔍 에러 처리

### 일반적인 에러 상황

1. **환경 변수 미설정**

   ```json
   {
     "error": "이메일 설정이 완료되지 않았습니다."
   }
   ```

2. **Gmail 인증 실패**

   - 앱 비밀번호 확인
   - 2단계 인증 활성화 여부 확인

3. **네트워크 오류**

   - SMTP 서버 연결 확인
   - 방화벽 설정 확인

4. **요청 형식 오류**
   - Content-Type 헤더 확인
   - JSON 형식 검증

### 디버깅 팁

1. **서버 로그 확인**

   ```bash
   # 개발 환경에서 콘솔 로그 확인
   npm run dev
   ```

2. **환경 변수 테스트**

   ```javascript
   console.log("EMAIL_USER:", process.env.EMAIL_USER);
   console.log("EMAIL_TO:", process.env.EMAIL_TO);
   ```

3. **브라우저 개발자 도구**
   - Network 탭에서 API 요청/응답 확인
   - Console 탭에서 클라이언트 에러 확인

## 🔐 보안 고려사항

### 1. 환경 변수 보안

- `.env.local` 파일은 절대 Git에 커밋하지 않음
- 프로덕션에서는 플랫폼의 환경 변수 관리 시스템 사용

### 2. 이메일 보안

- Gmail 앱 비밀번호 사용 (일반 비밀번호 금지)
- SMTP 연결 암호화 (TLS/SSL)

### 3. 입력 데이터 검증

- 클라이언트와 서버 양쪽에서 데이터 검증
- XSS 공격 방지를 위한 HTML 이스케이프

### 4. 레이트 리미팅

현재 구현되지 않음. 필요시 추가 권장:

```javascript
// 예시: 같은 IP에서 1분에 최대 5회 요청
const rateLimiter = {
  windowMs: 60 * 1000, // 1분
  max: 5, // 최대 5회
};
```

## 📊 모니터링 및 로깅

### 현재 로깅

```javascript
console.log("이메일 전송 성공:", result);
console.error("이메일 전송 오류:", error);
```

### 권장 개선사항

1. **구조화된 로깅**

   - Winston 또는 Pino 사용
   - 로그 레벨 구분 (error, warn, info, debug)

2. **메트릭 수집**

   - 전송 성공/실패 카운트
   - 응답 시간 측정
   - 에러 유형별 분류

3. **알림 시스템**
   - 이메일 전송 실패 시 알림
   - 시스템 오류 모니터링

---

**API 버전**: v1.0  
**마지막 업데이트**: 2024년 12월
