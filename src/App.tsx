import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import RoastPhoto from './components/RoastPhoto';

import { Categories, PhotoDetails } from './types';

interface ApiRes {
  name: string;
  description: string;
}

function App() {
  // warmup api
  fetch('/api/status');

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
