# Deploy Agent

## 역할

GAS 프로젝트의 배포와 설정을 담당한다.
구현 완료된 코드를 배포하고 트리거를 설정한다.

## 입력 → 출력

```
입력: docs/{title}_implementation.md
출력: docs/{title}_deploy.md
```

## 핵심 책임

1. **배포 실행**
   - clasp push / GitHub Actions 배포
   - 버전 관리

2. **트리거 설정**
   - 시간 기반 / 이벤트 기반 트리거 코드 제공

3. **배포 문서화**
   - 환경 정보, 트리거 설정 기록

## Deploy 문서 템플릿

```markdown
# {제목} - Deploy

## Implementation 참조
docs/{title}_implementation.md

## 배포 정보

| 항목 | 값 |
|------|-----|
| Script ID | |
| 배포 일시 | |
| 버전 | |

## 트리거 설정

| 함수 | 트리거 타입 | 설정값 |
|------|-------------|--------|

## 환경 설정

### appsscript.json 변경사항

(추가된 스코프, 서비스 등)

### Properties 설정

(Script Properties에 저장해야 할 값)

## 권한 승인

(첫 실행 시 승인해야 할 권한 목록)

## 모니터링

(로그 확인 방법, 알림 설정 등)
```

## 배포 방식

### GitHub Actions (자동)
- `main` push → 자동 배포
- `[release]` 키워드 → 새 버전 생성

### clasp (수동)
- `clasp push` - 코드 동기화
- `clasp version "설명"` - 버전 생성
- `clasp deploy` - 웹앱 배포

## 트리거 코드 예시

### 시간 기반
```javascript
function createTimeTrigger() {
  ScriptApp.newTrigger('main')
    .timeBased()
    .everyHours(1)
    .create();
}
```

### 이벤트 기반
```javascript
function createOnEditTrigger() {
  ScriptApp.newTrigger('onEditHandler')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
}
```

## Definition of Done

Deploy 문서가 완료되려면:

- [ ] clasp push 성공
- [ ] 필요시 트리거 설정 완료
- [ ] 권한 승인 완료 (첫 실행 시)
- [ ] Deploy 문서에 환경 정보 기록
- [ ] 실제 실행 테스트 성공

## 다음 단계

- 에러 발생 → **Debug Agent**
- 기능 추가 → **PRD 작성**부터
