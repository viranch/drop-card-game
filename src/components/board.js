import React from 'react';
import Card from './card';

import './board.css';

class Board extends React.Component {
  canPlayCard(player, cardIdx) {
    if (!this.props.isActive || Number(this.props.ctx.currentPlayer) != player) {
      return false;
    }
    let cardPlayed = this.props.G.cardPlayed;
    return cardPlayed === null || cardPlayed%13 == this.props.G.players[player][cardIdx]%13;
  }

  canDrawFromOpenPile() {
    return this.props.isActive && this.props.G.cardPlayed && this.props.G.pile.length > 1
  }

  canDrawFromClosedPile() {
    return this.props.isActive && this.props.G.cardPlayed;
  }

  canDrop() {
    return this.props.isActive && !this.props.G.cardPlayed && this.props.ctx.turn >= this.props.ctx.numPlayers;
  }

  onCardClick(player, card) {
    if (this.canPlayCard(player, card)) {
      this.props.moves.playCard(card);
    }
  }

  onPileClick() {
    if (this.canDrawFromOpenPile()) {
      this.props.moves.pickFromPile();
      this.props.events.endTurn();
    }
  }

  onDrawClick() {
    if (this.canDrawFromClosedPile()) {
      this.props.moves.drawCard();
      this.props.events.endTurn();
    }
  }

  onDropClick() {
    if (this.canDrop()) {
      this.props.moves.drop();
      this.props.events.endTurn();
    }
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover != null) {
      winner = <div>Player {Number(this.props.ctx.gameover) + 1} wins!</div>;
    }

    let tbody = [];
    for(let i = 0; i < this.props.ctx.numPlayers; i++) {
      let cells = [];
      let cards = this.props.G.players[i] || Array(this.props.G.cardCounts[i]);
      cells.push(
        <td key={"Player"+i}>
          Player {i+1}
        </td>
      );
      for (let j=0; j<cards.length; j++) {
        let state = this.canPlayCard(i, j) ? 'clickable' : (cards[j] ? 'not-allowed' : null);
        cells.push(
          <td className={state} key={cards[j]} onClick={() => this.onCardClick(i, j)}>
            <Card cardNum={cards[j]} />
          </td>
        );
      }
      tbody.push(<tr key={"PlayerRow"+i}>{cells}</tr>);
    }

    // center pile
    let cells = [];
    cells.push(
      <td key="Pile">Pile</td>
    );
    let pile = this.props.G.pile;
    for(let i = 0; i < pile.length; i++) {
      if (i == 0) {
        cells.push(
          <td
            className={this.canDrawFromOpenPile() ? 'clickable' : 'not-allowed'}
            onClick={() => this.onPileClick()}
            key={pile[i]}
          >
            <Card cardNum={pile[i]} />
          </td>
        );
      } else {
        cells.push(
          <td className='not-allowed' key={pile[i]}>
            <Card cardNum={pile[i]} />
          </td>
        );
      }
    }
    cells.push(
      <td className={this.canDrawFromClosedPile() ? 'clickable' : 'not-allowed'} key="Draw" onClick={() => this.onDrawClick()}>
        Draw
      </td>
    );
    cells.push(
      <td className={this.canDrop() ? 'clickable' : 'not-allowed'} key="Drop" onClick={() => this.onDropClick()}>
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
