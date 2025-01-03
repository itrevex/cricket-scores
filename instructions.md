

Cricket Match Scorer - Frontend Interview Task
Duration: 2.5 hours

Overview
Create a React-based cricket match scoring application with live updates using MirageJS for backend simulation.

Core Requirements


1. Match Setup (/setup)
- Select 2 teams from pre-configured teams list
    1. get the teams list
    2. select two teams - this can be random
- Toss simulation with random outcome
    1. Do a toss - 
- Choose batting/bowling after winning toss
- Fixed 5-over match format

2. Scoring Interface (/scorer)
- Current batsmen display
- Current bowler display
- Scoring buttons (0,1,2,3,4,6) for each ball.
- Wicket button
- Extras
- Display: score, overs, run rate

3. Viewer Interface (/match/:matchId)
- Read-only match view
- Auto-updates every 10 seconds
- Basic match statistics


Technical Implementation

MirageJS Setup (only representational does not work out of the box)


// mirageServer.js
import { createServer } from 'miragejs';

// Helper functions for data persistence
const Storage = {
  saveMatch: (matchData) => {
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




 Evaluation Criteria
1. TypeScript usage, use strict types wherever possible
2. State management implementation with Redux Toolkit
3. API integration with MirageJS (preferred with RTK Query)
4. Polling mechanism
5. Code organization
6. Error handling


Cricket Basics


Here's a concise cricket primer focused on the scoring elements needed for this coding task:

Cricket Scoring Basics - What You Need to Know

Core Concepts
- A cricket match is played between two teams
- Each team takes turns to bat (score runs) and bowl
- The team batting tries to score runs, while the bowling team tries to get them "out" (take wickets)
- Two batsmen are always on field one is striker the other is non-striker

This is all you need to know about cricket to implement the scoring system. Focus on:
- Tracking runs and wickets
- Managing overs (6 balls each)
- Basic extras (wides)
- Two active batsmen at a time
- One bowler per over

Key Terms
1. Runs: Points scored by the batting team (each team gets one turn to bat)
   - Each ball can result 0,1,2,3,4, 6 runs or a wicket (see #2) per ball or an extra (see #4)
   - 4 runs: Ball reaches boundary after touching ground
   - 6 runs: Ball crosses boundary without touching ground
   - 1,2,3 runs: The batsment run between wickets after the ball is stuck.
   - Runs are always awarded to the striker
   - After 1 or 3 runs are taken the striker becomes the non-striker and the non-striker becomes the striker
2. Wicket: When a batsman gets out
   - Team starts with all 11 players
   - If the result of a ball is a wicket the striker is considered out and the next player in the team fills his spot as a batsman.
   - Game continues until 10 wickets are lost (one player will remain not out)

3. Over: 
   - A set of 6 legal balls bowled
   - Our match will be 5 overs per team
   - New bowler must bowl each over
   - At the end of each over, striker becomes non-striker and the non-striker becomes the striker.

4. Extras (Wides):
   - For this task, we'll only implement "wides"
   - A wide ball = 1 extra run (run awarded as extras to the team)
   - Wide balls don't count in the over (must be rebowled)

Basic Match Flow
1. Toss: 
   - Determines which team bats first
   - Winner can choose to bat or bowl

2. Innings Structure:
   - Two batsmen are always on field one is striker the other is non-striker
   - One bowler delivers 6 balls (1 over)
   - After each over, new bowler must bowl

3. Scoring Example:
   
   Team Score: 45/3 means:
   - 45 runs scored
   - 3 wickets lost
   
4. Run Rate:
   - Runs scored per over
   - Example: 30 runs in 5 overs = 6.0 run rate







