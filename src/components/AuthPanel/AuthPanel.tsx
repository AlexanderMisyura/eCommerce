import { Button } from '@mui/material';
import { requestLogOut } from '@services';
import { UrlPath } from '@ts-enums';
import { ProfileButton } from 'components/ProfileButton/ProfileButton';
import { CustomerContext } from 'context/customer.context';
import { use } from 'react';
import { Link } from 'react-router';

export const AuthPanel = () => {
  const { currentCustomer, setCurrentCustomer } = use(CustomerContext)!;

  const handleLogout = () => {
    requestLogOut();
    setCurrentCustomer(null);
  };

  return (
    <div className="flex items-center gap-x-3">
      {currentCustomer ? (
        <>
          <ProfileButton customer={currentCustomer} />
          <Button variant="outlined" size="small" onClick={handleLogout} aria-label="Log out">
            Log out
          </Button>
        </>
      ) : (
        <>
          <Button variant="outlined" size="small" component={Link} to={UrlPath.SIGN_IN}>
            Sign In
          </Button>
          <Button variant="contained" size="small" component={Link} to={UrlPath.REGISTRATION}>
            Registration
          </Button>
        </>
      )}
    </div>
  );
};
