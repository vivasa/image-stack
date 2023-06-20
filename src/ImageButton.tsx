import React from 'react';
import Button from '@mui/material/Button';

interface ImageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  /**
   * This is a boolean prop that determines whether the ImageButton is 
   * disabled or not. If true, the button's opacity is reduced and it 
   * cannot be clicked.
   */
  disabled: boolean;
  sx?: any;
}

const ImageButton: React.FC<ImageButtonProps> = ({ children, onClick, disabled, sx = {} }) => (
  <Button 
    variant="contained"
    size="large"
    sx={{
      py: 2, 
      textTransform: 'none',
      borderRadius: 'borderRadius', 
      color: 'white',
      bgcolor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      '&:hover': {
        bgcolor: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      }, 
      mb: 4, 
      sm: { mb: 0 },
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
      ...sx
    }} 
    onClick={onClick} 
    disabled={disabled}
  >
    {children}
  </Button>
);

export default ImageButton;
