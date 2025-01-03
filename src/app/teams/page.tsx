"use client";

import React, { useState } from "react";
import _ from "lodash";
import RootLayout from "../layout";

type PlayerType = {
  id: string;
  name: string;
  role: string;
};
type TeamType = {
  id: string;
  name: string;
  players: PlayerType[];
};

type TossProps = {
  selectedTeams: TeamType[] | null;
};

const Toss: React.FC<TossProps> = ({ selectedTeams }) => {
  const [startingTeam, setStartingTeam] = useState<TeamType | undefined>();

  const handleToss = () => {
    const _startingTeam = _.sampleSize(selectedTeams)[0];
    setStartingTeam(_startingTeam);
  };

  if (!selectedTeams) return null;

  return (
    <div>
      <h3>Click to do Toss to get starting Team.</h3>
      {startingTeam && (
        <p className="text-gray-700">
          The starting team{" "}
          <span className="font-semibold text-black">{startingTeam.name}</span>
        </p>
      )}
      <button className="py-2 px-4 bg-blue-400 text-white" onClick={handleToss}>
        Toss
      </button>
    </div>
  );
};
const Teams: React.FC = () => {
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

  // move to global state once done
  const [selectedTeams, setSelectedTeams] = useState<TeamType[] | null>(null);

  const handleTeamSelection = () => {
    const _selectedTeams = _.sampleSize(teams, 2);
    setSelectedTeams(_selectedTeams);
  };

  return (
    <RootLayout>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-black font-semibold">Select Teams</h2>
        <p>Selected Teams</p>
        {selectedTeams && (
          <li>
            {selectedTeams.map((team: TeamType) => {
              return <ol key={team.id}>{team.name}</ol>;
            })}
          </li>
        )}
        <button
          onClick={handleTeamSelection}
          className="py-2 px-4 bg-blue-400 text-white"
        >
          Select Teams To Play
        </button>

        {/* Do Toss*/}
        <Toss selectedTeams={selectedTeams} />
      </div>
    </RootLayout>
  );
};

export default Teams;
