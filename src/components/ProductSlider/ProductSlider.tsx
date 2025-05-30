import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.styles.css';

import { Box } from '@mui/material';
import Slider from 'react-slick';

export const ProductSlider = ({
  images,
  sliderRef,
  onClick,
  name,
}: {
  images: string[];
  sliderRef?: React.RefObject<Slider | null>;
  onClick?: (index: number) => void;
  name: string;
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider ref={sliderRef} {...settings} className="relative h-full w-full overflow-hidden">
      {images.map((img, index) => (
        <Box
          key={img}
          component="img"
          src={img}
          alt={name}
          sx={{
            height: '100%',
            objectFit: 'contain',
          }}
          onClick={() => {
            if (onClick) onClick(index);
          }}
        />
      ))}
    </Slider>
  );
};
