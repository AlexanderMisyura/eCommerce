import { controller } from '@controllers';
import { RegistrationSchema } from '@schemas';
import type { RegistrationData } from '@ts-interfaces';
import type { ActionFunctionArgs } from 'react-router';

export const registrationAction = async ({
  request,
}: ActionFunctionArgs): Promise<RegistrationData> => {
  const submission = RegistrationSchema.parse(await request.json());

  const serverErrors: string[] = [];

  try {
    const response = await controller.registerCustomer(submission);

    return { customer: response.body.customer };
  } catch (error) {
    if (error instanceof Error) {
      serverErrors.push(`${error.message} Please review and change your registration information.`);
    } else {
      serverErrors.push('Unexpected error! Try one more time!');
    }

    return { serverErrors };
  }
};
