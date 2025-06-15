import GithubLogo from '@assets/icons/github-logo.svg';
import RSLogo from '@assets/icons/rs-logo.svg';
import { DEVELOPMENT_TEAM_DETAILS } from '@constants';
import { Container } from '@mui/material';

export const Footer = () => {
  return (
    <footer className="bg-blue-200">
      <Container className="p-4">
        <div className="flex flex-col items-center gap-2">
          <RSLogo width={60} height={30} />
          <ul className="flex flex-wrap justify-center gap-x-4 text-base">
            {DEVELOPMENT_TEAM_DETAILS.map((member) => (
              <li key={member.githubURL}>
                <a
                  className="flex items-center gap-1"
                  href={member.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Github profile of ${member.githubName}`}
                >
                  <GithubLogo width={20} height={20} />
                  {member.githubName}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs">© 2025 Store. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
