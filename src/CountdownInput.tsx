import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { makeStyles } from '@mui/styles';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
  className?: string;
}

const useStyles = makeStyles({
  root: {
    height: 350, // Adjust to fit your needs
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    transform: 'rotate(-90deg)',
    transformOrigin: 'bottom left',
    height: '100%',
    width: 20 // Adjust to fit your needs
  },
  slider: {
    height: 350, // Should match with the height of root
  }
});

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {
  const classes = useStyles();

  const handleChange = (value: number) => {
    setCountdown(value * 60); // converting minutes to seconds
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 5, bgcolor: 'grey.300', borderRadius: 'borderRadius', boxShadow: 1 }} className={className}>
      <Box className={classes.root}>
        <Slider
          className={classes.slider}
          orientation="vertical"
          min={0.5}
          max={6}
          step={0.01}
          value={countdown / 60}
          onChange={(_, value) => handleChange(value as number)}
        />
      </Box>
    </Box>
  )
};

export default CountdownInput;
