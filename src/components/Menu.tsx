import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { RulesModal } from "./RulesModal";
import { AuthorModal } from "./AuthorModal";
import { useState } from "react";

interface Props {
  switchState: Function;
}

export const Menu = ({ switchState }: Props) => {
  const [mode, setMode] = useState(false);
  return (
    <div id="menu">
      <div className="menu_body">
        <div className="images_wrapper">
          <img src={"assets/img/knight_w.png"} alt="knight" />
          <img src={"assets/img/bishop_b.png"} alt="bishop" />
        </div>
        <p className="game_title">Chess</p>
        <div className="buttons-wrapper">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => switchState(mode)}
          >
            Start game
          </button>

          {/* Button trigger modal  */}
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-toggle="modal"
            data-target="#author_modal"
          >
            Author
          </button>
          <AuthorModal />

          {/* Button trigger modal  */}
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
        <p>Select difficulty mode:</p>
        <BootstrapSwitchButton
          checked={false}
          onstyle="secondary"
          width={100}
          height={50}
          onlabel={"easy"}
          offlabel={"normal"}
          onChange={(checked: boolean) => {
            setMode(checked);
          }}
        />
      </div>
    </div>
  );
};
