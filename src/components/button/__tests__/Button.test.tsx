import { render, screen } from '@testing-library/react';

import Button from '../Button';

const text = 'Hello';

describe('Button', () => {
  it(`renders the text - ${text}`, () => {
    render(<Button text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
