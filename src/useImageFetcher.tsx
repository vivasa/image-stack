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

  useEffect(() => {
    fetchImage();
    const imageInterval = setInterval(() => {
      fetchImage();
      setCountdown(90);
    }, 90000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [fetchImage]);

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

  return {
    imageHistory, 
    currentIndex, 
    setCurrentIndex,
    showHourGlass, 
    countdown, 
    altText, 
    fetchImage, 
    fetchPreviousImage, 
    fetchNextImage,
    handleSliderChange
  };
}

export default useImageFetcher;
