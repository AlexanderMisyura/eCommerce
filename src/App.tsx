import Button from '@components/button/Button';
import { useState } from 'react';

import styles from './App.module.css';
import ReactLogo from './assets/icons/react.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <ReactLogo onClick={() => setCount((count) => count + 1)} className={styles.logo} />
      <h1 className={`${styles.count} text-5xl`}>{count}</h1>
      <Button text="Decrement" onClick={() => setCount((count) => count - 1)} />
    </div>
  );
}

export default App;
