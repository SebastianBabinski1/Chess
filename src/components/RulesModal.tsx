export const RulesModal = () => {
  return (
    <div
      className="modal fade"
      id="rules_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Rules
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="rules-modal-body">
            <h5>Initial setup</h5>
            <div className="rule-wrapper">
              <img
                src={"assets/rules/initial positions.png"}
                alt="initial position"
              ></img>
            </div>
            <h5>Basic movement</h5>
            <div className="basic-rules-wrapper">
              <div className="rule-wrapper">
                <img src={"assets/rules/pawn.png"} alt="initial position"></img>
                <p>Pawn </p>
              </div>
              <div className="rule-wrapper">
                <img src={"assets/rules/rook.png"} alt="initial position"></img>
                <p>Rook </p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/knight.png"}
                  alt="initial position"
                ></img>
                <p>Knight </p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/bishop.png"}
                  alt="initial position"
                ></img>
                <p>Bishop </p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/queen.png"}
                  alt="initial position"
                ></img>
                <p>Queen </p>
              </div>
              <div className="rule-wrapper">
                <img src={"assets/rules/king.png"} alt="initial position"></img>
                <p>King </p>
              </div>
            </div>
            <h5>Castling</h5>
            <div className="castling-wrapper">
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/castling1.png"}
                  alt="initial position"
                ></img>
                <p>Castling initial position</p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/castling2.png"}
                  alt="initial position"
                ></img>
                <p>Position after castling</p>
              </div>
            </div>
            <h5>Check, Checkmate and Stalemate</h5>
            <div className="ending-wrapper">
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/black check.png"}
                  alt="initial position"
                ></img>
                <p>Black's king is in check</p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/white checkmated.png"}
                  alt="initial position"
                ></img>
                <p>White's king is checkmated</p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/stalemate.png"}
                  alt="initial position"
                ></img>
                <p>Black is in stalemate</p>
              </div>
            </div>
            <h5>Dead position and enPassant</h5>
            <div className="dead-position-wrapper">
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/dead position.png"}
                  alt="initial position"
                ></img>
                <p>Dead position</p>
              </div>
              <div className="rule-wrapper">
                <img
                  src={"assets/rules/en passant.png"}
                  alt="initial position"
                ></img>
                <p>En passant</p>
              </div>
            </div>
            <a
              className="btn btn-secondary"
              href="https://en.wikipedia.org/wiki/Rules_of_chess"
              target="blank"
              role="button"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
