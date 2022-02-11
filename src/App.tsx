import React from "react";
import "./App.css";
import { CheckMateModal } from "./components/CheckMateModal/CheckMateModal";
import Chessboard from "./components/Chessboard/Chessboard";
import { TieModal } from "./components/TieModal/TileModal";

function App() {
  return (
    <div id="app">
      <CheckMateModal image={`assets/img/king_w.png`} team={"white"} />
      <Chessboard />;
      <TieModal image={`assets/img/handshake.webp`} />
    </div>
  );
}

export default App;
