import { ReactElement } from "react";
import { TeamType } from "../../Constants";
import "./CapturedPawns.css";

interface Props {
  team?: TeamType;
  capturedPawns?: number[];
}

const CapturedPawns = ({ team, capturedPawns }: Props) => {
  let capturedPawnsObject = {
    pawns: 0,
    rooks: 0,
    knights: 0,
    bishops: 0,
    queens: 0,
  };

  capturedPawns?.forEach((pawn) => {
    switch (pawn) {
      case 0:
        capturedPawnsObject.pawns = capturedPawnsObject.pawns + 1;
        break;
      case 1:
        capturedPawnsObject.bishops = capturedPawnsObject.bishops + 1;
        break;
      case 2:
        capturedPawnsObject.knights = capturedPawnsObject.knights + 1;
        break;
      case 3:
        capturedPawnsObject.rooks = capturedPawnsObject.rooks + 1;
        break;
      case 4:
        capturedPawnsObject.queens = capturedPawnsObject.queens + 1;
    }
  });

  let teamColor = team === TeamType.OPPONENT ? "black" : "white";

  return (
    <div className="captured-wrapper">
      <p>Captured {teamColor} pawns</p>
      <div className="captured-list">
        <div className="captured">
          <img
            src={`assets/img/pawn_${teamColor === "black" ? "b" : "w"}.png`}
            alt="pawn"
          />
          <p>x {capturedPawnsObject.pawns}</p>
        </div>
        <div className="captured">
          <img
            src={`assets/img/rook_${teamColor === "black" ? "b" : "w"}.png`}
            alt="rook"
          />
          <p>x {capturedPawnsObject.rooks}</p>
        </div>
        <div className="captured">
          <img
            src={`assets/img/knight_${teamColor === "black" ? "b" : "w"}.png`}
            alt="knight"
          />
          <p>x {capturedPawnsObject.knights}</p>
        </div>
        <div className="captured">
          <img
            src={`assets/img/bishop_${teamColor === "black" ? "b" : "w"}.png`}
            alt="bishop"
          />
          <p>x {capturedPawnsObject.bishops}</p>
        </div>
        <div className="captured">
          <img
            src={`assets/img/queen_${teamColor === "black" ? "b" : "w"}.png`}
            alt="queen"
          />
          <p>x {capturedPawnsObject.queens}</p>
        </div>
      </div>
    </div>
  );
};

export default CapturedPawns;
