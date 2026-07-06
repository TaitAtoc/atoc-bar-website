import { fetchJSON } from '../lib/http.mjs'

export const SOURCE_NAME = 'squiggle'

export async function collectFixtures({ now, daysAhead }) {
  const year = now.getUTCFullYear()
  const windowEnd = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

  const data = await fetchJSON(
    `https://api.squiggle.com.au/?q=games;year=${year};complete=0`,
    { headers: { 'User-Agent': 'ATOC-Sports-Collector/1.0' } }
  )

  const fixtures = []
  for (const g of (data.games || [])) {
    if (!g.unixtime) continue
    const start = new Date(Number(g.unixtime) * 1000)
    if (start < now || start > windowEnd) continue

    fixtures.push({
      sport: 'AFL',
      league: `AFL — ${g.roundname || 'Season'}`,
      startUtc: start.toISOString(),
      homeTeam: g.hteam,
      awayTeam: g.ateam,
      status: 'Scheduled',
      source: SOURCE_NAME,
    })
  }

  return { fixtures, source: SOURCE_NAME }
}
