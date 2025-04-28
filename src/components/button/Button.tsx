interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="cursor-pointer rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow select-none hover:bg-gray-100"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
