import React from 'react';

interface ImageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  /**
   * This is a boolean prop that determines whether the ImageButton is 
   * disabled or not. If true, the button's opacity is reduced and it 
   * cannot be clicked.
   */
  disabled: boolean;
  className?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ children, onClick, disabled, className = '' }) => (
  <button 
    className={`p-2 text-lg rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-500 mb-4 sm:mb-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} 
    onClick={onClick} 
    disabled={disabled}
  >
    {children}
  </button>
);

export default ImageButton;
