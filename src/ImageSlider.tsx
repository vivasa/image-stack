import * as React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

interface ImageSliderProps {
  min: number;
  max: number;
  value: number;
  totalImages: number;
  onChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  min,
  max,
  value,
  totalImages,
  onChange,
}) => {
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        aria-label="Image slider"
        valueLabelDisplay="auto"
        valueLabelFormat={`${value + 1} of ${totalImages}`}
        step={1}
        marks
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default ImageSlider;
