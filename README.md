# Arindam Dutta — Research portfolio

A compact academic portfolio with a profile sidebar, simple section navigation, and a white and sage colour palette. The layout is inspired by the organisation of Hao Ai's academic webpage, with Arindam's own identity, research and project content.

## Preview

Open `index.html` in a browser. No installation or build is required. The site can also be served with any static HTTP server or hosted on GitHub Pages.

## Main files

- `index.html` — profile, introduction, research, projects, experience, education, expertise and contact.
- `css/main.css` — light/dark themes, compact layouts and responsive styles.
- `js/main.js` — colour preference, current-section navigation and project filtering.
- `assets/images/profile.jpeg` — original portrait.

The older `classic.html`, blog pages and design-system folder remain separate from this homepage. The decorative painting is retained in assets but is no longer used by the homepage.

## Design and behaviour

- DM Sans typography, with system font fallbacks.
- A sticky profile column on desktop and a compact profile header on mobile.
- Section links remain available at every screen size; they scroll horizontally on narrow screens.
- Three manuscripts retain their authorship and preparation/status labels.
- Experience entries use native expandable details, retaining the full role descriptions.
- System colour preference is respected initially. The header toggle saves a visitor's explicit choice when local storage is available.
- Audio, Haptics and Hardware shortcuts filter the selected projects. Featured work follows the same filters, and an accessible status reports the result count.
- Responsive layouts, keyboard focus indicators, a skip link and reduced-motion support.
- Main content remains visible when JavaScript is disabled. Script-only controls are hidden without JavaScript. Storage restrictions do not prevent the controls from working.

## Editing

Edit text directly in `index.html`. Project filters use each article's space-separated `data-cat` values. The original seven projects are preserved, including the featured apparatus. Audio features AMUSER; Hardware includes the apparatus and tactile rendering device.

Adjust colours in the light and dark theme token blocks at the top of `css/main.css`. No framework or build tools are needed.

## Publishing

GitHub Pages publishes from `master`. Changes pushed to `main` must also be merged into `master` to update the live site.

The homepage's CSS and JavaScript URLs include a `?v=` version. Change the corresponding version whenever either asset changes, so returning visitors do not load an older cached asset with new HTML. The current versions use the first 12 characters of each file's SHA-256 hash.
