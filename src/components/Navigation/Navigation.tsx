import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

export const Navigation = () => {
  const links = [
    { id: 1, title: 'main', path: UrlPath.home },
    { id: 2, title: 'about', path: UrlPath.about },
    { id: 3, title: 'sign in', path: UrlPath.signIn },
    { id: 4, title: 'registration', path: UrlPath.registration },
  ];

  return (
    <div>
      {links.map((link) => {
        return (
          <NavLink key={link.id} to={link.path} className="m-2 p-2">
            {link.title}
          </NavLink>
        );
      })}
    </div>
  );
};
