import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";
import { Menu } from "./components/Menu";
import { TieModal } from "./components/TileModal";
import { WinModal } from "./components/WinModal";
import { TeamType } from "./Constants";

export type AppContextType = {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  start: false,
  setStart: () => {},
});

export const useGlobalContext = () => useContext(AppContext);

const App = () => {
  const [mode, setMode] = useState("normal");
  const [start, setStart] = useState(false);
  const [player, setPlayer] = useState(TeamType.OUR);

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
      <AppContext.Provider value={{ start, setStart }}>
        {start ? (
          <>
            <Chessboard mode={mode} setPlayer={setPlayer} />;
            <TieModal />
            <WinModal team={player} />
          </>
        ) : (
          <Menu switchState={switchState} />
        )}
      </AppContext.Provider>
    </div>
  );
};

export default App;
