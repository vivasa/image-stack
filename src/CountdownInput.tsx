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
    padding: '1rem'
  },
  slider: {
    height: '80%', // Adjust according to the padding
  }
});

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {
  const classes = useStyles();

  const handleChange = (value: number) => {
    setCountdown(value * 60); // converting minutes to seconds
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'grey.300', borderRadius: 'borderRadius', boxShadow: 1 }} className={className}>
      <Box className={classes.root}>
        {/* <Typography variant="h6" component="div" color="textSecondary">
          {Math.floor(countdown )} secs.
        </Typography> */}
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
