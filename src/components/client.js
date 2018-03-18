import React from 'react';
import { Client } from 'boardgame.io/react';
import Drop from '../game';
import Board from './board';

import './client.css';

const DropClient = Client({
  game: Drop,
  board: Board,
  debug: false,
  multiplayer: true,
  numPlayers: 2
});

class DropApp extends React.Component {
  render() {
    return (
      <div className='client-container'>
        <h1>Drop</h1>
        <DropClient gameID={this.props.match.params.gameID} playerID={this.props.match.params.playerID} />
      </div>
    );
  }
}

export default DropApp;
