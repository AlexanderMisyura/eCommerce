import { AboutUsBanner, BreadcrumbsNav } from '@components';
import Container from '@mui/material/Container';
import { theme } from 'theme';

import { MeetOurTeamSection, TeamMembersSection, TechnologiesSection } from './Sections';

export const AboutUsPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: { xs: theme.spacing(6), md: theme.spacing(8) },
      }}
    >
      <BreadcrumbsNav />
      <AboutUsBanner />

      <MeetOurTeamSection />
      <TeamMembersSection />
      <TechnologiesSection />
    </Container>
  );
};
