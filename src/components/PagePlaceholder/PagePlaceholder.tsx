import PlaceholderImg from '@assets/images/background-page-placeholder.png';

export const PagePlaceholder = () => {
  return (
    <div className="flex grow justify-center">
      <div>
        <img
          className="h-auto w-full max-w-[500px] rounded-4xl"
          src={PlaceholderImg}
          alt="this page is under construction"
        />
      </div>
    </div>
  );
};
