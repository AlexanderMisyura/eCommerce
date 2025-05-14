import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
import { NavLink } from 'react-router';

export const Navigation = () => {
  const links = [
    { id: 1, title: 'Home', path: UrlPath.HOME },
    { id: 2, title: 'Catalog', path: UrlPath.CATALOG },
    { id: 3, title: 'About Us', path: UrlPath.ABOUT },
  ];

  return (
    <nav className="mr-auto">
      <ul className="flex gap-x-5">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              className={({ isActive }) => clsx(isActive && 'pointer-events-none text-blue-400')}
              to={link.path}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
