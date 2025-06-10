import { controller } from '@controllers';
import type { SignInData } from '@ts-interfaces';
import type { SignInType } from '@ts-types';
import { convertFormDataToString, validateSignIn } from '@utils';
import type { ActionFunctionArgs } from 'react-router';

export const signInAction = async ({ request }: ActionFunctionArgs): Promise<SignInData> => {
  const data = await request.formData();

  const submission: SignInType = {
    email: convertFormDataToString(data.get('email')),
    password: convertFormDataToString(data.get('password')),
  };

  const validationErrors = validateSignIn(submission);

  if (validationErrors.passwordErrors.length > 0 || validationErrors.emailErrors.length > 0) {
    return { validationErrors };
  }

  const serverErrors: string[] = [];

  try {
    const response = await controller.signInCustomer(submission);

    return { customer: response.body.customer };
  } catch (error) {
    if (error instanceof Error) {
      serverErrors.push(
        `${error.message} Register a new account if you don't have one or make sure your email and password are correct.`
      );
    } else {
      serverErrors.push('Unexpected error! Try one more time!');
    }

    return { serverErrors };
  }
};
