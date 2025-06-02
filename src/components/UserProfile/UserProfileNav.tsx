import type { SelectChangeEvent } from '@mui/material';
import { MenuItem, Select, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { NavLink, useLocation, useNavigate } from 'react-router';

const options = [
  { label: 'Overview', path: UrlPath.USER_PROFILE },
  { label: 'Credentials', path: UrlPath.USER_PROFILE_CREDENTIALS },
  { label: 'Addresses', path: UrlPath.USER_PROFILE_ADDRESSES },
  { label: 'Change Password', path: UrlPath.USER_PROFILE_CHANGE_PASSWORD },
];

export const UserProfileNav = () => {
  const { palette, spacing, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const currentValue =
    options.find((opt) => location.pathname.split('/').at(-1) === opt.path)?.path ??
    UrlPath.USER_PROFILE;

  return isMobile ? (
    <Select
      fullWidth
      value={currentValue}
      onChange={(event: SelectChangeEvent): void => {
        void navigate(event.target.value);
      }}
      sx={{
        bgcolor: palette.primary.main,
        color: palette.common.white,
        borderRadius: '10px',
        border: `1px solid ${palette.common.white}`,
        textTransform: 'uppercase',
        '& .MuiSelect-icon': {
          color: palette.common.white,
        },
      }}
    >
      {options.map(({ label, path }) => (
        <MenuItem key={path} value={path} sx={{ textTransform: 'uppercase' }}>
          {label}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Stack
      sx={{
        minWidth: spacing(60),
        bgcolor: palette.primary.light,
        borderRadius: '10px',
        border: `1px solid ${palette.grey[400]}`,
        overflow: 'hidden',
      }}
    >
      {options.map(({ label, path }) => (
        <CustomNav to={path} end={path === UrlPath.USER_PROFILE} key={path}>
          {label}
        </CustomNav>
      ))}
    </Stack>
  );
};

const CustomNav = styled(NavLink)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(8)}`,
  borderBottom: '1px solid #DFE6F0',
  textTransform: 'uppercase',
  '&.active': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));
