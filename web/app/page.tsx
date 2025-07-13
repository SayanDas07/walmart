'use client';
import { useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { Feedback } from '../types/feedback';
import { dummyFeedbacks } from '../data/dummy-data';

export default function HomePage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(dummyFeedbacks);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');

  const handleFeedbackSubmit = (newFeedback: Omit<Feedback, 'id' | 'createdAt' | 'status' | 'department' | 'sentiment'>) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending',
      department: 'support', // or provide a sensible default if needed
      sentiment: 'neutral',  // or provide a sensible default if needed
    };
    
    setFeedbacks(prev => [feedback, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Customer Feedback Review System
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your opinions shape our future. Share your feedback today!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
              activeTab === 'submit'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('submit')}
          >
            Submit Feedback
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
              activeTab === 'how-to-use'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('how-to-use')}
          >
            How to Use
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg shadow-sm animate-fade-in">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-medium">Thank you for your feedback! We appreciate your input.</p>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'submit' && (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Share Your Feedback</h2>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        )}

        {activeTab === 'how-to-use' && (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How to Use</h2>
            <div className="space-y-8">
              {/* User Section */}
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">For Users: Submit Your Review</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Begin by entering or uploading your review or feedback text through our intuitive input interface.
                  </li>
                </ul>
              </div>

              {/* Admin Section */}
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">For Admins: Feedback Processing</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Step 1: Sentiment & Emotion Analysis</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Preprocessing:</strong> Your review text is cleaned and standardized.</li>
                      <li>
                        <strong>Model Selection:</strong> The system selects the best model (Classical ML or Deep Learning) based on performance and configuration.
                      </li>
                      <li>
                        <strong>Sentiment & Emotion Detection:</strong>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                          <li>Detects the sentiment (positive, neutral, negative).</li>
                          <li>Identifies underlying emotions (e.g., anger, joy, sadness).</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Confidence Score:</strong> Each sentiment/emotion output is accompanied by a confidence score for reliability.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Step 2: Department Classification</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        <strong>Zero-Shot Classification:</strong> Uses AI to categorize the feedback into relevant departments (e.g., Support, Billing, Product).
                      </li>
                      <li>
                        <strong>Confidence Check:</strong>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                          <li>If prediction confidence is high, the feedback is assigned to the predicted department.</li>
                          <li>If confidence is low, it is routed to a default/general department for review.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Step 3: AI-Powered Insights</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Prompt Creation:</strong> A prompt is crafted and sent to Gemini (our advanced LLM engine).</li>
                      <li><strong>Insight Generation:</strong> Gemini analyzes the review to generate high-level insights.</li>
                      <li><strong>Summary Report:</strong> The insights are compiled into a summary report for business management and decision-makers.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel Link */}
        <div className="text-center mt-10">
          <a
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0H7m5 0v4m-7-7h14M5 5v.01M19 5v.01" />
            </svg>
            Admin Panel
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Customer Feedback Review System. All rights reserved.</p>
        </div>
      </footer>

      {/* Inline Styles for Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}