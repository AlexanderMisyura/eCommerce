import { Addresses, Confirm, Credentials } from '@components';
import { CONTEXT_RESET_TIMEOUT } from '@constants';
import { useCustomerContext, useRegistrationData, useToast } from '@hooks';
import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import type { RegistrationData, StepperProps } from '@ts-interfaces';
import { useEffect, useRef, useState } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const steps = [
  { label: 'Credentials', component: Credentials },
  { label: 'Addresses', component: Addresses },
  { label: 'Confirm', component: Confirm },
];

function renderStepContent(step: number, props: StepperProps) {
  const StepComponent = steps[step].component;
  return <StepComponent {...props} />;
}

export function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState<boolean[]>(steps.map(() => false));
  const { registrationContext, setRegistrationContext, resetRegistrationContext } =
    useRegistrationData();
  const navigate = useNavigate();

  const data = useActionData<RegistrationData>();
  const { setCurrentCustomer } = useCustomerContext();

  const { showToast } = useToast();

  const previousDataReference = useRef(data);

  useEffect(() => {
    if (data?.serverErrors && data !== previousDataReference.current) {
      previousDataReference.current = data;
      data.serverErrors.forEach((message) => {
        showToast(message, 'error');
      });
    }

    if (data?.customer) {
      setCurrentCustomer(data.customer);
      showToast('Registration successful!', 'success');
      setTimeout(resetRegistrationContext, CONTEXT_RESET_TIMEOUT);
      void navigate(UrlPath.HOME);
    }
  }, [
    data,
    navigate,
    setCurrentCustomer,
    setRegistrationContext,
    resetRegistrationContext,
    showToast,
  ]);

  useEffect(() => {
    setActiveStep(registrationContext.step);
  }, [registrationContext]);

  const isStepFailed = (step: number): boolean => {
    return stepErrors[step];
  };

  const handleNext = (): void => {
    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((previousActiveStep) => previousActiveStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
    setStepErrors(steps.map(() => false));
    resetRegistrationContext();
  };

  return (
    <Form>
      <Stack direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Register
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((item, index) => {
              const labelProps: {
                error?: boolean;
              } = {};
              if (isStepFailed(index)) {
                labelProps.error = true;
              }

              return (
                <Step key={item.label} completed={index < activeStep}>
                  <StepLabel {...labelProps}>{item.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {renderStepContent(activeStep, {
            handleBack,
            handleNext,
            handleReset,
            setStepErrors,
            stepIndex: activeStep,
          })}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <MuiLink
                component={Link}
                to={`${UrlPath.SIGN_IN}`}
                variant="inherit"
                sx={{ alignSelf: 'center' }}
                viewTransition
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </Form>
  );
}
