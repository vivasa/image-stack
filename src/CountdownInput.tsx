import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
  className?: string;
}

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {

  const handleChange = (value: number) => {
    setCountdown(value * 60); // converting minutes to seconds
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'grey.300', borderRadius: 'borderRadius', boxShadow: 1 }} className={className}>
      <Box sx={{ height: 400, position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
        {/* <Typography variant="h6" component="div" color="textSecondary">
          {Math.floor(countdown )} secs.
        </Typography> */}
        <Slider
          sx={{ height: '80%' }}
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
