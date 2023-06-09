import React, { useEffect, useState } from 'react';
import useImageFetcher from './useImageFetcher';
import ImageButton from './ImageButton';
import Slider from './ImageSlider';

const App: React.FC = () => {
  const {
    imageHistory, 
    currentIndex, 
    showHourGlass, 
    countdown, 
    altText, 
    fetchImage, 
    fetchPreviousImage, 
    fetchNextImage,
    handleSliderChange
  } = useImageFetcher();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen flex-col bg-gray-100 px-4 sm:px-0'>
      <div className={`flex flex-col sm:flex-row items-center w-full sm:w-200 mb-10 p-5 bg-white rounded-lg shadow-lg transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <ImageButton className="duration-2000" onClick={fetchPreviousImage} disabled={currentIndex <= 0}>
          Previous
        </ImageButton>
        <Slider
            className="mx-4 sm:mx-10 flex-grow"
            min="0"
            max={imageHistory.length - 1} 
            value={currentIndex} 
            totalImages={imageHistory.length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSliderChange(Number(e.target.value))}
        />
        <ImageButton className="duration-2000" onClick={fetchNextImage} disabled={showHourGlass}>
          {showHourGlass ? 'Loading...' : 'Next'}
        </ImageButton>
      </div>
      <div className='w-full sm:w-200 h-64 sm:h-200 bg-white rounded-lg shadow-lg flex items-center justify-center'>
        <div className='relative w-full h-full flex items-center justify-center'>
          {imageHistory[currentIndex] && <img className="absolute w-full h-full object-cover" src={imageHistory[currentIndex]} alt={altText} />}
          {showHourGlass && <div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
