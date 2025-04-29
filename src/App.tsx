import Button from '@components/button/Button';
import { ButtonLink } from '@components/buttonLink/ButtonLink';
import { useState } from 'react';

import styles from './App.module.css';
import ReactLogo from './assets/icons/react.svg';

const buttonText = 'Decrement';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <ReactLogo onClick={() => setCount((count) => count + 1)} className={styles.logo} />
      <h1 className={`${styles.count} text-5xl`}>{count}</h1>
      <Button text={buttonText} onClick={() => setCount((count) => count - 1)} />
      <ButtonLink path="/cart" text="Go to Cart" />
    </div>
  );
}

export default App;
