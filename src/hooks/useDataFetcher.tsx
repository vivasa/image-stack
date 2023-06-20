import { useState, useEffect, useCallback } from 'react';
import { fetchImageFromUnsplash, fetchFromExternalApi } from '../services/fetchers';

// Define the enum for fetcher function names
enum FetcherNames {
  fetchImageFromUnsplash = 'fetchImageFromUnsplash',
  fetchFromExternalApi = 'fetchFromExternalApi',
  // Add more fetcher function names here as needed
}

// Define the type for the fetcher functions object
type FetcherFunctions = Record<FetcherNames, () => Promise<any>>;

const fetcherFunctions: FetcherFunctions = {
  fetchImageFromUnsplash: fetchImageFromUnsplash,
  fetchFromExternalApi: fetchFromExternalApi,
  // Add more fetcher functions here as needed
};

const useDataFetcher = (fetcherName: FetcherNames) => {
  const fetchData = fetcherFunctions[fetcherName];

  const [dataHistory, setDataHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHourGlass, setShowHourGlass] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(360);
  const [altText, setAltText] = useState<string>('');

  const fetchDataAndHandle = useCallback(() => {
    setShowHourGlass(true);
    fetchData()
      .then(data => {
        setDataHistory((prevData) => [...prevData, data.urls.small]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setAltText(data.alt_description);
        setShowHourGlass(false);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [fetchData]);

  const fetchPreviousData = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }

  const fetchNextData = () => {
    if(currentIndex === dataHistory.length - 1){
      fetchDataAndHandle();
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  const handleSliderChange = (newValue: number) => {
    if(newValue >= 0 && newValue < dataHistory.length) {
        setCurrentIndex(newValue);
    }
  }

  useEffect(() => {
    // Fetch the initial data
    fetchDataAndHandle();

    // Setup the countdown and data fetching interval
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 1) {
          // Decrease countdown by 1
          return prevCountdown - 1;
        } else {
          // Fetch a new data and reset countdown
          fetchDataAndHandle();
          return 360; // Reset countdown to 360 seconds
        }
      });
    }, 1000); // Run every second

    return () => {
      clearInterval(countdownInterval);
    };
  }, [fetchDataAndHandle]);

  useEffect(() => {
    if (countdown <= 5) {
      setShowHourGlass(true);
    } else {
      setShowHourGlass(false);
    }
  }, [countdown]);

  return {
    dataHistory, 
    currentIndex, 
    setCurrentIndex,
    showHourGlass, 
    countdown, 
    setCountdown, 
    altText, 
    fetchPreviousData, 
    fetchNextData,
    handleSliderChange
  };
}

export default useDataFetcher;
export { FetcherNames };
