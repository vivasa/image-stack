import React from 'react';
import { Card, CardMedia, CircularProgress } from '@mui/material';

interface ImageFrameProps {
  src: string;
  alt: string;
  showHourGlass: boolean;
  className?: string;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ src, alt, showHourGlass, className }) => (
  <Card className={className} sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {src && <CardMedia component="img" image={src} alt={alt} sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />}
    {showHourGlass && <CircularProgress />}
  </Card>
);

export default ImageFrame;
