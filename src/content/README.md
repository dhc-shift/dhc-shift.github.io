# Content Editing Guide

이 폴더의 `.mdx` 파일들이 사이트에 보이는 문구와 글의 원본입니다.

- `site/`: 사이트 제목, 메타 설명, 상단/하단 메뉴, 푸터 문구
- `home/`: 홈 배너, 히어로, 활동 카드, 로드맵, 빠른 이동
- `about/`: 소개 페이지의 문구, 카드, SHIFT 의미 표
- `pages/`: 각 페이지의 제목, 설명, 빈 상태 문구, CTA 문구
- `join/`: 가입 자격, 전형 일정, FAQ
- `newsletter/posts/`: 뉴스레터와 공지 카드
- `activities/`: 활동 아카이브 글 본문

반복 항목은 파일 하나가 카드 하나입니다. `order` 숫자가 작을수록 먼저 표시됩니다.

활동 글을 추가하려면 `activities/2026-05-example.mdx`처럼 파일을 만들고 아래 형식을 사용합니다.

```mdx
---
title: "글 제목"
date: "2026-05-07"
category: "행사"
summary: "목록에 보일 요약"
tags: ["태그1", "태그2"]
---

## 본문 제목

본문을 Markdown 형식으로 작성합니다.
```
