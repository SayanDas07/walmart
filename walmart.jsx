import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, MessageSquare, Star, Filter, Download, RefreshCw } from 'lucide-react';

const SentimentAnalysisDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample customer feedback data
  const sampleFeedback = [
    "The product quality is excellent and shipping was fast. Very satisfied!",
    "Customer service was unhelpful and took too long to respond.",
    "Great value for money, but the packaging could be improved.",
    "Outstanding experience! Will definitely buy again.",
    "The item arrived damaged and the return process was complicated.",
    "Amazing product features, exactly what I needed.",
    "Website is difficult to navigate, checkout process needs work.",
    "Fast delivery and great communication throughout the process.",
    "Product doesn't match the description, disappointed with purchase.",
    "Excellent customer support, they resolved my issue quickly."
  ];

  // Sentiment analysis simulation
  const analyzeSentiment = (text) => {
    const positiveWords = ['excellent', 'great', 'amazing', 'outstanding', 'satisfied', 'fast', 'good', 'perfect', 'love', 'awesome'];
    const negativeWords = ['bad', 'terrible', 'awful', 'disappointed', 'slow', 'poor', 'damaged', 'unhelpful', 'complicated', 'difficult'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });
    
    if (score > 0) return { sentiment: 'positive', score: Math.min(score / words.length * 10, 1) };
    if (score < 0) return { sentiment: 'negative', score: Math.max(score / words.length * 10, -1) };
    return { sentiment: 'neutral', score: 0 };
  };

  // Extract key themes and aspects
  const extractThemes = (feedbackList) => {
    const themes = {
      'Product Quality': ['quality', 'product', 'item', 'features'],
      'Shipping & Delivery': ['shipping', 'delivery', 'fast', 'slow', 'arrived'],
      'Customer Service': ['service', 'support', 'help', 'response'],
      'Website & UX': ['website', 'navigate', 'checkout', 'process'],
      'Packaging': ['packaging', 'package', 'box'],
      'Value & Pricing': ['price', 'value', 'money', 'cost']
    };
    
    const themeScores = {};
    Object.keys(themes).forEach(theme => {
      themeScores[theme] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    });
    
    feedbackList.forEach(feedback => {
      const analysis = analyzeSentiment(feedback);
      const words = feedback.toLowerCase().split(' ');
      
      Object.keys(themes).forEach(theme => {
        const hasTheme = themes[theme].some(keyword => 
          words.some(word => word.includes(keyword))
        );
        
        if (hasTheme) {
          themeScores[theme][analysis.sentiment]++;
          themeScores[theme].total++;
        }
      });
    });
    
    return themeScores;
  };

  // Generate insights and recommendations
  const generateInsights = (themeScores, sentimentData) => {
    const insights = [];
    const recommendations = [];
    
    // Analyze sentiment distribution
    const totalFeedback = sentimentData.reduce((sum, item) => sum + item.count, 0);
    const positivePercent = (sentimentData.find(item => item.sentiment === 'Positive')?.count || 0) / totalFeedback * 100;
    const negativePercent = (sentimentData.find(item => item.sentiment === 'Negative')?.count || 0) / totalFeedback * 100;
    
    if (positivePercent > 70) {
      insights.push({ type: 'positive', message: `Strong customer satisfaction with ${positivePercent.toFixed(1)}% positive feedback` });
    } else if (negativePercent > 30) {
      insights.push({ type: 'negative', message: `High negative sentiment detected (${negativePercent.toFixed(1)}%)` });
    }
    
    // Analyze themes
    Object.entries(themeScores).forEach(([theme, scores]) => {
      if (scores.total > 0) {
        const negativeRate = scores.negative / scores.total;
        if (negativeRate > 0.4) {
          insights.push({ type: 'warning', message: `${theme} shows concerning negative feedback (${(negativeRate * 100).toFixed(1)}%)` });
          recommendations.push(`Prioritize improvements in ${theme} - consider customer feedback review`);
        } else if (scores.positive / scores.total > 0.7) {
          insights.push({ type: 'positive', message: `${theme} is performing well with high satisfaction` });
        }
      }
    });
    
    return { insights, recommendations };
  };

  // Run analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const sentimentResults = sampleFeedback.map(feedback => analyzeSentiment(feedback));
      const themeScores = extractThemes(sampleFeedback);
      const { insights, recommendations } = generateInsights(themeScores, [
        { sentiment: 'Positive', count: sentimentResults.filter(r => r.sentiment === 'positive').length },
        { sentiment: 'Negative', count: sentimentResults.filter(r => r.sentiment === 'negative').length },
        { sentiment: 'Neutral', count: sentimentResults.filter(r => r.sentiment === 'neutral').length }
      ]);
      
      setAnalysisResults({
        sentimentData: [
          { sentiment: 'Positive', count: sentimentResults.filter(r => r.sentiment === 'positive').length, color: '#10B981' },
          { sentiment: 'Negative', count: sentimentResults.filter(r => r.sentiment === 'negative').length, color: '#EF4444' },
          { sentiment: 'Neutral', count: sentimentResults.filter(r => r.sentiment === 'neutral').length, color: '#6B7280' }
        ],
        trendData: [
          { date: '2024-01-01', positive: 65, negative: 20, neutral: 15 },
          { date: '2024-01-02', positive: 70, negative: 18, neutral: 12 },
          { date: '2024-01-03', positive: 68, negative: 22, neutral: 10 },
          { date: '2024-01-04', positive: 72, negative: 15, neutral: 13 },
          { date: '2024-01-05', positive: 75, negative: 12, neutral: 13 },
          { date: '2024-01-06', positive: 73, negative: 14, neutral: 13 },
          { date: '2024-01-07', positive: 76, negative: 11, neutral: 13 }
        ],
        themeAnalysis: Object.entries(themeScores).map(([theme, scores]) => ({
          theme,
          positive: scores.positive,
          negative: scores.negative,
          neutral: scores.neutral,
          total: scores.total,
          satisfaction: scores.total > 0 ? (scores.positive / scores.total * 100).toFixed(1) : 0
        })).filter(item => item.total > 0),
        keyInsights: insights,
        recommendations: recommendations,
        feedbackAnalysis: sampleFeedback.map((feedback, index) => ({
          id: index,
          text: feedback,
          sentiment: sentimentResults[index].sentiment,
          score: sentimentResults[index].score,
          themes: Object.keys(themeScores).filter(theme => 
            themeScores[theme].total > 0 && 
            feedback.toLowerCase().split(' ').some(word => 
              ['quality', 'shipping', 'service', 'website', 'packaging', 'price'].some(keyword => 
                word.includes(keyword)
              )
            )
          )
        }))
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'negative': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const getInsightIcon = (type) => {
    switch(type) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Customer Feedback</h2>
          <p className="text-gray-600">Processing sentiment analysis and extracting insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Customer Sentiment Analysis Dashboard</h1>
              <p className="text-gray-600 mt-1">AI-powered insights from customer feedback and reviews</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button 
                onClick={runAnalysis}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {analysisResults?.sentimentData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{item.sentiment} Sentiment</span>
                {getSentimentIcon(item.sentiment.toLowerCase())}
              </div>
              <div className="text-2xl font-bold text-gray-800">{item.count}</div>
              <div className="text-sm text-gray-500">
                {((item.count / analysisResults.sentimentData.reduce((sum, d) => sum + d.count, 0)) * 100).toFixed(1)}% of total
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Reviews</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {analysisResults?.sentimentData.reduce((sum, d) => sum + d.count, 0)}
            </div>
            <div className="text-sm text-gray-500">Analyzed this period</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sentiment Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analysisResults?.sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ sentiment, count }) => `${sentiment}: ${count}`}
                >
                  {analysisResults?.sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sentiment Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analysisResults?.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="neutral" stroke="#6B7280" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Theme Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Theme-Based Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analysisResults?.themeAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="theme" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" fill="#10B981" />
              <Bar dataKey="negative" fill="#EF4444" />
              <Bar dataKey="neutral" fill="#6B7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
            <div className="space-y-3">
              {analysisResults?.keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getInsightIcon(insight.type)}
                  <span className="text-sm text-gray-700">{insight.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Action Recommendations</h3>
            <div className="space-y-3">
              {analysisResults?.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Feedback Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Feedback Analysis</h3>
          <div className="space-y-4">
            {analysisResults?.feedbackAnalysis.slice(0, 5).map((feedback, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSentimentIcon(feedback.sentiment)}
                    <span className="text-sm font-medium capitalize">{feedback.sentiment}</span>
                    <span className="text-sm text-gray-500">Score: {feedback.score.toFixed(2)}</span>
                  </div>
                  <div className="flex space-x-2">
                    {feedback.themes.map((theme, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{feedback.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisDashboard;