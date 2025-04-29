import clsx from 'clsx';
import { Link } from 'react-router';

interface ButtonLinkProps {
  text: string;
  path: string;
  className?: string;
}

export function ButtonLink({ className, text, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className={clsx(
        'inline-block rounded-xl bg-blue-400 px-4 py-2 font-semibold text-white shadow-md transition-shadow hover:bg-blue-700',
        className
      )}
    >
      {text}
    </Link>
  );
}
