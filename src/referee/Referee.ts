import {
  PieceType,
  TeamType,
  Piece,
  Position,
  allPositions,
  samePosition,
} from "../Constants";
import { bishopMove } from "./rules/BishopRules";

import { kingMove, knightMove, pawnMove, queenMove, rookMove } from "./rules";

export default class Referee {
  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    //  WHITE +1
    // BLACK -1

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );

        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  // TODO
  // Prevent to move king into danger (king cant move near another king)
  // Add castling

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
    }
    return validMove;
  }

  possibleMoves(
    initialPosition: Position,
    desiredPosition: Position[],
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    let possibleMoves: Position[] = [];

    switch (type) {
      case PieceType.PAWN:
        desiredPosition.forEach((piece) => {
          let validMove = pawnMove(initialPosition, piece, team, boardState);
          const isEnPassantMove = this.isEnPassantMove(
            initialPosition,
            piece,
            PieceType.PAWN,
            team,
            boardState
          );
          if (validMove === true || isEnPassantMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
      case PieceType.KNIGHT:
        desiredPosition.forEach((piece) => {
          let validMove = knightMove(initialPosition, piece, team, boardState);
          if (validMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
      case PieceType.BISHOP:
        desiredPosition.forEach((piece) => {
          let validMove = bishopMove(initialPosition, piece, team, boardState);
          if (validMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
      case PieceType.ROOK:
        desiredPosition.forEach((piece) => {
          let validMove = rookMove(initialPosition, piece, team, boardState);
          if (validMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
      case PieceType.QUEEN:
        desiredPosition.forEach((piece) => {
          let validMove = queenMove(initialPosition, piece, team, boardState);
          if (validMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
      case PieceType.KING:
        desiredPosition.forEach((piece) => {
          let validMove = kingMove(initialPosition, piece, team, boardState);
          if (validMove === true) {
            possibleMoves.push(piece);
          }
        });
        break;
    }
    return possibleMoves;
  }

  allPawnsPossibleMoves(desiredPosition: Position[], boardState: Piece[]) {
    let allPossibleMoves: Position[] = [];

    boardState.forEach((piece, index) => {
      const possibleMoves = this.possibleMoves(
        piece.position,
        desiredPosition,
        piece.type,
        piece.team,
        boardState
      );
      allPossibleMoves = allPossibleMoves.concat(possibleMoves);
    });
    return allPossibleMoves;
  }

  isCheck(boardState: Piece[]): TeamType | undefined {
    const checkingPositions = allPositions();

    const allPawnsPossibleMoves = this.allPawnsPossibleMoves(
      checkingPositions,
      boardState
    );

    let isCheck;
    allPawnsPossibleMoves.forEach((position) => {
      boardState.forEach((piece) => {
        if (
          piece.type === PieceType.KING &&
          samePosition(position, piece.position)
        ) {
          isCheck = piece.team;
        }
      });
    });
    return isCheck;
  }
}
