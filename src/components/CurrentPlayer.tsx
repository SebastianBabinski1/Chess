import { TeamType } from "../Constants";

interface Props {
  team?: TeamType;
}

const CurrentPlayer = ({ team }: Props) => {
  return (
    <div className="current-player-wrapper">
      <p>Current player</p>
      <div className="current-player">
        {team === TeamType.OPPONENT ? (
          <div className="current-player_black"></div>
        ) : (
          <div className="current-player_white"></div>
        )}
      </div>
    </div>
  );
};

export default CurrentPlayer;
