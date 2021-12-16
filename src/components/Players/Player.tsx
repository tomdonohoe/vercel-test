import { FunctionComponent } from "react";

interface PlayerProps {
  player: any;
}

const Player: FunctionComponent<PlayerProps> = ({
  player,
}) => {

    return (
      <li>
       { player.friendlyName }
      </li>
    )
}

export default Player;
