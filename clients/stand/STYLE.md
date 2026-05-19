# STAND — Prototype Style Guide

This is the design and development reference for all STAND prototype modules built under `clients/stand/prototypes/`. Every new module should match this spec without needing to reverse-engineer the existing code.

---

## Colour Tokens

All colours are defined as CSS custom properties on `:root`. Use these exclusively — no hardcoded hex values.

```css
:root {
  --cream:   #FAF3D6;   /* Page/app background */
  --card:    #FFFFFF;   /* Card and input backgrounds */
  --ink:     #232120;   /* Primary text, dark UI elements */
  --red:     #D81F26;   /* Primary action, badges, alerts */
  --mustard: #FFC408;   /* Reward moments, completion, badges */
  --green:   #006238;   /* Grade A, success states */
  --blue:    #014794;   /* Module badge, secondary accent */

  /* Ink opacity scale — use these for secondary text and borders */
  --ink-08:  rgba(35,33,32,0.08);
  --ink-12:  rgba(35,33,32,0.12);
  --ink-20:  rgba(35,33,32,0.20);
  --ink-45:  rgba(35,33,32,0.45);
}
```

**Colour usage rules:**
- `--cream` is always the app background. Never white.
- `--red` is the primary action colour. Use it for the main CTA on key screens.
- `--mustard` is reserved for reward and completion moments only. Don't use it in the main flow.
- `--ink` at full opacity for headings and primary text. Use the opacity scale for everything else.
- Dark completion screens use `--ink` as background with `--cream` text.

---

## Typography

Two fonts only. Both loaded from Google Fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--serif: 'Playfair Display', Georgia, serif;
--sans:  'DM Sans', 'Helvetica Neue', sans-serif;
```

**Usage:**
- `--serif` for all display headings, question text, business names, and emotional/reward moments. Always bold (700 or 900). Italic variant for emphasis within serif headings.
- `--sans` for all body copy, labels, overlines, button text, chips, and UI chrome. Weights: 400 (body), 500 (option text), 600/700 (buttons, labels).

**Type scale (approximate):**
- Display heading: 24–32px, `--serif`, weight 900, line-height 1.05
- Section heading: 18–22px, `--serif`, weight 700
- Body copy: 13–15px, `--sans`, weight 400, line-height 1.6–1.65, colour `--ink-45`
- Overline/label: 9–10px, `--sans`, weight 700, letter-spacing 0.12–0.16em, uppercase, colour `--ink-45`
- Button text: 14–16px, `--sans`, weight 700

---

## Layout

All modules are **mobile-first**. The app shell is centred with a max-width of 430px.

```css
html, body { height: 100%; background: #111; }
.sw {
  font-family: var(--sans);
  color: var(--ink);
  background: var(--cream);
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
}
```

The dark `#111` body behind the shell is intentional — it frames the module like a phone on a dark desk. Keep it.

**Screen inner padding:**
```css
.s-inner { padding: 20px 20px 32px; display: flex; flex-direction: column; flex: 1; }
```

CTA buttons always sit at the bottom of the screen, pushed there by `margin-top: auto` on the `.cta-zone`:
```css
.cta-zone { margin-top: auto; padding-top: 16px; }
```

---

## Screen Structure

Every screen follows this hierarchy:

```
.screen
  .s-inner
    .topbar          ← Stand logo + badge (module or CEO)
    .nav-row         ← Back button + progress track (all screens after s0)
    .overline        ← Short label (e.g. "Q2 — who actually wants this?")
    .display         ← Main question or heading (--serif, 900)
    .body            ← Supporting copy (--sans, --ink-45)
    [content]        ← Options, inputs, cards etc.
    .cta-zone        ← Primary (and optional secondary) CTA
```

Screens are toggled by removing/adding `.active`:
```css
.screen { display: none; flex-direction: column; min-height: 100vh; }
.screen.active { display: flex; }
```

The `go(id)` JS function handles all navigation:
```javascript
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
```

---

## Progress Track

7 segments is the standard for a full module. Fill completed segments with `--ink`, animate the active one.

```html
<div class="prog-track">
  <div class="seg filled"></div>
  <div class="seg active"></div>
  <div class="seg"></div>
  <!-- etc -->
</div>
```

```css
.prog-track { display: flex; gap: 3px; flex: 1; }
.seg { height: 4px; flex: 1; border-radius: 2px; background: var(--ink-12); }
.seg.filled { background: var(--ink); }
.seg.active {
  position: relative; overflow: hidden; background: var(--ink-12);
}
.seg.active::after {
  content: ''; position: absolute; inset: 0;
  background: var(--ink); transform: scaleX(0); transform-origin: left;
  animation: sf 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
}
@keyframes sf { to { transform: scaleX(1); } }
```

---

## Topbar

First screen (s0) uses the module badge. All subsequent screens use the CEO badge.

```html
<!-- s0 -->
<div class="topbar">
  <svg class="stand-logo" aria-label="Stand"><use href="#wm"/></svg>
  <span class="module-badge">Module 05 · Marketing</span>
</div>

<!-- s1+ -->
<div class="topbar">
  <svg class="stand-logo" aria-label="Stand"><use href="#wm"/></svg>
  <span class="ceo-badge">CEO · Alice</span>
</div>
```

```css
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 0; }
.stand-logo { height: 20px; width: auto; display: block; }
.module-badge {
  background: var(--blue); color: #fff; font-size: 9px; font-weight: 700;
  font-family: var(--sans); letter-spacing: 0.1em; border-radius: 20px;
  padding: 5px 12px; text-transform: uppercase;
  display: flex; align-items: center; justify-content: center; line-height: 1;
}
.ceo-badge {
  background: var(--red); color: #fff; font-size: 9px; font-weight: 700;
  font-family: var(--sans); letter-spacing: 0.06em; border-radius: 20px;
  padding: 4px 10px; text-transform: uppercase; line-height: 1.2; white-space: nowrap;
}
```

The Stand wordmark SVG is embedded inline in every module file. Copy the full `<symbol id="wm">` block from an existing module — don't hotlink it.

---

## Components

### Option List (single select)

```html
<div class="opt-list">
  <div class="opt" onclick="sel(this,'key','value')">
    <div class="opt-radio">
      <svg class="chk" width="9" height="7" viewBox="0 0 10 8">
        <path d="M1 4L4 7L9 1" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    </div>
    <span class="opt-text">Option label</span>
  </div>
</div>
```

Selected state: border becomes `--ink`, background becomes `--ink`, text becomes `--cream`.

### Text Input

```html
<div class="tl-field">
  <div class="tl-num">Label</div>
  <input class="tl-in" placeholder="Placeholder text…">
</div>
```

Transparent background, bottom border only at rest, full `--ink` border on focus.

### Textarea (free text)

```html
<textarea class="who-textarea" placeholder="e.g. …"></textarea>
```

White card background, border radius 10px, `--serif` font at 17px bold, italic placeholder.

### Suggestion Chips

```html
<div class="chips">
  <div class="chip" onclick="chipSelect(this, 'value')">Chip label</div>
</div>
```

White card, subtle border, full-width stacked (not inline wrapping). Tap to pre-fill an input.

### AI Response Card

Dark (`--ink` background) card that appears after a free-text submission. Shows what the kid said in italic serif, then AI feedback in smaller sans below a divider. Animates in with opacity + translateY.

### CTA Buttons

```css
/* Primary — dark */
.cta-ink { background: var(--ink); color: var(--cream); }

/* Primary — red (key action moments) */
.cta-red { background: var(--red); color: var(--cream); }

/* Secondary — outline */
.cta-outline {
  background: transparent; border: 1.5px solid var(--ink); color: var(--ink);
  border-radius: 100px; padding: 14px 20px;
}
```

All primary buttons: `border-radius: 100px`, full width, `padding: 17px 28px`, `font-size: 15px`, `font-weight: 700`.

Pulse animation on the first screen's CTA (draws attention after load):
```css
.cta-pulse { animation: ctap 2.4s ease-in-out 1.4s infinite; }
@keyframes ctap {
  0%,100% { box-shadow: 0 0 0 0 rgba(35,33,32,0); }
  50%      { box-shadow: 0 0 0 7px rgba(35,33,32,0.08); }
}
```

### Result/Grade Cards

Three grade states for AI-judged outputs:
```css
.grade-A { background: var(--green); }
.grade-B { background: #9A6200; }
.grade-C { background: var(--red); }
```

All use white text. Grade pill is a circle with the letter. Feedback text below in `rgba(255,255,255,0.82)`.

---

## Recap Tiles (s0)

The opening screen always shows 4 tiles recapping what the kid has built so far. They animate in on load with staggered delays.

Four tile colour variants: `--ink` (dark), `--red`, amber (`#B85A00`), and outline (transparent with border).

Tiles use `opacity: 0` + `translateY(12px)` at rest, animate to `opacity: 1` + `translateY(0)` with class `.in`.

Tick marks animate in separately with a spring (`cubic-bezier(0.34,1.56,0.64,1)`) after the tile appears.

---

## Completion Screen

Dark screen (`--ink` background). Sequence:

1. Badge ring pops in (spring animation + ring pulse)
2. Title fades up
3. Subtitle fades up
4. Module complete chip fades in
5. Asset cards reveal (opacity + translateY, staggered)
6. CTA appears

Badge uses `--mustard` background. Ring pulse:
```css
@keyframes rings {
  0%   { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(2.4); opacity: 0; }
}
```

---

## Sound

Sound files live at: `clients/stand/prototypes/assets/sounds/`

Five standard sounds per module:

| File | Moment |
|------|--------|
| `transition.mp3` | Screen advance (Next/Continue tap) |
| `select.mp3` | Option or chip selection |
| `thinking.mp3` | AI processing loop |
| `reveal.mp3` | Asset card appearing on completion screen |
| `complete.mp3` | Badge pop on the final completion screen |

Wire up with:
```javascript
function playSound(name) {
  const audio = new Audio(`/clients/stand/prototypes/assets/sounds/${name}.mp3`);
  audio.volume = 0.6;
  audio.play().catch(() => {}); // Catch autoplay blocks silently
}
```

Call `playSound('transition')` inside `go()`, `playSound('select')` inside `sel()` etc.

---

## AI Integration

Modules use the Anthropic API via a CORS proxy for prototype purposes:

```javascript
const PROXY = 'https://corsproxy.io/?url=https://api.anthropic.com/v1/messages';
```

**Note:** This proxy is unreliable in production and will fail on `lud.is`. For prototype demos this is acceptable — modules should always have a graceful fallback that lets the kid continue to the asset screen even if the API call fails. Andy needs to wire up a proper server-side proxy when modules move into the real product.

Always use `claude-sonnet-4-20250514`. Max tokens 900 for judging/feedback calls, 180 for short affirmation responses.

Prompt tone for all AI calls: warm, encouraging, direct, written for kids aged 8–14. No lists in responses. No questions back to the kid. 2 sentences max for affirmation calls.

---

## Tone of Voice

All in-product copy (questions, labels, feedback, button text) follows these rules:

- **Direct.** "Who would stop you on the street to buy this?" not "Please think about who your potential customers might be."
- **Warm but not patronising.** Talk to the kid like they're capable. They're a CEO.
- **Concrete.** Ground everything in the kid's actual business. Use their business name, their product, their numbers.
- **Short.** Questions are one sentence. Body copy is two sentences max. Overlines are 4 words max.
- **Action-oriented.** Every screen ends with the kid doing something, not just reading.
- **Failure is iteration.** Grade C feedback is never discouraging. "Try this angle" not "This doesn't work."

---

## File Naming

```
clients/stand/prototypes/<module-name>/v<n>-<module-name>.html
```

Examples:
```
clients/stand/prototypes/marketing/v1-marketing-module.html
clients/stand/prototypes/marketing/v2-marketing-module.html
clients/stand/prototypes/pricing/v1-pricing-module.html
```

Each module is a single self-contained HTML file. CSS and JS inline. No external dependencies except Google Fonts and the Stand wordmark SVG (embedded inline).

---

## Adding a New Module to the Workspace

1. Create the file at the path above
2. Open `clients/stand/index.html`
3. Add a `.proto-card` inside `<div class="prototypes-grid" id="prototypes-grid">`
4. Set the tag to `v0.1 · Draft` (or `v0.x · Current` for latest)
5. Set `href` to the relative path from `clients/stand/`
6. Push to main — GitHub Pages deploys automatically

---

*Last updated: May 2026*
