const VALID_SPORTS = ['Rugby', 'Football', 'AFL', 'NRL', 'NFL', 'Tennis', 'Formula 1', 'Basketball']

export function validateFixture(f) {
  const errors = []
  if (!f.sport) errors.push('missing sport')
  else if (!VALID_SPORTS.includes(f.sport)) errors.push(`unknown sport "${f.sport}" — must be one of: ${VALID_SPORTS.join(', ')}`)
  if (!f.startUtc) errors.push('missing startUtc')
  else if (isNaN(new Date(f.startUtc).getTime())) errors.push(`invalid startUtc: "${f.startUtc}"`)
  if (!f.league) errors.push('missing league')
  if (!f.homeTeam && !f.awayTeam && !f.displayTitle && !f.teams) {
    errors.push('missing team/title info: provide homeTeam+awayTeam, or displayTitle, or teams')
  }
  return errors
}

export function validateAll(fixtures) {
  const valid = []
  const invalid = []
  for (const f of fixtures) {
    const errors = validateFixture(f)
    if (errors.length === 0) valid.push(f)
    else invalid.push({ fixture: f, errors })
  }
  return { valid, invalid }
}

if (process.argv[1] === new URL(import.meta.url).pathname.replace(/\//g, '\\').replace(/^\\/, '')) {
  const { createRequire } = await import('module')
  const { readFileSync } = await import('fs')
  const { fileURLToPath } = await import('url')
  const { dirname, resolve } = await import('path')

  const __dirname = dirname(fileURLToPath(import.meta.url))
  const raw = JSON.parse(readFileSync(resolve(__dirname, 'raw-fixtures.json'), 'utf8'))

  const { valid, invalid } = validateAll(raw)
  console.log(`raw-fixtures.json: ${valid.length} valid, ${invalid.length} invalid`)
  for (const { fixture, errors } of invalid) {
    console.error(`  INVALID: ${JSON.stringify(fixture)}`)
    for (const e of errors) console.error(`    - ${e}`)
  }

  let live = []
  try {
    live = JSON.parse(readFileSync(resolve(__dirname, 'live-fixtures.json'), 'utf8'))
    const { valid: lv, invalid: li } = validateAll(live)
    console.log(`live-fixtures.json: ${lv.length} valid, ${li.length} invalid`)
    for (const { fixture, errors } of li) {
      console.error(`  INVALID: ${JSON.stringify(fixture)}`)
      for (const e of errors) console.error(`    - ${e}`)
    }
  } catch {
    console.log('live-fixtures.json: not found (run npm run collect:sports)')
  }

  process.exit(invalid.length > 0 ? 1 : 0)
}
