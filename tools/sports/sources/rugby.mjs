export const SOURCE_NAME = 'manual'

// Rugby Union: World Rugby requires account; no stable free JSON API.
// Sportradar and Stats Perform are paid.
// Add Rugby fixtures manually to tools/sports/raw-fixtures.json.
export async function collectFixtures() {
  return {
    fixtures: [],
    source: SOURCE_NAME,
    note: 'Rugby Union: manual entry required. Add fixtures to raw-fixtures.json.',
  }
}
