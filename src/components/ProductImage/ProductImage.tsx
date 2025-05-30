import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductImage.styles.css';

import { Box, Grid, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderReference = useRef<Slider | null>(null);

  const handleOpen = (index: number) => {
    setOpen(true);
    setSelectedIndex(index);
  };

  useEffect(() => {
    console.log({ sliderReference: sliderReference.current, open });
    if (open) {
      setTimeout(() => {
        if (sliderReference.current) {
          sliderReference.current.slickGoTo(selectedIndex);
        }
      }, 10);
    }
  }, [open, selectedIndex]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container size={{ xs: 12, md: 6 }} columns={1} rowGap={2} className={className}>
      <Slider {...settings} className="relative h-full w-full overflow-hidden">
        {images.map((img, index) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt={name}
            onClick={() => handleOpen(index)}
            sx={{
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ))}
      </Slider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid container columns={1} sx={{ ...styleModal, width: '90%', height: '90%' }}>
          <Slider
            ref={sliderReference}
            {...settings}
            className="relative h-full w-full overflow-hidden"
          >
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
      </Modal>
    </Grid>
  );
};
