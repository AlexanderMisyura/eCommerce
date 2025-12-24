import { AboutUsBanner, BreadcrumbsNav } from '@components';
import { TITLE } from '@constants';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { MeetOurTeamSection, TeamMembersSection, TechnologiesSection } from './Sections';

export const AboutUsPage = () => {
  return (
    <>
      <title>{`About Us | ${TITLE}`}</title>

      <Container
        sx={{
          flexGrow: 1,
        }}
      >
        <BreadcrumbsNav sx={{ mb: 4 }} />
        <Stack sx={{ rowGap: 8, mb: 4 }}>
          <AboutUsBanner />
          <MeetOurTeamSection />
          <TeamMembersSection />
          <TechnologiesSection />
        </Stack>
      </Container>
    </>
  );
};
