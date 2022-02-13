import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard/Chessboard";
import { Menu } from "./components/Menu/Menu";
import { TieModal } from "./components/TieModal/TileModal";
import { WinModal } from "./components/WinModal/WinModal";

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
  // mode should be removed and switchState should be in Chessboard
  const [mode, setMode] = useState("normal");
  const [start, setStart] = useState(false);

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
            {/* Here image and team should be repaired */}
            <Chessboard mode={mode} />;
            <TieModal />
            <WinModal image={`assets/img/king_w.png`} team={"white"} />
          </>
        ) : (
          <Menu switchState={switchState} />
        )}
      </AppContext.Provider>
    </div>
  );
};

export default App;
