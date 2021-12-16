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

interface PhotosResponse {
  data: PexelsRes;
  success: boolean;
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
    alt: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PexelsResSrc;
    liked: boolean;
}

function App() {
  // warmup api
  fetch('/api/status');

  const [data, setData] = useState<ApiRes | undefined>();
  const [photo, setPhoto] = useState<PexelsRes | undefined>();
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
  // const getPhoto = async () => {
  //   try {
  //     const res = await fetch(`/api/pexels/photos?photoId=${COUPLE_FIGHTING_ID}`);
  //     if (res) {
  //       const data: PhotosResponse = await res.json();
  //       if (data.success) {
  //         setPhoto(data.data);
  //       }
  //     };
  //   } catch (err) {
  //     const errorResponse = err as Response;
  //     const error = await errorResponse.json();
  //     console.log(error);
  //   }
  // }

  // const photos = getPhotosByCategory(Categories.HAPPY);

  // console.log(photos);

  // const weddingPhotos = getPhotosByCategoryAndSubCategory(Categories.HAPPY, HappyCategories.WEDDING);
  // console.log(weddingPhotos);

  // const randomWeddingPhoto = getRandomPhoto(weddingPhotos);
  // console.log(randomWeddingPhoto);


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
