import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IMissButtonProps {
  syncInterval: number;
}

const IMissButton: React.FC<IMissButtonProps> = ({ syncInterval }) => {
  const [displayedCounter, setDisplayedCounter] = useState(0);
  const [newClicks, setNewClicks] = useState(0);
  const [syncing, setSyncing] = useState(false);

  const handleClick = () => {
    setNewClicks((prevNewClicks) => prevNewClicks + 1);
    setDisplayedCounter((prevDisplayedCounter) => prevDisplayedCounter + 1);
  };

  const syncCounter = useCallback(() => {
    console.log('syncCounter called', { newClicks, syncing });
    if (!syncing) {
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

  return (
    <div>
      <p>Cried {displayedCounter} times</p>
    <button onClick={handleClick} style={{ padding: '20px', borderRadius: '5px', fontSize: '30px' }}>
        Cry
    </button>
    </div>
  );
};

export default IMissButton;
