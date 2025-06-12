import { CustomTitleH2, TeamMemberCard } from '@components';
import { DEVELOPMENT_TEAM_DETAILS } from '@constants';
import { Grid } from '@mui/material';

export const TeamMembersSection = () => {
  return (
    <section>
      <CustomTitleH2 variant="h2">Team Members</CustomTitleH2>
      <Grid container spacing={4} sx={{ marginTop: { xs: 0, lg: 12 } }}>
        {DEVELOPMENT_TEAM_DETAILS.map((member, index) => (
          <Grid
            key={member.githubURL}
            size={{ xs: 12, lg: 4 }}
            sx={{
              position: 'relative',
              top: { xs: 0, lg: index === 0 ? '-20px' : index === 2 ? '20px' : '0' },
            }}
          >
            <TeamMemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
