import React from 'react';

interface ImageFrameProps {
  src: string;
  alt: string;
  showHourGlass: boolean;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ src, alt, showHourGlass }) => (
  <div className='w-full sm:w-200 h-64 sm:h-200 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center'>
    <div className='relative w-full h-full flex items-center justify-center'>
      {src && <img className="absolute w-full h-full object-cover" src={src} alt={alt} />}
      {showHourGlass && <div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>}
    </div>
  </div>
);

export default ImageFrame;
