# Goal Setting — How Much Do You Want To Make?

**File:** `goal-setting/index.html`  
**Format:** Lesson prototype  
**Version:** v0.1 · Draft  
**Last updated:** June 2026

---

## What this is

A 3-screen, self-contained lesson prototype in the Bagel Fat One / Manrope / Caveat design system. The lesson teaches kids to set a concrete financial goal and immediately understand what it actually requires — translating an abstract dollar amount into a specific number of sales.

Deliberately minimal. The form IS the lesson. No video, no trivia — just two inputs and a live-calculated result that makes the abstract concrete.

---

## Flow

| Screen | Colour | What happens |
|--------|--------|-------------|
| **1 · Intro** | Red | Title screen. "How much do you want to make?" with an "I'm ready" button. |
| **2 · Form** | Cream | Two number inputs (monthly goal, price per sale) and a dark result block. As the student types, the sales number calculates live and animates in. A contextual reframe phrase updates based on the number. CTA enables only when both inputs have valid values. |
| **3 · Completion** | Yellow | A clean goal card showing all three numbers: monthly target, price per sale, and sales needed (highlighted in red). |

---

## Interaction details

- **Live calculation:** `recalc()` fires on every `oninput` event. Calculates `Math.ceil(goal / price)`. The big yellow number gets a `.pop` scale animation on each update (class added, then removed after 300ms via `setTimeout`).
- **Reframe logic:** After calculating, a contextual phrase appears below the number:
  - ≤ 5 sales → `"That's just N. You could do that this week."`
  - weekly ≈ 1 → `"About one a week. Totally manageable."`
  - otherwise → `"That's N a week for a month. Does that feel doable?"`
- **CTA gate:** Button stays disabled until `g > 0 && p > 0`. Enables automatically as soon as valid numbers are in both fields.
- **Card population:** `populateCard()` reads `state.goal` and `state.price`, formats them, and writes to the three `.goal-val` spans before transitioning to screen 3.
- **Progress dots:** 3 dots. Same `.done` / `.now` pattern as customer-feedback.
- **Screen transitions:** Same `go(from, to)` pattern with 220ms `.exit` → swap.

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
- JS is wrapped in an IIFE `(function(){...})()`. All functions called from `onclick` / `oninput` attributes are explicitly exposed on `window`.
- Number inputs use `-moz-appearance:textfield` and `::-webkit-inner-spin-button` removal to hide browser spinners cleanly.
- `node --check` passes clean — no syntax errors.

---

## What's not in this prototype

- **Business name personalisation.** The completion card shows "Alice's Sweet Sensations" as a hardcoded example.
- **Cost vs. price distinction.** The form uses a single "price per sale" input. A real product would distinguish between selling price and profit margin. For now it treats price as profit, which works fine for simple products.
- **Data persistence.** Nothing saved beyond the session.
- **Teacher override.** A future version might let a teacher set the cost/price ratio for a specific business type, so the maths reflects the student's real numbers.

---

*Prototype by Dan Barnes / Ludis for STAND*
