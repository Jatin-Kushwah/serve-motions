export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Serve Motions completely transformed our digital presence. Within three months our organic leads tripled — their SEO team just gets it.",
    name: 'Sarah Chen',
    company: 'Nexova Health',
    role: 'CMO',
  },
  {
    id: 't2',
    quote: "The Meta campaigns they built are consistently delivering 4× ROAS. Every week the numbers go up. They've become an extension of our team.",
    name: 'Marcus Okonkwo',
    company: 'Forma Studio',
    role: 'Co-founder',
  },
  {
    id: 't3',
    quote: "We'd tried three agencies before. Serve Motions is different — they're proactive, transparent, and the creative quality is genuinely world-class.",
    name: 'Priya Rajan',
    company: 'Grove Collective',
    role: 'Head of Marketing',
  },
];
