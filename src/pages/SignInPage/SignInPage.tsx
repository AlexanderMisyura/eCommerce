import { SignInForm } from '@components';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { use, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const SignInPage = () => {
  const { currentCustomer } = use(CustomerContext)!;
  const navigate = useNavigate();
  useEffect(() => {
    if (currentCustomer) void navigate(UrlPath.HOME);
  }, [currentCustomer, navigate]);

  return (
    <div>
      Sign-in page
      <SignInForm />
    </div>
  );
};
