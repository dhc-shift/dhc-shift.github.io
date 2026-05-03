# DHC-SHIFT 웹사이트

Digital Healthcare Community - SHIFT 동아리 공식 웹사이트

**배포 주소**: https://dhc-shift.github.io

## 🚀 시작하기

### 요구사항
- Quarto (최신 버전)
- Git

### 로컬에서 실행

```bash
# 저장소 클론
git clone https://github.com/dhc-shift/dhc-shift.github.io.git
cd dhc-shift.github.io

# 미리보기
quarto preview

# 렌더링
quarto render

# GitHub Pages에 배포 (처음 한 번만)
quarto publish gh-pages
```

## 📁 프로젝트 구조

```
.
├── _quarto.yml          # Quarto 설정 파일
├── index.qmd            # 홈페이지
├── about.qmd            # 소개 페이지
├── members.qmd          # 멤버 소개
├── gallery.qmd          # 활동 갤러리
├── resources.qmd        # 자료실
├── announcements/       # 공지사항
│   └── index.qmd
├── activities/          # 활동기록 (블로그 형식)
│   ├── index.qmd
│   └── posts/
├── events/              # 일정 & 이벤트
│   └── index.qmd
└── assets/              # 이미지 등 정적 파일
    └── images/
```

## ✏️ 컨텐츠 추가 방법

### 새로운 공지사항 추가

`announcements/posts/` 디렉토리에 새 파일 생성:

```yaml
---
title: "공지사항 제목"
date: 2026-05-03
author: "작성자"
---

공지 내용...
```

### 새로운 활동 기록 추가

`activities/posts/` 디렉토리에 새 파일 생성:

```yaml
---
title: "활동 제목"
date: 2026-05-03
author: "작성자"
image: "../images/activity.jpg"
---

활동 내용...
```

## 🔗 관련 링크

- GitHub Organization: https://github.com/dhc-shift
- 메인 채널: [Discord/카톡 링크]

## 📝 기여 가이드

1. Fork 및 새 브랜치 생성
2. 컨텐츠 작성/수정
3. Pull Request 제출
4. 리뷰 후 병합

## 📧 문의

질문이나 제안사항은 GitHub Issues를 통해 등록해주세요.

---

**만든이**: DHC-SHIFT Team  
**마지막 업데이트**: 2026년 5월 3일
