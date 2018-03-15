import React from 'react';
import { Client } from 'boardgame.io/react';
import Drop from './game';
import Board from './board';

const DropClient = Client({
  game: Drop,
  board: Board,
  debug: false,
  multiplayer: true,
  numPlayers: 4
});

class DropApp extends React.Component {
  render() {
    return (
      <div style={{ padding: 50 }}>
        <h1>Drop</h1>
        <div className="runner">
          <div className="run">
            <DropClient gameID={this.props.match.params.gameID} playerID={this.props.match.params.playerID} />
          </div>
        </div>
      </div>
    );
  }
}

export default DropApp;
