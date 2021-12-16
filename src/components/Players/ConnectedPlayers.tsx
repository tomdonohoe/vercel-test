import { FunctionComponent } from "react";

import Player from './Player';

interface ConnectedPlayersProps {
  gameState: any;
}

const ConnectedPlayers: FunctionComponent<ConnectedPlayersProps> = ({
  gameState,
}) => {

    return (
      <div>
      <h3>Players: { gameState?.players?.length }</h3>
      <ul>
        { gameState?.players && gameState?.players.map(player => (
          <Player
            key={player.clientId}
            player={player}
          />
        ))
        }
      </ul>
    </div>
    )
}

export default ConnectedPlayers;