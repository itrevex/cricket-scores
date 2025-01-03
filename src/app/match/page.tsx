import RootLayout from "../layout";
import { useAtom } from "jotai";
import {
  selectedTeamsAtom,
  team1ScoreAtom,
  team1WicketsAtom,
  team2ScoreAtom,
  team2WicketsAtom,
} from "../../lib/store";

type DisplayTextProps = {
  item: string;
  value: string;
};

const DisplayText: React.FC<DisplayTextProps> = ({ item, value }) => {
  return (
    <div className="flex py-2">
      <p className="text-gray-500">{item}</p>
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
  const handleSetScore = (newScore: number) => {
    setScore(score + newScore);
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
              className="text-2xl text-gray-700"
              onClick={() => handleSetScore(score)}
            >
              {score}
            </button>
          );
        })}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 my-2"
        onClick={handleAddWicket}
      >
        Add Wicket
      </button>
    </div>
  );
};

const PlayScores = () => {
  const [team1Score, setTeam1Score] = useAtom(team1ScoreAtom);
  const [team2Score, setTeam2Score] = useAtom(team2ScoreAtom);
  const [team1Wickets, setTeam1Wickets] = useAtom(team1WicketsAtom);
  const [team2Wickets, setTeam2Wickets] = useAtom(team2WicketsAtom);

  const [selectedTeams] = useAtom(selectedTeamsAtom);

  if (!selectedTeams)
    return <div className="text-red">Error: There are no selected teams</div>;

  return (
    <RootLayout>
      <div className="text-gray-700 flex flex-col">
        <h2 className="font-bold text-lg pb-4 pt-2 text-black">Match Scores</h2>
        <DisplayText item="Current Bowler: " value="Playe 1" />
      </div>
      <div>Team {selectedTeams[0].name} Scores</div>
      <p className="text-gray-500">
        Score:
        <span className="text-2xl text-gray-700 py-2">{team1Score}</span>
        Wickets:
        <span className="text-2xl text-gray-700 py-2">{team1Wickets}</span>
        Run Rate:
        <span className="text-2xl text-gray-700 py-2">4 runs per over</span>
      </p>
      <ScoreButtons
        score={team1Score || 0}
        setScore={setTeam1Score}
        wickets={team1Wickets || 0}
        setWickets={setTeam1Wickets}
      />
      <div>Team {selectedTeams[1].name} Scores</div>
      <p className="text-gray-500">
        Score:
        <span className="text-2xl text-gray-700 py-2">{team2Score}</span>
        Wickets:
        <span className="text-2xl text-gray-700 py-2">{team2Wickets}</span>
        Run Rate:
        <span className="text-2xl text-gray-700 py-2">2 runs per over</span>
      </p>
      <p className="text-gray-500"></p>
      <ScoreButtons
        score={team2Score || 0}
        setScore={setTeam2Score}
        wickets={team2Wickets || 0}
        setWickets={setTeam2Wickets}
      />
      <p className="text-gray-500">
        Total Overs: <span className="text-2xl text-gray-700 py-2">10</span>
      </p>
    </RootLayout>
  );
};

export default PlayScores;
