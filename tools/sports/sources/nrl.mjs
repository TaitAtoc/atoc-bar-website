export const SOURCE_NAME = 'manual'

// NRL: no free public JSON fixture API found.
// nrl.com requires authentication; Sportradar is paid.
// Add NRL fixtures manually to tools/sports/raw-fixtures.json.
export async function collectFixtures() {
  return {
    fixtures: [],
    source: SOURCE_NAME,
    note: 'NRL: manual entry required. Add fixtures to raw-fixtures.json.',
  }
}
