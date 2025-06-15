import { SVG_LOGO } from '@constants';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Avatar, Box, IconButton, Modal, Stack, Typography, useTheme } from '@mui/material';
import type { DevelopmentTeamDetails } from '@ts-interfaces';
import { ExternalLink } from 'components/Links/ExternalLink';
import { useState } from 'react';

interface TeamMemberCardProps {
  member: DevelopmentTeamDetails;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { palette } = useTheme();
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  return (
    <>
      <Stack
        sx={{
          rowGap: 4,
          maxWidth: { xs: '600px', lg: '380px' },
          height: '100%',
          padding: 4,
          borderRadius: 4,
          boxShadow: 4,
          bgcolor: palette.accent.light,
        }}
      >
        {/* CARD HEADER */}
        <Stack sx={{ rowGap: 2 }}>
          <Stack sx={{ flexDirection: 'row', columnGap: 4 }}>
            <Stack
              onClick={() => setOpenPhotoModal(true)}
              sx={{
                rowGap: 2,
                border: `1px solid ${palette.backgroundCustom.dark}`,
                boxShadow: 4,
                borderRadius: 1,
                padding: 1,
                cursor: 'pointer',
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

        {/* CARD FOOTER */}
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Contribution:
          </Typography>
          {member.contributions.map((contribution) => (
            <Stack
              key={`${member.githubName}-${contribution}`}
              sx={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}
            >
              <DoneAllIcon sx={{ color: palette.confirmation.main }} />
              <Typography variant="body1">{contribution}</Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <Modal open={openPhotoModal} onClose={() => setOpenPhotoModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            aria-label="Close photo"
            onClick={() => setOpenPhotoModal(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.common.white,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={member.photoURL}
            alt={member.firstName}
            sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
          />
        </Box>
      </Modal>
    </>
  );
};
