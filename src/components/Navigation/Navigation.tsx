import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

export const Navigation = () => {
  const links = [
    { id: 1, title: 'main', path: UrlPath.HOME },
    { id: 2, title: 'about', path: UrlPath.ABOUT },
    { id: 3, title: 'sign in', path: UrlPath.SIGN_IN },
    { id: 4, title: 'registration', path: UrlPath.REGISTRATION },
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
