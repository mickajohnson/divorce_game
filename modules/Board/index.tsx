import React, { SyntheticEvent, useState } from "react";
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
  const [bid, setBid] = useState(0);
  const handleSubmitBid = () => {
    moves.bidMoney(bid);
    setBid(0);
  };

  return (
    <div className={styles.container}>
      <h3>
        Player {playerID} - {isActivePlayer ? "" : "not"} your turn
      </h3>
      <div className={styles.middleArea}>
        <p>Public Goals: {G.publicGoals.map((goal) => goal.name).join(", ")}</p>
        {G.auction.card ? (
          <>
            <ItemCard card={G.auction.card} />
            <p>
              Current bid: {G.auction.currentBid} -{" "}
              {`Player ${G.auction.highestBidder}`}
            </p>
          </>
        ) : null}
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
      {isActivePlayer && (
        <>
          <input
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            type="number"
          />
          <button onClick={handleSubmitBid}>Submit</button>
          <button onClick={() => moves.passMoney()}>Pass</button>
        </>
      )}
      <div>
        <p>
          Your Private Goals:{" "}
          {G.players[playerID].goals.map((goal) => goal.name).join(", ")}{" "}
        </p>
        <p>
          {"Your Collection: "}
          {G.players[playerID].collection
            .map((collectionCard) => collectionCard.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
