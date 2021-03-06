import { useGlobalContext } from "../App";

export const TieModal = () => {
  const { start, setStart } = useGlobalContext();

  return (
    <div
      className="modal fade hidden"
      id="tie-modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalCenterTitle">
              Tie!
            </h4>
          </div>
          <div className="modal-body">
            <img src={`assets/img/handshake.webp`} alt="Tie" />
            <p>It was a fascinating game!</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setStart(!start);
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
