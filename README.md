# Arindam Dutta — Research portfolio

A static personal portfolio with a Monet-inspired visual design, warm ivory and sage light mode, and a deep green dark mode. Existing research, project, experience, education and contact content is retained, with additional emphasis on audio, haptics and hardware.

## Preview

Open `index.html` in a browser. No installation or build is required. The site can also be served with any static HTTP server or hosted on GitHub Pages.

## Main files

- `index.html` — content, navigation, discipline links and project categories.
- `css/main.css` — theme tokens, typography, layout and responsive styles.
- `js/main.js` — saved colour preference, mobile navigation and project filtering.
- `assets/images/profile.jpeg` — original portrait.
- `assets/images/water-lilies.jpg` — optimised decorative artwork.
- `assets/images/water-lilies-source.md` — artwork provenance and generation prompt.

The older `classic.html`, blog pages and design-system folder remain separate from this homepage.

## Design and behaviour

- Libre Caslon Display headings and DM Sans body type, loaded from Google Fonts with local font fallbacks.
- System colour preference is respected initially. The header toggle saves a visitor's explicit choice when local storage is available.
- Audio, Haptics and Hardware shortcuts filter the selected projects. Featured work follows the same filters, and an accessible status reports the result count.
- Responsive layouts, keyboard focus indicators, a skip link and reduced-motion support.
- Main content remains visible when JavaScript is disabled. Storage restrictions do not prevent the controls from working.

## Editing

Edit text directly in `index.html`. Project filters use each article's space-separated `data-cat` values. The original seven projects are preserved, including the featured apparatus. Audio features AMUSER; Hardware includes the apparatus and tactile rendering device.

Adjust colours in the light and dark theme token blocks at the top of `css/main.css`. The artwork is a decorative, AI-generated Monet-inspired painting, not a reproduction attributed to Monet.
