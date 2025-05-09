import { UrlPath } from '@ts-enums';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="b h-full w-[90%] rounded-md bg-stone-200 p-3 shadow-stone-800">
      <h2>Sorry, this page not found 404</h2>
      <button type="button" onClick={() => void navigate(UrlPath.HOME)}>
        to main page
      </button>
    </div>
  );
};
