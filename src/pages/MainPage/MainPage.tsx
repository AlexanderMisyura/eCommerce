import { CustomerContext } from 'context/customer.context';
import { useContext } from 'react';

export const MainPage = () => {
  const { currentCustomer } = useContext(CustomerContext)!;
  return (
    <div>
      <h1>Main page</h1>
      <h2>Hello {currentCustomer?.firstName ?? 'our guest'}!</h2>
    </div>
  );
};
