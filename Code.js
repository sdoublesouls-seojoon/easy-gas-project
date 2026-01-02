/**
 * @fileoverview Google Apps Script 메인 엔트리 포인트
 * @description 이 템플릿은 clasp + GitHub Actions 자동 배포를 지원합니다.
 */

/**
 * 프로젝트가 열릴 때 자동으로 메뉴를 생성합니다.
 * (Sheets, Docs, Forms, Slides 에 바인딩된 경우 실행됨)
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('📋 내 메뉴')
    .addItem('기능 실행', 'myFunction')
    .addItem('정보', 'showAbout')
    .addToUi();
}

/**
 * 메뉴에서 호출하는 샘플 함수입니다.
 */
function myFunction() {
  SpreadsheetApp.getUi().alert('myFunction이 실행되었습니다!');
}

/**
 * 정보를 표시하는 샘플 함수입니다.
 */
function showAbout() {
  SpreadsheetApp.getUi().alert('GAS Template v1.0.0');
}

/**
 * 스크립트 실행 시 호출되는 메인 함수
 * GAS 에디터에서 직접 실행하거나 트리거로 호출할 수 있습니다.
 */
function main() {
  Logger.log('🚀 GAS Template - Hello World!');
  Logger.log('현재 시간: ' + new Date().toLocaleString('ko-KR'));
  Logger.log('배포가 성공적으로 완료되었습니다.');
}

/**
 * 웹 앱으로 배포 시 GET 요청 핸들러
 * @param {Object} e - 이벤트 객체
 * @returns {TextOutput} JSON 응답
 */
function doGet(e) {
  const response = {
    status: 'success',
    message: 'GAS Template is running!',
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 웹 앱으로 배포 시 POST 요청 핸들러
 * @param {Object} e - 이벤트 객체
 * @returns {TextOutput} JSON 응답
 */
function doPost(e) {
  const response = {
    status: 'success',
    message: 'POST request received',
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
