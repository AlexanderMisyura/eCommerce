import {
  CUSTOMER_CREDENTIALS_STATE_DEFAULT,
  DATE_OF_BIRTH_FORMAT,
  DEBOUNCE_TIMEOUT,
  FIELD_NAME,
  FIRST_NAME,
  LAST_NAME,
  PLACEHOLDER,
} from '@constants';
import { useRegistrationData } from '@hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import type { CredentialsState, StepperProps } from '@ts-interfaces';
import {
  stateCredentialsDebounceWrapper,
  validateCredentials,
  validateDateOfBirth,
  validateEmail,
  validatePassword,
  validateProperName,
} from '@utils';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function Credentials({ handleNext, handleReset, setStepErrors, stepIndex }: StepperProps) {
  const [credentialsState, setCredentialsState] = useState<CredentialsState>(
    CUSTOMER_CREDENTIALS_STATE_DEFAULT
  );
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<PickerValue>(null);
  const { registrationContext, setRegistrationContext } = useRegistrationData();

  useEffect(() => {
    if (registrationContext.credentialsState) {
      setCredentialsState(registrationContext.credentialsState);
    }
  }, [registrationContext.credentialsState]);

  const markStep = useCallback(
    (isError: boolean): void => {
      setStepErrors((previous) => {
        if (previous[stepIndex] === isError) return previous;

        const newStepErrors = [...previous];
        newStepErrors[stepIndex] = isError;
        return newStepErrors;
      });
    },
    [setStepErrors, stepIndex]
  );

  useEffect(() => {
    const hasErrors = Object.values(credentialsState).some(
      (field: CredentialsState[keyof CredentialsState]) => field.error
    );

    markStep(hasErrors);
  }, [credentialsState, markStep]);

  const debouncedValidateField = useMemo(
    () =>
      stateCredentialsDebounceWrapper((fieldName: keyof CredentialsState, value: string): void => {
        let error = false;
        let errorMessage = '';

        switch (fieldName) {
          case FIELD_NAME.EMAIL: {
            const emailErrors = validateEmail(value);
            error = emailErrors.length > 0;
            errorMessage = emailErrors[0];
            break;
          }
          case FIELD_NAME.PASSWORD: {
            const passwordErrors = validatePassword(value);
            error = passwordErrors.length > 0;
            errorMessage = passwordErrors[0];
            break;
          }
          case FIELD_NAME.FIRST_NAME: {
            const firstNameErrors = validateProperName(value, FIRST_NAME);
            error = firstNameErrors.length > 0;
            errorMessage = firstNameErrors[0];
            break;
          }
          case FIELD_NAME.LAST_NAME: {
            const lastNameErrors = validateProperName(value, LAST_NAME);
            error = lastNameErrors.length > 0;
            errorMessage = lastNameErrors[0];
            break;
          }
        }

        setCredentialsState((previousState) => {
          const previousField = previousState[fieldName];

          if (previousField.error === error && previousField.errorMessage === errorMessage) {
            return previousState;
          }

          return {
            ...previousState,
            [fieldName]: { ...previousField, error, errorMessage },
          };
        });
      }, DEBOUNCE_TIMEOUT),
    []
  );

  const handleInputChange =
    (fieldName: keyof CredentialsState) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;

      setCredentialsState((previousState) => ({
        ...previousState,
        [fieldName]: { ...previousState[fieldName], value },
      }));

      debouncedValidateField(fieldName, value);
    };

  const handleDateOfBirthChange = (value: PickerValue): void => {
    const dateOfBirthErrors = validateDateOfBirth(value ? value.toString() : '');
    const error = dateOfBirthErrors.length > 0;
    const errorMessage = dateOfBirthErrors[0];

    setCredentialsState((previousState) => ({
      ...previousState,
      dateOfBirth: { value, error, errorMessage },
    }));

    setDatePickerValue(value);
  };

  const togglePasswordReveal = () => {
    setIsPasswordRevealed((show) => !show);
  };

  const handleBlur =
    (field: keyof CredentialsState) =>
    (event: React.FocusEvent<HTMLInputElement>): void => {
      const { value } = event.target;

      if (value === '') {
        setCredentialsState((previousState) => {
          const previousField = previousState[field];

          if (previousField.error === false && previousField.errorMessage === '') {
            return previousState;
          }

          return {
            ...previousState,
            [field]: { ...previousField, error: false, errorMessage: '' },
          };
        });
      }
    };

  const handlePickerClose = (): void => {
    if (datePickerValue === null) {
      setCredentialsState((previousState) => ({
        ...previousState,
        dateOfBirth: { ...previousState.dateOfBirth, error: false, errorMessage: '' },
      }));
    }
  };

  const handleNextStep = (): void => {
    const validationErrors = validateCredentials({
      email: credentialsState.email.value,
      firstName: credentialsState.firstName.value,
      lastName: credentialsState.lastName.value,
      password: credentialsState.password.value,
      dateOfBirth: credentialsState.dateOfBirth.value?.toString() ?? '',
    });

    setCredentialsState((previousState) => ({
      ...previousState,
      email: {
        ...previousState.email,
        error: validationErrors.emailErrors.length > 0,
        errorMessage: validationErrors.emailErrors[0] || '',
      },
      password: {
        ...previousState.password,
        error: validationErrors.passwordErrors.length > 0,
        errorMessage: validationErrors.passwordErrors[0] || '',
      },
      firstName: {
        ...previousState.firstName,
        error: validationErrors.firstNameErrors.length > 0,
        errorMessage: validationErrors.firstNameErrors[0] || '',
      },
      lastName: {
        ...previousState.lastName,
        error: validationErrors.lastNameErrors.length > 0,
        errorMessage: validationErrors.lastNameErrors[0] || '',
      },
      dateOfBirth: {
        ...previousState.dateOfBirth,
        error: validationErrors.dateOfBirthErrors.length > 0,
        errorMessage: validationErrors.dateOfBirthErrors[0] || '',
      },
    }));

    const hasErrors = Object.values(validationErrors).some(
      (errorMessages: string[]) => errorMessages.length > 0
    );

    if (handleNext && !hasErrors) {
      markStep(false);

      setRegistrationContext({
        ...registrationContext,
        customerDraft: {
          ...registrationContext.customerDraft,
          email: credentialsState.email.value,
          firstName: credentialsState.firstName.value,
          lastName: credentialsState.lastName.value,
          password: credentialsState.password.value,
          dateOfBirth: credentialsState.dateOfBirth.value?.format(DATE_OF_BIRTH_FORMAT) ?? '',
        },
        credentialsState,
        step: stepIndex + 1,
      });

      handleNext();
    }
  };

  const reset = (): void => {
    setCredentialsState({
      email: { value: '', error: false, errorMessage: '' },
      password: { value: '', error: false, errorMessage: '' },
      firstName: { value: '', error: false, errorMessage: '' },
      lastName: { value: '', error: false, errorMessage: '' },
      dateOfBirth: { value: null, error: false, errorMessage: '' },
    });

    if (handleReset) handleReset();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor={FIELD_NAME.EMAIL}>Email</FormLabel>
          <TextField
            value={credentialsState.email.value}
            error={credentialsState.email.error}
            helperText={credentialsState.email.errorMessage}
            id={FIELD_NAME.EMAIL}
            type={FIELD_NAME.EMAIL}
            name={FIELD_NAME.EMAIL}
            placeholder={PLACEHOLDER.EMAIL}
            autoComplete={FIELD_NAME.EMAIL}
            fullWidth
            variant="outlined"
            color={credentialsState.email.error ? 'error' : 'primary'}
            onInput={handleInputChange(FIELD_NAME.EMAIL)}
            onBlur={handleBlur(FIELD_NAME.EMAIL)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={FIELD_NAME.PASSWORD}>Password</FormLabel>
          <TextField
            value={credentialsState.password.value}
            error={credentialsState.password.error}
            helperText={credentialsState.password.errorMessage}
            name={FIELD_NAME.PASSWORD}
            placeholder={PLACEHOLDER.PASSWORD}
            type={isPasswordRevealed ? 'text' : 'password'}
            id={FIELD_NAME.PASSWORD}
            autoComplete="new-password"
            fullWidth
            variant="outlined"
            color={credentialsState.password.error ? 'error' : 'primary'}
            onInput={handleInputChange(FIELD_NAME.PASSWORD)}
            onBlur={handleBlur(FIELD_NAME.PASSWORD)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={isPasswordRevealed ? 'Hide password' : 'Show password'}
                      onClick={togglePasswordReveal}
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
        <FormControl>
          <FormLabel htmlFor={FIELD_NAME.FIRST_NAME}>First Name</FormLabel>
          <TextField
            value={credentialsState.firstName.value}
            error={credentialsState.firstName.error}
            helperText={credentialsState.firstName.errorMessage}
            id={FIELD_NAME.FIRST_NAME}
            type="text"
            name={FIELD_NAME.FIRST_NAME}
            placeholder={PLACEHOLDER.FIRST_NAME}
            autoComplete="given-name"
            fullWidth
            variant="outlined"
            color={credentialsState.firstName.error ? 'error' : 'primary'}
            onInput={handleInputChange(FIELD_NAME.FIRST_NAME)}
            onBlur={handleBlur(FIELD_NAME.FIRST_NAME)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={FIELD_NAME.LAST_NAME}>Last Name</FormLabel>
          <TextField
            value={credentialsState.lastName.value}
            error={credentialsState.lastName.error}
            helperText={credentialsState.lastName.errorMessage}
            id={FIELD_NAME.LAST_NAME}
            type="text"
            name={FIELD_NAME.LAST_NAME}
            placeholder={PLACEHOLDER.LAST_NAME}
            autoComplete="family-name"
            fullWidth
            variant="outlined"
            color={credentialsState.lastName.error ? 'error' : 'primary'}
            onInput={handleInputChange(FIELD_NAME.LAST_NAME)}
            onBlur={handleBlur(FIELD_NAME.LAST_NAME)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={FIELD_NAME.DATE_OF_BIRTH}>Date of Birth</FormLabel>
          <DatePicker
            value={credentialsState.dateOfBirth.value}
            name={FIELD_NAME.DATE_OF_BIRTH}
            onChange={handleDateOfBirthChange}
            openTo="year"
            maxDate={dayjs().subtract(13, 'year')}
            views={['year', 'month', 'day']}
            format={DATE_OF_BIRTH_FORMAT}
            slotProps={{
              textField: {
                error: credentialsState.dateOfBirth.error,
                helperText: credentialsState.dateOfBirth.errorMessage,
              },
            }}
            onClose={handlePickerClose}
          />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            pt: 2,
            // position: 'relative',
          }}
        >
          <Button
            sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            type="button"
            onClick={reset}
            variant="outlined"
            color="error"
          >
            Reset
          </Button>
          <Button type="button" onClick={handleNextStep} variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
