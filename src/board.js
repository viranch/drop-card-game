import React from 'react';

function displayCard(cardNo) {
  let suits = ['♣', '♦', '♥', '♠'];
  let ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  return suits[Math.floor(cardNo / 13)] + ranks[cardNo % 13];
}

function imgCard(cardNo) {
  if (cardNo == null) {
    return "https://i.pinimg.com/564x/6c/a0/16/6ca016115a894f69dea75cc80f95ad92.jpg";
  }
  let suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(cardNo / 13)];
  let rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'][cardNo % 13];
  return `https://cdn.rawgit.com/twistdigital/responsive-playing-cards/master/minified/${suit}/${rank}${suit[0]}.svg`;
}

class Board extends React.Component {
  onCardClick(player, card) {
    if (this.props.isActive && this.props.ctx.currentPlayer == player) {
      this.props.moves.playCard(card);
    }
  }

  onPileClick() {
    if (this.props.isActive && this.props.G.cardPlayed && this.props.G.pile.length > 1) {
      this.props.moves.pickFromPile();
      this.props.events.endTurn();
    }
  }

  onDrawClick() {
    if (this.props.isActive && this.props.G.cardPlayed) {
      this.props.moves.drawCard();
      this.props.events.endTurn();
    }
  }

  onDropClick() {
    if (this.props.isActive && !this.props.G.cardPlayed) {
      this.props.moves.drop();
      this.props.events.endTurn();
    }
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover != null) {
      winner = <div>Player {Number(this.props.ctx.gameover) + 1} wins!</div>;
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '70px',
      height: '50px',
      lineHeight: '30px',
      textAlign: 'center',
      borderRadius: '10px',
    };

    let tbody = [];
    for(let i = 0; i < this.props.ctx.numPlayers; i++) {
      let cells = [];
      let cards = this.props.G.players[i] || Array(this.props.G.cardCounts[i]);
      cells.push(
        <td style={cellStyle} key={"Player"+i}>
          Player {i+1}
        </td>
      );
      for (let j=0; j<cards.length; j++) {
        cells.push(
          <td style={cellStyle} key={i*5 + j} onClick={() => this.onCardClick(i, j)}>
            <img src={imgCard(cards[j])} alt={displayCard(cards[j])} width="60"/>
          </td>
        );
      }
      tbody.push(<tr key={"PlayerRow"+i}>{cells}</tr>);
    }

    // center pile
    let cells = [];
    cells.push(
      <td key="Pile" style={cellStyle}>Pile</td>
    );
    let pile = this.props.G.pile;
    for(let i = 0; i < pile.length; i++) {
      if (i == 0) {
        cells.push(
          <td style={cellStyle} key={this.props.ctx.numPlayers*5 + i} onClick={() => this.onPileClick()}>
            <img src={imgCard(pile[i])} alt={displayCard(pile[i])} width="60"/>
          </td>
        );
      } else {
        cells.push(
          <td style={cellStyle} key={this.props.ctx.numPlayers*5 + i}>
            <img src={imgCard(pile[i])} alt={displayCard(pile[i])} width="60"/>
          </td>
        );
      }
    }
    cells.push(
      <td style={cellStyle} key="Draw" onClick={() => this.onDrawClick()}>
        Draw
      </td>
    );
    cells.push(
      <td style={cellStyle} key="Drop" onClick={() => this.onDropClick()}>
        Drop!
      </td>
    );
    tbody.push(<tr key="PileRow">{cells}</tr>);

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

export default Board;
