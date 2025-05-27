import spinnerImg from '@assets/images/lego-spinner.gif';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface LegoLoaderProps {
  loaderText?: string;
  color?: string;
}

const MAX_WIDTH_LOADER = 250;

export const LegoLoader: React.FC<LegoLoaderProps> = ({
  loaderText = 'Loading... Please wait',
  color,
}) => {
  const { palette } = useTheme();

  return (
    <Stack
      sx={{
        maxWidth: MAX_WIDTH_LOADER,
        alignItems: 'center',
        color: color ?? palette.action.active,
        userSelect: 'none',
      }}
    >
      <img src={spinnerImg} alt="spinner" width={MAX_WIDTH_LOADER} draggable={false} />
      <Typography variant="h4" textAlign={'center'}>
        {loaderText}
      </Typography>
    </Stack>
  );
};
