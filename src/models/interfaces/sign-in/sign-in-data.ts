import type { Customer } from '@commercetools/platform-sdk';

import type { SignInValidationErrors } from './sign-in-validation-errors';

export interface SignInData {
  validationErrors?: SignInValidationErrors;
  serverErrors?: string[];
  customer?: Customer;
}
