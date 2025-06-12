import { CustomTitleH2, ExternalLink } from '@components';
import type { TechItem } from '@constants';
import { TECH_STACK } from '@constants';
import { Box, Grid, Typography } from '@mui/material';

export const TechnologiesSection = () => {
  return (
    <Box component="section">
      <CustomTitleH2 variant="h2">Tech Stack We Used</CustomTitleH2>
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: '380px', marginInline: 'auto', textAlign: 'center' }}
      >
        {TECH_STACK.map((tech: TechItem) => (
          <Grid
            key={tech.fullName}
            size={2.4}
            title={tech.fullName}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <ExternalLink href={tech.link}>{tech.icon({ width: 40, height: 40 })}</ExternalLink>
            <Typography variant="caption" textAlign="center" mt={1}>
              {tech.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
