import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { dedupKey } from './lib/dedup-key.mjs'
import { validateAll } from './validate-fixtures.mjs'

import * as f1      from './sources/f1.mjs'
import * as afl     from './sources/afl.mjs'
import * as football from './sources/football.mjs'
import * as nfl     from './sources/nfl.mjs'
import * as nba     from './sources/nba.mjs'
import * as nrl     from './sources/nrl.mjs'
import * as rugby   from './sources/rugby.mjs'
import * as tennis  from './sources/tennis.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SOURCES = [
  { key: 'f1',       mod: f1 },
  { key: 'afl',      mod: afl },
  { key: 'football', mod: football },
  { key: 'nfl',      mod: nfl },
  { key: 'nba',      mod: nba },
  { key: 'nrl',      mod: nrl },
  { key: 'rugby',    mod: rugby },
  { key: 'tennis',   mod: tennis },
]

const DAYS_AHEAD = 7

async function main() {
  const now = new Date()
  console.log(`\n[collect-fixtures] Starting collection — ${now.toISOString()}`)
  console.log(`[collect-fixtures] Window: next ${DAYS_AHEAD} days\n`)

  const ctx = { now, daysAhead: DAYS_AHEAD }
  const statusSources = {}
  const allLive = []

  const results = await Promise.allSettled(
    SOURCES.map(({ key, mod }) =>
      mod.collectFixtures(ctx).then(r => ({ key, ...r }))
    )
  )

  for (let i = 0; i < SOURCES.length; i++) {
    const { key } = SOURCES[i]
    const result = results[i]

    if (result.status === 'fulfilled') {
      const { fixtures = [], note } = result.value
      statusSources[key] = {
        status: fixtures.length === 0 && note ? 'manual' : 'ok',
        events: fixtures.length,
        ...(note ? { note } : {}),
      }
      console.log(`  [${key}] ${fixtures.length} fixtures collected`)
      allLive.push(...fixtures)
    } else {
      statusSources[key] = { status: 'error', events: 0, error: result.reason?.message || String(result.reason) }
      console.error(`  [${key}] FAILED: ${result.reason?.message || result.reason}`)
    }
  }

  const { valid, invalid } = validateAll(allLive)
  const warnings = invalid.map(({ fixture, errors }) =>
    `[${fixture.sport || 'unknown'}] ${errors.join('; ')}`
  )
  if (warnings.length > 0) {
    console.warn(`\n[collect-fixtures] ${warnings.length} invalid fixtures dropped:`)
    warnings.forEach(w => console.warn(`  ${w}`))
  }

  if (valid.length === 0 && Object.values(statusSources).every(s => s.status === 'error')) {
    console.error('\n[collect-fixtures] All sources failed — not writing live-fixtures.json')
    process.exit(1)
  }

  const outPath = resolve(__dirname, 'live-fixtures.json')
  writeFileSync(outPath, JSON.stringify(valid, null, 2), 'utf8')
  console.log(`\n[collect-fixtures] Wrote ${valid.length} fixtures to live-fixtures.json`)

  const totalLive = Object.values(statusSources).reduce((n, s) => n + (s.events || 0), 0)

  let manualCount = 0
  try {
    const raw = JSON.parse(readFileSync(resolve(__dirname, 'raw-fixtures.json'), 'utf8'))
    manualCount = Array.isArray(raw) ? raw.length : 0
  } catch {}

  const status = {
    generatedAt: now.toISOString(),
    daysAhead: DAYS_AHEAD,
    sources: statusSources,
    totalLive,
    manualCount,
    mergedTotal: valid.length + manualCount,
    warnings,
  }

  writeFileSync(resolve(__dirname, 'collector-status.json'), JSON.stringify(status, null, 2), 'utf8')
  console.log('[collect-fixtures] Wrote collector-status.json\n')
}

main().catch(err => {
  console.error('[collect-fixtures] Fatal:', err)
  process.exit(1)
})
