# Customer Feedback — What Do They Think?

**File:** `customer-feedback/index.html`  
**Format:** Lesson prototype  
**Version:** v0.1 · Draft  
**Last updated:** June 2026

---

## What this is

A 5-screen, self-contained lesson prototype in the new Bagel Fat One / Manrope / Caveat design system. The lesson teaches kids one of the most important (and most avoided) entrepreneurship habits: going out and actually asking customers what they think.

The prototype is video-led — designed to sit around a 90-second explainer clip that would live in the real product. The placeholder block simulates the video experience with a 5-second countdown before "I watched it" activates.

---

## Flow

| Screen | Colour | What happens |
|--------|--------|-------------|
| **1 · Intro** | Red | Title screen. "What do your customers think?" with a "Let's go" button. Sets the topic. |
| **2 · Video** | Cream | 90-second lesson placeholder. 5-second countdown before the CTA activates. Progress bar fills as the timer runs. |
| **3 · Key Idea** | Cream | A right/wrong question: "Do you like it?" vs "What would stop you buying it?" Picking the wrong card triggers a shake animation + red ✕ + feedback. It fades to 55% opacity and the right card stays active. Picking the right card gives a green pulse + checkmark. "Next" button fades in 600ms later. |
| **4 · Action** | Cream | The real work. Two text fields — "Person 1 said…" and "Person 2 said…". The CTA stays disabled until both have content. |
| **5 · Completion** | Yellow | A clean completion card showing both responses back to the student, labelled by person. "You just did what most adults don't." |

---

## Interaction details

- **Progress dots:** 5 dots across the top of every screen. `.done` (dark fill) for completed screens, `.now` (full black) for current.
- **Video timer:** `setInterval` fires every second. On screen 2 arrival, `startWatchTimer()` is called automatically via `go()`. Cancels on re-entry if already running.
- **Wrong/right mechanic:** `pickAnswer('a')` adds `.wrong` class, disables card, fades opacity after shake. `pickAnswer('b')` adds `.right` class, marks `answered = true`, fades card A, shows Next button after 600ms delay.
- **Screen transitions:** `go(from, to)` adds `.exit` to the current screen (fades + translateY(-14px)), then swaps `.active` after 220ms.
- **Card population:** `populateCard()` reads the two textarea values and writes them to `#card-q1` / `#card-q2` on screen 5.

---

## Design system

This prototype uses the **lesson design system** (not the STYLE.md pricing/marketing system):

| Token | Value |
|-------|-------|
| Background red | `#E5341A` |
| Background cream | `#FFF8E7` |
| Background yellow | `#FFD93D` |
| Text black | `#1A1A1A` |
| Max width | `480px` |

**Fonts:** Bagel Fat One (display/headings) · Manrope (body/labels) · Caveat (handwritten moments)

---

## Technical notes

- Single self-contained HTML file. No build tools, no external JS.
- All CSS and JS are inline. Only external dependency is Google Fonts.
- JS is wrapped in an IIFE `(function(){...})()`. All functions called from `onclick` attributes are explicitly exposed on `window`.
- No sounds in this prototype (lesson format — sound hooks can be added when real video is integrated).
- `node --check` passes clean — no syntax errors.

---

## What's not in this prototype

- **Real video.** The video block is a placeholder with a pulsing play button. The real product would embed or stream a 90-second explainer.
- **Business name personalisation.** The completion card shows "Alice's Sweet Sensations" as a hardcoded example. In the real product this would pull from the student's profile.
- **Data persistence.** Nothing is saved beyond the session. Responses live only in the DOM.

---

*Prototype by Dan Barnes / Ludis for STAND*
