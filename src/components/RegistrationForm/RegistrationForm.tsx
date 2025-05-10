import { UrlPath } from '@ts-enums';
import { useEffect } from 'react';
import { Form, useActionData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export const RegistrationForm = () => {
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
      <Form
        action={`/${UrlPath.REGISTRATION}`}
        method="post"
        className="flex flex-col items-center"
      >
        <label htmlFor="email"> email </label>
        <input name="email" type="email" className="px-2 py-1 shadow-sm" id="email" />
        <label htmlFor="firstName"> first name </label>
        <input name="firstName" type="text" className="px-2 py-1 shadow-sm" id="firstName" />
        <label htmlFor="lastName">last name</label>
        <input name="lastName" type="text" className="px-2 py-1 shadow-sm" id="lastName" />

        <label htmlFor="password">password</label>
        <input name="password" type="password" className="px-2 py-1 shadow-sm" id="password" />
        <label htmlFor="passwordConfirm">confirm password</label>
        <input
          name="passwordConfirm"
          type="password"
          className="px-2 py-1 shadow-sm"
          id="passwordConfirm"
        />
        <button type="submit">sign in</button>
        <ToastContainer />
      </Form>
    </>
  );
};
