const CONFIG = {
  RESPONSE_SHEET_NAME: 'Form Responses 1',
  TEMPLATE_DOC_ID: 'GOOGLE_DOCS_TEMPLATE_ID',
  OUTPUT_FOLDER_ID: 'GOOGLE_DRIVE_OUTPUT_FOLDER_ID',
  ADMIN_EMAIL: 'shiftysdh@gmail.com',
  SEND_APPLICANT_CONFIRMATION: true,
  SEND_MAIL_ON_MANUAL_RUN: false,
  TIMEZONE: 'Asia/Seoul',
};

const FIELD = {
  NAME: '이름',
  BIRTHDAY: '생년월일',
  PHONE: '전화번호',
  ADDRESS: '주소',
  EMAIL: '이메일',
  EDUCATION: '학력',
  FIRST_DIVISION: '1지망 본부',
  SECOND_DIVISION: '2지망 본부',
  MOTIVATION: '지원 동기',
  ROLE: '해당 본부에서 맡고 싶은 역할 혹은 배우고 싶은 것',
  EXPERIENCE: '경력사항 및 얻은 점',
  INTERESTS: '관심분야',
  Q1: 'Q1. 팀 프로젝트 경험이 있다면, 가장 어려웠던 상황은 무엇이었으며 이를 해결하기 위해 어떤 구체적인 행동을 하셨는지 작성해주세요. (본인의 역할과 기여도 포함)',
  Q2: 'Q2. 여러 일정이 동시에 겹치는 상황이 발생했을 때, 어떤 판단 기준으로 우선순위를 정하시겠습니까? 그 이유도 함께 작성해주세요.',
};

const OUTPUT = {
  DOC_LINK: '생성 문서 링크',
  PDF_LINK: '생성 PDF 링크',
  PROCESSED_AT: '처리 시각',
  STATUS: '처리 상태',
  ERROR: '오류 메시지',
};

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers
    .filter((trigger) => trigger.getHandlerFunction() === 'onFormSubmit')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

function generateDocs() {
  const sheet = getResponseSheet();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return;

  const headers = values[0].map((header) => String(header || '').trim());
  const statusColumn = getOrCreateColumn(sheet, headers, OUTPUT.STATUS);
  getOrCreateColumn(sheet, headers, OUTPUT.DOC_LINK);
  getOrCreateColumn(sheet, headers, OUTPUT.PDF_LINK);
  getOrCreateColumn(sheet, headers, OUTPUT.PROCESSED_AT);
  getOrCreateColumn(sheet, headers, OUTPUT.ERROR);

  for (let i = 1; i < values.length; i++) {
    const rowNumber = i + 1;
    const status = String(sheet.getRange(rowNumber, statusColumn).getValue() || '').trim();
    if (status === 'DONE') continue;

    try {
      const namedValues = buildNamedValuesFromRow(headers, values[i]);
      const data = buildTemplateData(namedValues);
      processApplication(sheet, rowNumber, data, {
        sendEmails: CONFIG.SEND_MAIL_ON_MANUAL_RUN,
      });
    } catch (error) {
      writeBack(sheet, rowNumber, OUTPUT.STATUS, 'ERROR');
      writeBack(sheet, rowNumber, OUTPUT.ERROR, error.message || String(error));
    }
  }
}

function onFormSubmit(e) {
  if (!e || !e.namedValues || !e.range) {
    throw new Error('Google Form 제출 이벤트에서만 실행할 수 있습니다.');
  }

  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const data = buildTemplateData(e.namedValues);
  processApplication(sheet, row, data, { sendEmails: true });
}

function processApplication(sheet, row, data, options) {
  const result = createApplicationFiles(data);

  writeBack(sheet, row, OUTPUT.DOC_LINK, result.docUrl);
  writeBack(sheet, row, OUTPUT.PDF_LINK, result.pdfUrl);
  writeBack(sheet, row, OUTPUT.PROCESSED_AT, result.submittedAt);
  writeBack(sheet, row, OUTPUT.STATUS, 'DONE');
  writeBack(sheet, row, OUTPUT.ERROR, '');

  if (!options || !options.sendEmails) return;

  sendAdminMail(data, result.docUrl, result.pdfUrl, result.submittedAt);

  if (CONFIG.SEND_APPLICANT_CONFIRMATION && data['이메일']) {
    sendApplicantMail(data, result.submittedAt);
  }
}

function createApplicationFiles(data) {
  const submittedAt = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  const fileBaseName = sanitizeFileName(
    `SHIFT_지원서_${data['이름'] || '이름없음'}_${data['전화번호'] || data['이메일'] || submittedAt}`
  );

  const folder = DriveApp.getFolderById(CONFIG.OUTPUT_FOLDER_ID);
  const templateFile = DriveApp.getFileById(CONFIG.TEMPLATE_DOC_ID);
  const docFile = templateFile.makeCopy(fileBaseName, folder);

  const doc = DocumentApp.openById(docFile.getId());
  replacePlaceholders(doc.getBody(), data);
  doc.saveAndClose();

  const pdfFile = folder.createFile(
    docFile.getAs(MimeType.PDF).setName(`${fileBaseName}.pdf`)
  );

  return {
    docUrl: docFile.getUrl(),
    pdfUrl: pdfFile.getUrl(),
    submittedAt,
  };
}

function buildTemplateData(values) {
  const name = getValue(values, FIELD.NAME);
  const birthday = getValue(values, FIELD.BIRTHDAY);
  const phone = getValue(values, FIELD.PHONE);
  const address = getValue(values, FIELD.ADDRESS);
  const email = getValue(values, FIELD.EMAIL);
  const education = getValue(values, FIELD.EDUCATION);
  const firstDivision = getValue(values, FIELD.FIRST_DIVISION);
  const secondDivision = getValue(values, FIELD.SECOND_DIVISION);
  const motivation = getValue(values, FIELD.MOTIVATION);
  const role = getValue(values, FIELD.ROLE);
  const experience = getValue(values, FIELD.EXPERIENCE);
  const interests = getValue(values, FIELD.INTERESTS);
  const q1 = getValue(values, FIELD.Q1);
  const q2 = getValue(values, FIELD.Q2);
  const age = calculateAgeText(birthday);

  return {
    '이름': name,
    'name': name,
    '생년월일': birthday,
    'birth': birthday,
    '나이': age,
    'age': age,
    '전화번호': phone,
    'phone': phone,
    '주소': address,
    'address': address,
    '이메일': email,
    'email': email,
    '학력': education,
    'education': education,
    '1지망본부': firstDivision,
    'firstDivision': firstDivision,
    '2지망본부': secondDivision,
    'secondDivision': secondDivision,
    '지원동기': motivation,
    'motivation': motivation,
    '역할및배우고싶은것': role,
    'role': role,
    '경력사항': experience,
    'experience': experience,
    '관심분야': interests,
    'interests': interests,
    'Q1': q1,
    'q1': q1,
    'Q2': q2,
    'q2': q2,
  };
}

function replacePlaceholders(body, data) {
  Object.keys(data).forEach((key) => {
    body.replaceText(`\\{\\{${escapeRegExp(key)}\\}\\}`, normalizeReplacement(data[key]));
  });
}

function getValue(values, key) {
  const value = values[key];
  return Array.isArray(value) ? value.join(', ').trim() : String(value || '').trim();
}

function getResponseSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(CONFIG.RESPONSE_SHEET_NAME) || spreadsheet.getActiveSheet();
}

function buildNamedValuesFromRow(headers, row) {
  return headers.reduce((values, header, index) => {
    if (header) values[header] = [row[index]];
    return values;
  }, {});
}

function getOrCreateColumn(sheet, headers, header) {
  let index = headers.indexOf(header);

  if (index === -1) {
    index = headers.length;
    sheet.getRange(1, index + 1).setValue(header);
    headers.push(header);
  }

  return index + 1;
}

function writeBack(sheet, row, header, value) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const normalizedHeaders = headers.map((currentHeader) => String(currentHeader || '').trim());
  let column = normalizedHeaders.indexOf(header) + 1;

  if (column === 0) {
    column = lastColumn + 1;
    sheet.getRange(1, column).setValue(header);
  }

  sheet.getRange(row, column).setValue(value);
}

function sendAdminMail(data, docUrl, pdfUrl, submittedAt) {
  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: `[SHIFT 지원] ${data['이름'] || '이름 없음'} 지원서 제출`,
    htmlBody: `
      <p>SHIFT 신입 부원 지원서가 제출되었습니다.</p>
      <ul>
        <li>이름: ${escapeHtml(data['이름'])}</li>
        <li>이메일: ${escapeHtml(data['이메일'])}</li>
        <li>1지망 본부: ${escapeHtml(data['1지망본부'])}</li>
        <li>2지망 본부: ${escapeHtml(data['2지망본부'])}</li>
        <li>처리 시각: ${escapeHtml(submittedAt)}</li>
      </ul>
      <p><a href="${docUrl}">Google Docs 지원서 보기</a></p>
      <p><a href="${pdfUrl}">PDF 지원서 보기</a></p>
    `,
  });
}

function sendApplicantMail(data, submittedAt) {
  MailApp.sendEmail({
    to: data['이메일'],
    subject: '[SHIFT] 지원서가 정상 접수되었습니다',
    htmlBody: `
      <p>안녕하세요, ${escapeHtml(data['이름'])}님.</p>
      <p>SHIFT 신입 부원 지원서가 정상 접수되었습니다.</p>
      <p>접수 시각: ${escapeHtml(submittedAt)}</p>
      <p>지원해주셔서 감사합니다.</p>
    `,
  });
}

function calculateAgeText(birthday) {
  const date = parseBirthday(birthday);
  if (!date) return '';

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const hasNotHadBirthday =
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());

  if (hasNotHadBirthday) age -= 1;
  return `만 ${age}세`;
}

function parseBirthday(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d{4})[.\-/년 ]\s*(\d{1,2})[.\-/월 ]\s*(\d{1,2})/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);

  return Number.isNaN(date.getTime()) ? null : date;
}

function sanitizeFileName(text) {
  return String(text)
    .replace(/[\\/:*?"<>|#%{}~&]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 120);
}

function normalizeReplacement(value) {
  return String(value || '').replace(/\$/g, '$$$$');
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
