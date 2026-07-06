/**
 * verify-fixtures.mjs
 * ─────────────────────────────────────────────────────────────────
 * Fixture verification layer for the ATOC Sports Schedule pipeline.
 *
 * Reads:   tools/sports/live-fixtures.json   (from collect-fixtures.mjs)
 *          tools/sports/raw-fixtures.json     (manual entries)
 * Writes:  tools/sports/verified-fixtures.json   — safe to publish
 *          tools/sports/verification-status.json  — audit trail
 *
 * Verification rules:
 *   LIVE fixtures  — auto-trusted if source is a known adapter (see TRUSTED_SOURCES)
 *   MANUAL fixtures — must have at least one of:
 *                     sourceUrl, sourceName, verified:true,
 *                     manuallyVerifiedAt, manuallyVerifiedBy
 *
 * Unverified manual fixtures are quarantined:
 *   - excluded from verified-fixtures.json
 *   - logged in verification-status.json
 *   - if a live version with the same dedup key exists, the live version is kept
 *
 * Run:  node tools/sports/verify-fixtures.mjs
 *       npm run verify:sports
 * ─────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { dedupKey } from './lib/dedup-key.mjs'
import { validateFixture } from './validate-fixtures.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const LIVE_PATH     = resolve(__dirname, 'live-fixtures.json')
const RAW_PATH      = resolve(__dirname, 'raw-fixtures.json')
const VERIFIED_OUT  = resolve(__dirname, 'verified-fixtures.json')
const STATUS_OUT    = resolve(__dirname, 'verification-status.json')

// Adapter sources that are auto-trusted without additional metadata.
// These are populated by known working adapters in tools/sports/sources/.
const TRUSTED_SOURCES = [
  'openf1',
  'squiggle',
  'espn-soccer',
  'espn-nfl',
  'espn-nba',
]

function isAdapterTrusted(source) {
  if (!source) return false
  return TRUSTED_SOURCES.some(s => source === s || source.startsWith(s + '-'))
}

function verifyFixture(fixture) {
  const { source } = fixture

  // Adapter-sourced fixtures: auto-trusted
  if (source !== 'manual' && isAdapterTrusted(source)) {
    return { passed: true, reason: `trusted-adapter:${source}` }
  }

  // Manual fixtures: need at least one verification field
  if (source === 'manual') {
    if (
      fixture.sourceUrl ||
      fixture.sourceName ||
      fixture.verified === true ||
      fixture.manuallyVerifiedAt ||
      fixture.manuallyVerifiedBy
    ) {
      const meta = fixture.sourceName || fixture.sourceUrl || fixture.manuallyVerifiedBy || 'manual-verified'
      return { passed: true, reason: `manual-verified:${meta}` }
    }
    return {
      passed: false,
      reason: 'manual-unverified',
      detail: 'Missing verification. Add at least one field to raw-fixtures.json: sourceUrl, sourceName, "verified": true, manuallyVerifiedAt, or manuallyVerifiedBy',
    }
  }

  // Unknown source (future adapter not yet in TRUSTED_SOURCES)
  console.warn(`[verify] ⚠ Unknown source "${source}" — allowed but not in TRUSTED_SOURCES list`)
  return { passed: true, reason: `unknown-source:${source}` }
}

// ── Read inputs ───────────────────────────────────────────────────────────────

const now = new Date()
console.log(`\n[verify] Starting verification — ${now.toISOString()}\n`)

let live = []
try {
  live = JSON.parse(readFileSync(LIVE_PATH, 'utf8'))
  console.log(`[verify] Read ${live.length} live fixtures from live-fixtures.json`)
} catch {
  console.warn('[verify] live-fixtures.json not found — run npm run collect:sports first')
  console.warn('[verify] Proceeding with manual fixtures only\n')
}

const raw = JSON.parse(readFileSync(RAW_PATH, 'utf8'))
console.log(`[verify] Read ${raw.length} manual fixtures from raw-fixtures.json`)

// ── Schema validation ─────────────────────────────────────────────────────────

const schemaErrors = []
for (const f of [...live, ...raw]) {
  const errors = validateFixture(f)
  if (errors.length > 0) schemaErrors.push({ fixture: f, errors })
}
if (schemaErrors.length > 0) {
  console.warn(`\n[verify] ${schemaErrors.length} fixture(s) have schema errors (will still be checked):`)
  for (const { fixture, errors } of schemaErrors) {
    const label = fixture.homeTeam ? `${fixture.homeTeam} vs ${fixture.awayTeam}` : (fixture.displayTitle || fixture.league || '?')
    console.warn(`  [${fixture.sport || '?'}] ${label}: ${errors.join('; ')}`)
  }
}

// ── Build merged verified map ─────────────────────────────────────────────────

// Strategy:
//  1. Insert live fixtures into map (all trusted → all go in)
//  2. Insert verified manual fixtures → override live on same key (manual is authoritative when verified)
//  3. Unverified manual → quarantined, do NOT override live

const fixtureMap = new Map()
const quarantined = []

for (const f of live) {
  const result = verifyFixture(f)
  if (result.passed) {
    fixtureMap.set(dedupKey(f), { ...f, _verifiedReason: result.reason })
  } else {
    quarantined.push({ fixture: f, ...result })
  }
}

for (const f of raw) {
  const result = verifyFixture(f)
  if (result.passed) {
    fixtureMap.set(dedupKey(f), { ...f, _verifiedReason: result.reason })
  } else {
    const liveAlternativeExists = fixtureMap.has(dedupKey(f))
    quarantined.push({
      fixture: f,
      ...result,
      liveAlternativeExists,
      recommendation: 'Add at least one to raw-fixtures.json: "sourceName": "<Official Source Name>" OR "sourceUrl": "<https://...>"',
    })
    const label = f.homeTeam ? `${f.homeTeam} vs ${f.awayTeam}` : (f.displayTitle || f.league || f.sport)
    const note = liveAlternativeExists ? ' (live version kept)' : ' (no live alternative — will not appear in schedule)'
    console.warn(`[verify] ✗ QUARANTINED [${f.sport}] ${label}${note}`)
  }
}

const verifiedList = [...fixtureMap.values()]

// ── Write outputs ─────────────────────────────────────────────────────────────

writeFileSync(VERIFIED_OUT, JSON.stringify(verifiedList, null, 2), 'utf8')
console.log(`\n[verify] ✓ Wrote ${verifiedList.length} verified fixtures → verified-fixtures.json`)

const statusReport = {
  generatedAt: now.toISOString(),
  summary: {
    liveFixtures: live.length,
    manualFixtures: raw.length,
    totalChecked: live.length + raw.length,
    verified: verifiedList.length,
    quarantined: quarantined.length,
    schemaErrors: schemaErrors.length,
  },
  quarantined: quarantined.map(q => ({
    sport: q.fixture.sport,
    displayTitle: q.fixture.homeTeam
      ? `${q.fixture.homeTeam} vs ${q.fixture.awayTeam}`
      : (q.fixture.displayTitle || q.fixture.league),
    startUtc: q.fixture.startUtc,
    source: q.fixture.source,
    reason: q.reason,
    detail: q.detail || null,
    liveAlternativeExists: q.liveAlternativeExists || false,
    recommendation: q.recommendation || null,
  })),
  trustedSources: TRUSTED_SOURCES,
  manualVerificationFields: ['sourceUrl', 'sourceName', 'verified (boolean true)', 'manuallyVerifiedAt', 'manuallyVerifiedBy'],
}

writeFileSync(STATUS_OUT, JSON.stringify(statusReport, null, 2), 'utf8')
console.log('[verify] ✓ Wrote verification-status.json')

if (quarantined.length > 0) {
  console.log(`\n[verify] ${quarantined.length} fixture(s) quarantined. To unquarantine, add to raw-fixtures.json:`)
  console.log('  "sourceName": "Official Source Name"')
  console.log('  "sourceUrl": "https://official-source.com/fixtures"\n')
}
