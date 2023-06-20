import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ImageFrameProps {
  className?: string;
  src: string;
  alt: string;
  showHourGlass: boolean;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '64vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    transition: 'opacity 0.3s ease-in-out',
  },
});

const ImageFrame: React.FC<ImageFrameProps> = ({ className, src, alt, showHourGlass }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.root} ${className}`}>
      {src && <img className={classes.image} src={src} alt={alt} />}
      {showHourGlass && <CircularProgress />}
    </Box>
  );
}

export default ImageFrame;
