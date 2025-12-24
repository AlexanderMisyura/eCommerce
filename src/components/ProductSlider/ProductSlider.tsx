import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.styles.css';

import { withImageLoadState } from '@components';
import { Box } from '@mui/material';
import { useRef } from 'react';
import Slider from 'react-slick';

export const ProductSlider = ({
  images,
  sliderRef,
  onClick,
  name,
  hover,
}: {
  images: string[];
  sliderRef?: React.RefObject<Slider | null>;
  onClick?: (index: number) => void;
  name: string;
  hover?: boolean;
}) => {
  const isSliding = useRef(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: () => {
      isSliding.current = true;
    },
    afterChange: () => {
      isSliding.current = false;
    },
  };

  const Image = withImageLoadState(Box);

  return (
    <Slider ref={sliderRef} {...settings} className="relative h-full w-full overflow-hidden">
      {images.map((img, index) => (
        <Image
          key={img}
          src={img}
          alt={name}
          sx={{
            height: '100%',
            objectFit: 'contain',
            justifySelf: 'center',
          }}
          className={`${hover ? 'hover:cursor-pointer' : ''}`}
          onClick={() => {
            if (onClick && !isSliding.current) {
              onClick(index);
            }
          }}
        />
      ))}
    </Slider>
  );
};
