export interface PricingFaq {
  id: string;
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    id: 'setup-fees',
    question: 'Are there any setup fees?',
    answer:
      'No setup fees, ever. Your first invoice covers only the monthly retainer for the plan you choose. We onboard you quickly and get to work within the first week.',
  },
  {
    id: 'change-plan',
    question: 'Can I change my plan later?',
    answer:
      'Absolutely. You can upgrade or downgrade at any time — changes take effect at the start of your next billing cycle. There are no penalties or lock-in periods.',
  },
  {
    id: 'agency-platforms',
    question: 'What\'s included in "All platforms" for Agency?',
    answer:
      'The Agency plan covers every major platform relevant to your business — Instagram, Facebook, LinkedIn, X (Twitter), TikTok, Pinterest, and YouTube. We tailor the active platform mix to your audience and goals during onboarding.',
  },
  {
    id: 'one-off-projects',
    question: 'Do you offer one-off projects instead of retainers?',
    answer:
      'Our retainer model is designed for sustained, compounding growth — which one-off projects rarely achieve. That said, we do take on select project-based engagements (brand identity, website builds) alongside or prior to a retainer. Get in touch to discuss.',
  },
  {
    id: 'cancellation',
    question: "What's your cancellation policy?",
    answer:
      'Cancel anytime with 30 days notice. No long-term contracts, no cancellation fees. We believe great work earns loyalty — not fine print.',
  },
];
