import { requestLogOut } from '@services/handle-functions/request-logout';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { useContext } from 'react';
import { NavLink } from 'react-router';

export const Navigation = () => {
  const links = [
    { id: 1, title: 'main', path: UrlPath.HOME, signInView: true },
    { id: 2, title: 'about', path: UrlPath.ABOUT, signInView: true },
    { id: 3, title: 'sign in', path: UrlPath.SIGN_IN, signInView: false },
    { id: 4, title: 'registration', path: UrlPath.REGISTRATION, signInView: false },
  ];

  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)!;
  const handleLogout = () => {
    requestLogOut();
    setCurrentCustomer(null);
  };

  return (
    <header className="bg-purple-700">
      <div className="mx-auto my-0 flex max-w-[1200px] flex-row justify-end gap-x-1 px-1 py-3 text-stone-100 uppercase">
        <nav className="flex flex-row gap-x-1">
          {links.map((link) => {
            return (
              (link.signInView || !currentCustomer) && (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className="m-2 rounded-2xl border-1 border-stone-100 p-2 transition-colors duration-500 ease-in-out hover:cursor-pointer hover:bg-purple-800"
                >
                  {link.title}
                </NavLink>
              )
            );
          })}
        </nav>
        {currentCustomer && (
          <button
            type="button"
            className="m-2 rounded-2xl border-1 border-stone-100 bg-stone-100 p-2 text-stone-700 uppercase transition-colors duration-500 ease-in-out hover:cursor-pointer hover:bg-purple-400"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        )}
      </div>
    </header>
  );
};
