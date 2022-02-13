interface Props {
  id: string;
  image?: string;
  number: number;
  team?: number;
}

export default function Tile({ id, number, image, team }: Props) {
  let currentPlayer;
  if (team === 0) {
    currentPlayer = "black-piece";
  } else if (team === 1) {
    currentPlayer = "white-piece";
  }

  if (number % 2 === 0) {
    return (
      <div id={id} className="tile black-tile">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={`chess-piece ${currentPlayer}`}
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div id={id} className="tile white-tile">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={`chess-piece ${currentPlayer}`}
          ></div>
        )}
      </div>
    );
  }
}
