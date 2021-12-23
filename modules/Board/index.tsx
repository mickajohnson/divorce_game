import type { BoardProps } from "boardgame.io/react";
import { DivorceGameState } from "../../types";
import styles from "./Board.module.scss";
import ItemCard from "../ItemCard";

interface DivorceGameProps extends BoardProps {
  G: DivorceGameState;
  playerID: string;
}

export function DivorceGameBoard({
  G,
  moves,
  playerID,
  isActive: isActivePlayer,
  ctx,
  matchData,
}: DivorceGameProps) {
  return (
    <div className={styles.container}>
      <div className={styles.middleArea}>
        <div>{G.auction.card ? <ItemCard card={G.auction.card} /> : null}</div>
      </div>
      <div className={styles.hand}>
        {G.players[playerID].hand.map((handCard) => (
          <ItemCard
            card={handCard}
            key={handCard.id}
            onDoubleClick={() => moves.playCard(handCard.id)}
          />
        ))}
      </div>
      <p>Money: {G.players[playerID].money}</p>
    </div>
  );
}
