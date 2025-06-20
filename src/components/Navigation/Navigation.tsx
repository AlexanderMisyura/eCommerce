import { useTheme } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

interface NavigationProps {
  navClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  onClick?: () => void;
}

const links = [
  { id: 1, title: 'Home', path: UrlPath.HOME },
  { id: 2, title: 'Catalog', path: UrlPath.CATALOG },
  { id: 3, title: 'About Us', path: UrlPath.ABOUT },
];

export const Navigation: React.FC<NavigationProps> = (props) => {
  const { navClassName, listClassName, itemClassName, onClick } = props;
  const { palette } = useTheme();

  return (
    <nav className={navClassName}>
      <ul className={listClassName}>
        {links.map(({ id, title, path }) => (
          <li key={id} className={itemClassName}>
            <NavLink
              to={path}
              onClick={onClick}
              style={({ isActive }) => ({
                pointerEvents: isActive ? 'none' : 'auto',
                color: isActive ? palette.primary.main : 'inherit',
                fontWeight: isActive ? 700 : 'inherit',
              })}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
