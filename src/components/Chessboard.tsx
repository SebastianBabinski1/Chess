import Tile from "./Tile";
import React, { useRef, useState } from "react";
import Referee from "../referee/Referee";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  PieceType,
  TeamType,
  initialBoardState,
  Position,
  samePosition,
  CapturedPieces,
  allPositions,
} from "../Constants";
import CurrentPlayer from "./CurrentPlayer";
import CapturedPawns from "./CapturedPawns";
import { RulesModal } from "./RulesModal";
import { useGlobalContext } from "../App";

interface Props {
  mode: string;
  setPlayer: React.Dispatch<React.SetStateAction<TeamType>>;
}

const Chessboard = ({ mode, setPlayer }: Props) => {
  const { start, setStart } = useGlobalContext();

  const [capturedPawns, setCapturedPawns] = useState<CapturedPieces>({
    white: [],
    black: [],
  });
  const [currentPlayer, setCurrentPlayer] = useState<TeamType>(TeamType.OUR);
  const [movesHint, setMovesHint] = useState<string[]>([]);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const chessboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  const checkingPositions = allPositions();
  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    let currentTeam;
    if (currentPlayer === TeamType.OUR) {
      currentTeam = "white-piece";
    } else if (currentPlayer === TeamType.OPPONENT) {
      currentTeam = "black-piece";
    }

    if (element.classList.contains(`${currentTeam}`) && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      setGrabPosition({
        x: grabX,
        y: grabY,
      });
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      const currentPieceType = (): PieceType => {
        let currentPieceType = PieceType.PAWN;
        pieces.forEach((piece) => {
          if (samePosition(piece.position, { x: grabX, y: grabY })) {
            currentPieceType = piece.type;
          }
        });
        return currentPieceType;
      };

      const possibleMoves = referee.possibleMoves(
        { x: grabX, y: grabY },
        checkingPositions,
        currentPieceType(),
        currentPlayer,
        pieces
      );
      if (mode === "easy") {
        const hints = possibleMoves.reduce((results, move) => {
          let boardStateCopy: Piece[] = JSON.parse(JSON.stringify(pieces));
          let currentPieceIndex = boardStateCopy.findIndex((p) =>
            samePosition(p.position, { x: grabX, y: grabY })
          );
          let enemyPieceIndex = boardStateCopy.findIndex((p) =>
            samePosition(p.position, move)
          );
          if (
            enemyPieceIndex !== -1 &&
            boardStateCopy[enemyPieceIndex].team !== currentPlayer
          ) {
            let boardStateWithoutAttackedPiece: Piece[] = JSON.parse(
              JSON.stringify(pieces)
            );
            boardStateWithoutAttackedPiece.splice(enemyPieceIndex, 1);
            const isCheck = referee.isCheck(boardStateWithoutAttackedPiece);
            if (isCheck !== currentPlayer) {
              results.push(move);
            }
          }

          boardStateCopy[currentPieceIndex].position = move;

          const isCheck = referee.isCheck(boardStateCopy);
          if (isCheck !== currentPlayer) {
            results.push(move);
          }
          return results;
        }, [] as Position[]);

        const ids: string[] = [];
        hints.forEach((position) => {
          const id = "" + position.y + position.x;
          ids.push(id);
        });
        setMovesHint(ids);
        ids.forEach((id) => {
          const tile = document.getElementById(id);
          tile?.classList.add("possible");
        });
      } else {
        console.log(mode);
      }

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;
        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            } else {
              // Adding captured pawns to table
              let updatedCapturedPawns = capturedPawns;
              if (piece.team === 0) {
                updatedCapturedPawns.black.push(piece.type);
              } else {
                updatedCapturedPawns.white.push(piece.type);
              }
              setCapturedPawns(updatedCapturedPawns);
            }
            return results;
          }, [] as Piece[]);

          movesHint.forEach((id) => {
            const tile = document.getElementById(id);
            tile?.classList.remove("possible");
          });
          setPieces(updatedPieces);
          setCurrentPlayer(
            currentPlayer === TeamType.OUR ? TeamType.OPPONENT : TeamType.OUR
          );
        } else if (validMove) {
          //   // UPDATE THE PIECE POSITION
          //   // AND IF A PIECE IS ATTACKED REMOVES IT
          const piecesCopy: Piece[] = JSON.parse(JSON.stringify(pieces));
          const updatedPieces = piecesCopy.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              // SPECIAL MOVE
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;
              piece.position.x = x;
              piece.position.y = y;
              let promotionRow = piece.team === TeamType.OUR ? 7 : 0;
              if (y === promotionRow && piece.type === PieceType.PAWN) {
                modalRef.current?.classList.remove("hidden");
                setPromotionPawn(piece);
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            } else {
              // Adding captured pawns to table
              let updatedCapturedPawns = capturedPawns;
              if (piece.team === 0) {
                updatedCapturedPawns.black.push(piece.type);
              } else {
                updatedCapturedPawns.white.push(piece.type);
              }
              setCapturedPawns(updatedCapturedPawns);
            }
            return results;
          }, [] as Piece[]);
          // Removing hints
          movesHint.forEach((id) => {
            const tile = document.getElementById(id);
            tile?.classList.remove("possible");
          });

          const isCheck = referee.isCheck(updatedPieces);
          if (isCheck !== currentPlayer) {
            // HAS ENEMY PLAYER POSSIBLE MOVE TO AVOID CHECK?
            const allPossibleEnemyMovesAfterUpdate = updatedPieces.reduce(
              (results, piece) => {
                if (piece.team !== currentPlayer) {
                  let possibleMoves = referee.possibleMoves(
                    piece.position,
                    checkingPositions,
                    piece.type,
                    piece.team,
                    updatedPieces
                  );

                  if (possibleMoves.length > 0) {
                    possibleMoves.forEach((possibleMove) => {
                      const piecesCopy: Piece[] = JSON.parse(
                        JSON.stringify(updatedPieces)
                      );

                      const indexOfPiece = piecesCopy.forEach((p, index) => {
                        if (samePosition(p.position, piece.position) === true) {
                          piecesCopy[index].position = possibleMove;
                          const isCheckAfterPossibleMove =
                            referee.isCheck(piecesCopy);
                          if (
                            isCheckAfterPossibleMove === undefined ||
                            isCheckAfterPossibleMove === currentPlayer
                          ) {
                            results.push(piece);
                          }
                        }
                      });
                    });
                  }
                }
                return results;
              },
              [] as Piece[]
            );

            if (allPossibleEnemyMovesAfterUpdate.length > 0) {
              console.log("Są możliwe ruchy przeciwnika");
            } else {
              // Before we check if isCheck is not currentPlayer, so now if isCheck is undefined its tie
              if (isCheck === undefined) {
                // Tie
                $("#tie-modal").modal("show");
              } else {
                // Check mate
                console.log("checkmate");
                setPlayer(currentPlayer);
                $("#win-modal").modal("show");
              }
            }

            setPieces(updatedPieces);
            setCurrentPlayer(
              currentPlayer === TeamType.OUR ? TeamType.OPPONENT : TeamType.OUR
            );
          } else {
            movesHint.forEach((id) => {
              const tile = document.getElementById(id);
              tile?.classList.remove("possible");
            });
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");
          }
        } else {
          // RESETS THE PIECE POSITION
          movesHint.forEach((id) => {
            const tile = document.getElementById(id);
            tile?.classList.remove("possible");
          });
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
    }
    setActivePiece(null);
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }
    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        const teamType = piece.team === TeamType.OUR ? "w" : "b";
        let image = "";
        switch (pieceType) {
          case PieceType.ROOK: {
            image = "rook";
            break;
          }
          case PieceType.BISHOP: {
            image = "bishop";
            break;
          }
          case PieceType.QUEEN: {
            image = "queen";
            break;
          }
          case PieceType.KNIGHT: {
            image = "knight";
            break;
          }
        }
        piece.image = `assets/img/${image}_${teamType}.png`;
        switch (pieceType) {
          case PieceType.ROOK:
            image = "rook";
        }
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);

    setPieces(updatedPieces);
    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  }

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;
      let team = piece ? piece.team : undefined;
      board.push(
        <Tile
          id={`${j}${i}`}
          key={`${j},${i}`}
          image={image}
          number={number}
          team={team}
        />
      );
    }
  }
  return (
    <>
      <div className="left-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="white"
          className="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
          onClick={() => setStart(!start)}
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
        <CurrentPlayer team={currentPlayer} />
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          data-toggle="modal"
          data-target="#rules_modal"
        >
          Rules
        </button>
        <RulesModal />
      </div>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/img/rook_${promotionTeamType()}.png`}
            alt="rook"
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/img/bishop_${promotionTeamType()}.png`}
            alt="bishop"
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/img/knight_${promotionTeamType()}.png`}
            alt="knight"
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/img/queen_${promotionTeamType()}.png`}
            alt="queen"
          />
        </div>
      </div>
      <div>
        <CapturedPawns
          team={TeamType.OPPONENT}
          capturedPawns={capturedPawns.black}
        />
        <div
          onMouseMove={(e) => movePiece(e)}
          onMouseDown={(e) => grabPiece(e)}
          onMouseUp={(e) => dropPiece(e)}
          id="chessboard"
          ref={chessboardRef}
        >
          {board}
        </div>
        <CapturedPawns
          team={TeamType.OUR}
          capturedPawns={capturedPawns.white}
        />
      </div>
    </>
  );
};

export default Chessboard;
