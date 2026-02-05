# Chzzk MultiReview (치지직 멀티리뷰)

**치지직(Chzzk)** 방송과 영상을 동시에 여러 개 시청할 수 있는 멀티뷰 웹 애플리케이션입니다.
편리한 채널 검색, 즐겨찾기, 영상 목록 관리 기능을 제공하여 쾌적한 시청 환경을 지원합니다.

<img width="1918" height="907" alt="Image" src="https://github.com/user-attachments/assets/e3789991-0345-4165-8d1e-c227030f5e05" />

## ✨ 주요 기능 (Key Features)

*   **📺 멀티뷰 (Multi-View)**: 여러 개의 치지직 VOD를 한 화면에서 동시에 재생할 수 있습니다.
*   **🔍 채널 및 영상 검색**: 채널명을 검색하고, 해당 채널의 영상 목록을 바로 불러올 수 있습니다.
*   **⭐ 즐겨찾기 (Favorites)**: 자주 보는 채널을 즐겨찾기에 등록하여 사이드바에서 빠르게 접근할 수 있습니다.
*   **📱 반응형 & 직관적인 UI**:
    *   **사이드바**: 검색, 즐겨찾기, URL 추가 기능을 깔끔한 사이드바에 통합.
    *   **모달(Modal) 검색**: 검색과 즐겨찾기 목록을 한눈에 볼 수 있는 분할 화면 제공.
    *   **자동 레이아웃**: 영상 개수에 따라 최적의 그리드(2분할, 4분할 등)로 자동 조정.
*   **💾 목록 자동 저장**: 시청 중인 영상 목록이 브라우저에 자동 저장되어, 새로고침 후에도 유지됩니다.

## 📖 사용 방법 (How to use)

<img width="54" height="56" alt="Image" src="https://github.com/user-attachments/assets/357e668f-791d-4fb3-afab-d50e61fa784f" />

1.  **메뉴 열기**: 화면 좌측 상단 모서리에 마우스를 가져가면 **메뉴 버튼**이 나타납니다.

<img width="279" height="908" alt="Image" src="https://github.com/user-attachments/assets/6b8c4f83-747a-4bcf-b861-04726eca6d33" />

<img width="900" height="683" alt="Image" src="https://github.com/user-attachments/assets/f59e43bc-9b74-489f-a21d-7b56527d36cc" />

2.  **영상 추가하기**:

<img width="896" height="679" alt="Image" src="https://github.com/user-attachments/assets/543fc22d-9c8c-46bf-bc38-464fe90c57b7" />

    *   **방송인 검색**: 메뉴에서 `방송인 검색`을 클릭하고 닉네임을 입력합니다. 원하는 영상을 클릭하면 멀티뷰 화면에 추가됩니다.
    *   **즐겨찾기**: 검색 결과의 **별표(★)**를 눌러 즐겨찾기에 등록하면, 사이드바에서 채널을 빠르게 찾을 수 있습니다.
    *   **URL 복사/붙여넣기**: 치지직 영상 링크를 복사하여 메뉴 하단의 입력창에 붙여넣고 `추가` 버튼을 누릅니다.

3.  **영상 관리**:
    *   **개별 제거**: 영상 위에 마우스를 올리면 좌측 상단에 **닫기(X) 버튼**이 나타납니다.
    *   **전체 제거**: 사이드바 메뉴의 `전체 제거` 버튼을 눌러 모든 영상을 한 번에 비울 수 있습니다.
    *   **자동 레이아웃**: 영상 개수에 따라 **자동으로 화면을 꽉 채우도록(1분할, 2분할, 4분할 등)** 배치됩니다.

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: React (Vite), Pure CSS (Glassmorphism Design)
*   **Backend**: Node.js (Express) - Chzzk API Proxy Server
*   **Deployment**: Firebase deploy

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
