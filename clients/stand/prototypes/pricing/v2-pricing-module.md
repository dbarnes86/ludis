# Pricing Module 06 — v0.2
**Status:** Current · Updated 19 May 2026

---

## What is this?

An interactive prototype for STAND's Pricing Module (Module 06). Takes a young entrepreneur through the core mechanics of pricing — cost to make, selling price, profit margin — then helps them set a monthly revenue goal and understand exactly how many sales they need to hit it.

---

## How to use it

Open `v2-pricing-module.html` in any modern browser (Chrome, Safari, Firefox). The AI feedback step (Step 04) requires an internet connection. All other steps work offline.

Best experienced on a mobile screen or in a narrow browser window (~430px).

---

## The flow

### Step 01 · Intro
Module context — what pricing is and why it matters for a real business.

### Step 02 · Your Cost
Set the cost to make or source the product using:
- Stepper buttons (−$1.00 / −$0.50 / −$0.10 / +$0.10 / +$0.50 / +$1.00)
- Preset quick-pick chips
- Tap the display number to type directly

### Step 03 · Your Price
Drag a slider from $0 to $10.00. As you drag:
- A three-column card shows cost / price / profit updating live
- An SVG ring animates to show the **profit margin %** in real time
- The ring colour changes: green (≥40%), amber (≥20%), red (<20%)
- A one-line status message coaches the decision

### Step 04 · AI Feedback
The current price and margin are sent to Claude for a brief, plain-English coaching response. If the API is unavailable, a sensible fallback message is shown.

### Step 05 · Your Goal
Enter a monthly revenue target in dollars. The module instantly calculates — and animates — the number of sales needed to hit that goal at the current price and margin.

### Step 06 · Summary
A P&L-style financial statement showing the full picture:
- Cost per unit
- Selling price
- Profit per sale
- Monthly goal
- Sales needed

### Step 07 · Complete
Two downloadable assets:
- **Pricing Card** — a summary card with the student's pricing decisions
- **Kids Accountancy Certificate** — a completion certificate

---

## Technical notes
| | |
|---|---|
| Format | Single-file HTML (CSS + JS inline) |
| Dependencies | Google Fonts (Playfair Display, DM Sans) — requires internet for fonts |
| AI | Anthropic Claude (`claude-sonnet-4-20250514`) via corsproxy.io |
| Persistence | None — refreshing the page resets the flow |
| Currency | USD ($) throughout |
| Screen size | Optimised for 430px wide (mobile-first) |
