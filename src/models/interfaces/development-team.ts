export interface DevelopmentTeamDetails {
  photoURL: string;
  firstName: string;
  lastName: string;
  role: 'Team Lead' | 'Developer';
  bio: string;
  contributions: string[];
  githubName: string;
  githubURL: string;
}
