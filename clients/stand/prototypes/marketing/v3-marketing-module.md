# Marketing Module 05 — v0.3
**Status:** Current · Updated 21 May 2026

---

## What is this?

An interactive prototype for STAND's Marketing Module (Module 05). It walks a young entrepreneur through a full launch planning process across three acts — helping them define their target customer, map their distribution channels, and build a real launch kit they can actually use.

---

## How to use it

Open `v3-marketing-module.html` in any modern browser (Chrome, Safari, Firefox). No internet connection required — all assets are self-contained in the single HTML file.

Best experienced on a mobile screen or in a narrow browser window (~430px).

---

## The flow

### Act 01 · Who's Your Person?
Build a customer profile from scratch:
- Give the customer a name
- Select their age range (Under 9 / 10–14 / 15–18 / 18+)
- Describe what they're into
- Explain why they'll want the product
- Add anything else that helps picture them

The profile card updates live as you fill it in. You can't move on until the customer feels real.

### Act 02 · Find Your Spots
Pin two distribution channels from a grid of eight options:
💬 Group chat · 🏆 Sports & afterschool · 🏫 At school · 👔 Parents & families · 🚪 Door to door · 📸 Instagram · 🎪 Events & IRL · 💡 Your own idea

Each pinned channel reveals a set of specific action items. The student picks their actual moves — not just ideas, but things they'll do.

### Act 03 · Build Your Kit
Four assets unlock in sequence:

1. **Launch Text** — Build a sales message step by step: hook → pitch → call to action. A live vibes meter rates the energy of the message as you build it.
2. **Flyer** — Write a headline, choose a product description, pick a CTA. The flyer preview updates live.
3. **Instagram Story** — Choose a visual, headline, and CTA. Shown in a real story-format phone preview.
4. **Business Card** — Add CEO name, business name, and contact method. Previewed as a real card.

### End Screen
A summary of everything built: customer profile, channel plan with action items, launch text, and asset completion status.

---

## Progress & feedback
- An 8-step progress bar runs across the top of the module, advancing as each act is completed
- Completion overlays celebrate each act with confetti and a summary before advancing
- Sound effects play on selections and screen transitions

---

## Technical notes
| | |
|---|---|
| Format | Single-file HTML (CSS + JS inline) |
| Dependencies | Google Fonts (Bagel Fat One, Manrope) — requires internet for fonts |
| Audio | Sound effects embedded as base64 (no external files needed) |
| Persistence | None — refreshing the page resets the flow |
| API | No external API calls in this version |
| Screen size | Optimised for 430px wide (mobile-first) |
