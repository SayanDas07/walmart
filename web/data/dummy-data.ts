import { Feedback } from '../types/feedback';

export const dummyFeedbacks: Feedback[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    score: 5,
    message: 'Excellent product quality! The engineering team has delivered outstanding features.',
    department: 'engineering',
    sentiment: 'positive',
    createdAt: new Date('2024-01-15'),
    status: 'reviewed'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    score: 4,
    message: 'Great marketing campaigns, but could improve targeting strategy.',
    department: 'marketing',
    sentiment: 'positive',
    createdAt: new Date('2024-01-20'),
    status: 'resolved'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    score: 2,
    message: 'Sales process is too complicated and takes too long to complete.',
    department: 'sales',
    sentiment: 'negative',
    createdAt: new Date('2024-01-25'),
    status: 'pending'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    score: 5,
    message: 'Support team was incredibly helpful and resolved my issue quickly.',
    department: 'support',
    sentiment: 'positive',
    createdAt: new Date('2024-02-01'),
    status: 'reviewed'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    score: 1,
    message: 'HR department is unresponsive and policies are unclear.',
    department: 'hr',
    sentiment: 'negative',
    createdAt: new Date('2024-02-05'),
    status: 'pending'
  },
  {
    id: '6',
    name: 'Lisa Brown',
    email: 'lisa.brown@example.com',
    score: 3,
    message: 'Finance processes are average, nothing special but gets the job done.',
    department: 'finance',
    sentiment: 'neutral',
    createdAt: new Date('2024-02-10'),
    status: 'reviewed'
  },
  {
    id: '7',
    name: 'Alex Turner',
    email: 'alex.turner@example.com',
    score: 5,
    message: 'Engineering team delivered the new features ahead of schedule!',
    department: 'engineering',
    sentiment: 'positive',
    createdAt: new Date('2024-02-12'),
    status: 'resolved'
  },
  {
    id: '8',
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    score: 2,
    message: 'Marketing materials are outdated and not engaging enough.',
    department: 'marketing',
    sentiment: 'negative',
    createdAt: new Date('2024-02-15'),
    status: 'pending'
  },
  {
    id: '9',
    name: 'Robert Kim',
    email: 'robert.kim@example.com',
    score: 4,
    message: 'Sales team is knowledgeable but follow-up could be better.',
    department: 'sales',
    sentiment: 'positive',
    createdAt: new Date('2024-02-18'),
    status: 'reviewed'
  },
  {
    id: '10',
    name: 'Amanda Davis',
    email: 'amanda.davis@example.com',
    score: 3,
    message: 'Support response time is okay, not great but acceptable.',
    department: 'support',
    sentiment: 'neutral',
    createdAt: new Date('2024-02-20'),
    status: 'pending'
  },
  {
    id: '11',
    name: 'Kevin Zhang',
    email: 'kevin.zhang@example.com',
    score: 1,
    message: 'HR policies are confusing and the onboarding process is terrible.',
    department: 'hr',
    sentiment: 'negative',
    createdAt: new Date('2024-02-22'),
    status: 'pending'
  },
  {
    id: '12',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    score: 4,
    message: 'Finance department is efficient and processes payments quickly.',
    department: 'finance',
    sentiment: 'positive',
    createdAt: new Date('2024-02-25'),
    status: 'reviewed'
  }
];