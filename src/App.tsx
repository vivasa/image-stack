import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(90);
  const [altText, setAltText] = useState<string>('');

  const sliderRef = useRef<HTMLInputElement>(null);

  const fetchImage = () => {
    fetch('https://api.unsplash.com/photos/random?query=nature', {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImageHistory((prevImages) => [...prevImages, data.urls.small]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setAltText(data.alt_description);
      })
      .catch(err => console.error('Error fetching image:', err));
  };

  const fetchPreviousImage = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }

  const fetchNextImage = () => {
    if(currentIndex === imageHistory.length - 1){
      fetchImage();
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  useEffect(() => {
    fetchImage();
    const imageInterval = setInterval(() => {
      fetchImage();
      setCountdown(90);
    }, 90000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    if (countdown <= 5) {
      setShowHourGlass(true);
    } else {
      setShowHourGlass(false);
    }
  }, [countdown]);

  return (
    <div className='app'>
      <div className="button-container">
        <button onClick={fetchPreviousImage} disabled={currentIndex <= 0}>Previous</button>
        <span>{currentIndex + 1}</span>
        <input
          type="range"
          min="0"
          max={imageHistory.length - 1}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
        />
        <span>{imageHistory.length}</span>
        <button onClick={fetchNextImage} disabled={showHourGlass}>
          {showHourGlass ? 'Loading...' : 'Next'}
        </button>

      </div>

      <div className='frame'>
        <div className='image-container'>
          {imageHistory[currentIndex] && <img src={imageHistory[currentIndex]} alt={altText} />}
          {showHourGlass && <div className='spinner'></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
