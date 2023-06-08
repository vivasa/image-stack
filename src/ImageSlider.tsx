import React from 'react';

type ImageSliderProps = {
  min: string,
  max: number,
  value: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ min, max, value, onChange }) => (
  <div className="flex justify-between items-center w-full mx-10 mb-4 sm:mb-0">
    <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{value + 1}</span>
    <input
      className="slider"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ImageSlider;
