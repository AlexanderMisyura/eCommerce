import { ProductSlider } from '@components';
import { Grid, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import type Slider from 'react-slick';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderReference = useRef<Slider | null>(null);

  const handleOpen = (index: number) => {
    setOpen(true);
    setSelectedIndex(index);
  };

  useEffect(() => {
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
      <ProductSlider images={images} onClick={handleOpen} name={name} hover />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid
          container
          columns={1}
          sx={{ ...styleModal, width: '90%', height: '90%', maxWidth: 1200, maxHeight: 1200 }}
        >
          <ProductSlider images={images} sliderRef={sliderReference} name={name} />
        </Grid>
      </Modal>
    </Grid>
  );
};
