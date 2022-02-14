import { useGlobalContext } from "../App";
import { TeamType } from "../Constants";

interface Props {
  team: TeamType;
}

export const WinModal = ({ team }: Props) => {
  const { start, setStart } = useGlobalContext();

  const nameOfTeam = team === TeamType.OUR ? "White" : "Black";
  const image =
    team === TeamType.OUR ? "assets/img/king_w.png" : "assets/img/king_b.png";
  return (
    <div
      className="modal fade hidden"
      id="win-modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalCenterTitle">
              Congratulation!
            </h4>
          </div>
          <div className="modal-body">
            <img src={image} alt="Tie" />
            <p>{nameOfTeam} wins this game!</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setStart(!start);
                $("#win-modal").modal("hide");
              }}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
