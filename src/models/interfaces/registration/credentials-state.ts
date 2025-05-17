import type { PickerValue } from '@mui/x-date-pickers/internals';

import type { RegistrationFieldState } from './registration-field-state';

export interface CredentialsState {
  email: RegistrationFieldState;
  password: RegistrationFieldState;
  firstName: RegistrationFieldState;
  lastName: RegistrationFieldState;
  dateOfBirth: { value: PickerValue | null; error: boolean; errorMessage: string };
}
