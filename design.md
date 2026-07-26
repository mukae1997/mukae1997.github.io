# Portfolio design system

This portfolio uses one visual system across the home page, About page, project index, research page, and project details.

## Typography

- Typeface: `Inter` with the system sans-serif fallback stack. Do not introduce display, serif, or monospace fonts.
- Primary copy: line-height `0.93`, letter-spacing `-0.055em`. Use this for all narrative paragraphs, including the homepage introduction, About introduction, practice text, and contact copy.
- Labels and navigation: line-height `1.3`, letter-spacing `0`. Use these for navigation, dates, metadata labels, and small section titles.
- Use normal sentence case. Avoid all caps except where a source title requires it.

## Layout

- The white rounded canvas sits on a black outer background on desktop.
- Navigation and page content share the same left baseline.
- Keep page content left aligned. Avoid centered narrow columns that break the homepage rhythm.
- Use generous vertical whitespace around the hero; keep media gaps compact at `4px`.
- Prefer whitespace over decorative rules, badges, gradients, or panels.

## Components

- Navigation: `Xu Chuyan`, `Projects`, then `About`. Use the same small-label style and a short hover underline on every link.
- Tags: rectangular black outline, no pill radius.
- Project cards: media and metadata may be shown, but cards do not link to their detail pages until the details are ready.
- Project grouping: use only Notion's `Portfolio Category` field, synchronized into `projects-master.csv`. The public labels are `Exhibitions, Art & Performances`, `Game`, and `AIGC`; do not infer categories from other fields or hard-code per-project mappings in the page.
- Contact: keep email public; do not publish a phone number.

## Visual limits

Use at most two text treatments: primary copy and label. Use black, white, and muted gray only. New components should reuse these tokens from `src/styles/global.css` rather than adding local spacing or font values.
