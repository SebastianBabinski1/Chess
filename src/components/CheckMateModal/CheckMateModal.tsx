import "./CheckMateModal.css";

interface Props {
  image: string;
  team: string;
}

export const CheckMateModal = ({ image, team }: Props) => {
  return (
    <div id="check-mate-modal" className="hidden">
      <div className="check-mate-modal_body">
        <img src={image} alt="Winner" />
        <p>Congratulations! {team} wins this game!</p>
        <p>Do you want to try again?</p>
        <div className="buttons-wrapper">
          <button onClick={() => console.log("Menu")}>Menu</button>
          <button onClick={() => console.log("Try again")}>Try again</button>
        </div>
      </div>
    </div>
  );
};
