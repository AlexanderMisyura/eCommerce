import { RegistrationForm } from '@components';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const RegistrationPage = () => {
  const { currentCustomer } = useContext(CustomerContext)!;
  const navigate = useNavigate();
  useEffect(() => {
    if (currentCustomer) void navigate(UrlPath.HOME);
  }, [currentCustomer, navigate]);

  return (
    <div>
      Registration page
      <RegistrationForm />
    </div>
  );
};
