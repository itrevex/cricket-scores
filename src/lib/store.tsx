import { atom } from "jotai";
import { TeamType } from "./types";

const teams: TeamType[] = [
  {
    id: "IND",
    name: "India",
    players: [
      { id: "IND1", name: "Ind Player 1", role: "Batsman" },
      { id: "IND2", name: "Ind Player 2", role: "Batsman" },
      { id: "IND3", name: "Ind Player 3", role: "Batsman" },
      { id: "IND4", name: "Ind Player 4", role: "Batsman" },
      { id: "IND5", name: "Ind Player 5", role: "Batsman" },
      { id: "IND6", name: "Ind Player 6", role: "Batsman" },
      { id: "IND7", name: "Ind Player 7", role: "Bowler" },
      { id: "IND8", name: "Ind Player 8", role: "Bowler" },
      { id: "IND9", name: "Ind Player 9", role: "Bowler" },
      { id: "IND10", name: "Ind Player 10", role: "Batsman" },
      { id: "IND11", name: "Rohit Sharma", role: "Batsman" },
    ],
  },
  {
    id: "PAK",
    name: "Pakistan",
    players: [
      { id: "PAK1", name: "Pak Player 1", role: "Batsman" },
      { id: "PAK2", name: "Pak Player 2", role: "Batsman" },
      { id: "PAK3", name: "Pak Player 3", role: "Batsman" },
      { id: "PAK4", name: "Pak Player 4", role: "Batsman" },
      { id: "PAK5", name: "Pak Player 5", role: "Batsman" },
      { id: "PAK6", name: "Pak Player 6", role: "Batsman" },
      { id: "PAK7", name: "Pak Player 7", role: "Bastman" },
      { id: "PAK8", name: "Pak Player 8", role: "Bowler" },
      { id: "PAK9", name: "Pak Player 9", role: "Bowler" },
      { id: "PAK10", name: "Pak Player 10", role: "Batsman" },
      { id: "PAK11", name: "Pak Player 11", role: "Batsman" },
    ],
  },
  {
    id: "AUS",
    name: "Australia",
    players: [
      { id: "AUS1", name: "Aus Player 1", role: "Batsman" },
      { id: "AUS2", name: "Aus Player 2", role: "Batsman" },
      { id: "AUS3", name: "Aus Player 3", role: "Batsman" },
      { id: "AUS4", name: "Aus Player 4", role: "Batsman" },
      { id: "AUS5", name: "Aus Player 5", role: "Batsman" },
      { id: "AUS6", name: "Aus Player 6", role: "Batsman" },
      { id: "AUS7", name: "Aus Player 7", role: "Bastman" },
      { id: "AUS8", name: "Aus Player 8", role: "Bowler" },
      { id: "AUS9", name: "Aus Player 9", role: "Bowler" },
      { id: "AUS10", name: "Aus Player 10", role: "Batsman" },
      { id: "AUS11", name: "Aus Player 10", role: "Batsman" },
    ],
  },
];

export const teamsAtom = atom<TeamType[]>(teams);

export const selectedTeamsAtom = atom<TeamType[] | null>();

export const startingTeamAtom = atom<TeamType | null>(null);

export const team1ScoreAtom = atom<number>();
export const team2ScoreAtom = atom<number>();
export const team1WicketsAtom = atom<number>();
export const team2WicketsAtom = atom<number>();
export const oversAtom = atom<number>();
export const bowlsAtom = atom<number>(0);
