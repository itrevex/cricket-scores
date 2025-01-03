"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import _ from "lodash";
import RootLayout from "../layout";
import {
  selectedTeamsAtom,
  startingTeamAtom,
  teamsAtom,
} from "../../lib/store";
import { TeamType, TossProps } from "../../lib/types";

// TODO: move to separate component
const Toss: React.FC<TossProps> = ({ selectedTeams }) => {
  const [startingTeam, setStartingTeam] = useAtom(startingTeamAtom);

  const handleToss = () => {
    const _startingTeam = _.sampleSize(selectedTeams)[0];
    setStartingTeam(_startingTeam);
  };

  if (!selectedTeams) return null;

  return (
    <div>
      <h3 className="text-gray-500">Click to do Toss to get starting Team.</h3>
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

type SelectedStartType = "batting" | "bowling" | undefined;

// TODO: move to separate component
const SelectHeadOrTails = () => {
  // move to global state
  const [seletedStart, setSelectedStart] = useState<SelectedStartType>();

  const handleOnChange = (start: SelectedStartType) => {
    setSelectedStart(start);
  };

  return (
    <div className="py-4">
      <div className="flex items-center mb-4">
        <input
          checked={seletedStart === "batting"}
          id="batting-radio-1"
          type="radio"
          value=""
          onChange={() => handleOnChange("batting")}
          name="batting-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="disabled-radio-1"
          className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-500"
        >
          Batting
        </label>
      </div>
      <div className="flex items-center">
        <input
          checked={seletedStart === "bowling"}
          id="bowling-radio-2"
          type="radio"
          value=""
          onChange={() => handleOnChange("bowling")}
          name="bowling-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="disabled-radio-2"
          className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-500"
        >
          Bowling
        </label>
      </div>
    </div>
  );
};

const Teams: React.FC = () => {
  const [teams] = useAtom(teamsAtom);

  // move to global state once done
  const [selectedTeams, setSelectedTeams] = useAtom(selectedTeamsAtom);
  const [startingTeam] = useAtom(startingTeamAtom);

  const handleTeamSelection = () => {
    const _selectedTeams = _.sampleSize(teams, 2);
    setSelectedTeams(_selectedTeams);
  };

  return (
    <RootLayout>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-black font-semibold">Select Teams</h2>
        <p className="text-gray-500">Selected Teams</p>
        {selectedTeams && (
          <div className="flex justify-start flex-col">
            {selectedTeams.map((team: TeamType, index) => {
              return (
                <p key={team.id} className="text-gray-500 py-2">
                  {index + 1}. {team.name}
                </p>
              );
            })}
          </div>
        )}
        <button
          onClick={handleTeamSelection}
          className="py-2 px-4 bg-blue-400 text-white"
        >
          Select Teams To Play
        </button>

        {/* Do Toss*/}
        <Toss selectedTeams={selectedTeams} />
        {startingTeam && <SelectHeadOrTails />}
        {startingTeam && (
          <Link className="text-black" href="/match">
            Start Playing
          </Link>
        )}
      </div>
    </RootLayout>
  );
};

export default Teams;
