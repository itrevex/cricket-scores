"use client";
import RootLayout from "../layout";
import { useAtom } from "jotai";
import {
  bowlsAtom,
  selectedTeamsAtom,
  team1ScoreAtom,
  team1WicketsAtom,
  team2ScoreAtom,
  team2WicketsAtom,
} from "../../lib/store";

type DisplayTextProps = {
  item: string;
  value: string | number;
};

const DisplayText: React.FC<DisplayTextProps> = ({ item, value }) => {
  return (
    <div className="flex py-2">
      <p className="text-gray-500 pr-2">{item}</p>
      <p className="text-gray-700 font-semibold">{value}</p>
    </div>
  );
};

type ScoreButtonProps = {
  score: number;
  setScore: (score: number) => void;
  wickets: number;
  setWickets: (wickets: number) => void;
};

export const ScoreButtons: React.FC<ScoreButtonProps> = ({
  score,
  setScore,
  wickets,
  setWickets,
}) => {
  const [bowls, setBowls] = useAtom(bowlsAtom);

  const handleSetScore = (newScore: number) => {
    setScore(score + newScore);
    setBowls(bowls + 1);
  };
  const handleAddWicket = () => {
    setWickets(wickets + 1);
  };

  const scores = [0, 1, 2, 3, 4, 6];

  return (
    <div className="flex flex-col">
      <text className="text-gray-700 font-semibold py-2 text-base">
        Add Score
      </text>
      <div className="flex">
        {scores.map((score: number) => {
          return (
            <button
              key={score}
              className="text-2xl mx-2 bg-blue-500 text-white py-2 px-4"
              onClick={() => handleSetScore(score)}
            >
              {score}
            </button>
          );
        })}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 my-2 h-10 items-center w-2/12"
        onClick={handleAddWicket}
      >
        Add Wicket
      </button>
    </div>
  );
};

type ScoresType = {
  teamName: string;
  score?: number;
  wickets?: number;
  overs?: number;
};

export const Scores: React.FC<ScoresType> = ({ teamName, score, wickets }) => {
  const [bowls] = useAtom(bowlsAtom);
  const totalOvers = Math.floor(bowls / 6) + 1;
  const runsPerOver = Math.round((score || 0) / totalOvers);
  return (
    <>
      <div className="text-gray-700">Team {teamName} Scores</div>
      <DisplayText item="Score: " value={score || 0} />
      <DisplayText item="Wickets: " value={wickets || 0} />
      <DisplayText item="Run Rate: " value={runsPerOver || 0} />
    </>
  );
};

const PlayScores = () => {
  const [team1Score, setTeam1Score] = useAtom(team1ScoreAtom);
  const [team2Score, setTeam2Score] = useAtom(team2ScoreAtom);
  const [team1Wickets, setTeam1Wickets] = useAtom(team1WicketsAtom);
  const [team2Wickets, setTeam2Wickets] = useAtom(team2WicketsAtom);
  const [bowls] = useAtom(bowlsAtom);
  const totalOvers = Math.floor(bowls / 6) + 1;
  const [selectedTeams] = useAtom(selectedTeamsAtom);
  const matchEnded = totalOvers === 5;

  if (!selectedTeams)
    return (
      <div className="text-red-500">Error: There are no selected teams</div>
    );

  return (
    <RootLayout>
      <div className="text-gray-700 flex flex-col">
        <h2 className="font-bold text-lg pb-4 pt-2 text-black">Match Scores</h2>
        <DisplayText item="Current Bowler: " value="Playe 1" />
      </div>
      <DisplayText item="Total Overs" value={totalOvers} />
      <Scores
        score={team1Score}
        wickets={team1Wickets}
        teamName={selectedTeams[0].name}
      />
      {!matchEnded && (
        <ScoreButtons
          score={team1Score || 0}
          setScore={setTeam1Score}
          wickets={team1Wickets || 0}
          setWickets={setTeam1Wickets}
        />
      )}
      <Scores
        score={team2Score}
        wickets={team2Wickets}
        teamName={selectedTeams[1].name}
      />
      {!matchEnded && (
        <ScoreButtons
          score={team2Score || 0}
          setScore={setTeam2Score}
          wickets={team2Wickets || 0}
          setWickets={setTeam2Wickets}
        />
      )}
      <p className="text-gray-500">
        Total Overs: <span className="text-2xl text-gray-700 py-2">10</span>
      </p>
    </RootLayout>
  );
};

export default PlayScores;
