---
description: GAS 코드 구현 및 implementation 문서 작성
---

# Code 워크플로우

GAS 코드를 작성하고 구현한다. Planning 문서를 기반으로 실제 코드를 생성한다.

## 입력 → 출력

- **입력**: `docs/{title}_planning.md`
- **출력**: 
  - `src/*.js` (소스 코드)
  - `docs/{title}_implementation.md` (구현 노트)

## 실행 단계

1. Planning 문서 (`docs/{title}_planning.md`) 확인
2. Planning의 함수 설계대로 코드 구현
3. JSDoc 주석 작성
4. 에러 핸들링 적용
5. `docs/{title}_implementation.md` 문서 작성

## Implementation 문서 템플릿

```markdown
# {제목} - Implementation

## Planning 참조
docs/{title}_planning.md

## 구현된 파일

| 파일 | 설명 |
|------|------|

## 주요 구현 결정

### {결정 1}
- 상황:
- 선택:
- 이유:

## 테스트 방법

(GAS 에디터에서 테스트하는 방법)

## 알려진 제한사항

## 다음 단계

(배포 전 필요한 작업)
```

## 코딩 스타일

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 함수 | camelCase, 동사 시작 | `sendEmail()` |
| 상수 | UPPER_SNAKE_CASE | `MAX_ROWS` |
| 파일 | PascalCase | `SheetHandler.js` |

### 필수 JSDoc

```javascript
/**
 * [함수 설명]
 * @param {Type} param - 설명
 * @returns {Type} 설명
 */
```

## GAS 최적화 패턴

- 범위 단위 처리: `getValues()` / `setValues()`
- 병렬 API 호출: `UrlFetchApp.fetchAll()`
- 캐싱: `CacheService` 활용

## 금지 패턴

- ❌ `eval()` 사용
- ❌ 하드코딩된 인증 정보
- ❌ 개별 셀 반복 접근

## Definition of Done

- [ ] Planning의 모든 함수 구현
- [ ] JSDoc 주석 작성
- [ ] 에러 핸들링 적용
- [ ] 하드코딩된 인증 정보 없음
- [ ] GAS 에디터에서 단독 실행 테스트 가능
- [ ] Implementation 문서에 주요 결정사항 기록

## 다음 단계

구현 완료 → **/deploy** 워크플로우로 전환
