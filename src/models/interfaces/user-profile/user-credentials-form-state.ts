import type { PickerValue } from '@mui/x-date-pickers/internals';

import type { RegistrationFieldState } from '../registration/registration-field-state';

export interface UserCredentialsFormState {
  email: RegistrationFieldState;
  firstName: RegistrationFieldState;
  lastName: RegistrationFieldState;
  dateOfBirth: { value: PickerValue | null; error: boolean; errorMessage: string };
}
