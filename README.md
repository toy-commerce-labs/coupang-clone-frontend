# Coupang Clone Frontend

쿠팡 클론 프로젝트의 프론트엔드 애플리케이션입니다.
Two-person toy project implementing an e-commerce platform inspired by large-scale commerce services.

## 기술 스택

- **React 19** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS 4** (스타일링)
- **Shadcn/ui** (UI 컴포넌트)
- **React Router 7** (라우팅)
- **Lucide React** (아이콘)

## 시작하기

### 사전 요구 사항

- Node.js 18+
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/
│   └── ui/                    # Shadcn/ui 컴포넌트
├── lib/
│   └── utils.ts               # 유틸리티 함수 (cn 등)
├── pages/
│   ├── index-page.tsx         # 메인 페이지
│   ├── sign-in-page.tsx       # 고객 로그인 페이지
│   ├── sign-up-page.tsx       # 회원가입 페이지
│   └── admin-sign-in-page.tsx # 관리자 로그인 페이지
├── root-route.tsx             # 라우트 설정
├── App.tsx
└── main.tsx
```

## 페이지 라우팅

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | IndexPage | 메인 페이지 |
| `/sign-in` | SignInPage | 고객 로그인 (이메일/휴대폰/QR) |
| `/sign-up` | SignUpPage | 회원가입 (약관 동의 포함) |
| `/admin/sign-in` | AdminSignInPage | 관리자 로그인 |

## 백엔드 API 연동

Vite 프록시를 통해 백엔드 API와 연동합니다.

| 프론트엔드 요청 | 프록시 대상 |
|----------------|------------|
| `/api/v1/*` | `http://localhost:8080` (고객 API) |
| `/api/v1/admin/*` | `http://localhost:8081` (관리자 API) |

### 주요 API 엔드포인트

- `POST /api/v1/members/login` - 고객 로그인
- `POST /api/v1/members/signup` - 회원가입
- `GET /api/v1/terms` - 약관 목록 조회
- `POST /api/v1/admin/members/login` - 관리자 로그인
