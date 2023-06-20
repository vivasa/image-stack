import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
  className?: string;
}

const useStyles = makeStyles({
  root: {
    height: 400, // Adjust to fit your needs
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem'
  },
  slider: {
    height: '80%', // Adjust according to the padding
  },
  sliderLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3f51b5',
    paddingBottom: '1rem',
  },
});

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {
  const classes = useStyles();

  const handleChange = (value: number) => {
    setCountdown(value * 60); // converting minutes to seconds
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.100', borderRadius: 'borderRadius', boxShadow: 1 }} className={className}>
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
  )
};

export default CountdownInput;
