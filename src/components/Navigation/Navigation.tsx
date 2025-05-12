import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router';

export const Navigation = () => {
  const links = [
    { id: 1, title: 'main', path: UrlPath.HOME, signInView: true },
    { id: 2, title: 'about', path: UrlPath.ABOUT, signInView: true },
    { id: 3, title: 'sign in', path: UrlPath.SIGN_IN, signInView: false },
    { id: 4, title: 'registration', path: UrlPath.REGISTRATION, signInView: false },
  ];

  const { currentCustomer } = useContext(CustomerContext)!;

  useEffect(() => {
    console.log('CustomerContext изменился:', currentCustomer);
  }, [currentCustomer]);

  return (
    <div>
      <nav>
        {links.map((link) => {
          return (
            (link.signInView || !currentCustomer) && (
              <NavLink key={link.id} to={link.path} className="m-2 p-2">
                {link.title}
              </NavLink>
            )
          );
        })}
      </nav>
      {currentCustomer && <button type="button">Log out</button>}
    </div>
  );
};
