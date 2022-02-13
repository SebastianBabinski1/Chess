export const AuthorModal = () => {
  return (
    <div
      className="modal fade"
      id="author_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalCenterTitle">
              About author
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Hello! I'm Sebastian and it's my chess game. In early 2000's with
              friends we played countless hours in HOMM3 "hot seat" mode, so I
              decided that making this app will be wonderful tribute. <br />
              Enjoy and check my github!
            </p>
          </div>
          <div className="modal-footer">
            <a
              className="btn btn-secondary"
              href="https://github.com/SebastianBabinski1"
              target="blank"
              role="button"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
