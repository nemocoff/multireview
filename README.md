# Chzzk MultiReview (치지직 멀티리뷰)

**치지직(Chzzk)** 방송과 영상을 동시에 여러 개 시청할 수 있는 멀티뷰 웹 애플리케이션입니다.
편리한 채널 검색, 즐겨찾기, 영상 목록 관리 기능을 제공하여 쾌적한 시청 환경을 지원합니다.

![Project Screenshot](https://via.placeholder.com/800x450?text=Chzzk+MultiReview+Screenshot)

## ✨ 주요 기능 (Key Features)

*   **📺 멀티뷰 (Multi-View)**: 여러 개의 치지직 VOD를 한 화면에서 동시에 재생할 수 있습니다.
*   **🔍 채널 및 영상 검색**: 채널명을 검색하고, 해당 채널의 영상 목록을 바로 불러올 수 있습니다.
*   **⭐ 즐겨찾기 (Favorites)**: 자주 보는 채널을 즐겨찾기에 등록하여 사이드바에서 빠르게 접근할 수 있습니다.
*   **📱 반응형 & 직관적인 UI**:
    *   **사이드바**: 검색, 즐겨찾기, URL 추가 기능을 깔끔한 사이드바에 통합.
    *   **모달(Modal) 검색**: 검색과 즐겨찾기 목록을 한눈에 볼 수 있는 분할 화면 제공.
    *   **자동 레이아웃**: 영상 개수에 따라 최적의 그리드(2분할, 4분할 등)로 자동 조정.
*   **💾 목록 자동 저장**: 시청 중인 영상 목록이 브라우저에 자동 저장되어, 새로고침 후에도 유지됩니다.
*   **🔄 싱크 보정**: (기능 삭제됨 - 유저 요청)

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: React (Vite), Pure CSS (Glassmorphism Design)
*   **Backend**: Node.js (Express) - Chzzk API Proxy Server
*   **Deployment**: (TBD)

## 🚀 설치 및 실행 방법 (Getting Started)

### 1. 프로젝트 클론
```bash
git clone https://github.com/nemocoff/multireview.git
cd multireview
```

### 2. 서버 (Server) 설정 및 실행
```bash
cd server
npm install
# .env 파일 설정 (필요 시)
npm start
```
*   서버는 기본적으로 `http://localhost:5000`에서 실행됩니다.

### 3. 클라이언트 (Client) 설정 및 실행
```bash
cd client
npm install
# .env 파일 설정 (필요 시)
npm run dev
```
*   클라이언트는 `http://localhost:5173` (Vite 기본 포트)에서 실행됩니다.

## 📝 환경 변수 (Environment Variables)

프로젝트 루트의 `.env.example` 파일을 참고하여 `.env` 파일을 생성하거나 배포 환경 변수를 설정하세요.

**Client (.env)**
```
VITE_FIREBASE_Config... (Future Use)
```

**Server (.env)**
```
PORT=5000
CHZZK_CLIENT_ID=... (Optional)
CHZZK_CLIENT_SECRET=... (Optional)
```

## 📄 라이선스 (License)

This project is licensed under the MIT License.

---
Disclaimer: 본 프로젝트는 네이버 치지직의 공식 서비스가 아니며, 개인 학습 및 편의를 위해 제작되었습니다.
