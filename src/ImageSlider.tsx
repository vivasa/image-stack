import React from 'react';

type ImageSliderProps = {
  className?: string,
  min: string,
  max: number,
  value: number,
  totalImages: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className, min, max, value, totalImages, onChange }) => (
  <div className={`flex justify-start items-center w-full mx-10 mb-4 sm:mb-0 ${className}`}>
    <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{value + 1}</span>
    <input
      className="slider flex-grow"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
    <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{totalImages}</span>
  </div>
);

export default ImageSlider;
