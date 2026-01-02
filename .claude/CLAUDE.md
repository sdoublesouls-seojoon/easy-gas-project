# GAS Template - Agent Orchestrator

## 프로젝트 목적

GAS 프로젝트 생성부터 배포까지 자동화하는 템플릿.
setup.sh 한 번 실행으로 GitHub 레포 생성, GAS 프로젝트 연결, Secrets 등록, 첫 배포까지 완료된다.

## 문서 기반 협업 프로세스

모든 작업은 `docs/` 폴더에 문서로 기록된다. Git으로 버전 관리되며, agent 간 인터페이스 역할을 한다.

### 문서 흐름

```
사용자 요청
    ↓
[PRD] {title}_prd.md ─────────────────┐
    ↓                                 │
[Architect] {title}_planning.md       │ docs/ 폴더에
    ↓                                 │ 모두 저장
[Code] {title}_implementation.md      │
    ↓                                 │
[Deploy] {title}_deploy.md            │
    ↓                                 │
[Debug] {title}_troubleshooting.md ───┘
```

### 문서 네이밍 규칙

- 형식: `{spec타이틀}_{단계}.md`
- spec타이틀: kebab-case (예: `gmail-sender`, `sheet-to-jira`)
- 단계: `prd`, `planning`, `implementation`, `deploy`, `troubleshooting`

### 각 문서의 역할

| 문서 | 작성 주체 | 내용 |
|------|-----------|------|
| `_prd.md` | 사용자 요청 정리 | 목표, 요구사항, 제약조건 |
| `_planning.md` | Architect | 설계, 스코프, 파일 구조 |
| `_implementation.md` | Code | 구현 결정사항, 주요 로직 설명 |
| `_deploy.md` | Deploy | 배포 설정, 트리거, 환경 정보 |
| `_troubleshooting.md` | Debug | 발생한 에러, 해결 과정 |

## 전문 Agent

| Agent | 파일 | 입력 문서 | 출력 문서 |
|-------|------|-----------|-----------|
| Architect | `agents/architect.md` | `_prd.md` | `_planning.md` |
| Code | `agents/code.md` | `_planning.md` | `_implementation.md` + 소스 |
| Deploy | `agents/deploy.md` | `_implementation.md` | `_deploy.md` |
| Debug | `agents/debug.md` | 에러 상황 | `_troubleshooting.md` |

## Agent 전환 규칙

### 자동 전환 트리거

**→ PRD 작성** (새 기능 요청 시 첫 단계)
- "~하고 싶어", "~기능이 필요해"
- 먼저 `_prd.md` 작성 후 Architect로 전환

**→ Architect**
- PRD 작성 완료 후
- "설계해줘", "구조 잡아줘"

**→ Code**
- Planning 문서 존재 시
- "구현해줘", "코드 짜줘"

**→ Deploy**
- Implementation 완료 후
- "배포해줘", "트리거 설정해줘"

**→ Debug**
- "에러가 나", "안 돼"
- 해결 후 `_troubleshooting.md`에 기록

### 협업 패턴

1. **새 기능 개발**: PRD → Architect → Code → Deploy
2. **버그 수정**: Debug → (필요시) Code → Deploy
3. **구조 변경**: PRD 업데이트 → Architect → Code

## 이 템플릿의 핵심 규칙

- 소스 코드는 `src/` 폴더에 위치
- 문서는 `docs/` 폴더에 위치
- 커밋 메시지에 `[release]` 포함 시 새 버전 생성
- `.clasp.json`은 gitignore 대상

## 에스컬레이션 규칙

Agent가 스스로 판단하기 어려운 상황에서 사용자에게 확인을 요청한다.

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

### 질문 형식

```
[확인 필요]

상황: (현재 상황 설명)
선택지:
1. (옵션 A) - 장점/단점
2. (옵션 B) - 장점/단점

어떤 방향으로 진행할까요?
```

### 스스로 판단해도 되는 경우

- 명확한 버그 수정
- 코딩 컨벤션 적용
- 문서 템플릿에 맞춘 정리
- 이전에 사용자가 결정한 패턴과 동일한 경우

## GAS 제약사항

- 실행 시간 제한: 6분 (일반), 30분 (Workspace)
- 모든 함수는 전역 스코프
- 파일 간 import/export 없음
