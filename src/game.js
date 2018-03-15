import { Game, PlayerView } from 'boardgame.io/core';
import { Random } from 'boardgame.io/core';

const Drop = Game({
  name: 'drop2',
  playerView: PlayerView.STRIP_SECRETS,

  setup: (numPlayers) => {
    const G = {
      pile: [],
      cardPlayed: false,
      dropped: false,
      deck: Random.Shuffle([...Array(52).keys()]),
      players: {},
      cardCounts: Array(numPlayers).fill(5),
    };
    for (let x = 0; x < numPlayers; x++) {
      G.players[x] = G.deck.splice(0, 5).sort((a, b) => a%13 - b%13);
    }

    return G;
  },

  moves: {
    playCard(G, ctx, cardIdx) {
      let pile = [...G.pile];
      let players = {...G.players};
      let card = players[ctx.currentPlayer].splice(cardIdx, 1);
      let cardCounts = [...G.cardCounts];
      cardCounts[ctx.currentPlayer]--;
      let cardPlayed = true;
      pile.push(card);
      return { ...G, players, cardCounts, pile, cardPlayed };
    },

    pickFromPile(G, ctx) {
      let pile = [...G.pile];
      let players = {...G.players};
      let card = pile.splice(0, 1)[0];
      players[ctx.currentPlayer].push(card);
      return { ...G, players, pile };
    },

    drawCard(G, ctx) {
      let deck = [...G.deck];
      let players = {...G.players};
      players[ctx.currentPlayer].push(deck.pop());
      return { ...G, players, deck };
    },

    drop(G, ctx) {
      let dropped = true;
      return { ...G, dropped };
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (G.dropped) {
        let totals = Array(ctx.numPlayers).fill(0);
        for(let x = 0; x < ctx.numPlayers; x++) {
          totals[x] = G.players[x].map((val, _) => Math.min(val%13 + 1, 10)).reduce((a, b) => a + b, 0);
        }
        let currentTotal = totals.splice(ctx.currentPlayer, 1)[0];
        if (totals.every((total) => total > currentTotal)) {
          return ctx.currentPlayer;
        }
      }
    },

    onTurnBegin: (G, ctx) => {
      let cardPlayed = false;
      let dropped = false;
      let pile = [...G.pile];
      if (pile.length > 1) pile.splice(0, 1);
      return { ...G, pile, cardPlayed, dropped };
    },

    onTurnEnd: (G, ctx) => {
      let players = {...G.players};
      players[ctx.currentPlayer].sort((a, b) => a%13 - b%13);
      let cardCounts = [...G.cardCounts];
      cardCounts[ctx.currentPlayer] = players[ctx.currentPlayer].length;
      return { ...G, players, cardCounts };
    }
  }
});

export default Drop;
