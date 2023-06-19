import { useState, useEffect, useCallback } from 'react';

const useImageFetcher = () => {
  /**
   * This is an array that holds the URLs of all fetched images. 
   * It is used to store the history of all fetched images so that 
   * the user can navigate between them.
   */
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  /**
   * This is an index that points to the current image being displayed 
   * from the imageHistory array. It is updated when the user navigates 
   * between images or a new image is fetched.
   */
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  /**
   * This is a boolean variable that is set to true when the countdown is 
   * less than or equal to 5, indicating that the hourglass should be 
   * displayed. It is used to control the visibility of the hourglass UI element.
   */
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  /**
   * This is a countdown timer that starts from 90 seconds and decreases 
   * by one every second. When it reaches zero, a new image is fetched and 
   * the countdown is reset to 90 seconds. This is used to automatically 
   * fetch a new image every 90 seconds.
   */
  const [countdown, setCountdown] = useState<number>(90);
  /**
   * This stores the alternative text description for the current image fetched 
   * from the Unsplash API. It is used for accessibility purposes, providing a 
   * description of the image for those who can't see it.
   */
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
    //Set the initial indexes to latest image
    setCurrentIndex(imageHistory.length - 1);

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
