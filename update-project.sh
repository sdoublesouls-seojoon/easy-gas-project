#!/bin/bash

# 1. 인자가 전달된 경우 .clasp.json 파일 먼저 업데이트
if [ ! -z "$1" ] && [ ! -z "$2" ]; then
  NEW_PARENT_ID=$1
  NEW_SCRIPT_ID=$2
  
  # jq를 사용하여 JSON 필드 수정
  tmp=$(mktemp)
  jq --arg pid "$NEW_PARENT_ID" --arg sid "$NEW_SCRIPT_ID" '.parentId = $pid | .scriptId = $sid' .clasp.json > "$tmp" && mv "$tmp" .clasp.json
  echo "📝 .clasp.json 파일이 새로운 ID로 업데이트되었습니다."
fi

# 2. .clasp.json에서 현재 설정값 읽기
CURRENT_SCRIPT_ID=$(jq -r '.scriptId' .clasp.json)
CURRENT_PARENT_ID=$(jq -r '.parentId' .clasp.json)

# scriptId 유효성 체크
if [ "$CURRENT_SCRIPT_ID" == "null" ] || [ -z "$CURRENT_SCRIPT_ID" ]; then
  echo "❌ 에러: .clasp.json 파일에서 scriptId를 찾을 수 없습니다."
  exit 1
fi

# 3. GitHub Secrets 업데이트 (자동 배포용)
echo "🔐 GitHub Secret (SCRIPT_ID) 동기화 중..."
gh secret set SCRIPT_ID -b"$CURRENT_SCRIPT_ID"

# 4. Google Apps Script로 푸시
echo "🚀 Google Apps Script로 코드 푸시 중 (clasp push)..."
clasp push --force

echo "--------------------------------------------------"
echo "✅ 모든 업데이트 및 푸시가 완료되었습니다!"
echo "📍 적용된 시트 ID: $CURRENT_PARENT_ID"
echo "📍 적용된 스크립트 ID: $CURRENT_SCRIPT_ID"
echo "✨ 이제 로컬과 GitHub, 구글 서버가 모두 동기화되었습니다."
echo "--------------------------------------------------"
