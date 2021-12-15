import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface ApiRes {
  name: string;
  description: string;
}

interface PexelsResSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface PexelsRes {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PexelsResSrc;
    liked: boolean;
}

const COUPLE_FIGHTING_ID = 984949;

function App() {
  const [data, setData] = useState<ApiRes | undefined>();
  const [photo, setPhoto] = useState<PexelsRes | undefined>();
  
  useEffect(() => {
    getData();
    getPhoto();
  });

  const getData = async () => {
    try {
      const res = await fetch('/api/test/index?name=tom');
      if (res) {
        const data = await res.json();
        setData(data);
      };
    } catch (err) {
      console.log(err);
    }
  }

  const getPhoto= async () => {
    try {
      const res = await fetch(`/api/pexels/photos?photoId=${COUPLE_FIGHTING_ID}`);
      if (res) {
        const data: PexelsRes = await res.json();
        setPhoto(data);
      };
    } catch (err) {
      console.log(err);
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
        <img src={photo?.src.landscape} />
      </header>
    </div>
  );
}

export default App;
