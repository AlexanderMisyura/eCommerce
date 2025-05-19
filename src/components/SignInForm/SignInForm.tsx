import { DEBOUNCE_TIMEOUT } from '@constants';
import { useCustomerContext } from '@hooks/use-customer-context';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import type { SignInData } from '@ts-interfaces';
import { eventDebounceWrapper, validateEmail, validatePassword } from '@utils';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export function SignInForm() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const data = useActionData<SignInData>();
  const { setCurrentCustomer } = useCustomerContext();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    const errors = validateEmail(emailValue);
    setEmailError(errors.length > 0);
    setEmailErrorMessage(errors[0]);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    const errors = validatePassword(passwordValue);
    setPasswordError(errors.length > 0);
    setPasswordErrorMessage(errors[0]);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length === 0) {
      if (event.target.name === 'email') {
        setEmailError(false);
        setEmailErrorMessage('');
      }

      if (event.target.name === 'password') {
        setPasswordError(false);
        setPasswordErrorMessage('');
      }
    }
  };

  const togglePasswordReveal = () => {
    setIsPasswordRevealed((show) => !show);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (data?.validationErrors) {
      if (data.validationErrors.emailErrors.length > 0) {
        setEmailError(true);
        setEmailErrorMessage(data.validationErrors.emailErrors[0]);
      }
      if (data.validationErrors.passwordErrors.length > 0) {
        setPasswordError(true);
        setPasswordErrorMessage(data.validationErrors.passwordErrors[0]);
      }
    }

    if (data?.serverErrors) {
      data.serverErrors.map((message) => {
        toast.error(message);
      });
    }

    if (data?.customer) {
      setCurrentCustomer(data.customer);
      toast.success('successful sign in');
      void navigate(UrlPath.HOME);
    }

    if (data?.customer || data?.serverErrors || data?.validationErrors) {
      setIsSubmitting(false);
    }
  }, [data, navigate, setCurrentCustomer]);

  return (
    <Form action={`/${UrlPath.SIGN_IN}`} method="post" onSubmit={handleSubmit}>
      <Stack direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                onInput={eventDebounceWrapper(handleEmailChange, DEBOUNCE_TIMEOUT)}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••••"
                type={isPasswordRevealed ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                onInput={eventDebounceWrapper(handlePasswordChange, DEBOUNCE_TIMEOUT)}
                onBlur={handleBlur}
                disabled={isSubmitting}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={isPasswordRevealed ? 'Hide password' : 'Show password'}
                          onClick={togglePasswordReveal}
                          disabled={isSubmitting}
                          edge="end"
                        >
                          {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <Box sx={{ pt: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={isSubmitting}
                loadingPosition="start"
              >
                Sign in
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <MuiLink
                  component={Link}
                  to={`/${UrlPath.REGISTRATION}`}
                  variant="inherit"
                  sx={{ alignSelf: 'center' }}
                  viewTransition
                >
                  Sign up
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Stack>
      <ToastContainer />
    </Form>
  );
}
