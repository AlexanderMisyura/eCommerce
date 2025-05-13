import { type Customer } from '@commercetools/platform-sdk';
import { UrlPath } from '@ts-enums';
import { CustomerContext } from 'context/customer.context';
import { use, useEffect } from 'react';
import { Form, useActionData, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export const SignInForm = () => {
  const data = useActionData<string[] | undefined | Customer>();
  const { setCurrentCustomer } = use(CustomerContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) {
      data.map((message) => {
        toast.error(message);
      });
    } else if (data) {
      setCurrentCustomer(data);
      toast.success('successful sign in');
      void navigate(UrlPath.HOME);
    }
  }, [data]);

  return (
    <>
      <Form action={`/${UrlPath.SIGN_IN}`} method="post" className="flex flex-col items-center">
        <label htmlFor="email"> email </label>
        <input
          name="email"
          type="email"
          className="px-2 py-1 shadow-sm inset-shadow-sm"
          id="email"
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          className="px-2 py-1 shadow-sm inset-shadow-sm"
          id="password"
        />
        <button type="submit">sign in</button>
        <ToastContainer />
      </Form>
    </>
  );
};
