# Client workspace

A lightweight, password-gated area for sharing in-progress prototypes with named clients.

## How it works

- `clients/index.html` — Login page. Asks for email + passphrase.
- `clients/auth.js` — Shared helpers: PBKDF2-SHA256 (200k iterations) over the password, with the email as salt. Compares against the hash stored in `hashes.json`.
- `clients/hashes.json` — Map of `email → { slug, name, org, hash }`. The hash is what's checked; the plaintext password is never stored.
- `clients/<slug>/` — One folder per client. Contains an `index.html` that calls `LudisAuth.requireSession('<slug>')` at the top of its `<script>` block — if the visitor isn't authed for that slug, they're bounced back to the login page.

Session lasts 12 hours and lives in `sessionStorage` (clears when the tab closes or 12 hours pass, whichever is first).

## Security model — be honest

This is a static site. Everything we ship is technically visible to anyone who knows where to look. The protections are:

1. **PBKDF2 with 200k iterations** makes brute-forcing each candidate password slow (~250ms per guess).
2. **Per-email salt** means rainbow tables don't help.
3. **`noindex,nofollow`** meta tags + `robots.txt` keep all this out of search engines.
4. **`sessionStorage` (not localStorage)** so credentials don't linger across tabs/sessions.

This is appropriate for keeping prototypes private from casual browsers and search engines. It is **not** appropriate for anything truly confidential (NDAs, financial data, PII). For that, you'd want a real backend.

## Adding a new client

1. Generate the hash. From the repo root:

   ```bash
   node -e "
     const c = require('crypto');
     const email = process.argv[1].toLowerCase().trim();
     const password = process.argv[2];
     const hash = c.pbkdf2Sync(password, email, 200000, 32, 'sha256').toString('hex');
     console.log(JSON.stringify({ email, hash }, null, 2));
   " '<their-email>' '<their-passphrase>'
   ```

2. Add the entry to `clients/hashes.json`:

   ```json
   "their-email@example.com": {
     "slug": "their-org-slug",
     "name": "Their First Name",
     "org": "Their Org",
     "hash": "<the hex hash from step 1>"
   }
   ```

3. Duplicate the `clients/stand/` folder to `clients/<their-org-slug>/` and update:
   - The `<title>` and any text that mentions "Stand"
   - The `requireSession('stand')` call → `requireSession('<their-org-slug>')`
   - The hero/notes content

4. Commit, push. GitHub Pages redeploys automatically.

5. Share the email + passphrase with them out-of-band (phone, in person, signal — not over email-to-the-same-inbox).

## Adding a prototype to an existing client

1. Drop the prototype files into `clients/<slug>/prototypes/<prototype-name>/`. It can be a single `index.html` or a folder of static assets.

2. Open `clients/<slug>/index.html`, find the `<div class="prototypes-grid">` and add a card:

   ```html
   <div class="proto-card">
     <span class="proto-tag">v0.1 · Draft</span>
     <h3 class="proto-title">Onboarding flow</h3>
     <p class="proto-desc">First pass at parent-onboarding screens.</p>
     <div class="proto-meta">
       <span>Updated 14 May</span>
       <a class="proto-open" href="./prototypes/onboarding-v01/">Open</a>
     </div>
   </div>
   ```

3. The empty-state block will auto-hide once there's at least one `.proto-card` in the grid.
