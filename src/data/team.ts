export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  bg: string;
}

export const team: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Alex Rivera',
    role: 'Founder & Strategy Director',
    initials: 'AR',
    bg: '#0033FF',
  },
  {
    id: 'tm2',
    name: 'Jordan Kim',
    role: 'Head of Performance Marketing',
    initials: 'JK',
    bg: '#0B0B1A',
  },
  {
    id: 'tm3',
    name: 'Priya Sharma',
    role: 'Creative Director',
    initials: 'PS',
    bg: '#5A5A72',
  },
  {
    id: 'tm4',
    name: 'Marcus Webb',
    role: 'SEO & Content Lead',
    initials: 'MW',
    bg: '#1a1a3e',
  },
  {
    id: 'tm5',
    name: 'Sofia Torres',
    role: 'Social Media Strategist',
    initials: 'ST',
    bg: '#0033FF',
  },
  {
    id: 'tm6',
    name: 'Liam Chen',
    role: 'Web Development Lead',
    initials: 'LC',
    bg: '#0B0B1A',
  },
];
