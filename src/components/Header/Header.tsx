import { Navigation } from '@components';
import { Container } from '@mui/material';

export const Header = () => {
  return (
    <header className="bg-blue-200">
      <Container className="flex p-4">
        <div>TheTeamLogo</div>
        <Navigation />
        <div>Auth</div>
      </Container>
    </header>
  );
};
