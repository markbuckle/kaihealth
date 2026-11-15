export type FaqItem = { id: string; question: string; answer: string };

// placeholder answers are in square brackets and still need writing
export const faqItems: FaqItem[] = [
  {
    id: 'blood-draw',
    question: 'Where do I get my blood drawn?',
    answer: 'At a partner collection site near you. You pick a time when you join. [COVERAGE AREA]',
  },
  {
    id: 'who-explains',
    question: 'Who explains my results?',
    answer: '[ANSWER]',
  },
  {
    id: 'family-doctor',
    question: 'Does this replace my family doctor?',
    answer: '[ANSWER]',
  },
  {
    id: 'data-storage',
    question: 'Where is my data stored?',
    answer: '[ANSWER]',
  },
];
