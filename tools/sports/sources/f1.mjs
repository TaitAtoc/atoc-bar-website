import { fetchJSON } from '../lib/http.mjs'

const BASE = 'https://api.openf1.org/v1'

export const SOURCE_NAME = 'openf1'

export async function collectFixtures({ now, daysAhead }) {
  const year = now.getUTCFullYear()
  const windowEnd = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

  const [meetingsRaw, sessionsRaw] = await Promise.all([
    fetchJSON(`${BASE}/meetings?year=${year}`),
    fetchJSON(`${BASE}/sessions?session_type=Race&year=${year}`),
  ])

  const meetingMap = {}
  for (const m of meetingsRaw) meetingMap[m.meeting_key] = m

  const fixtures = []
  for (const s of sessionsRaw) {
    if (s.is_cancelled) continue
    const start = new Date(s.date_start)
    if (start < now || start > windowEnd) continue

    const meeting = meetingMap[s.meeting_key] || {}
    const meetingName = meeting.meeting_name || `${s.country_name} Grand Prix`
    const sessionLabel = s.session_name === 'Race' ? 'Race' : s.session_name

    fixtures.push({
      _sessionKey: s.session_key,
      sport: 'Formula 1',
      league: `Formula 1 — ${meetingName}`,
      startUtc: start.toISOString(),
      displayTitle: `${meetingName} — ${sessionLabel}`,
      homeTeam: null,
      awayTeam: null,
      status: 'Scheduled',
      source: SOURCE_NAME,
    })
  }

  return { fixtures, source: SOURCE_NAME }
}
