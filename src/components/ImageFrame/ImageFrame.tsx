import React from 'react';

interface ImageFrameProps {
  className?: string;
  src: string;
  alt: string;
  showHourGlass: boolean;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ className, src, alt, showHourGlass }) => (
  <div className={`w-full sm:w-200 sm:h-200 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center ${className}`}>
    <div className='relative w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out'>
      {src && <img className="absolute w-full h-full object-cover transition-opacity duration-300 ease-in-out" src={src} alt={alt} />}
      {showHourGlass && <div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin m-4'></div>}
    </div>
  </div>
);

export default ImageFrame;
