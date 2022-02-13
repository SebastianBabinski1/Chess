import { useGlobalContext } from "../App";

interface Props {
  image: string;
  team: string;
}

export const WinModal = ({ image, team }: Props) => {
  const { start, setStart } = useGlobalContext();

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
            <p>{team} wins this game!</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setStart(start);
                $("#tie-modal").modal("hide");
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
