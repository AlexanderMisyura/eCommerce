import { ButtonLink } from '@components/buttonLink/ButtonLink';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-xl text-gray-600">Ooops... :(</p>
      <ButtonLink path="/" text="Go to Home" />
    </div>
  );
}
