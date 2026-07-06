/**
 * build-sports-schedule.mjs
 * ─────────────────────────────────────────────────────────────────
 * Phase 1D sports schedule build script.
 *
 * Reads:   tools/sports/verified-fixtures.json  (from verify-fixtures.mjs — preferred)
 *          tools/sports/live-fixtures.json       (fallback if verified not found)
 *          tools/sports/raw-fixtures.json        (manual fallback only, all assumed verified)
 * Writes:  public/data/sports-schedule.json
 *
 * Run:     npm run update:sports   (collect + verify + build — recommended)
 *          npm run build:sports    (build from last verified output)
 *
 * What it does
 * ─────────────
 * 1. Reads verified fixtures (pre-checked by verify-fixtures.mjs)
 * 2. Derives: startChina, dateLabel, timeLabel, teams, displayTitle, id
 * 3. Filters: next 7 days from now (UTC)
 * 4. Filters: ATOC opening hours 5 pm–3 am China time (minutes >= 1020 || < 180)
 * 5. Sorts: soonest first
 * 6. Writes clean JSON to public/data/sports-schedule.json (no _internal fields)
 *
 * No external dependencies — Node.js built-ins only.
 * ─────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { dedupKey } from './lib/dedup-key.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

const VERIFIED_PATH = resolve(__dirname, 'verified-fixtures.json')
const LIVE_PATH     = resolve(__dirname, 'live-fixtures.json')
const RAW_PATH      = resolve(__dirname, 'raw-fixtures.json')
const OUTPUT_PATH   = resolve(ROOT, 'public', 'data', 'sports-schedule.json')

const CHINA_OFFSET_MS = 8 * 60 * 60 * 1000  // UTC+8

// ── Helpers ──────────────────────────────────────────────────────────────────

function toChinaLocal(utcDate) {
  const ts = utcDate.getTime() + CHINA_OFFSET_MS
  const d  = new Date(ts)
  return {
    year:   d.getUTCFullYear(),
    month:  d.getUTCMonth(),
    day:    d.getUTCDate(),
    hour:   d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
  }
}

function toISOChina(c) {
  const pad = (n, w = 2) => String(n).padStart(w, '0')
  return `${c.year}-${pad(c.month + 1)}-${pad(c.day)}T${pad(c.hour)}:${pad(c.minute)}:${pad(c.second)}+08:00`
}

function toDateLabel(c) {
  const utcEquiv = new Date(Date.UTC(c.year, c.month, c.day))
  return utcEquiv.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

function toTimeLabel(c) {
  const h    = c.hour
  const m    = c.minute
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12  = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function isWithinOpeningHours(c) {
  const mins = c.hour * 60 + c.minute
  // Opening window: 17:00–03:00 China time (inclusive of 03:00 exactly)
  return mins >= 17 * 60 || mins <= 3 * 60
}

function deriveTeams(raw) {
  if (raw.teams) return raw.teams
  if (raw.sport === 'Formula 1') return 'N/A'
  if (raw.homeTeam && raw.awayTeam) return `${raw.homeTeam} vs ${raw.awayTeam}`
  return raw.displayTitle || raw.sport
}

function deriveDisplayTitle(raw) {
  if (raw.displayTitle) return raw.displayTitle
  if (raw.homeTeam && raw.awayTeam) return `${raw.homeTeam} vs ${raw.awayTeam}`
  return raw.league || raw.sport
}

function makeId(sport, utcDate, seq) {
  const slug = sport.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const dateStr = utcDate.toISOString().slice(0, 10)
  return `${slug}-${dateStr}-${String(seq).padStart(3, '0')}`
}

// ── Read fixtures (verified preferred, fallback for standalone runs) ───────────

let merged = []

if (existsSync(VERIFIED_PATH)) {
  const verified = JSON.parse(readFileSync(VERIFIED_PATH, 'utf-8'))
  console.log(`[build] Read ${verified.length} verified fixtures from verified-fixtures.json`)
  merged = verified
} else {
  // Fallback: verification was skipped — merge live + raw with a warning
  console.warn('[build] ⚠ verified-fixtures.json not found — run npm run verify:sports for full pipeline')
  console.warn('[build] ⚠ Building from live + manual without verification checks\n')

  const raw = JSON.parse(readFileSync(RAW_PATH, 'utf-8'))
  let live = []
  try {
    live = JSON.parse(readFileSync(LIVE_PATH, 'utf-8'))
    console.log(`[build] Read ${live.length} live fixtures from live-fixtures.json`)
  } catch {
    console.log('[build] live-fixtures.json not found — using manual fixtures only')
  }

  const fixtureMap = new Map()
  for (const f of live) fixtureMap.set(dedupKey(f), f)
  for (const f of raw)  fixtureMap.set(dedupKey(f), f)
  merged = [...fixtureMap.values()]
  console.log(`[build] Merged ${live.length} live + ${raw.length} manual = ${merged.length} unique fixtures`)
}

// ── Main ─────────────────────────────────────────────────────────────────────

const now = new Date()
const windowEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
const generatedAt = new Date().toISOString()

const idCounters = {}

const events = merged
  .map(fixture => {
    const startUtc = new Date(fixture.startUtc)
    const china    = toChinaLocal(startUtc)
    return { _startUtc: startUtc, _china: china, _raw: fixture }
  })
  .filter(({ _startUtc }) => _startUtc >= now && _startUtc <= windowEnd)
  .filter(({ _china }) => isWithinOpeningHours(_china))
  .sort((a, b) => a._startUtc - b._startUtc)
  .map(({ _startUtc, _china, _raw }) => {
    const dateStr = _startUtc.toISOString().slice(0, 10)
    const key     = `${_raw.sport}-${dateStr}`
    idCounters[key] = (idCounters[key] || 0) + 1

    const trustedAdapter = String(_raw._verifiedReason || '').startsWith('trusted-adapter:')
    return {
      id:           makeId(_raw.sport, _startUtc, idCounters[key]),
      sport:        _raw.sport,
      league:       _raw.league || _raw.sport,
      startUtc:     _startUtc.toISOString(),
      startChina:   toISOChina(_china),
      dateLabel:    toDateLabel(_china),
      timeLabel:    toTimeLabel(_china),
      homeTeam:     _raw.homeTeam   || null,
      awayTeam:     _raw.awayTeam   || null,
      displayTitle: deriveDisplayTitle(_raw),
      teams:        deriveTeams(_raw),
      status:       _raw.status || 'Scheduled',
      source:       _raw.source || 'manual',
      ...(trustedAdapter ? {
        kickoffUtcIso:        _startUtc.toISOString(),
        sourceUrlOrSourceName: `${_raw.source} live feed`,
        verifiedAt:           generatedAt,
        timeConfidence:       'trusted',
      } : {}),
    }
  })

const output = {
  generatedAt,
  timezone:     'Asia/Shanghai',
  daysAhead:    7,
  openingHours: '17:00-03:00',
  source:       'build-sports-schedule',
  events,
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')

console.log(`\n✓ Wrote ${events.length} event(s) to public/data/sports-schedule.json`)
if (events.length === 0) {
  console.warn('  ⚠ No events passed the 7-day window + opening-hours filter.')
  console.warn('    Check that fixtures exist within the next 7 days, 5 pm–3 am China time.')
}
events.forEach(e => {
  console.log(`  · [${e.sport.padEnd(10)}] ${e.dateLabel} ${e.timeLabel}  ${e.displayTitle}`)
})
