/**
 * SportsScheduleWidget.jsx
 * ─────────────────────────────────────────────────────────────────
 * Sports Schedule Widget — real schedule JSON with visible failure states.
 *
 * Data source priority:
 *   1. /data/sports-schedule.json  (written by: npm run build:sports)
 *      → empty schedules remain empty; failures are shown and never replaced
 *        with sample fixtures.
 *
 * Opening-hours filter (applied at render time):
 *   ATOC is open 5 pm – 3 am China time (UTC+8).
 *   The window crosses midnight: minutes >= 17*60 || minutes <= 3*60
 *   Uses startChina field — no browser timezone conversion.
 *
 * See: docs/sports-schedule-widget-plan.md
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useMemo } from 'react'
import { assetUrl } from '../utils/assetUrl.js'

// ── Opening-hours filter ──────────────────────────────────────────────────────
// ATOC: 5 pm – 3 am China time, 7 days a week. Window crosses midnight.
// Parses startChina ISO string (e.g. "2026-06-28T21:40:00+08:00") directly —
// no Date timezone conversion, no library needed.
function isWithinAtocOpeningHours(event) {
  const match = event.startChina && event.startChina.match(/T(\d{2}):(\d{2}):/)
  if (!match) return false
  const minutesAfterMidnight = parseInt(match[1], 10) * 60 + parseInt(match[2], 10)
  return minutesAfterMidnight >= 17 * 60 || minutesAfterMidnight <= 3 * 60
}

const ALL = 'All Sports'

const SPORT_ABBREV = {
  'Rugby':      'Rugby',
  'Football':   'Football',
  'AFL':        'AFL',
  'NRL':        'NRL',
  'NFL':        'NFL',
  'Tennis':     'Tennis',
  'Formula 1':  'F1',
  'Basketball': 'Basketball',
}

function StatusBadge({ status }) {
  const s = (status || 'Scheduled').toLowerCase()
  return (
    <span className={`sports-widget__status sports-widget__status--${s}`}>
      {status}
    </span>
  )
}

function EventCard({ event }) {
  const abbrev = SPORT_ABBREV[event.sport] || event.sport
  return (
    <li className="sports-widget__card">
      <div className="sports-widget__date">
        <span className="sports-widget__day">{event.dateLabel}</span>
        <span className="sports-widget__time">{event.timeLabel}</span>
      </div>
      <div className="sports-widget__meta">
        <div className="sports-widget__meta-top">
          <span className="sports-widget__sport-tag">{abbrev}</span>
          <span className="sports-widget__league">{event.league}</span>
        </div>
        <p className="sports-widget__teams">{event.teams}</p>
      </div>
      <div className="sports-widget__status-col">
        <StatusBadge status={event.status} />
      </div>
    </li>
  )
}

export function SportsScheduleWidget({ compact = false }) {
  const [schedule, setSchedule] = useState({ generatedAt: null, events: [] })
  const [loadError, setLoadError] = useState(null)
  const [selected, setSelected] = useState(ALL)

  // Fetch real JSON on mount. Never substitute sample fixtures on failure.
  useEffect(() => {
    const scheduleUrl = `${assetUrl('/data/sports-schedule.json')}?v=${Date.now()}`
    fetch(scheduleUrl, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (!data || !Array.isArray(data.events)) throw new Error('Invalid schedule data')
        setSchedule(data)
        setLoadError(null)
      })
      .catch(error => {
        setSchedule({ generatedAt: null, events: [] })
        setLoadError(error.message || 'Schedule unavailable')
      })
  }, [])

  const sportOptions = useMemo(
    () => [ALL, ...new Set(schedule.events.map(event => event.sport).filter(Boolean))]
      .sort((a, b) => a === ALL ? -1 : b === ALL ? 1 : a.localeCompare(b)),
    [schedule],
  )

  // Filter: 7-day window, opening hours, sport selection. Sort soonest first.
  const filtered = useMemo(() => {
    const now = new Date()
    const windowEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return schedule.events
      .filter(e => {
        const t = new Date(e.startUtc)
        return t >= now && t <= windowEnd
      })
      .filter(e => isWithinAtocOpeningHours(e))
      .filter(e => selected === ALL || e.sport === selected)
      .sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc))
  }, [schedule, selected])

  const updatedDate = schedule.generatedAt
    ? new Date(schedule.generatedAt).toLocaleDateString('en-AU', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : null

  const isEmpty = filtered.length === 0

  return (
    <section className={`sports-widget${compact ? ' sports-widget--compact' : ''}`} aria-label="Upcoming sports fixtures">

      <header className="sports-widget__header">
        <span className="sports-widget__eyebrow">Sports shown</span>
        <h2 className="sports-widget__title">Next 7 days at ATOC</h2>
        <p className="sports-widget__subtitle">
          Showing fixtures during ATOC opening hours, 5pm–3am China time.
        </p>
      </header>

      <div className="sports-widget__toolbar">
        <div className="sports-widget__select-wrap">
          <select
            className="sports-widget__select"
            value={selected}
            onChange={e => setSelected(e.target.value)}
            aria-label="Filter by sport"
          >
            {sportOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="sports-widget__select-arrow" aria-hidden="true">▾</span>
        </div>

        <div className="sports-widget__updated-group">
          {loadError ? (
            <span className="sports-widget__sample-label" role="alert">
              Live schedule unavailable — no sample fixtures shown
            </span>
          ) : updatedDate && (
            <span className="sports-widget__updated">
              Schedule updated {updatedDate}
            </span>
          )}
        </div>
      </div>

      {isEmpty ? (
        <div className="sports-widget__empty">
          <p className="sports-widget__empty-line">
            {loadError
              ? 'The live sports schedule could not be loaded. Please check again shortly.'
              : 'No confirmed fixtures during ATOC opening hours in the next 7 days.'}
          </p>
          <p className="sports-widget__empty-cta">
            Ask us what's on this week.
          </p>
        </div>
      ) : (
        <ul className="sports-widget__list" aria-label="Fixture list">
          {filtered.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}

    </section>
  )
}
