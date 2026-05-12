# SHIFT 공식 웹사이트

연세대학교 미래캠퍼스 디지털헬스케어학부 학술동아리 **SHIFT**의 공식 웹사이트 소스 저장소입니다.

- 사이트: <https://dhc-shift.github.io>
- 프레임워크: [Quarto](https://quarto.org/) (정적 웹사이트)
- 배포: GitHub Pages (`/docs` 폴더)

## 로컬에서 실행

```bash
# 미리보기 (자동 새로고침)
quarto preview

# 빌드 (docs/ 폴더로 출력)
quarto render
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 `/docs` 폴더를 자동으로 게시합니다.

```bash
quarto render
git add -A
git commit -m "Update site"
git push origin main
```

## 폴더 구조

```
.
├── index.qmd            # 홈
├── about/               # 소개 (동아리 소개, 운영진, 문의)
├── recruit.qmd          # 모집공고
├── activity/            # 활동 (IT 온보딩, 산업지도, 세미나)
├── groups/              # 소모임 (안내, 개설중, 종료)
├── notice.qmd           # 공지
├── news.qmd             # 뉴스
├── posts/               # 블로그 글 카테고리별 폴더
│   ├── notice/
│   ├── news/
│   ├── recruit/
│   ├── seminar/
│   ├── groups-active/
│   └── groups-closed/
├── media/               # 이미지 등 미디어 파일
├── _quarto.yml          # 사이트 설정
└── docs/                # 빌드 결과물 (GitHub Pages 배포 대상)
```

## 새 글 추가

예: 모집공고 추가
```bash
mkdir -p posts/recruit/2026-09-01-fall-recruit
$EDITOR posts/recruit/2026-09-01-fall-recruit/index.qmd
```

`index.qmd` 상단 frontmatter 예시:
```yaml
---
title: "2026-2 신입 부원 모집"
description: "2학기 신입 부원을 모집합니다."
date: "2026-09-01"
author: "SHIFT 운영진"
categories: [모집]
---
```
