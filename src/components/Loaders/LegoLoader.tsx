import spinnerImg from '@assets/images/lego-spinner.gif';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface LegoLoaderProps {
  loaderText?: string;
}

const MAX_WIDTH_LOADER = 250;

export const LegoLoader: React.FC<LegoLoaderProps> = ({
  loaderText = 'Loading... Please wait',
}) => {
  const { palette } = useTheme();

  return (
    <Stack sx={{ maxWidth: MAX_WIDTH_LOADER, alignItems: 'center', color: palette.action.active }}>
      <img src={spinnerImg} alt="spinner" width={MAX_WIDTH_LOADER} />
      <Typography variant="h4" textAlign={'center'}>
        {loaderText}
      </Typography>
    </Stack>
  );
};
