import alexandermisyuraAvatar from '@assets/images/avatars/alexandermisyura_avatar.jpeg';
import kelzerockAvatar from '@assets/images/avatars/kelzerock_avatar.jpeg';
import zzzhuchokAvatar from '@assets/images/avatars/zzzhuchok_avatar.jpeg';

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

export const DEVELOPMENT_TEAM_DETAILS: DevelopmentTeamDetails[] = [
  {
    photoURL: alexandermisyuraAvatar,
    firstName: 'Aliaksandr',
    lastName: 'Misiura',
    role: 'Team Lead',
    bio: 'Since I was a kid, I loved building things — from LEGO to websites. Now I live in Warsaw and work as a junior frontend developer. I like clean code, clean coffee, and clean desks ☕ 🧼. In my free time, I play board games and watch tech videos on YouTube',
    contributions: ['Register Page', 'Catalog Page', 'Cart Page', 'App Stack', 'Commerce Tools'],
    githubName: 'alexandermisyura',
    githubURL: 'https://github.com/alexandermisyura',
  },

  {
    photoURL: kelzerockAvatar,
    firstName: 'Aleksei',
    lastName: 'Zhuchkov',
    role: 'Developer',
    bio: 'I’m 35 and I live in Tbilisi, Georgia. I worked as a teacher before I discovered coding. JavaScript became my new passion, and I enjoy creating things from scratch. I also like hiking in the mountains and listening to rock music 🤘. I believe teamwork makes everything better',
    contributions: [
      'Login Page',
      'Product Page',
      'Detailed Product Page',
      'Kanban Board',
      'Commerce Tools',
    ],
    githubName: 'kelzerock',
    githubURL: 'https://github.com/kelzerock',
  },

  {
    photoURL: zzzhuchokAvatar,
    firstName: 'Rostislav',
    lastName: 'Zhuk',
    role: 'Developer',
    bio: 'I’m a self-taught developer from Minsk. Before programming, I fixed printers and helped people with their computers. Now I fix bugs instead! I love to learn new things every day. My hobbies are video games, spicy food 🌶️, and dreaming about space travel',
    contributions: ['Main Page', 'Profile Page', 'About us Page', 'Not Found Page', 'Design'],
    githubName: 'zzzhuchok',
    githubURL: 'https://github.com/zzzhuchok',
  },
];
