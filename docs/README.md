# docs 폴더

이 폴더에는 기능별 문서가 저장됩니다.

## 문서 종류

| 접미사 | 작성 주체 | 내용 |
|--------|-----------|------|
| `_prd.md` | 사용자 요청 정리 | 목표, 요구사항, 제약조건 |
| `_planning.md` | Architect | 설계, 스코프, 파일 구조 |
| `_implementation.md` | Code | 구현 결정사항, 주요 로직 |
| `_deploy.md` | Deploy | 배포 설정, 트리거, 환경 |
| `_troubleshooting.md` | Debug | 에러 기록, 해결 과정 |

## 네이밍 규칙

`{spec타이틀}_{단계}.md`

- spec타이틀: kebab-case (예: `gmail-sender`)
- 단계: `prd`, `planning`, `implementation`, `deploy`, `troubleshooting`

## 템플릿

`_template_prd.md` 파일을 복사해서 새 PRD 작성
