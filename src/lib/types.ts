export type PlayerType = {
  id: string;
  name: string;
  role: string;
};
export type TeamType = {
  id: string;
  name: string;
  players: PlayerType[];
};

export type TossProps = {
  selectedTeams?: TeamType[] | null;
};
