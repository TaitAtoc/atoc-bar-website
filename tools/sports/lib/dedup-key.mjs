function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function utcDateOnly(startUtc) {
  return new Date(startUtc).toISOString().slice(0, 10)
}

// Stable key for deduplication across live (collected) and manual fixtures.
// Uses displayTitle for single-entity events (F1, tennis) so that a manual
// entry with the same displayTitle as a live entry will correctly overwrite it.
export function dedupKey(fixture) {
  const sport = slugify(fixture.sport)
  const date = utcDateOnly(fixture.startUtc)

  if (fixture.homeTeam && fixture.awayTeam) {
    return `${sport}-${date}-${slugify(fixture.homeTeam)}-vs-${slugify(fixture.awayTeam)}`
  }

  const title = fixture.displayTitle || fixture.teams || fixture.league || fixture.sport
  return `${sport}-${date}-${slugify(title)}`
}
