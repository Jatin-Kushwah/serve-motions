export interface PlanFeature {
  label: string;
  value: string | null;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: PlanFeature[];
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: '$499',
    annualPrice: '$399',
    description: 'The essentials to establish your brand online and start growing.',
    featured: false,
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
    features: [
      { label: 'Social Media Management', value: '1 platform' },
      { label: 'Content calendar', value: '8 posts / mo' },
      { label: 'Paid Advertising', value: null },
      { label: 'Email Marketing', value: null },
      { label: 'Brand Identity & Design', value: null },
      { label: 'Web Design & Development', value: null },
      { label: 'Performance reporting', value: 'Monthly' },
      { label: 'Account manager', value: null },
      { label: 'Support', value: 'Email' },
      { label: 'Strategy calls', value: null },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: '$1,299',
    annualPrice: '$1,039',
    description: 'Multi-channel momentum for brands ready to scale their reach.',
    featured: true,
    ctaLabel: 'Start with Pro',
    ctaHref: '/contact',
    features: [
      { label: 'Social Media Management', value: '3 platforms' },
      { label: 'Content calendar', value: '16 posts / mo' },
      { label: 'Paid Advertising', value: 'Google or Meta' },
      { label: 'Email Marketing', value: 'Setup & sequences' },
      { label: 'Brand Identity & Design', value: null },
      { label: 'Web Design & Development', value: null },
      { label: 'Performance reporting', value: 'Bi-weekly' },
      { label: 'Account manager', value: 'Dedicated' },
      { label: 'Support', value: 'Email + chat' },
      { label: 'Strategy calls', value: 'Monthly' },
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    monthlyPrice: '$2,999',
    annualPrice: '$2,399',
    description: 'The full arsenal — every channel, every service, fully managed.',
    featured: false,
    ctaLabel: 'Talk to Us',
    ctaHref: '/contact',
    features: [
      { label: 'Social Media Management', value: 'All platforms' },
      { label: 'Content calendar', value: 'Unlimited' },
      { label: 'Paid Advertising', value: 'Google + Meta + Programmatic' },
      { label: 'Email Marketing', value: 'Full lifecycle automation' },
      { label: 'Brand Identity & Design', value: 'Included' },
      { label: 'Web Design & Development', value: 'Included' },
      { label: 'Performance reporting', value: 'Weekly custom dashboard' },
      { label: 'Account manager', value: 'Dedicated' },
      { label: 'Support', value: 'Priority 24/7' },
      { label: 'Strategy calls', value: 'Weekly' },
    ],
  },
];
