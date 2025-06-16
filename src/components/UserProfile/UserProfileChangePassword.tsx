import { Spinner } from '@components';
import { controller } from '@controllers';
import { useAppDataContext, useToast } from '@hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Backdrop,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { validatePassword } from '@utils';
import { useEffect, useState } from 'react';

interface PasswordsState {
  values: Record<string, string>;
  errors: Record<string, string>;
  visibility: Record<string, boolean>;
  touched: Record<string, boolean>;
}

type PasswordField = 'currentPassword' | 'newPassword' | 'confirmNewPassword';

const passwordFieldKeys: PasswordField[] = ['currentPassword', 'newPassword', 'confirmNewPassword'];
const PASSWORD_FIELDS: Record<PasswordField, string> = {
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  confirmNewPassword: 'Confirm New Password',
};

const initPasswordState: PasswordsState = {
  values: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  errors: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  visibility: {
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  },
  touched: {
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  },
};

const getPasswordErrors = (values: Record<string, string>): Record<string, string> => {
  const { currentPassword, newPassword, confirmNewPassword } = values;
  const errors: Record<string, string> = {
    currentPassword: validatePassword(currentPassword)[0] ?? '',
    newPassword: validatePassword(newPassword)[0] ?? '',
    confirmNewPassword: '',
  };

  if (newPassword === currentPassword && newPassword) {
    errors.newPassword = 'New password must not be the same as the current password.';
  }

  if (newPassword !== confirmNewPassword && confirmNewPassword) {
    errors.confirmNewPassword = 'New password and confirmation password must match.';
  }

  return errors;
};

export const UserProfileChangePassword = () => {
  const { spacing } = useTheme();
  const { currentCustomer, setCurrentCustomer } = useAppDataContext();
  const { showToast } = useToast();

  const [passwords, setPasswords] = useState(initPasswordState.values);
  const [passwordErrors, setPasswordErrors] = useState(initPasswordState.errors);
  const [showPasswords, setShowPasswords] = useState(initPasswordState.visibility);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(initPasswordState.touched);

  useEffect(() => {
    const errors = getPasswordErrors(passwords);
    setPasswordErrors(errors);
    const hasErrors = Object.values(errors).some(Boolean);
    const allFilled = Object.values(passwords).every((v) => v.trim() !== '');
    setIsSubmitDisabled(hasErrors || !allFilled);
  }, [passwords]);

  if (!currentCustomer) return null;

  const handleClickShowPassword = (field: PasswordField) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: PasswordField
  ) => {
    const { value } = event.target;

    setPasswords((previous) => ({ ...previous, [field]: value }));
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      await controller.changePasswordCustomer({
        id: currentCustomer.id,
        version: currentCustomer.version,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      controller.logoutCustomer();
      const loginResponse = await controller.signInCustomer({
        email: currentCustomer.email,
        password: passwords.newPassword,
      });

      setCurrentCustomer(loginResponse.body.customer);
      handleResetForm();
      showToast('Your password has been successfully changed', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetForm = () => {
    setPasswords(initPasswordState.values);
    setPasswordErrors(initPasswordState.errors);
    setShowPasswords(initPasswordState.visibility);
    setTouched(initPasswordState.touched);
    setIsSubmitDisabled(true);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => void handleSubmit(event)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing(3),
          maxWidth: '75%',
          width: '100%',
        }}
      >
        <TextField
          type="text"
          name="username"
          autoComplete="username"
          style={{ display: 'none' }}
        />
        {passwordFieldKeys.map((field) => {
          return (
            <TextField
              key={field}
              type={showPasswords[field] ? 'text' : 'password'}
              value={passwords[field]}
              label={PASSWORD_FIELDS[field]}
              error={!!passwordErrors[field] && touched[field]}
              helperText={touched[field] ? passwordErrors[field] : ''}
              autoComplete={field === 'currentPassword' ? 'current-password' : 'new-password'}
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangePassword(event, field)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle visibility for ${field}"
                        onClick={() => handleClickShowPassword(field)}
                        edge="end"
                      >
                        {showPasswords[field] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          );
        })}

        <Stack sx={{ flexDirection: 'row', justifyContent: 'center', columnGap: spacing(4) }}>
          <Button type="reset" variant="outlined" onClick={handleResetForm}>
            Reset
          </Button>

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitDisabled}>
            Change Password
          </Button>
        </Stack>
      </Box>

      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Spinner />
      </Backdrop>
    </>
  );
};
