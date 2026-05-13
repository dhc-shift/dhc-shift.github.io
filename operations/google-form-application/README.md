# SHIFT 지원서 자동 생성 세팅 가이드

Google Form 응답을 바탕으로 Google Docs 지원서를 자동 생성하고, PDF로 저장하는 운영용 가이드입니다.

## 1. Drive 폴더 만들기

Google Drive에서 아래 이름으로 폴더를 만듭니다.

```text
SHIFT 신입 부원 지원서 접수_2026
```

이 폴더 URL에서 `folders/` 뒤의 값을 복사해 `Code.gs`의 `OUTPUT_FOLDER_ID`에 넣습니다.

## 2. Google Docs 템플릿 만들기

새 Google Docs를 만들고 제목을 아래처럼 설정합니다.

```text
SHIFT 동아리 지원서 템플릿
```

`template.md`의 본문을 Google Docs에 붙여넣습니다. 디자인은 자유롭게 다듬어도 되지만, `{{이름}}`, `{{지원동기}}` 같은 placeholder는 정확히 유지해야 합니다.

문서 URL에서 `/d/`와 `/edit` 사이의 값을 복사해 `Code.gs`의 `TEMPLATE_DOC_ID`에 넣습니다.

## 3. Google Form 질문 만들기

질문 제목은 아래 텍스트와 정확히 맞추는 것을 권장합니다. 제목이 바뀌면 `Code.gs`의 `FIELD` 값도 같이 바꿔야 합니다.

| 질문 제목 | 추천 형식 | 필수 여부 |
| --- | --- | --- |
| 이름 | 단답형 | 필수 |
| 생년월일 | 단답형 또는 날짜 | 필수 |
| 전화번호 | 단답형 | 필수 |
| 주소 | 단답형 | 선택 |
| 이메일 | 이메일 | 필수 |
| 학력 | 장문형 | 필수 |
| 1지망 본부 | 드롭다운 | 필수 |
| 2지망 본부 | 드롭다운 | 필수 |
| 지원 동기 | 장문형 | 필수 |
| 해당 본부에서 맡고 싶은 역할 혹은 배우고 싶은 것 | 장문형 | 필수 |
| 경력사항 및 얻은 점 | 장문형 | 선택 |
| 관심분야 | 장문형 | 필수 |
| Q1. 팀 프로젝트 경험이 있다면, 가장 어려웠던 상황은 무엇이었으며 이를 해결하기 위해 어떤 구체적인 행동을 하셨는지 작성해주세요. (본인의 역할과 기여도 포함) | 장문형 | 필수 |
| Q2. 여러 일정이 동시에 겹치는 상황이 발생했을 때, 어떤 판단 기준으로 우선순위를 정하시겠습니까? 그 이유도 함께 작성해주세요. | 장문형 | 필수 |
| 개인정보 수집 및 이용 동의 | 체크박스 | 필수 |

본부 선택지는 아래 4개로 둡니다.

```text
학술기획본부
콘텐츠 스튜디오
브랜드 마케팅
인사&시스템 본부
```

사진 업로드는 일단 제외하는 것을 권장합니다. Google Form 파일 업로드 문항은 지원자에게 Google 로그인을 요구할 수 있어 지원 장벽이 올라갑니다.

## 4. 응답 Sheet 연결

Google Form의 `응답` 탭에서 Google Sheets에 연결합니다.

연결된 응답 Sheet에서 `확장 프로그램 > Apps Script`를 엽니다.

## 5. Apps Script 붙여넣기

`Code.gs` 내용을 Apps Script 편집기에 붙여넣습니다.

아래 두 값은 실제 ID로 바꿉니다.

```javascript
TEMPLATE_DOC_ID: 'GOOGLE_DOCS_TEMPLATE_ID',
OUTPUT_FOLDER_ID: 'GOOGLE_DRIVE_OUTPUT_FOLDER_ID',
```

운영진 알림 메일을 바꾸려면 아래 값도 수정합니다.

```javascript
ADMIN_EMAIL: 'shiftysdh@gmail.com',
```

## 6. 트리거 설정

Apps Script 편집기에서 함수 선택을 `setupTrigger`로 바꾸고 한 번 실행합니다.

권한 승인 창이 뜨면 승인합니다. 이후 Form이 제출될 때마다 `onFormSubmit`이 자동 실행됩니다.

## 7. 테스트

Google Form에서 테스트 응답을 1개 제출합니다.

정상 동작하면 아래 결과가 생깁니다.

- Drive 폴더에 `SHIFT_지원서_이름_전화번호` Google Docs 생성
- 같은 폴더에 PDF 생성
- 응답 Sheet에 `생성 문서 링크`, `생성 PDF 링크`, `처리 시각` 열 추가
- 운영진 이메일로 제출 알림 발송
- 지원자 이메일로 접수 완료 메일 발송

## 8. 홈페이지 반영

Google Form의 `보내기 > <>`에서 iframe 코드를 복사합니다.

`apply.qmd`의 구글폼 iframe `src`를 새 Form embed URL로 바꾼 뒤 `quarto render`를 실행하면 됩니다.
