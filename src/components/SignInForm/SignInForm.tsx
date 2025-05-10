import { UrlPath } from '@ts-enums';
import { useEffect } from 'react';
import { Form, useActionData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export const SignInForm = () => {
  const data = useActionData<string[] | undefined>();

  useEffect(() => {
    if (data) {
      console.log({ data });
      data.map((message) => {
        toast.error(message);
      });
    }
  }, [data]);

  return (
    <>
      <Form action={`/${UrlPath.SIGN_IN}`} method="post" className="flex flex-col items-center">
        <label htmlFor="email"> email </label>
        <input name="email" type="email" className="px-2 py-1 shadow-sm" id="email" />
        <label htmlFor="password">password</label>
        <input name="password" type="password" className="px-2 py-1 shadow-sm" id="password" />
        <button type="submit">sign in</button>
        <ToastContainer />
      </Form>
    </>
  );
};
