import { apiRoot } from '@services/ctp-api-client.service';

const handleclick = async (): Promise<void> => {
  const response = await apiRoot.root().me().get().execute();
};

export const MainPage = () => {
  return (
    <div>
      Main page
      <button type="button" onClick={() => void handleclick()}>
        click
      </button>
    </div>
  );
};
