# The Local Companion (가칭)

프랑스 10대 후반~20대 초반 여행객을 위한 한국 여행 동반자 앱 **The Local Companion**의 MVP 코드베이스입니다.  
React Native 기반 모바일 앱(`frontend`)과 Node.js/Express 백엔드(`backend`), MongoDB 시드 스크립트(`database`)로 구성되어 있습니다.

## 폴더 구조

- `frontend/` – Expo 기반 React Native 앱
  - 주요 화면: 홈, Weekly Trend Decoder, K-Culture Event Calendar, Personalized Phrasebook
- `backend/` – Express REST API
  - 엔드포인트: `/api/trends/weekly`, `/api/events/upcoming`, `/api/phrasebook`, `/api/subscriptions`
- `database/` – MongoDB 시드 스크립트
- `scripts/` – 배포 및 운영 스크립트용 (현재 placeholder)

## 빠른 시작

### 공통
1. 최상위 디렉터리에서 `.env.example` 파일을 참고하여 `.env`를 작성하세요.
2. `frontend`, `backend` 각각의 디렉터리에서 `npm install` 또는 `yarn install`을 실행하세요. (네트워크 권한 필요)

### 프론트엔드 (Expo)
```bash
cd frontend
npm run start           # Expo 개발 서버
npm run ios | android   # 시뮬레이터 실행
```

### 백엔드 (Express)
```bash
cd backend
npm run dev             # Nodemon 개발 서버 (포트: 4000)
```

환경 변수 `MONGODB_URI`가 지정되어 있지 않으면 `mongodb://localhost:27017/local_companion` 으로 연결을 시도합니다.

### 데이터 시드
```bash
node database/seed.js
```
MongoDB에 기본 Trend/Event/Phrase 샘플 데이터를 추가합니다.

## 다음 단계 제안
1. **API 연동** – 실제 MongoDB/외부 API 데이터를 연결하고, 프론트엔드 서비스 모듈에서 페이로드 계약을 고도화합니다.
2. **인증/구독** – 사용자 인증, Stripe 결제 흐름, 유료 구독 상태 동기화를 구현합니다.
3. **테스트 강화** – 백엔드 서비스/컨트롤러 단위 테스트와 프론트엔드 UI 스냅샷 테스트를 추가합니다.
4. **CI/CD 구성** – GitHub Actions 등을 사용하여 lint/test/배포 파이프라인을 구성합니다.

## 참고
- Expo SDK 50 / React Native 0.73
- Express 4 / Mongoose 8 / Stripe SDK 14

추가 요구 사항이나 수정이 필요하면 알려주세요!
