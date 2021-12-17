import { FunctionComponent, useState } from "react";

import { generateName } from '../../helpers/util/generateName.helpers';

interface CreateGameFormProps {
    updateFriendlyName: (name: string) => void;
    updateGameId: (gameId: string) => void;
    hostGame: (gameId: string, friendlyName: string) => void;
    joinGame: (gameId: string, friendlyName: string) => void;
}

const CreateGameForm: FunctionComponent<CreateGameFormProps> = ({
    updateFriendlyName,
    updateGameId,
    hostGame,
    joinGame,
}) => {
    const [friendlyName, setFriendlyName] = useState<string>(generateName(2));
    const urlParams = new URLSearchParams(window.location.search);
    const queryGameId = urlParams.get("gameId");

    const getOrCreateGameId = () => {
        return queryGameId || generateName(3, "-").toLocaleLowerCase();
    }

    const isJoinLink = () => {
        return [...urlParams.keys()].indexOf("join") > -1;
    }

    const handleFriendlyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendlyName(event.target.value)
    }

    const handleCreateGame = async () => {
        const gameId = getOrCreateGameId();
        hostGame(gameId, friendlyName);
        updateFriendlyName(friendlyName);
        updateGameId(gameId);
    }

    const handleJoinGame = () => {
        const gameId = getOrCreateGameId();
        updateFriendlyName(friendlyName);
        updateGameId(gameId);
        joinGame(gameId, friendlyName);
    }

    return (
        <form>
            <h2>Start a new game:</h2>
            <label>Enter your name</label>
            <input type="text" value={friendlyName} onChange={handleFriendlyNameChange} />

            { !isJoinLink() && (
                <button onClick={handleCreateGame}>Create Game</button>
            )}

            { isJoinLink() && (
                <button onClick={handleJoinGame}>Join a Session</button>
            )}
      </form> 
    )
};

export default CreateGameForm;
