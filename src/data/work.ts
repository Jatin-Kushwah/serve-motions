export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  metric: string;
  metricLabel: string;
  bgGradient: string;
}

export const work: CaseStudy[] = [
  {
    id: 'nexova',
    client: 'Nexova Health',
    category: 'SEO & Content Strategy',
    metric: '+312%',
    metricLabel: 'Organic traffic in 6 months',
    bgGradient: 'linear-gradient(135deg, #0B0B1A 0%, #1a1a3e 100%)',
  },
  {
    id: 'forma',
    client: 'Forma Studio',
    category: 'Brand Identity & Paid Ads',
    metric: '4.8×',
    metricLabel: 'ROAS on Meta campaigns',
    bgGradient: 'linear-gradient(135deg, #0033FF 0%, #0B0B1A 100%)',
  },
  {
    id: 'grove',
    client: 'Grove Collective',
    category: 'Social Media & Email',
    metric: '89%',
    metricLabel: 'Email open rate increase',
    bgGradient: 'linear-gradient(135deg, #1a1a1a 0%, #3d2d00 100%)',
  },
];
