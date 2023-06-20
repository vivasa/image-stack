import React, { useEffect, useState } from 'react';
import useImageFetcher from './useImageFetcher';
import ImageButton from './ImageButton';
import ImageSlider from './ImageSlider';
import CountdownInput from './CountdownInput';
import Box from '@mui/material/Box';
import ImageFrame from './ImageFrame';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  imageFrame: {
    flexGrow: 1,
    margin: '0 2rem',
  },
  // other rules...
});

const App: React.FC = () => {
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
  } = useImageFetcher();

  const [animate, setAnimate] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', bgcolor: 'grey.50', px: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'between', width: '100%', sm: { width: 200 }, my: 2, py: 5, px: 4, bgcolor: 'background.paper', borderRadius: 'borderRadius', boxShadow: 1, opacity: animate ? 1 : 0, transition: 'transform 1s, opacity 1s', transform: animate ? 'translateY(0)' : 'translateY(-10px)' }}>
        <ImageButton onClick={fetchPreviousImage} disabled={currentIndex <= 0} sx={{ mx: 2 }}>
          Previous
        </ImageButton>
        <ImageSlider
          min={0}
          max={imageHistory.length - 1}
          value={currentIndex}
          totalImages={imageHistory.length}
          onChange={handleSliderChange}
        />
        <ImageButton onClick={fetchNextImage} disabled={showHourGlass} sx={{ mx: 2 }}>
          {showHourGlass ? 'Loading...' : 'Next'}
        </ImageButton>
        {showHourGlass && <Box sx={{ width: 1, height: 1, border: '4px solid currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite', mx: 2 }} />}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'between', width: '100%', height: '100%', sm: { width: 200 }, my: 2, py: 5, px: 4, bgcolor: 'background.paper', borderRadius: 'borderRadius', boxShadow: 1, opacity: animate ? 1 : 0, transition: 'transform 1s, opacity 1s', transform: animate ? 'translateY(0)' : 'translateY(-10px)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'between', width: '100%', height: '100%' }}>
          <CountdownInput
            countdown={countdown}
            setCountdown={setCountdown}
          />
          <ImageFrame
            src={imageHistory[currentIndex]}
            alt={altText}
            showHourGlass={showHourGlass}
            className={classes.imageFrame}
          />
        </Box>
      </Box>

      {/* Countdown Display */}
      <Box sx={{ width: '100%', sm: { width: 200 }, mt: 4, p: 4, borderRadius: 'borderRadius', boxShadow: 1, bgcolor: 'background.paper' }}>
        <Box sx={{ textAlign: 'center' }}>Refresh in {countdown} seconds</Box>
      </Box>
    </Box>
  );
}

export default App;
