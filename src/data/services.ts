export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  bullets: string[];
  bgGradient: string;
  stat: string;
  statLabel: string;
}

export const services: Service[] = [
  {
    id: 'seo',
    name: 'SEO & Content Strategy',
    icon: 'TrendingUp',
    description: 'Dominate search rankings with technical SEO, authoritative content, and keyword strategies built to last.',
    bullets: [
      'Technical SEO audits & implementation',
      'Keyword research & content mapping',
      'Link building & authority development',
      'Analytics & performance tracking',
    ],
    bgGradient: 'from-emerald-50 to-teal-50',
    stat: '+312%',
    statLabel: 'avg. organic traffic growth',
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    icon: 'Share2',
    description: 'Build communities that convert. We craft platform-specific content strategies that grow your audience and brand.',
    bullets: [
      'Platform strategy & content calendars',
      'Creative direction & copywriting',
      'Community management',
      'Influencer identification & outreach',
    ],
    bgGradient: 'from-violet-50 to-purple-50',
    stat: '4.8×',
    statLabel: 'avg. engagement increase',
  },
  {
    id: 'paid',
    name: 'Paid Advertising',
    icon: 'Target',
    description: 'Every dollar working harder. Precision-targeted campaigns across Google, Meta, and programmatic that scale profitably.',
    bullets: [
      'Google Ads & Performance Max',
      'Meta & Instagram Ads',
      'Programmatic & display',
      'Conversion rate optimisation',
    ],
    bgGradient: 'from-orange-50 to-amber-50',
    stat: '2.7×',
    statLabel: 'avg. return on ad spend',
  },
  {
    id: 'brand',
    name: 'Brand Identity & Design',
    icon: 'Palette',
    description: 'A brand that stops the scroll. From visual identity to brand guidelines, we create systems that scale.',
    bullets: [
      'Logo & visual identity design',
      'Brand guidelines & systems',
      'Creative direction',
      'Motion & video assets',
    ],
    bgGradient: 'from-pink-50 to-rose-50',
    stat: '89%',
    statLabel: 'of clients see higher conversion',
  },
  {
    id: 'email',
    name: 'Email Marketing',
    icon: 'Mail',
    description: 'Your highest-ROI channel, optimised. Lifecycle sequences, campaigns, and automation that nurture and convert.',
    bullets: [
      'Email strategy & segmentation',
      'Welcome & lifecycle sequences',
      'Campaign design & copywriting',
      'Deliverability & list hygiene',
    ],
    bgGradient: 'from-sky-50 to-blue-50',
    stat: '41%',
    statLabel: 'avg. open rate delivered',
  },
  {
    id: 'web',
    name: 'Web Design & Development',
    icon: 'Globe',
    description: 'Websites that do the selling for you. Fast, accessible, conversion-optimised sites built on modern stacks.',
    bullets: [
      'UX/UI design & prototyping',
      'Frontend development (Astro, Next.js)',
      'CRO & landing page optimisation',
      'Performance & Core Web Vitals',
    ],
    bgGradient: 'from-indigo-50 to-blue-50',
    stat: '<1s',
    statLabel: 'avg. time to interactive',
  },
];
