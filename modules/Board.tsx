import type { BoardProps } from "boardgame.io/react";
import { DivorceGameState, ItemCard } from "../types";
import BoardStyles from "./Board.module.scss";

interface HandCardProps {
  card: ItemCard;
  onDoubleClick: () => {}; // needs to be optional and better typed
}

function HandCard({ card, onDoubleClick }: HandCardProps) {
  return (
    <div onDoubleClick={onDoubleClick} className={BoardStyles.cardContainer}>
      {card.name}
    </div>
  );
}

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
    <div className={BoardStyles.container}>
      <div>{G.auction.card ? <HandCard card={G.auction.card} /> : null}</div>
      <div className={BoardStyles.hand}>
        {G.players[playerID].hand.map((handCard) => (
          <HandCard
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
