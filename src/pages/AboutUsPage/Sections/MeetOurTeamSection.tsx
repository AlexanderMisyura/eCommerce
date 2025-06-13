import { CustomTitleH2, ExternalLink } from '@components';
import { SVG_LOGO } from '@constants';
import { Box, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

export const MeetOurTeamSection = () => {
  const { spacing, palette } = useTheme();

  return (
    <Box component="section">
      <CustomTitleH2 variant="h2">Meet Our Team</CustomTitleH2>
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          gap: spacing(4),
        }}
      >
        <Stack sx={{ rowGap: spacing(2), flex: '2 1 0', order: { xs: 2, md: 1 } }}>
          <Typography variant="body1" component="p">
            Hello! We are a compact yet collaborative development team. We came together thanks to a{' '}
            <ExternalLink
              href="https://rs.school/"
              style={{ fontWeight: 700, color: palette.primary.dark }}
            >
              free online education program organized by the Rolling Scopes community.{' '}
            </ExternalLink>
            We worked side by side on this project and had a lot of fun (and some coffee too ☕).
          </Typography>
          <Typography variant="body1" component="p">
            We are very different people, but we share one big thing: we love coding and learning
            new things. During the project, we found a common language and often understood each
            other without many words. The whole process of communication and development was not
            only productive but also quite exciting.
          </Typography>
        </Stack>
        <Stack
          sx={{
            flex: '1 1 0',
            justifyContent: 'center',
            alignItems: 'center',
            paddingInline: spacing(),
            order: { xs: 1, md: 2 },
          }}
        >
          <ExternalLink href="https://rs.school/">
            {SVG_LOGO.rsSchool({ width: 200, height: 120 })}
          </ExternalLink>
        </Stack>
      </Stack>
    </Box>
  );
};
