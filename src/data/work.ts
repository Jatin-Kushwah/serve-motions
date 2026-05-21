export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  metric: string;
  metricLabel: string;
  bgGradient: string;
  image?: string;
}

export const work: CaseStudy[] = [
  {
    id: 'nexova',
    client: 'Nexova Health',
    category: 'Content & Growth',
    metric: '+312%',
    metricLabel: 'Organic traffic in 6 months',
    bgGradient: 'linear-gradient(135deg, #0B0B1A 0%, #1a1a3e 100%)',
    image: 'https://images.unsplash.com/photo-1681911046053-1d2fdce39ea0?w=800&auto=format&q=80',
  },
  {
    id: 'forma',
    client: 'Forma Studio',
    category: 'Brand Identity & Paid Ads',
    metric: '4.8×',
    metricLabel: 'ROAS on Meta campaigns',
    bgGradient: 'linear-gradient(135deg, #0033FF 0%, #0B0B1A 100%)',
    image: 'https://images.unsplash.com/photo-1748679767437-00b5c0327b1a?w=800&auto=format&q=80',
  },
  {
    id: 'grove',
    client: 'Grove Collective',
    category: 'Social Media & Email',
    metric: '89%',
    metricLabel: 'Email open rate increase',
    bgGradient: 'linear-gradient(135deg, #1a1a1a 0%, #3d2d00 100%)',
    image: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=800&auto=format&q=80',
  },
];
