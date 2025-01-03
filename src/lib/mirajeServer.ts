import { createServer } from 'miragejs';

// Helper functions for data persistence
const Storage = {
  saveMatch: (matchData: unknown) => {
    localStorage.setItem('match_data', JSON.stringify(matchData));
  },
  
  getMatch: () => {
    return JSON.parse(localStorage.getItem('match_data') || 'null');
  },
  
  clearMatch: () => {
    localStorage.removeItem('match_data');
  }
};

// Pre-configured teams data
const TEAMS = [
  {
    id: "IND",
    name: "India",
    players: [
      { id: "IND1", name: "Rohit Sharma", role: "Batsman" },
      // Add remaining 10 players
    ]
  },
  // Add 3 more teams with 11 players each
];

export function makeServer() {
  return createServer({
    seeds(server) {
      // Load teams into server.db
      server.db.loadData({
        teams: TEAMS
      });
    },

    routes() {
      this.namespace = 'api';

      // Get all available teams
      this.get('/teams', (schema) => {
        return schema.db.teams;
      });

      // Initialize match with selected teams and toss details
      this.post('/matches', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        // Expected payload:
        // {
        //   team1Id: string,
        //   team2Id: string,
        //   tossWinner: string, // team id
        //   tossDecision: 'bat' | 'bowl'
        // }

        // TODO: Validate team selection

        const match = {
          id: `match_${Date.now()}`,
          // TODO: Set up initial match state based on toss decision
          lastUpdate: Date.now()
        };

        Storage.saveMatch(match);
        return match;
      });

      // Get current match state
      this.get('/matches/:id', () => {
        return Storage.getMatch();
      });

      // Key implementation: Update score and handle live updates
      this.put('/matches/:id/score', (schema, request) => {
        const currentMatch = Storage.getMatch();
        const update = JSON.parse(request.requestBody);
        
        // Example scoring update payload:
        // {
        //   runs: number,
        //   isExtra: boolean,
        //   isWicket: boolean,
        //   // Add any other scoring details
        // }

        if (!currentMatch) {
          return new Response(400, {}, { error: 'No active match' });
        }

        // Update match state
        const newState = {
          ...currentMatch,
          // TODO: Update score, wickets, overs based on the scoring input
          lastUpdate: Date.now()
        };

        Storage.saveMatch(newState);
        return newState;
      });

      // Key implementation: Polling endpoint with optimization
      this.get('/matches/:id/live', (schema, request) => {
        const currentMatch = Storage.getMatch();
        const lastUpdate = parseInt(request.queryParams.lastUpdate || '0');

        // Return 304 if no updates since last poll
        if (currentMatch.lastUpdate <= lastUpdate) {
          return new Response(304, {}, null);
        }

        return currentMatch;
      });
    }
  });
}
