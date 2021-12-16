import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import CreateGameForm from './components/CreateGame/CreateGameForm';
import InviteLink from './components/CreateGame/InviteLink';
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

interface ApiRes {
  name: string;
  description: string;
}

export enum ClientType {
  HOST,
  GUEST
}

function App() {
  // warmup api
  fetch('/api/status');
  const [gameId, setGameId] = useState<any>(null);
  const [friendlyName, setFriendlyName] = useState<any>(null);
  const [p2pClient, setP2pClient] = useState<any>(null);
  const [p2pServer, setP2pServer] = useState<any>(null);
  const [data, setData] = useState<ApiRes | undefined>();
  const [alreadyUsedIds, setAlreadyUsedIds] = useState<PhotoDetails[] | undefined>(undefined);
  
  useEffect(() => {
    getData();
    // getPhoto();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch('/api/test/index?name=tom');
      if (res) {
        const data = await res.json();
        setData(data.data);
      };
    } catch (err) {
      console.log(err);
    }
  }

  const updateAlreadyUsedIds = (photo: PhotoDetails) => {
    if (alreadyUsedIds) {
      setAlreadyUsedIds([...alreadyUsedIds, photo]);
    } else {
      setAlreadyUsedIds([photo]);
    }
  }

  const hostGame = async (gameId: string, friendlyName: string) => {
    const pubSubClient = new PubSubClient((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, p2pClient, p2pServer);
    });

    const identity = new Identity(friendlyName);

    const server = new P2PServer(identity, gameId, pubSubClient);
    const client = new P2PClient(identity, gameId, pubSubClient);

    server.connect();
    client.connect();

    setP2pServer(server);
    setP2pClient(client);
  }

  const joinGame = async (gameId: string, friendlyName: string) => {
    const pubSubClient = new PubSubClient((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, p2pClient, p2pServer);
    });

    const identity = new Identity(friendlyName);
    const client = new P2PClient(identity, gameId, pubSubClient);
    setP2pClient(client);

    client.connect();
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
        <img src={logo} className="App-logo" alt="logo" />
        { data && (
          <>
          <p>
          Name: {data.name}
          </p>
          <p>
          Description: {data.description}
          </p>
          </>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {
          !joinedOrHosting() ? (
            <CreateGameForm
              updateFriendlyName={updateFriendlyName}
              updateGameId={updateGameId}
              hostGame={hostGame}
              joinGame={joinGame}
            />
          ) : (
            <InviteLink gameId={gameId} />
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
