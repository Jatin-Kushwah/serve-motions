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
    bgGradient: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(13,148,136,0.03) 100%)',
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
    bgGradient: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.04) 100%)',
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
    bgGradient: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.04) 100%)',
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
    bgGradient: 'linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(225,29,72,0.04) 100%)',
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
    bgGradient: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.04) 100%)',
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
    bgGradient: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(59,130,246,0.04) 100%)',
    stat: '<1s',
    statLabel: 'avg. time to interactive',
  },
];
