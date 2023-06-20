import React, { useEffect, useState } from 'react';
import useImageFetcher from './useImageFetcher';
import ImageButton from './ImageButton';
import Slider from './ImageSlider';
import CountdownInput from './CountdownInput';

const fetchImageFromUnsplash = (): Promise<any> => {
  return fetch('https://api.unsplash.com/photos/random?query=nature', {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

const fetchFromExternalApi = (): Promise<any> => {
  // This is a placeholder, replace it with your actual API call
  return fetch('https://your-api-url.com/data');
}

const App: React.FC = () => {
  const fetchData = process.env.REACT_APP_USE_EXTERNAL_API === 'true' ? fetchFromExternalApi : fetchImageFromUnsplash;
  const {
    imageHistory, 
    currentIndex, 
    showHourGlass, 
    countdown, 
    setCountdown, 
    altText, 
    fetchPreviousImage, 
    fetchNextImage,
    handleSliderChange
  } = useImageFetcher(fetchData);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen flex-col bg-gray-50 px-4 sm:px-0'>
      <div className={`flex flex-col sm:flex-row items-center justify-between w-full sm:w-200 my-2 py-5 px-4 bg-white rounded-lg shadow transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <ImageButton className="duration-2000 mx-2" onClick={fetchPreviousImage} disabled={currentIndex <= 0}>
          Previous
        </ImageButton>
        <Slider
            className="mx-2 flex-grow"
            min="0"
            max={imageHistory.length - 1} 
            value={currentIndex} 
            totalImages={imageHistory.length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSliderChange(Number(e.target.value))}
        />
        <ImageButton className="duration-2000 mx-2" onClick={fetchNextImage} disabled={showHourGlass}>
          {showHourGlass ? 'Loading...' : 'Next'}
        </ImageButton>
        {showHourGlass && <div className='w-1 h-1 border-t-4 border-blue-500 rounded-full animate-spin mx-2'></div>}
      </div>
      <div className={`flex flex-col sm:flex-row items-center justify-between w-full sm:w-200 my-2 py-5 px-4 bg-white rounded-lg shadow transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="flex flex-col sm:flex-row items-stretch justify-between w-full">
          <CountdownInput
            className="mx-2 flex-none"
            countdown={countdown}
            setCountdown={setCountdown}
          />
          <div className='flex-grow mx-2 min-h-96 bg-white rounded-lg shadow flex items-center justify-center mt-4 sm:mt-0'>
            <div className='relative w-full h-full flex items-center justify-center'>
              {imageHistory[currentIndex] && <img className="absolute w-full h-full object-cover" src={imageHistory[currentIndex]} alt={altText} />}
            </div>
          </div>
        </div>
      </div>
      {/* Countdown Display */}
      <div className='w-full sm:w-200 mt-4 p-4 rounded-lg shadow bg-white'>
        <p className='text-center'>Refresh in {countdown} seconds</p>
      </div>
    </div>
  );
}

export default App;
