# 🚀 GAS Template

> Google Apps Script + clasp + GitHub Actions 자동 배포 통합 템플릿

[![Deploy to GAS](https://github.com/sdoublesouls-seojoon/gas-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/sdoublesouls-seojoon/gas-template/actions/workflows/deploy.yml)

## 📌 이 템플릿은?

**Standalone**과 **Bounded(Sheets/Docs/Forms/Slides)** 프로젝트를 모두 지원하는 통합 템플릿입니다.

### 프로젝트 타입

| 타입 | 설명 | 용도 |
|------|------|------|
| **Standalone** | 독립 실행형 | 웹앱, API, 라이브러리 |
| **Sheets** | Google Sheets 바인딩 | 스프레드시트 자동화 |
| **Docs** | Google Docs 바인딩 | 문서 자동화 |
| **Forms** | Google Forms 바인딩 | 폼 응답 처리 |
| **Slides** | Google Slides 바인딩 | 프레젠테이션 자동화 |

---

## 📁 프로젝트 구조

```
gas-template/
├── .github/workflows/deploy.yml  # GitHub Actions 배포
├── .agent/                       # Agent 협업 시스템
├── .claude/                      # Agent 오케스트레이션
├── docs/                         # 문서
├── Code.js                       # 메인 스크립트
├── appsscript.json              # GAS 프로젝트 설정
├── .clasp.json.example          # clasp 설정 예제
├── .claspignore                 # 배포 제외 파일
└── README.md
```

---

## ⚡ 빠른 시작 (자동 설정)

### 사전 조건

```bash
# 1. clasp 설치 및 로그인
npm install -g @google/clasp
clasp login

# 2. GitHub CLI 설치 및 로그인
brew install gh
gh auth login

# 3. jq 설치 (JSON 파싱용)
brew install jq
```

### 원클릭 설정

```bash
# 템플릿 다운로드 및 실행
curl -O https://raw.githubusercontent.com/sdoublesouls-seojoon/gas-template/main/setup.sh
chmod +x setup.sh
./setup.sh my-new-project
```

### setup.sh가 자동으로 처리하는 작업

| 단계 | 작업 |
|------|------|
| 1️⃣ | **프로젝트 타입 선택** (Standalone/Sheets/Docs/Forms/Slides) |
| 2️⃣ | 템플릿에서 새 GitHub 레포지토리 생성 |
| 3️⃣ | 로컬에 레포지토리 클론 |
| 4️⃣ | clasp으로 GAS 프로젝트 생성 |
| 5️⃣ | Script ID 자동 추출 |
| 6️⃣ | GitHub Secrets 자동 등록 (SCRIPT_ID, CLASP_TOKEN, PROJECT_TYPE) |
| 7️⃣ | 타입별 Code.js 템플릿 생성 |
| 8️⃣ | 초기 커밋 & 푸시로 첫 배포 트리거 |

### 설정 완료 후

```bash
cd my-new-project

# GAS 에디터 열기
clasp open

# 배포 상태 확인
# GitHub Actions 탭에서 확인
```

---

## 📦 배포 버전 제어

### 일반 푸시 (덮어쓰기)
```bash
git commit -m "Update: 기능 수정"
git push origin main
```
→ 기존 코드에 덮어쓰기만 됩니다 (버전 생성 X)

### 릴리스 배포 (새 버전 생성)
```bash
git commit -m "[release] v1.0.0 - 첫 번째 릴리스"
git push origin main
```
→ 새 버전이 생성됩니다 (커밋 메시지가 버전 설명이 됨)

---

## 🔧 로컬 개발

```bash
# 코드 푸시 (로컬 → GAS)
clasp push

# 코드 풀 (GAS → 로컬)
clasp pull

# GAS 에디터 열기
clasp open

# 로그 확인
clasp logs
```

---

## 🎯 Bounded 프로젝트 특별 기능

Sheets/Docs/Forms/Slides 타입을 선택하면 자동으로 다음 기능이 포함됩니다:

### 1. 커스텀 메뉴

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi(); // Sheets용

  ui.createMenu('📋 내 메뉴')
    .addItem('기능 실행', 'myFunction')
    .addItem('정보', 'showAbout')
    .addToUi();
}
```

### 2. 이벤트 트리거

| 트리거 | 지원 컨테이너 | 설명 |
|--------|--------------|------|
| `onOpen()` | 모두 | 문서 열 때 |
| `onEdit()` | Sheets | 셀 편집 시 |
| `onChange()` | Sheets | 시트 변경 시 |
| `onFormSubmit()` | Forms, Sheets | 폼 제출 시 |

---

## 🔐 보안

- `.clasp.json`: 절대 커밋하지 마세요 (gitignore에 포함됨)
- `SCRIPT_ID`, `CLASP_TOKEN_BASE64`: GitHub Secrets로 안전하게 관리
- OAuth 스코프: 필요한 최소 권한만 요청

---

## ❓ 문제 해결

### clasp login 실패
```bash
clasp login --no-localhost
```

### gh auth login 실패
```bash
gh auth login --with-token
```

### GitHub Actions 배포 실패
1. **Settings > Secrets** 에서 `SCRIPT_ID`, `CLASP_TOKEN_BASE64` 확인
2. `CLASP_TOKEN_BASE64`가 올바르게 base64 인코딩되었는지 확인

---

## 📚 참고 자료

- [clasp 공식 문서](https://github.com/google/clasp)
- [Google Apps Script 가이드](https://developers.google.com/apps-script)
- [Container-bound Scripts](https://developers.google.com/apps-script/guides/bound)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [GitHub CLI 문서](https://cli.github.com/)

---

Made with ❤️ using clasp + GitHub Actions
