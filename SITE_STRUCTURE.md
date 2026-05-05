# DHC-SHIFT Site Structure

This repository is a Quarto static site for the DHC-SHIFT homepage.

## Important Context

- This is currently a Quarto site, not a Next.js app.
- Source pages are `.qmd` files.
- Generated output goes to `_site/`.
- Do not edit `_site/` directly.
- Site-wide configuration lives in `_quarto.yml`.
- Shared visual styling lives in `styles.css`.
- Public assets live under `public/`.

## Current Navigation

```text
About
Activities
Explore
Groups
News
Join
GitHub icon
```

The navigation is configured in `_quarto.yml`.

## Page Roles

```text
index.qmd
  Home page. Contains the TimelineJS iframe connected to a published Google Sheet.

about.qmd
  Organization introduction page.

activities.qmd
  Official society activity archive page.

explore/index.qmd
  Shared learning track hub.

explore/it-onboarding/index.qmd
  IT Onboarding track page.

explore/industry-map/index.qmd
  Industry Map track page.

groups/index.qmd
  Small-group hub page.

groups/research-presentation/index.qmd
  Research & Presentation group page.

groups/career-lab/index.qmd
  Career Lab group page.

groups/language-circle/index.qmd
  Language Circle group page.

news/index.qmd
  Notices and announcements page.

join.qmd
  Recruiting and application page.
```

## Information Architecture

Use these boundaries when adding content:

```text
Explore
  Shared learning tracks and common curriculum.
  Current tracks:
  - IT Onboarding
  - Industry Map

Groups
  Independently operated small groups led by group leaders.
  Current groups:
  - Research & Presentation
  - Career Lab
  - Language Circle

Activities
  Official all-society activity records.

News
  Notices, announcements, recruiting updates, schedule updates.

Join
  Application and recruiting information.
```

## Recommended Post Locations

```text
news/posts/{date-slug}/index.qmd
activities-posts/{date-slug}/index.qmd
explore/it-onboarding/posts/{date-slug}/index.qmd
explore/industry-map/posts/{date-slug}/index.qmd
groups/research-presentation/posts/{date-slug}/index.qmd
groups/career-lab/posts/{date-slug}/index.qmd
groups/language-circle/posts/{date-slug}/index.qmd
```

Folders may need to be created when the first post is added.

## Timeline

The home timeline is a TimelineJS iframe in `index.qmd`.

Timeline events are managed in a published Google Sheet, not in the repository. The iframe source currently uses a published CSV URL encoded into the TimelineJS `source` parameter.

When adding a homepage timeline event:

1. Write the related post or page in this repository if needed.
2. Render/deploy so the post URL and image URL are live.
3. Add a row to the Google Sheet.
4. Put the post URL in the `Text` column if the slide should link to a post.
5. Put the image URL in the `Media` column if the slide should show an image.

Common TimelineJS columns:

```text
Year
Month
Day
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

If TimelineJS shows `Configuration unreadable`, check that the Google Sheet is published to the web and that the iframe source uses the published CSV URL form:

```text
https://docs.google.com/spreadsheets/d/e/{PUBLISHED_ID}/pub?output=csv
```

## Rendering

Preview locally:

```bash
quarto preview
```

Render static output:

```bash
quarto render --no-cache
```

## Notes For Future Agents

Before editing, read:

1. `README.md`
2. `SITE_STRUCTURE.md`
3. `_quarto.yml`

There may be unrelated dirty git changes. Do not revert user changes unless explicitly requested.
