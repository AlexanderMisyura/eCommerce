import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled, type SxProps, type Theme, useTheme } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { breadcrumbsNameMap } from 'constants/breadcrumbs-name-map';
import { Link, useLocation } from 'react-router';

interface BreadcrumbsNavProps {
  nameMap?: Record<string, string>;
  separator?: React.ReactNode;
  sx?: SxProps<Theme>;
  filterPredicate?: (pathname: string, index: number, pathnamesArray: string[]) => boolean;
}

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  fontSize: 'inherit',
  transitionDuration: '0.2s',
  '&:hover': {
    color: theme.palette.info.dark,
  },
}));

const DEFAULT_FONT_SIZE = 13;

export const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({
  separator,
  nameMap,
  filterPredicate,
  sx,
}) => {
  const { palette } = useTheme();
  const location = useLocation();
  let pathNames = location.pathname.split('/').filter(Boolean);

  if (filterPredicate) {
    pathNames = pathNames.filter((pathname, index, array) =>
      filterPredicate(pathname, index, array)
    );
  }

  const mergedNameMap = { ...breadcrumbsNameMap, ...nameMap };

  return (
    pathNames.length > 0 && (
      <Breadcrumbs
        separator={
          separator ?? <NavigateNextIcon fontSize="small" sx={{ color: palette.action.active }} />
        }
        aria-label="breadcrumb"
        sx={{ fontSize: DEFAULT_FONT_SIZE, textTransform: 'capitalize', ...sx }}
      >
        <CustomLink to="/">Home</CustomLink>
        {pathNames.map((value, index) => {
          const to = `/${pathNames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathNames.length - 1;
          const label = mergedNameMap[value] ?? decodeURIComponent(value).split('-').join(' ');

          return isLast ? (
            <Typography
              key={to}
              sx={{
                fontSize: 'inherit',
                color: palette.primary.main,
                fontWeight: '500',
              }}
            >
              {label}
            </Typography>
          ) : (
            <CustomLink to={to} key={to}>
              {label}
            </CustomLink>
          );
        })}
      </Breadcrumbs>
    )
  );
};
