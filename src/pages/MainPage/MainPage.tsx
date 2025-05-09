import type { ClientResponse, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';
import { Spinner } from '@components';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const MainPage = () => {
  const customersPromise = useLoaderData<ClientResponse<CustomerPagedQueryResponse>>();

  return (
    <div className="flex grow flex-col items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <Await resolve={customersPromise} errorElement={<h1>error while loading customer</h1>}>
          {(resolvedCustomers) =>
            resolvedCustomers.body.results.map((customer) => (
              <p key={customer.id}>{customer.email}</p>
            ))
          }
        </Await>
      </Suspense>
    </div>
  );
};
