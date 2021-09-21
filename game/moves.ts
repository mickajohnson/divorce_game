import { Move } from "boardgame.io";
import { DivorceGameState } from "../types";

export const playCard: Move<DivorceGameState> = (G, ctx, cardId: string) => {
  G.auction.card = cardId;

  //remove card from player hand

  ctx.events.setStage("bidMoneyStage");
};

export const bidMoney: Move<DivorceGameState> = (G, ctx, amount: number) => {
  G.auction.currentBid = amount;

  // Subtract money
  ctx.events.setActivePlayers({
    others: "bidMoneyStage",
    minMoves: 1,
    maxMoves: 1,
  });
};

export const passMoney: Move<DivorceGameState> = (G, ctx) => {
  ctx.events.setActivePlayers({
    others: "bidMoneyStage",
    minMoves: 1,
    maxMoves: 1,
  });
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
