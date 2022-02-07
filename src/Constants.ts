export const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export interface CheckState {
  white: boolean;
  black: boolean;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  OUR,
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

export interface CapturedPieces {
  white: number[];
  black: number[];
}

export const initialBoardState: Piece[] = [
  {
    image: `assets/img/rook_b.png`,
    position: { x: 0, y: 7 },
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/knight_b.png`,
    position: { x: 1, y: 7 },
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/bishop_b.png`,
    position: { x: 2, y: 7 },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/queen_b.png`,
    position: { x: 3, y: 7 },
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/king_b.png`,
    position: { x: 4, y: 7 },
    type: PieceType.KING,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/bishop_b.png`,
    position: { x: 5, y: 7 },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/knight_b.png`,
    position: { x: 6, y: 7 },
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/rook_b.png`,
    position: { x: 7, y: 7 },
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 0, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 1, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 2, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 3, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 4, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 5, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 6, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/pawn_b.png`,
    position: { x: 7, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/img/rook_w.png`,
    position: { x: 0, y: 0 },
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/knight_w.png`,
    position: { x: 1, y: 0 },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/bishop_w.png`,
    position: { x: 2, y: 0 },
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/queen_w.png`,
    position: { x: 3, y: 0 },
    type: PieceType.QUEEN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/king_w.png`,
    position: { x: 4, y: 0 },
    type: PieceType.KING,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/bishop_w.png`,
    position: { x: 5, y: 0 },
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/knight_w.png`,
    position: { x: 6, y: 0 },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/rook_w.png`,
    position: { x: 7, y: 0 },
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 0, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 1, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 2, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 3, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 4, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 5, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 6, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/img/pawn_w.png`,
    position: { x: 7, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
];

export const allPositions = () => {
  let positions: Position[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      positions.push({ x: i, y: j });
    }
  }
  return positions;
};
