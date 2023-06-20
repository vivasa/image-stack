import { useState, useEffect, useCallback } from 'react';

const useImageFetcher = (fetchData: () => Promise<any>) => {
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(360);
  const [altText, setAltText] = useState<string>('');

  const fetchImage = useCallback(() => {
    setShowHourGlass(true);
    fetchData()
      .then(data => {
        setImageHistory((prevImages) => [...prevImages, data.urls.small]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setAltText(data.alt_description);
        setShowHourGlass(false);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [fetchData]);

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

  const handleSliderChange = (newValue: number) => {
    if(newValue >= 0 && newValue < imageHistory.length) {
        setCurrentIndex(newValue);
    }
  }

  useEffect(() => {
    // Fetch the initial image
    fetchImage();

    // Setup the countdown and image fetching interval
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 1) {
          // Decrease countdown by 1
          return prevCountdown - 1;
        } else {
          // Fetch a new image and reset countdown
          fetchImage();
          return 360; // Reset countdown to 360 seconds
        }
      });
    }, 1000); // Run every second

    return () => {
      clearInterval(countdownInterval);
    };
  }, [fetchImage]);

  useEffect(() => {
    if (countdown <= 5) {
      setShowHourGlass(true);
    } else {
      setShowHourGlass(false);
    }
  }, [countdown]);

  return {
    imageHistory, 
    currentIndex, 
    setCurrentIndex,
    showHourGlass, 
    countdown, 
    setCountdown, 
    altText, 
    fetchPreviousImage, 
    fetchNextImage,
    handleSliderChange
  };
}

export default useImageFetcher;
