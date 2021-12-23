import { playCard, flipCard, bidMoney, bidCards, passMoney } from "./moves";
import { Game } from "boardgame.io";
import { DivorceGameState, AllPlayersState } from "../types";
import {
  generateCards,
  generateGoals,
  generateInitialAuctionState,
} from "./gameData";
import ai from "./ai";
import { MEDIATION, BID_MONEY_STAGE } from "../constants";

const NUM_CARDS_IN_HAND = 6;

export const DivorceGame: Game<DivorceGameState> = {
  name: "divorce-game",

  setup(ctx, setupData): DivorceGameState {
    const itemCards = generateCards();
    const goalCards = generateGoals();

    const players = ctx.playOrder.reduce(
      (playerObject: AllPlayersState, playerKey: string) => {
        const hand = itemCards.splice(0, NUM_CARDS_IN_HAND);
        const goals = [goalCards.colors.pop()!, goalCards.categories.pop()!];

        playerObject[playerKey] = {
          hand,
          goals,
          money: 40,
          collection: [],
        };

        return playerObject;
      },
      {}
    );

    return {
      players,
      deck: itemCards,
      publicGoals: [goalCards.colors.pop()!, goalCards.categories.pop()!],
      auction: generateInitialAuctionState(),
      roundTwoRiver: [],
    };
  },

  phases: {
    negotiation: {
      moves: {
        playCard,
      },

      turn: {
        onEnd: (G, ctx) => {
          G.auction = generateInitialAuctionState();

          const newCard = G.deck.pop()!;

          if (newCard.id === MEDIATION) {
            ctx.events?.endPhase();
          } else {
            G.players[ctx.currentPlayer].hand.push(newCard);
          }
        },
        stages: {
          [BID_MONEY_STAGE]: {
            moves: {
              bidMoney,
              passMoney,
            },
          },
        },
      },

      next: "mediation",
      start: true,
      onEnd: () => {
        // thow away money, shuffle hands into deck
      },
    },

    mediation: {
      moves: { flipCard },
    },
  },
  ai,
  turn: {
    stages: {
      bidCardStage: {
        moves: {
          bidCards,
        },
      },
    },
  },
  endIf: (G, ctx) => {
    if (ctx.phase === MEDIATION) {
      let winner: number;
      const points = {
        0: 0,
        1: 0,
      };

      const privateGoals = [...G.players[0].goals, ...G.players[1].goals];
      privateGoals.forEach((goal) => {
        G.players.forEach((player) => {
          player.hand.forEach((card) => {
            if (card[goal.type] === goal.id) {
              points[player.id] += 1;
            }
          });
        });
        goal.type;
      });

      if (points[0] > points[1]) {
        winner = 0;
      } else {
        winner = 1;
      }

      return {
        winner,
      };
    }
    // if (IsVictory(G.cells)) {
    //   return { winner: ctx.currentPlayer };
    // }
    // if (IsDraw(G.cells)) {
    //   return { draw: true };
    // }
  },
};
