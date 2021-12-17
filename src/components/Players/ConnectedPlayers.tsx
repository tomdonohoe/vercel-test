import { FunctionComponent } from "react";

import Player from './Player';

interface ConnectedPlayersProps {
  state: any;
}

const ConnectedPlayers: FunctionComponent<ConnectedPlayersProps> = ({
  state,
}) => {
  console.log('state: ')
    console.log(state);

    return (
      <div>
      <h3>Players: { state?.players?.length }</h3>
      <ul>
        { state?.players && state?.players.map(player => (
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