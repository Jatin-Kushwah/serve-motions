export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'What does a project with Serve Motions actually cost?',
    answer: 'Our retainer engagements start at $3,000/month for a focused single-channel strategy (typically SEO or paid advertising). Multi-channel growth programmes range from $6,000–$15,000/month depending on scope. We offer fixed-scope project work for brand identity and website builds. We don\'t do mystery pricing — every proposal is itemised.',
  },
  {
    id: 'f2',
    question: 'How long before we see real results?',
    answer: 'Paid advertising typically shows measurable impact within 30–45 days as we gather conversion data and optimise. SEO is a longer game: expect meaningful organic growth at 90 days, compounding results by month 6. We\'ll give you honest timelines in the proposal — not inflated promises to win the deal.',
  },
  {
    id: 'f3',
    question: 'Do you work with businesses in our industry?',
    answer: 'We work across B2B SaaS, e-commerce, professional services, and consumer brands. Sector-specific experience means faster ramp-up, but we\'re equally effective in new verticals — marketing principles transfer. If we see a conflict of interest with an existing client, we\'ll tell you upfront.',
  },
  {
    id: 'f4',
    question: 'Will we have a dedicated point of contact?',
    answer: 'Yes. Every client has a dedicated strategist who owns the relationship and is accountable for results. You won\'t be passed to juniors or an account manager who doesn\'t understand your business. Your strategist attends every call and writes your monthly reports.',
  },
  {
    id: 'f5',
    question: "What happens if something isn't working?",
    answer: 'We flag it before you do. Monthly performance reviews include a frank assessment of what\'s working and what isn\'t. If a channel underperforms for two consecutive months despite optimisation, we\'ll recommend reallocating budget rather than defending a sunk cost. Our model depends on your results.',
  },
  {
    id: 'f6',
    question: 'How do we get started?',
    answer: 'Fill out the contact form or email hello@servemotions.com. We\'ll schedule a 30-minute discovery call within 48 hours — no pitch deck, just questions about your business. If there\'s a fit, we\'ll send a tailored proposal within 5 business days. No retainer required before the proposal.',
  },
];
