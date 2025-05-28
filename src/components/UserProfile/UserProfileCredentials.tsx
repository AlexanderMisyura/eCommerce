import { LegoLoader } from '@components';
import {
  CUSTOMER_CREDENTIALS_STATE_DEFAULT,
  DATE_OF_BIRTH_FORMAT,
  FIELD_NAME,
  FIRST_NAME,
  LAST_NAME,
} from '@constants';
import { ApiController } from '@controllers';
import { useCustomerContext, useToast } from '@hooks';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Backdrop, Button, IconButton, Stack, TextField, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import type { UserProfileCredentialState } from '@ts-interfaces';
import { validateDateOfBirth, validateEmail, validateProperName } from '@utils';
import dayjs from 'dayjs';
import { useState } from 'react';

export const UserProfileCredentials = () => {
  const { palette, spacing } = useTheme();
  const { currentCustomer, setCurrentCustomer } = useCustomerContext();
  const [datePickerValue, setDatePickerValue] = useState<PickerValue>(null);
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<UserProfileCredentialState>({
    firstName: {
      ...CUSTOMER_CREDENTIALS_STATE_DEFAULT.firstName,
      value: currentCustomer?.firstName ?? '',
    },
    lastName: {
      ...CUSTOMER_CREDENTIALS_STATE_DEFAULT.lastName,
      value: currentCustomer?.lastName ?? '',
    },
    email: {
      ...CUSTOMER_CREDENTIALS_STATE_DEFAULT.email,
      value: currentCustomer?.email ?? '',
    },
    dateOfBirth: {
      ...CUSTOMER_CREDENTIALS_STATE_DEFAULT.dateOfBirth,
      value: dayjs(currentCustomer?.dateOfBirth),
    },
  });
  const [initialValues, setInitialValues] = useState(formValues);

  if (!currentCustomer) return null;

  const debouncedValidateField = (
    fieldName: keyof UserProfileCredentialState,
    value: string
  ): void => {
    let error = false;
    let errorMessage = '';

    switch (fieldName) {
      case FIELD_NAME.EMAIL: {
        const emailErrors = validateEmail(value);
        error = emailErrors.length > 0;
        errorMessage = emailErrors[0];
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

    setFormValues((previous) => {
      const previousField = previous[fieldName];

      if (previousField.error === error && previousField.errorMessage === errorMessage) {
        return previous;
      }

      return {
        ...previous,
        [fieldName]: { ...previousField, error, errorMessage },
      };
    });
  };

  /* Handlers */
  const handleInputChange =
    (fieldName: keyof UserProfileCredentialState) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;

      setFormValues((previous) => ({
        ...previous,
        [fieldName]: { ...previous[fieldName], value },
      }));

      debouncedValidateField(fieldName, value);
    };

  const handleEditModeForm = () => {
    setIsEditing((previous) => !previous);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleReset = () => {
    setFormValues(initialValues);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const controller = ApiController.getInstance();

    try {
      const response = await controller.updateCustomer({
        id: currentCustomer.id,
        version: currentCustomer.version,
        actions: [
          { action: 'setFirstName', firstName: formValues.firstName.value },
          { action: 'setLastName', lastName: formValues.lastName.value },
          { action: 'changeEmail', email: formValues.email.value },
          {
            action: 'setDateOfBirth',
            dateOfBirth: formValues.dateOfBirth.value?.toISOString().split('T')[0],
          },
        ],
      });
      setCurrentCustomer(response.body);
      setInitialValues(formValues);
      setIsEditing(false);
      showToast('Your profile has been updated', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateOfBirthChange = (value: PickerValue): void => {
    if (!value) return;

    const valueString = value.toString();
    const dateOfBirthErrors = validateDateOfBirth(valueString);
    const error = dateOfBirthErrors.length > 0;
    const errorMessage = dateOfBirthErrors[0];

    setFormValues((previous) =>
      previous.dateOfBirth.value === value
        ? previous
        : { ...previous, dateOfBirth: { value, error, errorMessage } }
    );

    setDatePickerValue(value);
  };

  const handlePickerClose = (): void => {
    if (datePickerValue === null) {
      setFormValues((previous) => ({
        ...previous,
        dateOfBirth: { ...previous.dateOfBirth, error: false, errorMessage: '' },
      }));
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => void handleSave(event)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing(3),
          maxWidth: '75%',
          width: '100%',
        }}
      >
        {isEditing ? (
          <IconButton
            onClick={handleCloseForm}
            sx={{ position: 'absolute', top: 20, right: 20 }}
            aria-label="edit profile"
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <Button
            startIcon={<EditIcon />}
            onClick={handleEditModeForm}
            sx={{ position: 'absolute', top: 20, right: 20 }}
            aria-label="edit profile"
          >
            Edit
          </Button>
        )}

        <TextField
          type="text"
          label="First Name"
          autoComplete="given-name"
          value={formValues.firstName.value}
          error={formValues.firstName.error}
          helperText={formValues.firstName.errorMessage}
          name={FIELD_NAME.FIRST_NAME}
          onInput={handleInputChange(FIELD_NAME.FIRST_NAME)}
          disabled={!isEditing}
        />
        <TextField
          type="text"
          label="Last Name"
          autoComplete="family-name"
          value={formValues.lastName.value}
          error={formValues.lastName.error}
          helperText={formValues.lastName.errorMessage}
          name={FIELD_NAME.LAST_NAME}
          onInput={handleInputChange(FIELD_NAME.LAST_NAME)}
          disabled={!isEditing}
        />
        <TextField
          type="text"
          label="Email"
          autoComplete={FIELD_NAME.EMAIL}
          value={formValues.email.value}
          error={formValues.email.error}
          helperText={formValues.email.errorMessage}
          name={FIELD_NAME.EMAIL}
          onInput={handleInputChange(FIELD_NAME.EMAIL)}
          disabled={!isEditing}
        />
        <DatePicker
          label="Date of Birth"
          value={formValues.dateOfBirth.value}
          openTo="year"
          maxDate={dayjs().subtract(13, 'year')}
          views={['year', 'month', 'day']}
          format={DATE_OF_BIRTH_FORMAT}
          slotProps={{
            textField: {
              error: formValues.dateOfBirth.error,
              helperText: formValues.dateOfBirth.errorMessage,
            },
          }}
          disabled={!isEditing}
          onChange={handleDateOfBirthChange}
          onClose={handlePickerClose}
        />

        {isEditing && (
          <Stack direction="row" spacing={4} justifyContent="center">
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        )}
      </Box>

      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <LegoLoader color={palette.grey[300]} />
      </Backdrop>
    </>
  );
};
