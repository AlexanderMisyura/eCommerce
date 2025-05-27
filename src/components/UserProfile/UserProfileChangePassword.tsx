import { ApiController } from '@controllers';
import { useCustomerContext, useToast } from '@hooks';
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
import { LegoLoader } from 'components/Loaders/LegoLoader';
import { useState } from 'react';

interface PasswordsState {
  values: Record<string, string>;
  errors: Record<string, string>;
  visibility: Record<string, boolean>;
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
};

export const UserProfileChangePassword = () => {
  const { palette, spacing } = useTheme();
  const { currentCustomer, setCurrentCustomer } = useCustomerContext();
  const { showToast } = useToast();

  const [passwords, setPasswords] = useState(initPasswordState.values);
  const [passwordErrors, setPasswordErrors] = useState(initPasswordState.errors);
  const [showPasswords, setShowPasswords] = useState(initPasswordState.visibility);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

    setPasswords((previousPasswords) => {
      const updatedPasswords = { ...previousPasswords, [field]: value };
      const { currentPassword, newPassword, confirmNewPassword } = updatedPasswords;

      const updatedErrors = {
        ...passwordErrors,
        [field]: validatePassword(value)[0] ?? '',
      };

      if (newPassword === currentPassword && newPassword.length > 0 && currentPassword.length > 0) {
        updatedErrors.newPassword = 'New password must not be the same as the current password.';
      }

      if (
        newPassword !== confirmNewPassword &&
        newPassword.length > 0 &&
        confirmNewPassword.length > 0
      ) {
        updatedErrors.confirmNewPassword = 'New password and confirmation password must match.';
      }

      setPasswordErrors(updatedErrors);

      const hasErrors = Object.values(updatedErrors).some((error) => error !== '');
      const allFieldsFilled = Object.values(updatedPasswords).every(
        (value_) => value_.trim() !== ''
      );

      setIsSubmitDisabled(hasErrors || !allFieldsFilled);

      return updatedPasswords;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const controller = ApiController.getInstance();
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
        {passwordFieldKeys.map((field) => {
          return (
            <TextField
              key={field}
              type={showPasswords[field] ? 'text' : 'password'}
              value={passwords[field]}
              label={PASSWORD_FIELDS[field]}
              error={!!passwordErrors[field]}
              helperText={passwordErrors[field]}
              autoComplete="password"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangePassword(event, field)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
        <LegoLoader color={palette.grey[300]} />
      </Backdrop>
    </>
  );
};
