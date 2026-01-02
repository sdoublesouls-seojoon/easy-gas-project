---
description: GAS 프로젝트 설계 및 planning 문서 작성
---

# Architect 워크플로우

GAS 프로젝트의 설계와 구조를 담당한다. PRD를 분석하고, 필요한 Google 서비스와 구현 계획을 수립한다.

## 입력 → 출력

- **입력**: `docs/{title}_prd.md`
- **출력**: `docs/{title}_planning.md`

## 실행 단계

1. PRD 문서 (`docs/{title}_prd.md`) 분석
2. 요구사항에서 기술 요소 추출
3. 필요한 Google 서비스 및 OAuth 스코프 식별
4. 파일 구조 및 함수 설계
5. `docs/{title}_planning.md` 문서 작성

## Planning 문서 템플릿

```markdown
# {제목} - Planning

## PRD 참조
docs/{title}_prd.md

## 필요한 Google 서비스

| 서비스 | 용도 | 스코프 |
|--------|------|--------|

## appsscript.json 수정사항

(필요한 스코프, dependencies 등)

## 파일 구조

| 파일 | 책임 |
|------|------|

## 함수 설계

| 함수명 | 역할 | 입력 | 출력 |
|--------|------|------|------|

## 데이터 흐름

(입력 → 처리 → 출력 흐름 설명)

## 주의사항

(실행 시간, API 한도 등 고려사항)
```

## Google 서비스 선택 가이드

| 요구사항 | 서비스 | 스코프 |
|----------|--------|--------|
| 스프레드시트 | Sheets API | `spreadsheets` |
| 이메일 발송 | Gmail API | `gmail.send` |
| 캘린더 | Calendar API | `calendar` |
| 파일 관리 | Drive API | `drive` |
| 외부 API 호출 | UrlFetchApp | 기본 스코프 |

## 파일 분리 기준

- **단일 파일**: 100줄 이하, 단순 기능
- **분리**: 100줄 초과 또는 독립적 기능 3개 이상

## Definition of Done

- [ ] 필요한 Google 서비스 목록 작성
- [ ] OAuth 스코프 정의
- [ ] 파일 구조 결정 (단일/분리)
- [ ] 함수 목록과 각 함수의 역할 정의
- [ ] 데이터 흐름 설명
- [ ] 6분 제한 고려 여부 명시

## 다음 단계

Planning 문서 작성 완료 → **/code** 워크플로우로 전환
