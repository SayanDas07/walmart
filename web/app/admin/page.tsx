'use client';

import { useState } from 'react';
import AdminPanel from '@/components/AdminPanel';
import { Feedback } from '../../types/feedback';
import { dummyFeedbacks } from '../../data/dummy-data';
import Link from 'next/link';

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(dummyFeedbacks);

  const handleUpdateStatus = (id: string, status: Feedback['status']) => {
    setFeedbacks(prev => 
      prev.map(feedback => 
        feedback.id === id ? { ...feedback, status } : feedback
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AdminPanel feedbacks={feedbacks} onUpdateStatus={handleUpdateStatus} />
      
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="text-center">
          <Link
            href="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Feedback Form
          </Link>
        </div>
      </div>
    </div>
  );
}
