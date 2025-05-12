import { SignInForm } from '@components';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { currentCustomer } = useContext(CustomerContext)!;
  if (currentCustomer) void navigate(UrlPath.HOME);

  return (
    <div>
      Sign-in page
      <SignInForm />
    </div>
  );
};
