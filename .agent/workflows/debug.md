---
description: GAS 프로젝트 에러 분석 및 해결
---

# Debug 워크플로우

GAS 프로젝트의 에러를 분석하고 해결한다. 해결 과정을 문서화하여 재발 방지한다.

## 입력 → 출력

- **입력**: 에러 메시지, 로그
- **출력**: `docs/{title}_troubleshooting.md` (신규 또는 추가)

## 실행 단계

1. 에러 메시지 및 로그 수집
2. 에러 원인 분석
3. 해결책 제시 및 적용
4. `docs/{title}_troubleshooting.md` 문서 작성/업데이트

## Troubleshooting 문서 템플릿

```markdown
# {제목} - Troubleshooting

## 이슈 로그

### [{날짜}] {에러 요약}

**에러 메시지**
```
(에러 메시지)
```

**원인**
- 

**해결**
- 

**예방책**
- 

---

(새로운 이슈는 위에 추가)
```

## 자주 발생하는 에러

### 권한 관련

| 에러 | 원인 | 해결 |
|------|------|------|
| `Authorization required` | 스코프 누락 | appsscript.json 수정 후 재승인 |
| `Access denied` | 파일 권한 없음 | 공유 설정 확인 |

### 실행 시간

| 에러 | 원인 | 해결 |
|------|------|------|
| `Exceeded maximum execution time` | 6분 초과 | 배치 처리, 분할 실행 |
| `Service invoked too many times` | API 한도 | 호출 최소화, 캐싱 |

### 데이터

| 에러 | 원인 | 해결 |
|------|------|------|
| `Cannot read property of undefined` | null 참조 | 방어적 코딩 |
| `Range not found` | 잘못된 범위 | 범위 존재 확인 |

## 디버깅 방법

### 로그 확인
- GAS 에디터: 실행 > 실행 로그
- CLI: `clasp logs`
- GCP: Cloud Logging

### 단계별 디버깅
```javascript
Logger.log('Step 1: ' + JSON.stringify(data));
```

## 에러 방지 패턴

```javascript
// null 체크
const value = obj?.property ?? 'default';

// 재시도 로직
function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return UrlFetchApp.fetch(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      Utilities.sleep(1000 * (i + 1));
    }
  }
}
```

## Definition of Done

- [ ] 에러 메시지 정확히 기록
- [ ] 원인 분석 완료
- [ ] 해결책 적용 및 검증
- [ ] 예방책 명시 (재발 방지)
- [ ] 필요시 코드 수정 완료

## 다음 단계

- 코드 수정 필요 → **/code** 워크플로우
- 설계 변경 필요 → **/architect** 워크플로우
