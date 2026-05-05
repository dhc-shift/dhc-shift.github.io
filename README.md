# DHC-SHIFT 홈페이지 운영 가이드

이 저장소는 DHC-SHIFT 홈페이지를 관리하는 Quarto 정적 사이트입니다.
홈페이지 본문과 게시물은 이 저장소의 `.qmd` 파일로 관리하고, 홈 화면의 큰 타임라인은 Google Sheet와 TimelineJS로 관리합니다.

## 기본 구조

```text
_quarto.yml       # 사이트 전체 설정, 네비게이션, 테마
index.qmd         # 홈 화면, TimelineJS 임베드
about.qmd         # About 페이지
activities.qmd    # Activities 페이지
explore/index.qmd # Explore 페이지
groups/index.qmd  # Groups 페이지와 소모임별 하위 페이지
explore/it-onboarding/index.qmd # IT Onboarding 페이지
explore/industry-map/index.qmd  # Industry Map 페이지
news/index.qmd    # News 페이지
join.qmd          # Join 페이지
styles.css        # 사이트 공통 스타일
public/           # 로고, 이미지, 첨부 에셋
```

`_site/`는 Quarto가 생성하는 결과물입니다. 직접 수정하지 말고 `.qmd`, `styles.css`, `_quarto.yml`을 수정한 뒤 다시 렌더링하세요.

## 로컬 미리보기

Quarto가 설치되어 있어야 합니다.

```bash
quarto preview
```

정적 파일을 한 번 생성하려면:

```bash
quarto render --no-cache
```

렌더링 후 결과물은 `_site/`에 생성됩니다.

## 일반 페이지 수정

상단 메뉴에 있는 기본 페이지는 다음 파일을 수정합니다.

```text
about.qmd
activities.qmd
explore/index.qmd
groups/index.qmd
news/index.qmd
join.qmd
```

각 파일의 맨 위에는 YAML frontmatter가 있습니다.

```yaml
---
title: "About"
subtitle: |
  Starter page.
page-layout: full
title-block-banner: true
---
```

`title`은 페이지 제목, `subtitle`은 제목 아래 설명입니다. `---` 아래부터 본문을 Markdown/Quarto 문법으로 작성하면 됩니다.

## 게시물 작성

게시물은 용도별 폴더를 만들어 관리하는 것을 권장합니다.

예시:

```text
news/posts/2026-05-01-opening/index.qmd
activities-posts/2026-05-07-orientation/index.qmd
explore/sessions/2026-05-14-data-map/index.qmd
explore/it-onboarding/posts/2026-05-10-github-basics/index.qmd
explore/industry-map/posts/2026-05-17-healthcare-platforms/index.qmd
groups/research-presentation/posts/2026-05-20-paper-reading/index.qmd
```

게시물 예시:

```markdown
---
title: "Opening Session"
date: 2026-05-01
description: "첫 오리엔테이션 안내 글입니다."
categories: [Notice]
image: "../../../public/posts/opening/banner.png"
image-alt: "Opening session banner"
---

본문을 여기에 작성합니다.
```

이미지는 `public/` 아래에 넣는 것을 권장합니다.

예시:

```text
public/posts/opening/banner.png
```

글에서 이미지를 참조할 때는 해당 글 위치 기준 상대 경로를 사용하거나, 배포 후 절대 URL을 사용합니다.

## 목록 페이지에 게시물 연결

현재 starter 상태에서는 목록 페이지가 비어 있습니다. 게시물을 자동 목록으로 보여주려면 해당 페이지에 `listing` 설정을 추가합니다.

예시: `news/index.qmd`

```yaml
---
title: "News"
subtitle: |
  공지와 운영 소식
listing:
  contents: posts
  sort: "date desc"
  type: grid
  categories: true
  sort-ui: true
  filter-ui: true
  image-height: 180px
  date-format: "YYYY.MM.DD"
  fields: [image, date, title, description, categories]
page-layout: full
title-block-banner: true
---
```

위 설정은 `news/posts/` 안의 게시물을 카드 형태로 보여줍니다.

## Explore 트랙 관리

`Explore`는 전체 구성원이 공통으로 참고하는 학습 트랙과 탐색 세션을 관리하는 공간입니다.

현재 기본 트랙은 다음 두 가지입니다.

```text
IT Onboarding  # IT 기초, 협업 도구, 문서 작성, 개발 환경
Industry Map   # 디지털 헬스케어 산업, 기업, 직무, 서비스 조사
```

트랙별 페이지 위치는 다음과 같습니다.

```text
explore/it-onboarding/index.qmd
explore/industry-map/index.qmd
```

트랙별 자료와 세션 기록은 각 트랙의 `posts/` 폴더에 작성합니다.

```text
explore/it-onboarding/posts/
explore/industry-map/posts/
```

공통 학습 자료는 `Explore`에 두고, 실제 활동 후기나 결과물은 성격에 따라 `Activities` 또는 `Groups`에 둡니다.

## 소모임 관리

소모임은 `Groups` 메뉴 아래에서 관리합니다. 현재 기본 소모임은 다음 세 가지입니다.

```text
Research & Presentation  # 논문 읽기 및 학술 발표
Career Lab               # 취업 및 진로 스터디
Language Circle          # 어학 및 커뮤니케이션
```

소모임별 페이지 위치는 다음과 같습니다.

```text
groups/research-presentation/index.qmd
groups/career-lab/index.qmd
groups/language-circle/index.qmd
```

소모임별 활동 기록은 각 소모임의 `posts/` 폴더에 작성합니다.

```text
groups/research-presentation/posts/
groups/career-lab/posts/
groups/language-circle/posts/
```

소모임장은 자기 소모임의 `index.qmd`에 운영 방식, 일정, 참여 방법을 정리하고, 활동 기록은 `posts/` 아래에 날짜별 폴더로 추가하면 됩니다.

예시:

```text
groups/career-lab/posts/2026-06-01-resume-review/index.qmd
```

전체 동아리 공식 활동은 `Activities`에 기록하고, 소모임장이 독립적으로 운영한 활동은 `Groups` 아래에 기록합니다.

## 홈 타임라인 관리

홈 화면의 타임라인은 `index.qmd`에 있는 TimelineJS iframe으로 표시됩니다.

현재 연결된 Google Sheet는 TimelineJS 공식 템플릿 구조를 사용합니다. 타임라인 항목을 수정하려면 저장소가 아니라 Google Sheet를 수정합니다.

주요 컬럼:

```text
Year
Month
Day
Time
End Year
End Month
End Day
End Time
Display Date
Headline
Text
Media
Media Credit
Media Caption
Media Thumbnail
Alt Text
Type
Group
Background
```

자주 쓰는 컬럼은 다음과 같습니다.

```text
Year / Month / Day   # 타임라인 날짜
Headline             # 타임라인 제목
Text                 # 설명. HTML 링크 사용 가능
Media                # 가운데 배너에 표시할 이미지, 영상, 링크 URL
Media Credit         # 이미지 출처
Media Caption        # 이미지 설명
Type                 # title을 넣으면 타이틀 슬라이드로 사용
Group                # 항목 그룹
Background           # 배경색 또는 이미지 URL
```

### 게시물과 타임라인 연결

게시물을 작성한 뒤 타임라인에도 보여주려면 Google Sheet에 한 줄을 추가합니다.

`Text` 칸에는 게시물 링크를 넣을 수 있습니다.

```html
<a href="https://dhc-shift.github.io/news/posts/2026-05-01-opening/">Read post</a>
```

`Media` 칸에는 이미지 URL을 넣습니다.

```text
https://dhc-shift.github.io/public/posts/opening/banner.png
```

이렇게 하면 타임라인에서 해당 시점을 클릭했을 때 이미지와 설명이 함께 바뀝니다.

## Google Sheet를 바꿔야 할 때

새 Google Sheet로 교체할 때는 `index.qmd`의 iframe `src`를 수정합니다.

현재는 published CSV URL이 URL-encoded 형태로 들어가 있습니다.

```html
<iframe
  class="shift-timeline-embed"
  src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=..."
>
</iframe>
```

Google Sheet는 반드시 `File > Share > Publish to web`으로 게시되어 있어야 합니다. TimelineJS에서 `Configuration unreadable` 오류가 나면 보통 게시 설정 또는 `source` URL 형식 문제입니다.

현재 안정적으로 동작한 형식은 다음입니다.

```text
https://docs.google.com/spreadsheets/d/e/{PUBLISHED_ID}/pub?output=csv
```

이 URL을 URL-encode해서 iframe의 `source=`에 넣습니다.

## 이미지 관리 팁

- 타임라인과 게시물에서 오래 사용할 이미지는 `public/` 아래에 저장합니다.
- 파일명은 공백 없이 영문 소문자와 하이픈을 권장합니다.
- 예: `public/posts/2026-opening/team-photo.jpg`
- Google Drive 공유 이미지 링크는 직접 표시가 안 되는 경우가 많으므로, 가능하면 저장소의 `public/` 이미지나 외부에서 직접 접근 가능한 이미지 URL을 사용하세요.

## 배포 전 체크리스트

1. 새 글의 YAML frontmatter가 올바른지 확인합니다.
2. 이미지 경로가 깨지지 않는지 확인합니다.
3. Google Sheet 타임라인 행의 날짜, 제목, 링크, 이미지 URL을 확인합니다.
4. 로컬에서 렌더링합니다.

```bash
quarto render --no-cache
```

5. `_site/index.html` 또는 `quarto preview`에서 홈 타임라인과 게시물 페이지를 확인합니다.

## 주의사항

- `_site/` 안의 파일은 직접 수정하지 않습니다.
- Google Sheet의 첫 행 컬럼명은 TimelineJS 템플릿 그대로 유지합니다.
- 타임라인이 안 뜨면 먼저 Google Sheet가 웹에 게시되어 있는지 확인합니다.
- 게시물 작성만으로 타임라인에 자동 등록되지는 않습니다. 게시물 작성 후 Google Sheet에도 행을 추가해야 홈 타임라인에 표시됩니다.
