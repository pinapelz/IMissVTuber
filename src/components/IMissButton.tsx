import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IMissButtonProps {
  syncInterval: number;
  buttonText: string;
  buttonImgUrl: string;
  imgWidth?: string;
  imgHeight?: string;
}

interface IGif {
  id: number;
  top: number;
  left: number;
}

const IMissButton: React.FC<IMissButtonProps> = ({ syncInterval, buttonText, buttonImgUrl, imgWidth='200px', imgHeight='200px' }) => {
  const [displayedCounter, setDisplayedCounter] = useState(0);
  const [newClicks, setNewClicks] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [gifs, setGifs] = useState<IGif[]>([]);

  const soundUrls = [
    'https://files.pinapelz.com/koneri1.wav',
    'https://files.pinapelz.com/koneri2.wav',
    'https://files.pinapelz.com/koneri3.wav',
    'https://files.pinapelz.com/koneri4.wav',
  ];

  const rareSoundUrls = [
    'https://files.pinapelz.com/bust.wav',
    'https://files.pinapelz.com/honey.wav',
    'https://files.pinapelz.com/thirst.wav',
    'https://files.pinapelz.com/kya.wav',
  ];

  const handleClick = () => {
    setNewClicks((prevNewClicks) => prevNewClicks + 1);
    setDisplayedCounter((prevDisplayedCounter) => prevDisplayedCounter + 1);
    const maxWidth = window.innerWidth - parseInt(imgWidth);
    const maxHeight = window.innerHeight - parseInt(imgHeight);
    const centerRegionSize = { width: maxWidth / 2, height: maxHeight / 2 };
    let top = Math.random() * maxHeight;
    let left = Math.random() * maxWidth;
    if (
      top > maxHeight / 2 - centerRegionSize.height / 2 &&
      top < maxHeight / 2 + centerRegionSize.height / 2 &&
      left > maxWidth / 2 - centerRegionSize.width / 2 &&
      left < maxWidth / 2 + centerRegionSize.width / 2
    ) {
      top = top < maxHeight / 2 ? top - centerRegionSize.height : top + centerRegionSize.height;
      left = left < maxWidth / 2 ? left - centerRegionSize.width : left + centerRegionSize.width;
    }

    let randomSoundUrl;
    if (Math.random() < 0.10) { 
      randomSoundUrl = rareSoundUrls[Math.floor(Math.random() * rareSoundUrls.length)];
    } else {
      randomSoundUrl = soundUrls[Math.floor(Math.random() * soundUrls.length)];
    }
    const audio = new Audio(randomSoundUrl);
    audio.play();

    setGifs((prevGifs) => {
      const newGifs = [
        ...prevGifs,
        { id: Date.now(), top, left },
      ];
      if (newGifs.length > 13) {
        newGifs.shift();
      }
      return newGifs;
    });
  };
  const syncCounter = useCallback(() => {
    console.log('syncCounter called', { newClicks, syncing });
    if (!syncing && newClicks > 0) {
      setSyncing(true);
      axios.post('https://imisserinya.moekyun.me/api/counter/sync', { counter: `${newClicks}` })
        .then((response) => {
          setDisplayedCounter(parseInt(response.data.counter, 10));
          setNewClicks(0);
        })
        .catch((error) => {
          console.error('Error syncing counter:', error);
        })
        .finally(() => {
          setSyncing(false);
        });
    }
  }, [newClicks, syncing]);

  useEffect(() => {
    const initialSync = async () => {
      setSyncing(true);
      try {
        const response = await axios.post('https://imisserinya.moekyun.me/api/counter/sync', { counter: '0' });
        setDisplayedCounter(parseInt(response.data.counter, 10));
      } catch (error) {
        console.error('Error during initial sync:', error);
      } finally {
        setSyncing(false);
      }
    };

    initialSync();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      syncCounter();
    }, syncInterval);
    return () => {
      clearInterval(interval);
    };
  }, [syncCounter, syncInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGifs((prevGifs) => prevGifs.filter((gif) => Date.now() - gif.id < 3000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={handleClick} style={{ padding: '20px', borderRadius: '5px', fontSize: '30px' }}>
        {buttonText}
      </button>
      <p className="counter-text" style={{ fontSize: '1.7em', marginBottom: '15px' }}>Global Count: {displayedCounter}</p>
      {gifs.map((gif) => (
        <img
          key={gif.id}
          src={buttonImgUrl}
          alt="Animated Gif"
          style={{
            position: 'absolute',
            top: gif.top,
            left: gif.left,
            zIndex: -1,
            animation: 'fadeout 3s forwards, shake 0.5s',
            width: imgWidth,
            height: imgHeight,
          }}
        />
      ))}
    </div>
  );
};

export default IMissButton;
