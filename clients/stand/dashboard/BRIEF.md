# STAND — Dashboard Prototype Build Brief

For: Claude Code (autonomous run, no questions)
Output: Self-contained HTML file deployed to GitHub Pages
Target URL: `lud.is/clients/stand/dashboard/index.html`
Date: June 2026

## What this is

Build a complete, navigable dashboard prototype for STAND. This is the post-onboarding home screen — the thing a kid lands on after they've built their business. It needs to work as a full demonstration of the engagement system: quest progression, curriculum, XP, business snapshot. Lauren sees this and understands the entire direction.

This is not a static mockup. It should feel like the real product. Every element should be interactive — click a lesson, enter it. Click a task, mark it done. The XP bar fills. The progression bar updates.

## Where to build

Path: `clients/stand/dashboard/index.html`
Single file: Yes. Everything in one self-contained HTML file — HTML, CSS, JS all inline. No external dependencies except Google Fonts.

## Simulated user state

Hard-code this state at the top of the JS:

```js
const USER = {
  name: "Alice",
  businessName: "Alice's Sweet Sensations",
  businessType: "Baked Goods",
  logoInitials: "AS",
  logoColor: "#7B2FBE",
  level: 3,
  xp: 840,
  xpToNextLevel: 1200,
  streak: 5,
  completedModules: ["perfect-your-pitch"],
  reviewModules: ["find-your-customer", "launch-plan"],
  totalSales: 0,
  storeViews: 12,
  daysActive: 14
}
```

The `reviewModules` array flags lessons that have been prototyped and are ready for Lauren to review. These get a "REVIEW" badge in the curriculum carousel.

## Dashboard structure

Five visible sections, in this order:

### 1. Header bar (persistent)
Left: STAND wordmark in red (Bagel Fat One). Centre: Business name ("Alice's Sweet Sensations") with small logo avatar. Right: Level badge ("CEO • Lv.3") + streak counter ("🔥 5")

### 2. XP progression bar
Full-width bar below the header. Shows:
- Current level label left ("Level 3")
- XP bar filling left to right with animated fill (cream background, red fill)
- Next level label right ("Level 4")
- "840 / 1200 XP" text centred above the bar
- On page load, the bar animates from 0 to current fill (500ms ease-out)

### 3. Business snapshot card
A card showing:
- Logo avatar (circle with initials in brand colour)
- Business name and type
- Three stat pills: "🛍 0 sales", "👀 12 store views", "📅 14 days active"
- "View your store →" link (dead link, just styled as a CTA)

### 4. Today's Tasks
Section heading "Today's Tasks" in bold.

Show exactly 3 tasks. Each task is a card with: a checkbox circle (unchecked state), task copy, and a subtle "→" arrow. On click, the checkbox animates to checked, the card fades to 60% opacity, and a small "+50 XP" toast pops up.

Tasks to show:
1. "Share your store with someone" — Tell a friend, family member, or neighbour about Alice's Sweet Sensations.
2. "Set your first sales goal" — Decide how many cupcakes you want to sell this week.
3. "Pitch your parents" — Practice your pitch and get them to support your business.

When all 3 tasks are checked: a brief celebration animation fires (confetti burst using canvas, 1 second, red/yellow/cream palette), and the XP bar updates (+150 XP total from the 3 tasks at +50 each, bar refills with animation).

### 5. Stand Lessons carousel
Section heading "Stand Lessons" in bold.

A horizontally scrollable row of lesson cards. Build all 10 lessons. Card width: 200px, fixed height, gap 16px.

Each lesson card shows:
- An icon area (relevant emoji in a large size, styled in the card's accent colour)
- Lesson title
- One-line description
- Status badge

On click, a lesson card that is AVAILABLE or FOR_REVIEW navigates to that lesson's experience. LOCKED and COMING SOON cards show a "🔒 Not yet unlocked" tooltip on hover, no navigation.

Lesson data — build exactly these 10:

```js
[
  { id: "perfect-your-pitch", title: "Perfect Your Pitch", description: "Learn what makes a great pitch and practice yours out loud.", icon: "🎤", color: "#E63946", status: "COMPLETED", xp: 200 },
  { id: "price-it-right", title: "Price It Right", description: "Figure out what to charge so you make money and customers feel good paying.", icon: "💰", color: "#2D9F6E", status: "AVAILABLE", xp: 200 },
  { id: "find-your-customer", title: "Who's Going to Buy From You?", description: "Work out exactly who your customers are and how to reach them.", icon: "🔍", color: "#F4A261", status: "FOR_REVIEW", xp: 200 },
  { id: "launch-plan", title: "Tell the World", description: "Build a real marketing plan for your launch.", icon: "📣", color: "#7B2FBE", status: "FOR_REVIEW", xp: 250 },
  { id: "customer-feedback", title: "What Do Your Customers Think?", description: "Find out what people really think about your business.", icon: "💬", color: "#E63946", status: "LOCKED", xp: 200 },
  { id: "how-much-to-make", title: "How Much Do You Want to Make?", description: "Set a real sales goal and work out what it takes to hit it.", icon: "🎯", color: "#2D9F6E", status: "LOCKED", xp: 150 },
  { id: "land-first-customer", title: "Land Your First Customer", description: "Get your first real sale — strategies from friends and family to strangers.", icon: "🤝", color: "#F4A261", status: "LOCKED", xp: 300 },
  { id: "track-your-money", title: "Track Your Money", description: "Learn the basics of tracking what you earn and spend.", icon: "📊", color: "#7B2FBE", status: "LOCKED", xp: 200 },
  { id: "think-like-inventor", title: "Think Like an Inventor", description: "Brainstorm new products and solve problems creatively.", icon: "💡", color: "#E63946", status: "LOCKED", xp: 200 },
  { id: "keep-or-grow", title: "Keep It or Grow It?", description: "Decide whether to reinvest your profits or take them home.", icon: "🌱", color: "#2D9F6E", status: "LOCKED", xp: 250 }
]
```

Status badge rendering:
- `COMPLETED` — green checkmark badge, "✓ Done", card slightly muted but still clickable (shows a completed state inside)
- `AVAILABLE` — red badge, "Start →", full opacity, clickable
- `FOR_REVIEW` — amber badge, "👁 Review", amber border on the card, clickable — this flags it for Lauren
- `LOCKED` / `COMING_SOON` — grey lock icon, "🔒 Coming soon", 50% opacity, not clickable

## Lesson experiences (in-page navigation)

When a user clicks an AVAILABLE or FOR_REVIEW lesson, the dashboard slides away (translateX -100%, 300ms) and the lesson view slides in (translateX 0). A back button in the top-left returns to dashboard (reverse animation).

Build full interactive lesson experiences for: Price It Right (AVAILABLE), Find Your Customer (FOR_REVIEW), and Tell the World (FOR_REVIEW). Others (e.g. completed perfect-your-pitch) show a placeholder "This lesson is coming soon" state — except COMPLETED which can show a simple completed summary state.

### Lesson shell (applies to all lessons)
- Top bar: back arrow left, lesson title centre, XP badge right showing lesson XP value
- Progress dots (number of steps) below the top bar
- Step content area (fills remaining height)
- Bottom CTA button ("Next →" or "Complete Lesson")

Step transitions: slide left on advance, slide right on back.

When a lesson is completed: fire the lesson-complete overlay (full screen, cream background, big trophy emoji, "+[XP] XP earned!", business name in headline "Alice's Sweet Sensations just levelled up", "Back to dashboard" CTA). On return to dashboard, XP bar animates to new value. Lesson card status should flip to COMPLETED in the carousel.

### Lesson: Price It Right (id: price-it-right) — 3 steps

**Step 1 — Hook.** STAND voice bubble: "Running a baked goods business means you need to charge the right price. Too cheap and you lose money. Too expensive and nobody buys. Let's find Alice's Sweet Sensations' sweet spot." Below: a simple illustration of a price tag (large emoji 🏷️, styled). CTA: "Let's do it →"

**Step 2 — The calculator (Build).** Heading: "What does one cupcake actually cost you?" Three input fields with labels:
- "Ingredients per batch" — default $4.50, $ prefix, number input
- "Packaging per unit" — default $0.80, number input
- "Your time (per hour, how many hours?)": two fields side by side — hourly rate ($8.00 default) × hours (0.5 default)

As user types, a live "Your cost: $X.XX" and "Suggested price: $X.XX" display updates in real time. Suggested price = cost × 2.5 rounded to nearest $0.50. (Treat batch as 12 cupcakes for per-unit ingredient cost, or simply treat the entered values as per-unit — pick a sensible consistent interpretation and label it clearly.)

Below the calculation: a "Profit per sale: $X.XX" display in a green pill.

A STAND voice bubble updates reactively as values change:
- margin < 30%: "Hmm, that's tight. You'd be working really hard for not much profit."
- margin 30–60%: "That's a solid price. You'll make real money and customers will think it's fair."
- margin > 60%: "Wow, great margins! Make sure it still feels like good value to your customers."

CTA: "That's my price →"

**Step 3 — The output.** A "Pricing Card" asset renders:
- Card styled in USER.logoColor with white text
- Business name: "Alice's Sweet Sensations"
- "My price: $[calculated price]"
- "My profit per sale: $[calculated profit]"
- Small "Built with STAND" footer
- A "Save this card" button (copies a text summary to clipboard, shows "Copied!" feedback)

STAND voice: "That's your pricing locked in, Alice. $[price] per cupcake — and you keep $[profit] every time you sell one. That's real money."

CTA: "Complete lesson →" → lesson-complete overlay, 200 XP.

### Lesson: Who's Going to Buy From You? (id: find-your-customer) — 3 steps

**Step 1 — Hook.** STAND voice: "Every great business knows exactly who their customer is. Not 'everyone' — a real, specific person. Let's figure out who's going to love Alice's Sweet Sensations." Big illustrated prompt: "Picture your ideal customer. Who is this person?" CTA: "I'm thinking... →"

**Step 2 — Customer profile builder.** Heading: "Build your customer profile". Four freeform prompts, each with a text input:
1. "How old are they?" (placeholder: "like, 25-40 year olds?")
2. "Where do they hang out?" (placeholder: "school events, markets, Instagram?")
3. "Why do they want baked goods?" (placeholder: "birthdays, treats for the office, gifts?")
4. "What would make them choose YOU over a shop?" (placeholder: "homemade, personal touch, fun packaging?")

A "Your customer" preview panel updates as they type, building a summary: "Your ideal customer is [age] who [hangs out at X]. They want baked goods for [reason]. They'd choose Alice's Sweet Sensations because [differentiator]."

STAND voice bubble updates once all 4 are filled: "That's a real customer. That's someone you can find and sell to."

CTA: "That's them →" (enabled once all 4 are filled)

**Step 3 — The output.** A "Customer Card" asset:
- Card with amber (#F4A261) background
- "Alice's Customer" as heading
- The four answers formatted as a short profile paragraph
- A "Where to find them" section: based on the hang-out input, suggest 2 real places (simple keyword match: "Instagram" → "Post on Instagram stories", "market" → "Set up at a local market or fair", "school" → "Talk to parents at school pickup", default → "Tell friends and family first")
- "Save this card" button

STAND voice: "Now you know who you're selling to, Alice. That changes everything — your photos, your captions, where you show up. It all targets this person."

CTA: "Complete lesson →" → lesson-complete overlay, 200 XP.

### Lesson: Tell the World (id: launch-plan) — 4 steps

**Step 1 — Hook.** STAND voice: "You built the business. Now people need to know it exists. A launch plan isn't complicated — it's just deciding who you're going to tell, how, and when." Big prompt: "When do you want to launch Alice's Sweet Sensations?" Three option cards (tap to select):
- "This week — I'm ready now!"
- "In 2 weeks — I want to prep first"
- "Next month — I want to do this properly"
CTA unlocks after selection: "Let's plan it →"

**Step 2 — Who to tell first.** Heading: "Start with the people who already love you." A "Warm list" builder: add names in three categories:
- "Family" — text chips, tap + to add names (up to 5)
- "Friends" — text chips, tap + to add names (up to 5)
- "Neighbours / local" — text chips, tap + to add

Running total: "You've got [n] people ready to hear about your launch."

STAND voice: "These are your first customers. Before you go anywhere else, these are the people who want you to succeed."

CTA: "Now for the bigger world →"

**Step 3 — Pick your channels.** Heading: "How will you tell people?" Six channel cards, tap-toggleable:
- 📸 Instagram/TikTok — "Post about your launch"
- 💬 WhatsApp/text — "Message your list directly"
- 📧 Email — "Send a launch email"
- 🏫 School — "Tell people at school"
- 🏘 Local community — "Nextdoor, community groups"
- 🎤 In person — "Tell people face to face"

Must select at least 2 to proceed. Selected cards fill red.

STAND voice reacts to selection count:
- 1 selected: "Pick at least one more — a launch needs a few angles."
- 2–3 selected: "Good mix. That'll reach different people."
- 4+: "You're going big! Make sure you can actually follow through on all of these."

CTA: "Build my plan →"

**Step 4 — The output.** A "Launch Plan" card:
- Purple background (#7B2FBE), white text
- "Alice's Sweet Sensations — Launch Plan"
- Launch date (derived from step 1 selection: "This week" = today + 7 days, "In 2 weeks" = +14, "Next month" = +30)
- "Warm list: [n] people"
- "Channels: [selected channel names]"
- A formatted one-paragraph launch plan: "On [date], Alice's Sweet Sensations launches. First up: [warm list names] hear about it via [channels]. Then [other channels] go live to reach new customers."
- "Save this plan" button

STAND voice: "That's a real launch plan. You know who you're telling, how you're telling them, and when. That's more planning than most adults do."

CTA: "Complete lesson →" → lesson-complete overlay, 250 XP.

## Progress bar section (below the carousel)

A section heading "Your Progress" with three progress bars stacked:
1. Lessons completed — "1 of 10 lessons" — bar at 10% (updates live if lessons completed)
2. Business health score — "Building 🔨" — bar at 35% (amber fill)
3. Days active — "14 days on Stand 🔥" — bar at 14% (treating 100 days as full)

Each bar: cream background, coloured fill, label on left, value on right.

## Other Stand Businesses (social proof widget)

A section below progress: "Other kids on Stand". A horizontal row of 4 business cards (hard-coded mock data):

```js
const OTHER_BUSINESSES = [
  { name: "Jake's Sticker Lab", type: "Stickers", emoji: "🎨", color: "#E63946", sales: 7 },
  { name: "Maya's Jewels", type: "Jewelry", emoji: "💎", color: "#7B2FBE", sales: 3 },
  { name: "Theo's Snack Co", type: "Snacks", emoji: "🍿", color: "#F4A261", sales: 12 },
  { name: "Sofia's Skincare", type: "Skincare", emoji: "✨", color: "#2D9F6E", sales: 5 }
]
```

Each card: emoji large, business name, type tag, "[n] sales" badge. Small cards (150px wide), horizontally scrollable. Non-clickable.

## Micro-interaction rules (apply globally)

- Every tap/click produces a visual response within 150ms
- Buttons scale to 0.96 on mousedown, spring back on release
- Progress bars never jump — always animate (300ms ease-out)
- XP toasts: "+[n] XP" appears bottom-right, slides up, fades out over 1.5s
- The STAND voice bubble (red speech bubble, white text, rounded, "STAND" label) appears at the top of each lesson step. Copy is concise — max 2 sentences.
- No silent saves. Every action that changes state gets a visual confirmation.

## Navigation model

Two views: Dashboard and Lesson. Simple JS router with hash-based routing (`#dashboard`, `#lesson/price-it-right`) so Lauren can deep-link to specific lessons. Back button in lesson header always returns to dashboard. Slide transitions between views.

## Design system

Fonts (first line of `<style>`):

```css
@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@400;700&display=swap');
```

Use the STAND lesson design system (matches the existing lesson prototypes in this repo at `clients/stand/prototypes/customer-feedback/index.html` and `clients/stand/prototypes/goal-setting/index.html` — read these for reference):
- Cream background: `#FFF8E7`
- Red primary: `#E5341A`
- Yellow accent: `#FFD93D`
- Black text: `#1A1A1A`
- Accent palette for lesson cards: as given in the lesson data above
- Bagel Fat One for display headings, buttons, big numbers
- Manrope for body copy, labels, UI chrome
- Caveat for handwritten/encouragement moments
- Mobile-first, content column max-width 480px on mobile; on desktop (1280px+) the dashboard may use a wider centred column (~720–960px) with the same tokens
- Chunky buttons with hard drop shadows (`box-shadow: 0 4px 0 <darker>`), border-radius 16px

## Definition of done

- Dashboard loads and renders fully on desktop (1280px+) and mobile (390px)
- All 3 tasks are checkable, XP updates correctly
- All 10 lesson cards render with correct status badges
- Price It Right: full 3-step interactive flow works including live calculator
- Who's Going to Buy From You: full 3-step flow works
- Tell the World: full 4-step flow works
- Completed lesson returns to dashboard with XP update
- FOR_REVIEW badge visible on find-your-customer and launch-plan cards
- Progress bars render and reflect correct values
- Other businesses widget renders
- No console errors; `node --check` passes on the extracted script block
- File is self-contained (no broken external references except Google Fonts)
