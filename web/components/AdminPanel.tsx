'use client';

import { useState, useMemo } from 'react';
import { Feedback, DepartmentStats } from '../types/feedback';
import { departmentSuggestions } from '../data/suggestions';

interface AdminPanelProps {
  feedbacks: Feedback[];
  onUpdateStatus: (id: string, status: Feedback['status']) => void;
}

export default function AdminPanel({ feedbacks, onUpdateStatus }: AdminPanelProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | Feedback['status']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  const departmentStats = useMemo(() => {
    const stats: DepartmentStats[] = [];
    const departments = ['engineering', 'marketing', 'sales', 'support', 'hr', 'finance'];

    departments.forEach(dept => {
      const deptFeedbacks = feedbacks.filter(f => f.department === dept);
      stats.push({
        department: dept,
        totalReviews: deptFeedbacks.length,
        averageScore: deptFeedbacks.length > 0 ? 
          deptFeedbacks.reduce((sum, f) => sum + f.score, 0) / deptFeedbacks.length : 0,
        positiveCount: deptFeedbacks.filter(f => f.sentiment === 'positive').length,
        negativeCount: deptFeedbacks.filter(f => f.sentiment === 'negative').length,
        neutralCount: deptFeedbacks.filter(f => f.sentiment === 'neutral').length,
        pendingCount: deptFeedbacks.filter(f => f.status === 'pending').length
      });
    });

    return stats;
  }, [feedbacks]);

  const overallStats = useMemo(() => {
    const totalReviews = feedbacks.length;
    const averageScore = feedbacks.reduce((sum, f) => sum + f.score, 0) / totalReviews;
    const departmentWithMostNegative = departmentStats.reduce((max, dept) => 
      dept.negativeCount > max.negativeCount ? dept : max, departmentStats[0]);

    return {
      totalReviews,
      averageScore,
      positiveCount: feedbacks.filter(f => f.sentiment === 'positive').length,
      negativeCount: feedbacks.filter(f => f.sentiment === 'negative').length,
      neutralCount: feedbacks.filter(f => f.sentiment === 'neutral').length,
      departmentWithMostNegative: departmentWithMostNegative?.department || 'none'
    };
  }, [feedbacks, departmentStats]);

  const filteredFeedbacks = useMemo(() => {
    let filtered = feedbacks;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(f => f.department === selectedDepartment);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(f => f.status === filterStatus);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.score - a.score;
      }
    });
  }, [feedbacks, selectedDepartment, filterStatus, sortBy]);

  const getSentimentColor = (sentiment: Feedback['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreStars = (score: number) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  };

  const formatDepartmentName = (dept: string) => {
    return dept.charAt(0).toUpperCase() + dept.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
          <p className="text-2xl font-bold text-gray-900">{overallStats.totalReviews}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className="text-2xl font-bold text-blue-600">{overallStats.averageScore.toFixed(1)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Positive</h3>
          <p className="text-2xl font-bold text-green-600">{overallStats.positiveCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Negative</h3>
          <p className="text-2xl font-bold text-red-600">{overallStats.negativeCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Most Negative Dept</h3>
          <p className="text-lg font-bold text-red-600">{formatDepartmentName(overallStats.departmentWithMostNegative)}</p>
        </div>
      </div>

      {/* Department Stats */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Department Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentStats.map((dept) => (
            <div key={dept.department} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{formatDepartmentName(dept.department)}</h3>
              <div className="space-y-1 text-sm">
                <p>Total: <span className="font-medium">{dept.totalReviews}</span></p>
                <p>Avg Score: <span className="font-medium">{dept.averageScore.toFixed(1)}</span></p>
                <p>Positive: <span className="text-green-600 font-medium">{dept.positiveCount}</span></p>
                <p>Negative: <span className="text-red-600 font-medium">{dept.negativeCount}</span></p>
                <p>Pending: <span className="text-yellow-600 font-medium">{dept.pendingCount}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Selection and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="score">Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suggestions for Selected Department */}
      {selectedDepartment !== 'all' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Suggestions for {formatDepartmentName(selectedDepartment)} Department
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentSuggestions[selectedDepartment as keyof typeof departmentSuggestions]?.map((suggestion, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">• {suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Reviews {selectedDepartment !== 'all' && `- ${formatDepartmentName(selectedDepartment)}`}
          <span className="text-sm font-normal text-gray-600 ml-2">({filteredFeedbacks.length} reviews)</span>
        </h2>
        
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{feedback.name}</h3>
                <p className="text-sm text-gray-600">{feedback.email}</p>
                <p className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getScoreStars(feedback.score)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                  {feedback.sentiment}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                  {feedback.status}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                {formatDepartmentName(feedback.department)}
              </span>
              <p className="text-gray-700">{feedback.message}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onUpdateStatus(feedback.id, 'pending')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
              >
                Pending
              </button>
              <button
                onClick={() => onUpdateStatus(feedback.id, 'reviewed')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
              >
                Reviewed
              </button>
              <button
                onClick={() => onUpdateStatus(feedback.id, 'resolved')}
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
              >
                Resolved
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}