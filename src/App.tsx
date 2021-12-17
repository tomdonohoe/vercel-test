import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

import CreateGameForm from './components/CreateGame/CreateGameForm';
import InviteLink from './components/CreateGame/InviteLink';
import ConnectedPlayers from './components/Players/ConnectedPlayers';
import RoastPhoto from './components/RoastPhoto';

import { Categories, PhotoDetails } from './types';

// P2P
import {
  PubSubClient,
  P2PServer,
  P2PClient,
  Identity,
  handleMessagefromAbly,
} from './helpers/p2p/';

function App() {
  // warmup api
  fetch('/api/status');
  const [gameId, setGameId] = useState<any>(null);
  const [friendlyName, setFriendlyName] = useState<any>(null);
  const [p2pClient, setP2pClient] = useState<any>(null);
  const [p2pServer, setP2pServer] = useState<any>(null);

  // useEffect(() => {
  //   const connectServer = async () => {
  //     await p2pServer.connect();
  //   }

  //   const connectClient = async () => {
  //     await p2pClient.connect();
  //   }

  //   if (p2pServer !== null && p2pServer.uniqueId === undefined ) {
  //     connectServer();
  //   }

  //   if (p2pClient !== null) {
  //     connectClient();
  //   }

  // }, [p2pClient, p2pServer]);

  const [alreadyUsedIds, setAlreadyUsedIds] = useState<PhotoDetails[] | undefined>(undefined);

  const updateAlreadyUsedIds = (photo: PhotoDetails) => {
    if (alreadyUsedIds) {
      setAlreadyUsedIds([...alreadyUsedIds, photo]);
    } else {
      setAlreadyUsedIds([photo]);
    }
  }

  const hostGame = async (gameId: string, friendlyName: string) => {
    const pubSubClient = new PubSubClient();
    const identity = new Identity(friendlyName);

    const server = new P2PServer(identity, gameId, pubSubClient);
    const client = new P2PClient(identity, gameId, pubSubClient);

    pubSubClient.setOnMessageReceivedCallback((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, client, server);
    });

    server.connect();
    client.connect();

    console.log(server);
    console.log(client);

    setP2pServer(server);
    setP2pClient(client);

    // await server.connect();
    // await client.connect();
  }

  const joinGame = async (gameId: string, friendlyName: string) => {
    const pubSubClient = new PubSubClient();
    const identity = new Identity(friendlyName);
    const client = new P2PClient(identity, gameId, pubSubClient);

    setP2pClient(client);

    pubSubClient.setOnMessageReceivedCallback((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, client, p2pServer);
    });

    // await client.connect();
  }

  const joinedOrHosting = () => {
    return p2pClient != null || p2pServer != null;
  }

  const updateFriendlyName = (name: string) => {
    setFriendlyName(name);
  }

  const updateGameId = (GameId: string) => {
    setGameId(GameId);
  }

  return (
    <div className="App">
      <header className="App-header">

        {
          !joinedOrHosting() ? (
            <CreateGameForm
              updateFriendlyName={updateFriendlyName}
              updateGameId={updateGameId}
              hostGame={hostGame}
              joinGame={joinGame}
            />
          ) : (
            <>
            {/* <InviteLink gameId={gameId} /> */}
            <ConnectedPlayers state={p2pClient.serverState}/>
            </>
          )
        }

        <RoastPhoto 
          category={Categories.HAPPY}
          alreadyUsedIds={alreadyUsedIds}
          setAlreadyUsedIds={updateAlreadyUsedIds}
        />

      </header>
    </div>
  );
}

export default App;
