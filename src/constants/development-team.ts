import alexandermisyuraAvatar from '@assets/images/avatars/alexandermisyura_avatar.jpeg';
import kelzerockAvatar from '@assets/images/avatars/kelzerock_avatar.jpeg';
import zzzhuchokAvatar from '@assets/images/avatars/zzzhuchok_avatar.jpeg';
import type { DevelopmentTeamDetails } from '@ts-interfaces';

export const DEVELOPMENT_TEAM_DETAILS: DevelopmentTeamDetails[] = [
  {
    photoURL: alexandermisyuraAvatar,
    firstName: 'Alexander',
    lastName: 'Misyura',
    role: 'Team Lead',
    bio: `A curious mind from Minsk with a background as a mechanical technician, I've explored various roles, from engineering to sales. However, coding and developing beautiful, smooth apps is truly my passion 💻✨

    When I'm not coding or exploring new tech, you can find me diving into tabletop RPGs.🎲 Developer by day, paladin of the Sun God by night!🌞 I'm a reliable and detail-oriented partner, whether dealing with an evil reptilian cult🐍 or tackling a complex development project. Currently on the job hunt 🔍`,
    contributions: ['Register Page', 'Catalog Page', 'Cart Page', 'App Stack', 'Commerce Tools'],
    githubName: 'alexandermisyura',
    githubURL: 'https://github.com/alexandermisyura',
  },

  {
    photoURL: kelzerockAvatar,
    firstName: 'Aleksei',
    lastName: 'Zhuchkov',
    role: 'Developer',
    bio: `Hey, I’m Alexey! 👋 I’m really into coding and always trying to level up my skills 📚. When I’m not behind a screen, you’ll probably find me out doing something active — sports 🏀, adventures 🏕️, anything that gets the blood pumping 💥

    Always up for a challenge ⚔️ — whether it’s debugging a stubborn bit of code 🐛 or racing down a trail 🏃‍♂️
    `,
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
    bio: `I live in Minsk and now I work in the telecommunications field 📞. In my free time, I enjoy learning programming and writing code. I like to solve problems and create simple and good solutions. It makes me feel happy and motivated 💻

    I also have other hobbies. I play basketball 🏀 and tennis 🎾, and I really like board games ♟️ with friends. I enjoy working in a team, thinking about strategy, and talking with people — in games, in sports, and in development`,
    contributions: ['Main Page', 'Profile Page', 'About us Page', 'Not Found Page', 'Design'],
    githubName: 'zzzhuchok',
    githubURL: 'https://github.com/zzzhuchok',
  },
];
