# DHC-SHIFT 사이트 기여 가이드

처음 Git을 쓰는 분들을 위한 단계별 안내입니다.

---

## 1단계: 프로그램 설치

아래 두 가지를 순서대로 설치합니다.

### Git 설치
1. [https://git-scm.com](https://git-scm.com) 접속
2. **Download for Windows** 클릭
3. 설치 파일 실행 — 모든 옵션 기본값으로 Next 클릭

설치 확인 (터미널에서):
```
git --version
```
버전 숫자가 나오면 성공입니다.

### Quarto 설치
1. [https://quarto.org/docs/get-started](https://quarto.org/docs/get-started) 접속
2. **Download Quarto CLI** 클릭
3. 설치 파일 실행

설치 확인:
```
quarto --version
```

---

## 2단계: GitHub 계정 설정

1. [https://github.com](https://github.com) 에서 계정 생성
2. 운영진에게 GitHub 아이디를 알려줘서 **dhc-shift Organization** 초대 받기

---

## 3단계: 레포 클론 (처음 한 번만)

터미널(PowerShell 또는 명령 프롬프트)을 열고 아래 명령어 입력:

```
git clone https://github.com/dhc-shift/dhc-shift.github.io.git
```

폴더가 생성됩니다. 해당 폴더로 이동:

```
cd dhc-shift.github.io
```

---

## 4단계: 로컬에서 미리보기

```
quarto preview
```

브라우저가 자동으로 열리며 사이트를 미리 볼 수 있습니다.  
파일을 수정하면 브라우저가 실시간으로 반영됩니다.

---

## 5단계: 내용 수정하기

| 작업 | 파일 위치 |
|------|-----------|
| 공지 추가 | `announcements/posts/` 폴더에 `.qmd` 파일 생성 |
| 활동 기록 추가 | `activities/posts/` 폴더에 `.qmd` 파일 생성 |
| 멤버 정보 수정 | `members.qmd` |
| 갤러리 추가 | `gallery.qmd` |
| 일정 추가 | `events/index.qmd` |

`.qmd` 파일은 마크다운 문법으로 작성합니다.

---

## 6단계: 변경사항 올리기

### 브랜치 만들기
작업 내용을 설명하는 이름으로 브랜치를 만듭니다:
```
git checkout -b 내-브랜치-이름
```
예시: `git checkout -b 5월-세미나-기록-추가`

### 파일 저장하기
```
git add .
git commit -m "변경 내용 한 줄 설명"
```
예시: `git commit -m "5월 1주차 세미나 기록 추가"`

### GitHub에 올리기
```
git push origin 내-브랜치-이름
```

---

## 7단계: Pull Request 보내기

1. [https://github.com/dhc-shift/dhc-shift.github.io](https://github.com/dhc-shift/dhc-shift.github.io) 접속
2. 상단에 **"Compare & pull request"** 버튼 클릭
3. 제목과 내용 작성 후 **Create pull request** 클릭
4. 운영진이 확인 후 승인하면 사이트에 자동 반영됩니다

---

## 자주 쓰는 명령어 요약

```bash
# 최신 내용 가져오기 (작업 전에 항상 먼저 실행)
git pull origin main

# 현재 상태 확인
git status

# 변경 파일 저장
git add .
git commit -m "설명"

# GitHub에 올리기
git push origin 브랜치이름
```

---

## 문제가 생겼을 때

- 오류 메시지를 그대로 캡처해서 운영진 단톡방에 공유해주세요.
- 절대 `git reset` 이나 `git push --force` 는 혼자 쓰지 마세요.
