export interface Feedback {
  id: string;
  name: string;
  email: string;
  score: number;
  message: string;
  department: 'engineering' | 'marketing' | 'sales' | 'support' | 'hr' | 'finance';
  sentiment: 'positive' | 'negative' | 'neutral';
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface DepartmentStats {
  department: string;
  totalReviews: number;
  averageScore: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  pendingCount: number;
}