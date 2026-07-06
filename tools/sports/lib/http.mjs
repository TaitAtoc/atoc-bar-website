const UA = 'ATOC-Sports-Collector/1.0 (github.com/atoc-bar)'
const DEFAULT_TIMEOUT_MS = 15000

export async function fetchJSON(url, { timeout = DEFAULT_TIMEOUT_MS, headers = {} } = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/json', ...headers },
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

export function yyyymmdd(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

export function dateRange(now, daysAhead) {
  const end = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)
  return `${yyyymmdd(now)}-${yyyymmdd(end)}`
}
