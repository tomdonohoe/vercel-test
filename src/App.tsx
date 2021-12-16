import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import CreateGameForm from './components/CreateGameForm';
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

  useEffect(() => {
    hostGame();
  }, [gameId]);

  useEffect(() => {
    joinGame();
  }, [friendlyName]);

  useEffect(() => {
    connectServer();
  }, [p2pServer]);

  useEffect(() => {
    connectClient();
  }, [p2pClient]);


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

  const hostGame = async () => {
    if (gameId === null) {
      return;
    }

    const pubSubClient = new PubSubClient((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, p2pClient, p2pServer);
    });

    console.log(pubSubClient);

    const identity = new Identity(friendlyName);

    console.log(identity);

    console.log(gameId);

    const server = new P2PServer(identity, gameId, pubSubClient);
    const client = new P2PClient(identity, gameId, pubSubClient);

    setP2pServer(server);
    setP2pClient(client);
  }

  const connectServer = async () => {
    if (p2pServer === null) {
      return;
    }

    await p2pServer.connect();
  }

  const connectClient = async () => {
    if (p2pClient === null) {
      return;
    }
    await p2pClient.connect();
  }

  const joinGame = async () => {
    if (friendlyName === null) {
      return;
    }
    const pubSubClient = new PubSubClient((message: any, metadata: any) => {
      handleMessagefromAbly(message, metadata, p2pClient, p2pServer);
    });

    const identity = new Identity(friendlyName);
    setP2pClient(new P2PClient(identity, gameId, pubSubClient));

    await p2pClient.connect();
  }

  // const startGame = async () => {
  //   p2pServer?.startGame();
  // }
  
  // const nextRound = async () => {
  //   p2pServer?.nextRound();
  // }

  // const state = () => {
  //   return p2pClient?.state;
  // }

  // const transmittedServerState = () => {
  //   return p2pClient?.serverState; 
  // }

  const joinedOrHosting = () => {
    return p2pClient != null || p2pServer != null;
  }

  // const isHost = () => {
  //   return p2pServer != null
  // }

  // const gameCanBeStarted = () => {
  //   return transmittedServerState() && !transmittedServerState().started
  // }

  // const vercelTestClient = () => {
  //   return p2pClient?.vercelTest;
  // }

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
          !joinedOrHosting() && (
            <CreateGameForm
              updateFriendlyName={updateFriendlyName}
              updateGameId={updateGameId}
            />
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
