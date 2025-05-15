import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
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

  return (
    <nav className={navClassName}>
      <ul className={listClassName}>
        {links.map(({ id, title, path }) => (
          <li key={id} className={itemClassName}>
            <NavLink
              className={({ isActive }) => clsx(isActive && 'pointer-events-none text-blue-400')}
              to={path}
              onClick={onClick}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
