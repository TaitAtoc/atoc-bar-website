export const SOURCE_NAME = 'manual'

// Tennis: ATP/WTA publish no public schedule JSON.
// Scraped sources are fragile and violate ToS.
// Add tennis fixtures manually to tools/sports/raw-fixtures.json.
export async function collectFixtures() {
  return {
    fixtures: [],
    source: SOURCE_NAME,
    note: 'Tennis: manual entry required. Add fixtures to raw-fixtures.json.',
  }
}
