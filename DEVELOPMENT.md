# 개발자 노트

DHC-SHIFT 웹사이트는 Quarto로 빌드하고 GitHub Actions가 GitHub Pages에 배포한다. 로컬 미리보기, 정적 빌드 결과, 실제 배포 화면이 서로 다를 수 있으므로 아래 순서로 확인한다.

## 배포 방식

- 직접 `quarto publish gh-pages`를 사용하지 않는다.
- `main` 브랜치에 push하면 `.github/workflows/publish.yml`이 실행된다.
- Actions는 `_site`를 깨끗하게 지운 뒤 `quarto render`를 실행하고, `_site`를 Pages artifact로 배포한다.

## 작업 전 확인

```powershell
git pull origin main
git status
quarto --version
```

작업 전에 `git status`가 지저분하면 어떤 변경인지 먼저 확인한다. 모르는 변경을 되돌리지 않는다.

## 로컬 확인 순서

일반 확인:

```powershell
quarto render
quarto preview
```

페이지가 이상하게 보이면 preview 캐시나 오래된 preview 프로세스 문제일 수 있다. 이때는 preview를 재시작한다.

```powershell
Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

Get-Process | Where-Object { $_.ProcessName -eq "quarto" } |
  Stop-Process -Force -ErrorAction SilentlyContinue

quarto preview --port 4200 --host 127.0.0.1 --no-browser
```

## 깨진 화면 판별

다음처럼 보이면 디자인 CSS가 로드되지 않은 상태다.

- 메뉴가 세로 bullet list로 보임
- 로고는 작게 보이지만 navbar 스타일이 없음
- footer와 검색창이 기본 HTML처럼 보임
- 카드, 배경, 폰트 스타일이 모두 사라짐

이 경우 QMD 내용 문제가 아니라 `site_libs` CSS/JS 자산 로딩 문제일 가능성이 높다.

## 원격 배포 확인

브라우저에서 깨져 보이면 먼저 강력 새로고침한다.

- Windows/Linux: `Ctrl + F5`
- macOS: `Cmd + Shift + R`
- 또는 시크릿 창에서 접속

직접 HTTP 상태를 확인할 수도 있다.

```powershell
Invoke-WebRequest -UseBasicParsing https://dhc-shift.github.io/announcements/ |
  Select-Object -ExpandProperty StatusCode

Invoke-WebRequest -UseBasicParsing -Method Head `
  https://dhc-shift.github.io/site_libs/bootstrap/bootstrap.min.js
```

정상 배포라면 페이지와 `site_libs` 자산이 모두 `200`이어야 한다.

## 배포 전 체크리스트

```powershell
quarto render
git status
```

확인할 것:

- `_quarto.yml`의 `project.render`에 새 폴더가 포함되어 있는가?
- navbar에 새 메뉴가 필요한 경우 모든 페이지에서 보이는가?
- 새 PDF, 이미지, SVG 등 정적 파일이 `assets/` 아래에 있는가?
- `_site`는 커밋하지 않는다. GitHub Actions가 새로 만든다.
- 원격 배포 후 1-2분 정도 GitHub Pages 반영 시간을 기다린다.

## 새 섹션 추가 규칙

새 폴더를 만들면 `_quarto.yml`의 render 목록에도 추가한다.

예시:

```yaml
project:
  render:
    - "onboarding/**/*.qmd"
```

navbar에 추가할 때는 상대경로 기준이 아니라 QMD 경로를 쓴다.

```yaml
website:
  navbar:
    left:
      - href: onboarding/index.qmd
        text: 온보딩
```

## 온보딩 페이지 추가

연도별 구조를 유지한다.

```text
onboarding/
  index.qmd
  2026/
    index.qmd
    01-it-onboarding.qmd
    02-next-session.qmd
```

새 회차를 추가하면 해당 연도 `index.qmd`에도 링크를 추가한다.

## 카드와 갤러리 작성 규칙

Quarto/Pandoc은 카드 안에서 이미지 바로 다음 줄에 제목을 붙이면 한 문단으로 합쳐서 렌더링할 수 있다. 그러면 페이지에는 이미지 옆에 `### 제목` 텍스트가 그대로 보인다.

좋은 예:

```markdown
:::{.gallery-card}
![행사 사진](assets/images/example.png)

### 행사 제목

행사 설명을 씁니다.
:::
```

피해야 할 예:

```markdown
:::{.gallery-card}
![행사 사진](assets/images/example.png)
### 행사 제목
행사 설명을 씁니다.
:::
```

이미지, 제목, 설명 사이에는 빈 줄을 둔다. HTML로 직접 작성할 때도 `<img>`, `<h3>`, `<p>`처럼 요소를 분리한다.

## 공개 자료 주의

활동 이미지나 PDF를 올릴 때는 전화번호, 개인 카카오톡, 학번, 실명 명단처럼 공개 범위가 애매한 개인정보가 포함되어 있는지 먼저 확인한다. 필요한 경우 공개용으로 가린 이미지를 따로 만들어 `assets/`에 넣는다.
