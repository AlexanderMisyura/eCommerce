import LogoIcon from '@assets/icons/logo.png';
import { AuthPanel, BasketButton, LogoLink, Navigation } from '@components';
import Container from '@mui/material/Container';
import { UrlPath } from '@ts-enums';

export const Header = () => {
  return (
    <header>
      <Container className="flex items-center justify-center gap-4 p-4">
        <LogoLink className="mr-4" srcImg={LogoIcon} path={UrlPath.HOME} />
        <Navigation />
        <AuthPanel />
        <BasketButton />
      </Container>
    </header>
  );
};
