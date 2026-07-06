import { fetchJSON, dateRange } from '../lib/http.mjs'

export const SOURCE_NAME = 'espn-soccer'

const LEAGUES = [
  { slug: 'fifa.world', name: 'FIFA World Cup' },
  { slug: 'eng.1',     name: 'Premier League' },
  { slug: 'aus.1',     name: 'A-League' },
]

const ESPN_SOCCER = 'https://site.api.espn.com/apis/site/v2/sports/soccer'

export async function collectFixtures({ now, daysAhead }) {
  const range = dateRange(now, daysAhead)
  const fixtures = []

  for (const league of LEAGUES) {
    try {
      const data = await fetchJSON(`${ESPN_SOCCER}/${league.slug}/scoreboard?dates=${range}`)

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

        const statusDesc = comp.status?.type?.description || 'Scheduled'

        fixtures.push({
          sport: 'Football',
          league: league.name,
          startUtc: start.toISOString(),
          homeTeam,
          awayTeam,
          status: statusDesc === 'Scheduled' || comp.status?.type?.name === 'STATUS_SCHEDULED'
            ? 'Scheduled'
            : statusDesc,
          source: `${SOURCE_NAME}-${league.slug}`,
        })
      }
    } catch (err) {
      console.warn(`[football] ${league.slug} failed: ${err.message}`)
    }
  }

  return { fixtures, source: SOURCE_NAME }
}
