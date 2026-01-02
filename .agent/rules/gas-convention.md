---
description: GAS 템플릿 프로젝트 규칙 및 협업 프로세스
---

# GAS Template Convention

GAS 프로젝트 생성부터 배포까지 자동화하는 템플릿 규칙.

## 프로젝트 구조

```
gas-template/
├── src/           # 소스 코드
├── docs/          # 문서 (PRD, Planning, Implementation 등)
├── .github/       # GitHub Actions
└── appsscript.json
```

## 문서 기반 협업 프로세스

모든 작업은 `docs/` 폴더에 문서로 기록된다.

### 문서 흐름

```
사용자 요청
    ↓
[PRD] {title}_prd.md
    ↓
[Architect] {title}_planning.md
    ↓
[Code] {title}_implementation.md
    ↓
[Deploy] {title}_deploy.md
    ↓
[Debug] {title}_troubleshooting.md
```

### 문서 네이밍 규칙

- 형식: `{spec타이틀}_{단계}.md`
- spec타이틀: kebab-case (예: `gmail-sender`, `sheet-to-jira`)
- 단계: `prd`, `planning`, `implementation`, `deploy`, `troubleshooting`

## 워크플로우 전환 규칙

### 자동 전환 트리거

| 상황 | 워크플로우 |
|------|-----------|
| "~하고 싶어", "~기능이 필요해" | PRD 작성 → `/architect` |
| "설계해줘", "구조 잡아줘" | `/architect` |
| "구현해줘", "코드 짜줘" | `/code` |
| "배포해줘", "트리거 설정해줘" | `/deploy` |
| "에러가 나", "안 돼" | `/debug` |

### 협업 패턴

1. **새 기능 개발**: PRD → `/architect` → `/code` → `/deploy`
2. **버그 수정**: `/debug` → (필요시) `/code` → `/deploy`
3. **구조 변경**: PRD 업데이트 → `/architect` → `/code`

## 핵심 규칙

- 소스 코드는 `src/` 폴더에 위치
- 문서는 `docs/` 폴더에 위치
- 커밋 메시지에 `[release]` 포함 시 새 버전 생성
- `.clasp.json`은 gitignore 대상

## 에스컬레이션 규칙

### 반드시 사용자에게 질문해야 하는 경우

**Architect**
- 요구사항이 모호하거나 상충할 때
- 여러 설계 방식 중 트레이드오프가 클 때
- 예상 실행 시간이 6분을 초과할 것 같을 때

**Code**
- Planning에 없는 기능을 추가해야 할 것 같을 때
- 보안 관련 결정 (API 키 저장 방식 등)
- 외부 라이브러리 사용 여부

**Deploy**
- 트리거 주기/타이밍 결정
- 권한 범위 (ANYONE vs ANYONE_ANONYMOUS)
- 기존 트리거/버전 삭제 여부

**Debug**
- 원인이 불명확하고 재현이 안 될 때
- 데이터 손실 가능성이 있을 때
- 해결책이 구조 변경을 요구할 때

### 스스로 판단해도 되는 경우

- 명확한 버그 수정
- 코딩 컨벤션 적용
- 문서 템플릿에 맞춘 정리
- 이전에 사용자가 결정한 패턴과 동일한 경우

## GAS 제약사항

- 실행 시간 제한: 6분 (일반), 30분 (Workspace)
- 모든 함수는 전역 스코프
- 파일 간 import/export 없음
