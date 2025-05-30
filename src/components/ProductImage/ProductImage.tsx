import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductImage.styles.css';

import { Box, Grid } from '@mui/material';
import Slider from 'react-slick';

export const ProductImage = ({
  images,
  name,
  className,
}: {
  images: string[];
  name: string;
  className?: string;
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid container size={{ xs: 12, md: 6 }} columns={1} rowGap={2} className={className}>
      <Slider {...settings} className="relative h-full w-full overflow-hidden">
        {images.map((img) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt={name}
            sx={{
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ))}
      </Slider>
    </Grid>
  );
};
