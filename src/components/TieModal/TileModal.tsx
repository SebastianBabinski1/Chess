import "./TileModal.css";

interface Props {
  image: string;
}

export const TieModal = ({ image }: Props) => {
  return (
    <div id="tie-modal" className="hidden">
      <div className="tie-modal_body">
        <img src={image} alt="Tie" />
        <p>Tie!</p>
        <p>Do you want to try again?</p>
        <div className="buttons-wrapper">
          <button onClick={() => console.log("Menu")}>Menu</button>
          <button onClick={() => console.log("Try again")}>Try again</button>
        </div>
      </div>
    </div>
  );
};
