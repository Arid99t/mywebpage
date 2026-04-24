# Upgrade: mywebpage/ site with glass buttons + scroll animations

Drop these files **over your existing `mywebpage/`** — they're drop-in replacements, no markup changes needed.

## Files to replace

| Copy this → Over this |
|---|
| `mywebpage_upgraded/css/styles.css` → `mywebpage/css/styles.css` |
| `mywebpage_upgraded/js/main.js` → `mywebpage/js/main.js` |

**Keep everything else** — `index.html`, `blog/post-1.html`, `assets/`, `css/blog-post.css` stay as they are.

## What you get

1. **Glassmorphic CTA buttons** — tinted blue glass (primary) + frosted white (secondary) with inner highlights and soft blue shadows. Same class names (`.btn-primary`, `.btn-secondary`) so your HTML needs no changes.
2. **Scroll-reactive backdrops** behind the **Research** and **Projects** sections — 5 SVG motifs per section (flask, headset, VR goggles, CPU, sine wave, metronome, book, code brackets) that drift vertically in parallax as you scroll, at ~11% opacity in brand blue. Auto-injected by JS; zero markup changes.
3. **Frosted nav bar** — stronger blur + saturation for a truer glass look.
4. **Hero** now has two radial blue glows to give the glass buttons something to sit on.
5. **Social icons** (`✉`, `in`) become frosted chips.
6. **Cards** (research, skills, projects, education, highlights) now fade-up on scroll.

## After copying

Just reopen `mywebpage/index.html` in your browser. Hard refresh (Cmd/Ctrl+Shift+R) if you don't see the glass.

## Deploy

Once it looks right locally, push to `Arid99t/mywebpage` → Settings → Pages → deploy from `master`. You'll get a live URL at `https://arid99t.github.io/mywebpage/`.

## Notes

- Works in all modern browsers. `backdrop-filter` gracefully falls back to a translucent tint on older browsers — still looks clean.
- Scroll backdrop respects `pointer-events: none` so it never blocks clicks.
- Parallax uses `transform: translate3d` for GPU compositing; no layout thrash.
- If the backdrop motifs feel too intense, change `opacity: 0.11` in `.scroll-bg .motif` (styles.css) — try 0.07 for subtler, 0.18 for bolder.
