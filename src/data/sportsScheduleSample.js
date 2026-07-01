/**
 * sportsScheduleSample.js
 * ─────────────────────────────────────────────────────────────────
 * Sample sports schedule data for SportsScheduleWidget v0.
 *
 * HOW n8n REPLACES THIS
 * ─────────────────────
 * n8n writes a fresh copy of this shape to:
 *   public/data/sports-schedule.json
 * The widget component switches from this static import to a
 * fetch('/data/sports-schedule.json') call at that point.
 * See: docs/sports-schedule-widget-plan.md
 *
 * All times are stored as UTC ISO-8601 strings.
 * The widget displays China Standard Time (UTC+8 / Asia/Shanghai).
 * ─────────────────────────────────────────────────────────────────
 */

export const schedule = {
  generatedAt: '2026-06-26T08:00:00Z',
  timezone: 'Asia/Shanghai',
  daysAhead: 7,
  source: 'sample',

  events: [

    // ── NRL ──────────────────────────────────────────────────────
    {
      id: 'nrl-001',
      sport: 'NRL',
      league: 'NRL — Round 18',
      startUtc: '2026-06-26T11:50:00Z',
      startChina: '2026-06-26T19:50:00+08:00',
      dateLabel: 'Thu 26 Jun',
      timeLabel: '7:50 PM',
      homeTeam: 'Brisbane Broncos',
      awayTeam: 'Sydney Roosters',
      displayTitle: 'Broncos vs Roosters',
      teams: 'Brisbane Broncos vs Sydney Roosters',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── AFL ──────────────────────────────────────────────────────
    {
      id: 'afl-001',
      sport: 'AFL',
      league: 'AFL — Round 17',
      startUtc: '2026-06-27T11:20:00Z',
      startChina: '2026-06-27T19:20:00+08:00',
      dateLabel: 'Sat 27 Jun',
      timeLabel: '7:20 PM',
      homeTeam: 'Collingwood',
      awayTeam: 'Carlton',
      displayTitle: 'Collingwood vs Carlton',
      teams: 'Collingwood vs Carlton',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Rugby ────────────────────────────────────────────────────
    {
      id: 'rugby-001',
      sport: 'Rugby',
      league: 'International Rugby',
      startUtc: '2026-06-27T12:35:00Z',
      startChina: '2026-06-27T20:35:00+08:00',
      dateLabel: 'Sat 27 Jun',
      timeLabel: '8:35 PM',
      homeTeam: 'South Africa',
      awayTeam: 'British & Irish Lions',
      displayTitle: 'South Africa vs British & Irish Lions',
      teams: 'South Africa vs British & Irish Lions',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Formula 1 ─────────────────────────────────────────────────
    {
      id: 'f1-001',
      sport: 'Formula 1',
      league: 'Formula 1 — Austrian Grand Prix',
      startUtc: '2026-06-28T13:00:00Z',
      startChina: '2026-06-28T21:00:00+08:00',
      dateLabel: 'Sun 28 Jun',
      timeLabel: '9:00 PM',
      homeTeam: null,
      awayTeam: null,
      displayTitle: 'Austrian Grand Prix — Race',
      teams: 'N/A',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Tennis ───────────────────────────────────────────────────
    {
      id: 'tennis-001',
      sport: 'Tennis',
      league: 'Wimbledon — Round 1',
      startUtc: '2026-06-29T11:00:00Z',
      startChina: '2026-06-29T19:00:00+08:00',
      dateLabel: 'Mon 29 Jun',
      timeLabel: '7:00 PM',
      homeTeam: null,
      awayTeam: null,
      displayTitle: 'Wimbledon Opens — Day 1',
      teams: 'Multiple matches · Centre Court TBC',
      status: 'Scheduled',
      source: 'sample',
    },
    {
      id: 'tennis-002',
      sport: 'Tennis',
      league: 'Wimbledon — Round 1',
      startUtc: '2026-06-30T11:30:00Z',
      startChina: '2026-06-30T19:30:00+08:00',
      dateLabel: 'Tue 30 Jun',
      timeLabel: '7:30 PM',
      homeTeam: null,
      awayTeam: null,
      displayTitle: 'Wimbledon — Day 2',
      teams: 'Multiple matches · Courts TBC',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Football ─────────────────────────────────────────────────
    {
      id: 'football-001',
      sport: 'Football',
      league: 'International Friendly',
      startUtc: '2026-07-01T11:00:00Z',
      startChina: '2026-07-01T19:00:00+08:00',
      dateLabel: 'Wed 1 Jul',
      timeLabel: '7:00 PM',
      homeTeam: 'Australia',
      awayTeam: 'Japan',
      displayTitle: 'Australia vs Japan',
      teams: 'Australia vs Japan',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Basketball ───────────────────────────────────────────────
    {
      id: 'basketball-001',
      sport: 'Basketball',
      league: 'NBL Australia — Round 1',
      startUtc: '2026-07-02T10:00:00Z',
      startChina: '2026-07-02T18:00:00+08:00',
      dateLabel: 'Thu 2 Jul',
      timeLabel: '6:00 PM',
      homeTeam: 'Illawarra Hawks',
      awayTeam: 'Sydney Kings',
      displayTitle: 'Hawks vs Kings',
      teams: 'Illawarra Hawks vs Sydney Kings',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── NRL second fixture ────────────────────────────────────────
    {
      id: 'nrl-002',
      sport: 'NRL',
      league: 'NRL — Round 18',
      startUtc: '2026-06-28T11:00:00Z',
      startChina: '2026-06-28T19:00:00+08:00',
      dateLabel: 'Sun 28 Jun',
      timeLabel: '7:00 PM',
      homeTeam: 'Melbourne Storm',
      awayTeam: 'Penrith Panthers',
      displayTitle: 'Storm vs Panthers',
      teams: 'Melbourne Storm vs Penrith Panthers',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── AFL second fixture ────────────────────────────────────────
    {
      id: 'afl-002',
      sport: 'AFL',
      league: 'AFL — Round 17',
      startUtc: '2026-06-28T13:40:00Z',
      startChina: '2026-06-28T21:40:00+08:00',
      dateLabel: 'Sun 28 Jun',
      timeLabel: '9:40 PM',
      homeTeam: 'Hawthorn',
      awayTeam: 'Geelong',
      displayTitle: 'Hawthorn vs Geelong',
      teams: 'Hawthorn vs Geelong',
      status: 'Scheduled',
      source: 'sample',
    },

    // ── Rugby second fixture ──────────────────────────────────────
    {
      id: 'rugby-002',
      sport: 'Rugby',
      league: 'Super Rugby Pacific — Final',
      startUtc: '2026-06-28T09:05:00Z',
      startChina: '2026-06-28T17:05:00+08:00',
      dateLabel: 'Sun 28 Jun',
      timeLabel: '5:05 PM',
      homeTeam: 'Blues',
      awayTeam: 'Chiefs',
      displayTitle: 'Blues vs Chiefs',
      teams: 'Blues vs Chiefs',
      status: 'Scheduled',
      source: 'sample',
    },

  ],
}
