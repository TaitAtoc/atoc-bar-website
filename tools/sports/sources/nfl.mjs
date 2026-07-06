import { fetchJSON, dateRange } from '../lib/http.mjs'

export const SOURCE_NAME = 'espn-nfl'

const ESPN_NFL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'

export async function collectFixtures({ now, daysAhead }) {
  const range = dateRange(now, daysAhead)
  const data = await fetchJSON(`${ESPN_NFL}?dates=${range}`)

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

    const seasonYear = data.leagues?.[0]?.season?.year || now.getUTCFullYear()

    fixtures.push({
      sport: 'NFL',
      league: `NFL ${seasonYear}`,
      startUtc: start.toISOString(),
      homeTeam,
      awayTeam,
      status: 'Scheduled',
      source: SOURCE_NAME,
    })
  }

  if (fixtures.length === 0) {
    const startDate = data.leagues?.[0]?.season?.startDate
    if (startDate) {
      console.log(`[nfl] Off-season. Next season starts ${startDate.slice(0, 10)}.`)
    }
  }

  return { fixtures, source: SOURCE_NAME }
}
