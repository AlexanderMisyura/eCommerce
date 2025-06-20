import { CustomTitleH2, ExternalLink } from '@components';
import { TECH_STACK } from '@constants';
import { Box, Grid, Typography } from '@mui/material';
import type { TechStackItem } from '@ts-interfaces';

export const TechnologiesSection = () => {
  return (
    <Box component="section">
      <CustomTitleH2 variant="h2">Tech Stack We Used</CustomTitleH2>
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: '500px', marginInline: 'auto', textAlign: 'center' }}
      >
        {TECH_STACK.map((tech: TechStackItem) => (
          <Grid
            key={tech.fullName}
            size={2.4}
            title={tech.fullName}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <ExternalLink href={tech.link}>
              {tech.icon({ width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)' })}
            </ExternalLink>
            <Typography variant="caption" textAlign="center" mt={1}>
              {tech.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
