import { fetchJSON, dateRange } from '../lib/http.mjs'

export const SOURCE_NAME = 'espn-nba'

const ESPN_NBA = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'

export async function collectFixtures({ now, daysAhead }) {
  const range = dateRange(now, daysAhead)
  const data = await fetchJSON(`${ESPN_NBA}?dates=${range}`)

  const fixtures = []
  for (const event of (data.events || [])) {
    const comp = event.competitions?.[0]
    if (!comp) continue

    const start = new Date(event.date)
    if (start < now) continue

    const homeComp = comp.competitors?.find(c => c.homeAway === 'home')
    const awayComp = comp.competitors?.find(c => c.homeAway === 'away')
    const homeTeam = homeComp?.team?.displayName
    const awayTeam = awayComp?.team?.displayName
    if (!homeTeam || !awayTeam) continue

    fixtures.push({
      sport: 'Basketball',
      league: `NBA ${now.getUTCFullYear()}`,
      startUtc: start.toISOString(),
      homeTeam,
      awayTeam,
      status: 'Scheduled',
      source: SOURCE_NAME,
    })
  }

  if (fixtures.length === 0) {
    console.log('[nba] No upcoming events found (off-season Jun–Oct).')
  }

  return { fixtures, source: SOURCE_NAME }
}
