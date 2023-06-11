import { useState, useEffect, useCallback } from 'react';

const useImageFetcher = () => {
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(90);
  const [altText, setAltText] = useState<string>('');

  const fetchImage = useCallback(() => {
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
  }, []);

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

  // Remove the hardcoded time interval and make it depend on countdown state
  useEffect(() => {
    fetchImage();
    const imageInterval = setInterval(() => {
      fetchImage();
      setCountdown(countdown);
    }, countdown * 1000); // countdown is in seconds, convert it to milliseconds

    return () => {
      clearInterval(imageInterval);
    };
  }, [fetchImage, countdown]);

  // Adjust the countdown timer to decrease every second until it reaches 0
  useEffect(() => {
    const countdownInterval = countdown > 0 ? setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000) : null;

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [countdown]);

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
    setCountdown,  // Add setCountdown so we can update the countdown externally
    altText, 
    fetchImage, 
    fetchPreviousImage, 
    fetchNextImage,
    handleSliderChange
  };
}

export default useImageFetcher;
