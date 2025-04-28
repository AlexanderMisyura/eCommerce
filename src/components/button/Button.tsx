interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="button" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
