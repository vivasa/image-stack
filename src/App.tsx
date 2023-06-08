import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(90);
  const [altText, setAltText] = useState<string>('');

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
    <div className='flex items-center justify-center min-h-screen flex-col bg-gray-100 px-4 sm:px-0'>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-200 mb-10 p-5 bg-white rounded-lg shadow-md">
        <button 
          className={`p-2 text-lg rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-500 mb-4 sm:mb-0 ${currentIndex <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={fetchPreviousImage} 
          disabled={currentIndex <= 0}
        >
          Previous
        </button>
        <div className="flex justify-between items-center w-full mx-10 mb-4 sm:mb-0">
          <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{currentIndex + 1}</span>
          <input
            type="range"
            min="0"
            max={imageHistory.length - 1}
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
            className="form-range w-full cursor-pointer mt-2 sm:mt-0"
          />
          <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{imageHistory.length}</span>
        </div>
        <button 
          className={`p-2 text-lg rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-500 ${showHourGlass ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={fetchNextImage} 
          disabled={showHourGlass}
        >
          {showHourGlass ? 'Loading...' : 'Next'}
        </button>
      </div>
      <div className='w-full sm:w-200 h-64 sm:h-200 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center'>
        <div className='relative w-full h-full flex items-center justify-center'>
          {imageHistory[currentIndex] && <img className="absolute w-full h-full object-cover" src={imageHistory[currentIndex]} alt={altText} />}
          {showHourGlass && <div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
