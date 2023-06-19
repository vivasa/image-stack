import React from 'react';

type ImageSliderProps = {
  className?: string,
  /**
   * (min, max, value): These are props used to configure the HTML input element 
   * of type "range" (the slider). min and max set the minimum and maximum values 
   * of the slider, while value sets the current value. They are used 
   * to control and display the current image index that the slider represents.
   */
  min: string,
  max: number,
  value: number,
  totalImages: number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className, min, max, value, totalImages, onChange }) => (
  <div className={`flex justify-start items-center w-full mx-10 mb-4 sm:mb-0 ${className}`}>
    <input
      className="slider flex-grow"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
    <span className="font-bold text-purple-500 px-5 py-2 rounded-lg bg-white shadow-md">{value + 1} / {totalImages}</span>
  </div>
);

export default ImageSlider;
