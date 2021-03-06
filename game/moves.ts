import find from "lodash/find";
import remove from "lodash/remove";
import { Move } from "boardgame.io";
import { DivorceGameState } from "../types";
import { BID_MONEY_STAGE } from "../constants";
import { INVALID_MOVE } from "boardgame.io/core";

export const playCard: Move<DivorceGameState> = (G, ctx, cardId: string) => {
  const card = find(G.players[ctx.currentPlayer].hand, { id: cardId });

  remove(G.players[ctx.currentPlayer].hand, { id: cardId });

  if (card) {
    G.auction.card = card;
  } else {
    return INVALID_MOVE;
  }

  ctx.events?.setActivePlayers({
    currentPlayer: BID_MONEY_STAGE,
    minMoves: 1,
    maxMoves: 1,
  });
};

export const bidMoney: Move<DivorceGameState> = (G, ctx, amount: number) => {
  if (!ctx.activePlayers) {
    return INVALID_MOVE;
  }

  const playerId = Object.keys(ctx.activePlayers)[0];

  if (
    amount <= +G.auction.currentBid ||
    G.players[playerId].money - amount < 0
  ) {
    return INVALID_MOVE;
  }

  G.auction.currentBid = amount;
  G.auction.highestBidder = playerId;
  const whoNextStage =
    playerId === ctx.currentPlayer
      ? { others: BID_MONEY_STAGE }
      : { currentPlayer: BID_MONEY_STAGE };

  ctx.events?.setActivePlayers({
    ...whoNextStage,
    minMoves: 1,
    maxMoves: 1,
  });
};

export const passMoney: Move<DivorceGameState> = (G, ctx) => {
  const playerId = Object.keys(ctx.activePlayers || {})[0];
  const { highestBidder, currentBid, card } = G.auction;

  G.auction.passedPlayers.push(playerId);

  if (G.auction.passedPlayers.length === 2) {
    G.roundTwoRiver.push(card!);
    ctx.events?.endTurn();
  } else if (G.auction.passedPlayers.length === 1 && highestBidder) {
    G.players[highestBidder].money -= currentBid;
    G.players[highestBidder].collection.push(card!);
    ctx.events?.endTurn();
  } else {
    ctx.events?.setActivePlayers({
      others: BID_MONEY_STAGE,
      minMoves: 1,
      maxMoves: 1,
    });
  }
};

export const flipCard: Move<DivorceGameState> = (G, ctx) => {
  ctx.events?.setStage("bidCardStage");
};

export const bidCards: Move<DivorceGameState> = (G, ctx) => {
  ctx.events?.setActivePlayers({
    others: "bidCardStage",
    minMoves: 1,
    maxMoves: 1,
  });
};
