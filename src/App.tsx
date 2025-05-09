import { Navigation } from '@components';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
