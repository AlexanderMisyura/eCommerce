import { UrlPath } from '@ts-enums';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="b flex h-full w-[90%] flex-col gap-1.5 rounded-md bg-stone-50 p-3 shadow-sm shadow-stone-800">
      <h2>Sorry, this page not found 404</h2>
      <button
        type="button"
        onClick={() => void navigate(UrlPath.HOME)}
        className="self-start rounded-sm bg-stone-600 p-2 text-stone-50 shadow-sm hover:cursor-pointer"
      >
        to main page
      </button>
    </div>
  );
};
