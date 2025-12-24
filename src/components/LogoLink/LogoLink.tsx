import { Link } from 'react-router';

export interface LogoLinkProps {
  srcImg: string;
  path: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const LogoLink: React.FC<LogoLinkProps> = (props) => {
  const { srcImg, path, className, width = 100, height = 45, alt = 'Logo' } = props;
  return (
    <Link to={path} className={className}>
      <img src={srcImg} alt={alt} width={width} height={height} />
    </Link>
  );
};
