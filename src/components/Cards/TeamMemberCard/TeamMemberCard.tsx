import { type DevelopmentTeamDetails, SVG_LOGO } from '@constants';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { ExternalLink } from 'components/Links/ExternalLink';

interface TeamMemberCardProps {
  member: DevelopmentTeamDetails;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { palette } = useTheme();

  return (
    <Stack
      sx={{
        rowGap: 4,
        maxWidth: { xs: '600px', lg: '380px' },
        height: '100%',
        padding: 4,
        borderRadius: 4,
        boxShadow: 4,
        bgcolor: '#fef6e4',
      }}
    >
      {/* CARD HEADER */}
      <Stack sx={{ rowGap: 2 }}>
        <Stack sx={{ flexDirection: 'row', columnGap: 4 }}>
          <Stack
            sx={{
              rowGap: 2,
              border: `1px solid ${palette.backgroundCustom.dark}`,
              boxShadow: 4,
              borderRadius: 1,
              padding: 1,
            }}
          >
            <Avatar
              variant="rounded"
              src={member.photoURL}
              alt={member.firstName}
              sx={{ width: 80, height: 80 }}
            />
          </Stack>
          <Stack sx={{ rowGap: 1, flexGrow: 1 }}>
            <Typography variant="h4">{`${member.firstName} ${member.lastName}`}</Typography>
            <ExternalLink
              href={member.githubURL}
              style={{
                display: 'flex',
                columnGap: '4px',
                color: palette.primary.dark,
              }}
            >
              {SVG_LOGO.github({ width: 20, height: 20, color: 'inherit' })}
              <Typography variant="body2" component="span">
                {member.githubName}
              </Typography>
            </ExternalLink>

            <Typography variant="subtitle2">{member.role}</Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* CARD BODY */}
      <Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {member.bio}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="h5">Contribution:</Typography>
        {member.contributions.map((contribution) => (
          <Stack
            key={contribution}
            sx={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}
          >
            <DoneAllIcon sx={{ color: '#00a44d' }} />
            <Typography variant="body1">{contribution}</Typography>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};
