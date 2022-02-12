import React, { useState } from "react";
import "./App.css";
import { CheckMateModal } from "./components/CheckMateModal/CheckMateModal";
import Chessboard from "./components/Chessboard/Chessboard";
import { Menu } from "./components/Menu/Menu";
import { TieModal } from "./components/TieModal/TileModal";

const App = () => {
  const [start, setStart] = useState(false);
  const [mode, setMode] = useState("normal");

  const switchState = (checkedMode: boolean) => {
    setStart(!start);
    if (checkedMode === true) {
      setMode("easy");
    } else {
      setMode("normal");
    }
  };

  return (
    <div id="app">
      {start ? (
        <>
          <CheckMateModal image={`assets/img/king_w.png`} team={"white"} />
          <Chessboard mode={mode} />;
          <TieModal image={`assets/img/handshake.webp`} />
        </>
      ) : (
        <Menu switchState={switchState} />
      )}
    </div>
  );
};

export default App;
