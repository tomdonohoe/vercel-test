import { FunctionComponent, useState } from "react";

import { generateName } from '../helpers/util/generateName.helpers';

interface CreateGameFormProps {
    updateFriendlyName: (name: string) => void;
    updateGameId: (gameId: string) => void;
}

const CreateGameForm: FunctionComponent<CreateGameFormProps> = ({
    updateFriendlyName,
    updateGameId,
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

    const handleCreateGame = () => {
        updateFriendlyName(friendlyName);
        const gameId = getOrCreateGameId();
        updateGameId(gameId);
    }

    const handleJoinGame = () => {
        updateFriendlyName(friendlyName);
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
