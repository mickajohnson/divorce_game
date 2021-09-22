import find from "lodash/find";
import remove from "lodash/remove";
import { Move } from "boardgame.io";
import { DivorceGameState } from "../types";
import { generateInitialAuctionState } from "./gameData";

export const playCard: Move<DivorceGameState> = (G, ctx, cardId: string) => {
  const card = find(G.players[ctx.currentPlayer].hand, { id: cardId });

  remove(G.players[ctx.currentPlayer].hand, { id: cardId });

  G.auction.card = card;

  ctx.events.setStage("bidMoneyStage");
};

export const bidMoney: Move<DivorceGameState> = (G, ctx, amount: number) => {
  const playerId = Object.keys(ctx.activePlayers || {})[0];
  G.auction.currentBid = amount;
  G.auction.highestBidder = playerId;

  // Subtract money
  ctx.events.setActivePlayers({
    others: "bidMoneyStage",
    minMoves: 1,
    maxMoves: 1,
  });
};

export const passMoney: Move<DivorceGameState> = (G, ctx) => {
  const playerId = Object.keys(ctx.activePlayers || {})[0];
  const { highestBidder, currentBid, card } = G.auction;

  G.auction.passedPlayers.push(playerId);

  if (G.auction.passedPlayers.length === 2) {
    G.players[ctx.currentPlayer].collection.push(card);
    ctx.events?.endTurn();
  } else if (G.auction.passedPlayers.length === 1 && currentBid !== 0) {
    G.players[highestBidder].money -= currentBid;
    G.players[highestBidder].collection.push(card);
    ctx.events?.endTurn();
  } else {
    ctx.events.setActivePlayers({
      others: "bidMoneyStage",
      minMoves: 1,
      maxMoves: 1,
    });
  }
};

export const flipCard: Move<DivorceGameState> = (G, ctx) => {
  ctx.events.setStage("bidCardStage");
};

export const bidCards: Move<DivorceGameState> = (G, ctx) => {
  ctx.events.setActivePlayers({
    others: "bidCardStage",
    minMoves: 1,
    maxMoves: 1,
  });
};
