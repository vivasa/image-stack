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
          return 90; // Reset countdown to 90 seconds
        }
      });
    }, 1000); // Run every second

    return () => {
      clearInterval(countdownInterval);
    };
  }, [fetchImage]);


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
