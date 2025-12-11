import placeholder from '@assets/images/lego-placeholder.svg';
import loader from '@assets/images/lego-spinner.svg';
import type CardMedia from '@mui/material/CardMedia';
import type { ComponentProps } from 'react';
import { useState } from 'react';

interface ImageProps extends ComponentProps<typeof CardMedia> {
  alt: string;
}

export const withImageLoadState = (ImageComponent: typeof CardMedia) => {
  return function Image({ src, alt, sx }: ImageProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      setLoading(false);
      setError(true);
    };

    return (
      <ImageComponent
        component="img"
        src={
          loading ? (loader as unknown as string) : error ? (placeholder as unknown as string) : src
        }
        onLoad={handleLoad}
        onError={handleError}
        alt={alt}
        sx={sx}
      />
    );
  };
};
