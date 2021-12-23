import { Ctx } from "boardgame.io";
import { DivorceGameState } from "../types";

const ai = {
  enumerate: (G: DivorceGameState, ctx: Ctx, playerID: string) => {
    let moves = [];

    console.log(ctx.activePlayers && ctx.activePlayers[playerID]);

    if (ctx.activePlayers && ctx.activePlayers[playerID]) {
      console.log(ctx.activePlayers[playerID]);

      for (
        let amount = G.auction.currentBid + 1;
        amount <= G.players[playerID].money;
        amount++
      ) {
        moves.push({ move: "bidMoney", args: [amount] });
      }
      moves.push({ move: "passMoney", args: [] });
    } else if (ctx.currentPlayer === playerID) {
      G.players[playerID].hand.forEach((handCard) => {
        moves.push({ move: "playCard", args: [handCard.id] });
      });
    }

    return moves;
  },
};

export default ai;
