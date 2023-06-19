import React from 'react';
import clsx from 'clsx';

type ImageSliderProps = {
  className?: string,
  min: string,
  max: number,
  value: number,
  totalImages: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className, min, max, value, totalImages, onChange }) => (
  <div className={clsx("flex items-center w-full px-5 py-3 space-x-5 rounded-lg bg-gray-100 shadow-md", className)}>
    <span className="font-semibold text-gray-700">{value + 1} / {totalImages}</span>
    <input
      className="slider flex-grow appearance-none bg-purple-500 height-1 rounded-full cursor-pointer"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ImageSlider;
