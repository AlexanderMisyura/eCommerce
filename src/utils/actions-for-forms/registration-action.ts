import { apiRoot, registrationApp, requestMeInfo } from '@services';
import type { RegistrationData } from '@ts-interfaces';
import { RegistrationSchema } from '@utils';
import type { ActionFunctionArgs } from 'react-router';

export const registrationAction = async ({
  request,
}: ActionFunctionArgs): Promise<RegistrationData> => {
  const submission = RegistrationSchema.parse(await request.json());

  const serverErrors: string[] = [];

  try {
    const data = await registrationApp(submission);
    apiRoot.setUserData(submission);
    await requestMeInfo();
    return { customer: data.body.customer };
  } catch (error) {
    if (error instanceof Error) {
      serverErrors.push(error.message);
    } else {
      serverErrors.push('Unexpected error! Try one more time!');
    }
    return { serverErrors };
  }
};
