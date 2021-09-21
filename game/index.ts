import { playCard, flipCard, bidMoney, bidCards, passMoney } from "./moves";
import { Game } from "boardgame.io";
import { DivorceGameState, AllPlayersState, GoalCard } from "../types";
import { generateCards, generateGoals } from "./gameData";

export const DivorceGame: Game<DivorceGameState> = {
  name: "divorce-game",

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup(ctx, setupData) {
    const itemCards = generateCards();
    const goalCards = generateGoals();

    const players = ctx.playOrder.reduce(
      (playerObject: AllPlayersState, playerKey: string) => {
        const hand = itemCards.splice(0, 4);
        const goals = [goalCards.colors.pop(), goalCards.categories.pop()];

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
      publicGoals: [goalCards.colors.pop(), goalCards.categories.pop()],
      auction: {
        card: null,
        currentBid: 0,
        highestBidder: null,
      },
    };
  },

  phases: {
    mediation: {
      moves: {
        playCard,
        //drawCard
      },

      next: "arbitration",
      start: true,
      onEnd: () => {
        // thow away money, shuffle hands into deck
      },
    },

    arbitration: {
      moves: { flipCard },
    },
  },

  turn: {
    stages: {
      bidMoneyStage: {
        moves: {
          bidMoney,
          passMoney,
        },
      },
      bidCardStage: {
        moves: {
          bidCards,
        },
      },
    },
  },
};
