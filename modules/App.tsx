import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { DivorceGame } from "./Game";
import { DivorceGameBoard } from "./Board";

const DivorceGameClient = Client({
  game: DivorceGame,
  board: DivorceGameBoard,
  multiplayer: Local(),
});

const App = () => (
  <div>
    <DivorceGameClient playerID="0" />
    <DivorceGameClient playerID="1" />
  </div>
);

export default App;
