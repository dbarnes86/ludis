/* Ludis client-area auth.
 *
 * Threat model — be honest about it:
 *   This is a static site, so anything we ship is visible. The hashes.json
 *   file is fetched by every visitor; the real protection is that PBKDF2
 *   (200k iterations) makes brute-forcing each candidate password slow,
 *   and that prototype files live in unguessable folders. Treat this as
 *   "keep prototypes out of search engines and casual snooping," not as
 *   bank-grade auth. Do not store anything sensitive in a client area.
 */

const PBKDF2_ITERATIONS = 200000;
const KEY_LEN_BITS = 256;

/** Compute the PBKDF2-SHA256 hash of (password) with (email) as salt. Returns hex. */
async function hashCredentials(email, password) {
  const enc = new TextEncoder();
  const normEmail = email.trim().toLowerCase();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(normEmail),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LEN_BITS
  );
  return Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Constant-time string compare. */
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Try to log in. Returns the matching client record on success, null on failure. */
async function tryLogin(email, password) {
  const res = await fetch('/clients/hashes.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load client list.');
  const data = await res.json();
  const normEmail = email.trim().toLowerCase();
  const record = data.clients[normEmail];
  if (!record) {
    // Still do the work to avoid leaking which emails exist via timing.
    await hashCredentials(normEmail, password);
    return null;
  }
  const computed = await hashCredentials(normEmail, password);
  if (!safeEqual(computed, record.hash)) return null;
  return { email: normEmail, ...record };
}

/** Mark the current session as logged in for a given client slug. */
function setSession(record) {
  sessionStorage.setItem(
    'ludis.client',
    JSON.stringify({
      slug: record.slug,
      email: record.email,
      name: record.name,
      org: record.org,
      ts: Date.now(),
    })
  );
}

/** Read the current session, or null if absent / mismatched / expired. */
function getSession(expectedSlug) {
  const raw = sessionStorage.getItem('ludis.client');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (expectedSlug && parsed.slug !== expectedSlug) return null;
    // 12-hour soft expiry
    if (Date.now() - parsed.ts > 12 * 60 * 60 * 1000) {
      sessionStorage.removeItem('ludis.client');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem('ludis.client');
}

/** Guard a client-area page. Call this at the top of each gated page's <script>.
 *  If the visitor isn't authed for `expectedSlug`, sends them to the login page. */
function requireSession(expectedSlug) {
  const session = getSession(expectedSlug);
  if (!session) {
    // Preserve where they were trying to go.
    const next = encodeURIComponent(location.pathname + location.search);
    location.replace('/clients/?next=' + next);
    return null;
  }
  return session;
}

window.LudisAuth = {
  tryLogin,
  setSession,
  getSession,
  clearSession,
  requireSession,
  hashCredentials, // exported for the one-off "generate a new client hash" tool
};
