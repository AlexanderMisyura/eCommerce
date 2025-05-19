import { RegistrationForm } from '@components';
import { useCustomerContext } from '@hooks';
import Container from '@mui/material/Container';
import { UrlPath } from '@ts-enums';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const RegistrationPage = () => {
  const { currentCustomer } = useCustomerContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentCustomer) void navigate(UrlPath.HOME);
  }, [currentCustomer, navigate]);

  return (
    <Container
      sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }}
    >
      <RegistrationForm />
    </Container>
  );
};
