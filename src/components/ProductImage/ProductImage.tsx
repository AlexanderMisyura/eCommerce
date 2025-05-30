import { Box, Grid } from '@mui/material';
import { useState } from 'react';

export const ProductImage = ({ images, name }: { images: string[]; name: string }) => {
  const [position, setPosition] = useState(0);

  const handleClick = (index: number) => {
    setPosition(index);
  };

  return (
    <Grid container size={{ xs: 12, md: 6 }} columns={1} rowGap={2}>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {images.map((img, index) => (
          <Box
            key={img}
            component={'div'}
            className="h-full w-full shrink-0"
            sx={{
              transform: `translateX(-${position * 100}%)`,
              transition: 'transform 1s',
            }}
          >
            <Box
              component="img"
              src={img}
              alt={name}
              onClick={() => handleClick(index)}
              className="h-full w-full rounded-md object-contain"
            />
          </Box>
        ))}
      </Box>
      <Grid container className="flex h-[100px] w-full items-center gap-2 p-2" columnGap={2}>
        {images.map((img, index) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt={name}
            onClick={() => handleClick(index)}
            className={`h-full w-[20%] cursor-pointer rounded-md border-3 border-stone-50 object-contain hover:border-3 hover:border-stone-300 hover:shadow-lg ${index === position ? 'border-3 border-stone-300 shadow-lg' : ''}`}
          />
        ))}
      </Grid>
    </Grid>
  );
};
