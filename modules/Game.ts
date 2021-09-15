function playCard(G, ctx) {
  ctx.events.setStage("bidMoney");
}

function bidMoney(G, ctx) {
  ctx.events.setActivePlayers({
    others: "bidMoney",
    minMoves: 1,
    maxMoves: 1,
  });
}
function flipCard(G, ctx) {
  ctx.events.setStage("bidCards");
}

function bidCards(G, ctx) {
  ctx.events.setActivePlayers({
    others: "bidCards",
    minMoves: 1,
    maxMoves: 1,
  });
}

export const DivorceGame = {
  name: "divorce-game",

  // Function that returns the initial value of G.
  // setupData is an optional custom object that is
  // passed through the Game Creation API.
  setup: (ctx, setupData) => {
    return {};
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
      bidMoney: {
        moves: {
          bidMoney,
        },
      },
      bidCards: {
        moves: {
          bidCards,
        },
      },
    },
  },
};
