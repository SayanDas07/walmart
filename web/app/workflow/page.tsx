'use client';
import { useState, useEffect, useCallback } from 'react';
import { Send, ArrowLeft, TrendingUp, TrendingDown, Package, DollarSign, Truck, Star, User, Shield, Loader, BarChart3, Zap, CheckCircle, AlertTriangle, Brain, Globe, Headphones, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

type Department = 'Material Quality' | 'Pricing' | 'Delivery' | 'Service' | 'Returns' | 'Other';

type Review = {
  text: string;
  sentiment: 'positive' | 'negative';
  department: Department;
  icon: any;
  color: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
};

const SentimentAnalysisDemo = () => {
  const [currentStep, setCurrentStep] = useState<'typing' | 'submitting' | 'analyzing' | 'classified'>('typing');
  const [typewriterText, setTypewriterText] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [departmentStats, setDepartmentStats] = useState({
    'Material Quality': { positive: 0, negative: 0 },
    'Pricing': { positive: 0, negative: 0 },
    'Delivery': { positive: 0, negative: 0 },
    'Service': { positive: 0, negative: 0 },
    'Returns': { positive: 0, negative: 0 },
    'Other': { positive: 0, negative: 0 }
  });

  const dummyReviews: Review[] = [
    {
      text: "The material quality is really poor and doesn't match the price. Very disappointed with this purchase.",
      sentiment: "negative",
      department: "Material Quality",
      icon: Package,
      color: "bg-red-500",
      confidence: 94,
      priority: "high"
    },
    {
      text: "Amazing product! Fast delivery and great service. Highly recommend to everyone!",
      sentiment: "positive",
      department: "Delivery",
      icon: Truck,
      color: "bg-green-500",
      confidence: 92,
      priority: "low"
    },
    {
      text: "Return process was a nightmare. Took weeks to get my refund and had to call multiple times.",
      sentiment: "negative",
      department: "Returns",
      icon: Headphones,
      color: "bg-red-500",
      confidence: 87,
      priority: "high"
    },
    {
      text: "Too expensive for what you get. Not worth the money at all. Better alternatives exist.",
      sentiment: "negative",
      department: "Pricing",
      icon: DollarSign,
      color: "bg-red-500",
      confidence: 89,
      priority: "medium"
    },
    {
      text: "I'm not sure what category this fits in, but I wanted to share my general feedback about the company.",
      sentiment: "positive",
      department: "Other",
      icon: HelpCircle,
      color: "bg-blue-500",
      confidence: 75,
      priority: "low"
    },
    {
      text: "The service team was extremely helpful when I had an issue with my order. Quick resolution!",
      sentiment: "positive",
      department: "Service",
      icon: User,
      color: "bg-green-500",
      confidence: 96,
      priority: "low"
    }
  ];

  const currentReview = dummyReviews[currentReviewIndex];

  // Typewriter effect
  useEffect(() => {
    if (currentStep !== 'typing') return;

    setTypewriterText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < currentReview.text.length) {
        setTypewriterText(prev => prev + currentReview.text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setCurrentStep('submitting'), 1000);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [currentReviewIndex, currentStep, currentReview.text]);

  // Submission and transfer
  useEffect(() => {
    if (currentStep !== 'submitting') return;

    const timer = setTimeout(() => {
      setShowTransfer(true);
      setTimeout(() => {
        setShowTransfer(false);
        setCurrentStep('analyzing');
      }, 1500);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Analysis
  useEffect(() => {
    if (currentStep !== 'analyzing') return;

    const timer = setTimeout(() => {
      setCurrentStep('classified');
      setTotalProcessed(prev => prev + 1);
      setDepartmentStats(prev => ({
        ...prev,
        [currentReview.department]: {
          ...prev[currentReview.department],
          [currentReview.sentiment]: prev[currentReview.department][currentReview.sentiment] + 1
        }
      }));
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, currentReview.department, currentReview.sentiment]);

  // Next review
  useEffect(() => {
    if (currentStep !== 'classified') return;

    const timer = setTimeout(() => {
      setCurrentReviewIndex(prev => (prev + 1) % dummyReviews.length);
      setCurrentStep('typing');
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep, dummyReviews.length]);

  // Prepare data for spider charts
  const getSpiderChartData = useCallback(() => {
    const departments = Object.keys(departmentStats) as Department[];
    return departments.map(dept => ({
      department: dept,
      positive: departmentStats[dept].positive,
      negative: departmentStats[dept].negative
    }));
  }, [departmentStats]);

  const getTotalSentiment = useCallback(() => {
    let positive = 0, negative = 0;
    Object.values(departmentStats).forEach(dept => {
      positive += dept.positive;
      negative += dept.negative;
    });
    return { positive, negative };
  }, [departmentStats]);

  const sentimentTotals = getTotalSentiment();
  const overallSentiment = sentimentTotals.positive + sentimentTotals.negative > 0 
    ? (sentimentTotals.positive / (sentimentTotals.positive + sentimentTotals.negative)) * 100 
    : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Customer Feedback Classifier
          </h1>
        </motion.div>
        <p className="text-xl text-gray-300 mb-2">
          Advanced Real-time Sentiment Analysis & Department Intelligence
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Real-time Processing</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Multi-language Support</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span>Advanced Analytics</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
                    {/* Admin Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
              </div>
              <div className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                <span className="text-green-400 text-sm font-medium">Live</span>
              </div>
            </div>

            <div className="flex-grow space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                  <div className="text-2xl font-bold text-white">{totalProcessed}</div>
                  <div className="text-blue-300 text-sm">Processed</div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
                  <div className="text-2xl font-bold text-white">{overallSentiment.toFixed(1)}%</div>
                  <div className="text-green-300 text-sm">Positive</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                  <div className="text-2xl font-bold text-white">98.5%</div>
                  <div className="text-purple-300 text-sm">Accuracy</div>
                </div>
              </div>

              {/* Processing Status */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Processing Pipeline
                </h3>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentStep === 'analyzing' || currentStep === 'classified' 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-500/20 border border-gray-500/30'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      currentStep === 'analyzing' || currentStep === 'classified' 
                        ? 'bg-green-500 animate-pulse' 
                        : 'bg-gray-500'
                    }`} />
                    <span className="text-white font-medium">Sentiment Analysis</span>
                    {currentStep === 'analyzing' && (
                      <Loader className="w-4 h-4 animate-spin ml-auto text-blue-400" />
                    )}
                    {currentStep === 'classified' && (
                      <CheckCircle className="w-4 h-4 ml-auto text-green-400" />
                    )}
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentStep === 'classified' 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-500/20 border border-gray-500/30'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      currentStep === 'classified' 
                        ? 'bg-green-500 animate-pulse' 
                        : 'bg-gray-500'
                    }`} />
                    <span className="text-white font-medium">Department Classification</span>
                    {currentStep === 'analyzing' && (
                      <Loader className="w-4 h-4 animate-spin ml-auto text-blue-400" />
                    )}
                    {currentStep === 'classified' && (
                      <CheckCircle className="w-4 h-4 ml-auto text-green-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Current Review Analysis */}
              <AnimatePresence>
                {(currentStep === 'analyzing' || currentStep === 'classified') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
                  >
                    <h3 className="font-semibold text-white mb-4">Live Analysis Results</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${
                          currentReview.sentiment === 'negative' 
                            ? 'bg-red-500/20 border border-red-500/30' 
                            : 'bg-green-500/20 border border-green-500/30'
                        }`}>
                          {currentReview.sentiment === 'negative' ? (
                            <TrendingDown className="w-6 h-6 text-red-400" />
                          ) : (
                            <TrendingUp className="w-6 h-6 text-green-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`text-lg font-semibold ${
                              currentReview.sentiment === 'negative' ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {currentReview.sentiment === 'negative' ? 'Negative' : 'Positive'} Sentiment
                            </p>
                            {currentReview.priority === 'high' && (
                              <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-gray-300 text-sm">
                            Confidence: {currentReview.confidence}% • Priority: {currentReview.priority}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentReview.color}`}>
                          <currentReview.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {currentReview.department}
                          </p>
                          <p className="text-sm text-gray-300">
                            {currentReview.sentiment === 'positive' 
                              ? 'Positive experience detected' 
                              : 'Requires immediate attention'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
{/* Department Spider Charts */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Department Analytics
                </h3>
                
                {/* Combined Chart */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-white/10 mb-4">
                  <h4 className="text-sm font-medium text-white mb-4 text-center">Combined Sentiment Distribution</h4>
                  <ResponsiveContainer width="100%" height={160}>
                    <RadarChart data={getSpiderChartData()}>
                      <PolarGrid 
                        stroke="#ffffff15" 
                        strokeWidth={1}
                        gridType="polygon"
                      />
                      <PolarAngleAxis 
                        dataKey="department" 
                        tick={{ fontSize: 10, fill: '#ffffff90', fontWeight: 500 }}
                        className="text-white"
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 'dataMax']} 
                        tick={{ fontSize: 9, fill: '#ffffff70' }}
                        axisLine={false}
                        tickCount={4}
                      />
                      <Radar
                        name="Positive"
                        dataKey="positive"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.25}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#ffffff' }}
                      />
                      <Radar
                        name="Negative"
                        dataKey="negative"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.25}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#ffffff' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                      <span className="text-xs text-green-400 font-medium">Positive ({sentimentTotals.positive})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                      <span className="text-xs text-red-400 font-medium">Negative ({sentimentTotals.negative})</span>
                    </div>
                  </div>
                </div>

                {/* Individual Charts */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                    <h4 className="text-sm font-medium text-green-400 mb-2 text-center">Positive Feedback</h4>
                    <ResponsiveContainer width="100%" height={120}>
                      <RadarChart data={getSpiderChartData()}>
                        <PolarGrid stroke="#ffffff15" strokeWidth={1} />
                        <PolarAngleAxis dataKey="department" tick={{ fontSize: 9, fill: '#ffffff80' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} tick={{ fontSize: 8, fill: '#ffffff60' }} axisLine={false} />
                        <Radar
                          name="Positive"
                          dataKey="positive"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.3}
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#10B981' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-xl p-4 border border-red-500/20">
                    <h4 className="text-sm font-medium text-red-400 mb-2 text-center">Negative Feedback</h4>
                    <ResponsiveContainer width="100%" height={120}>
                      <RadarChart data={getSpiderChartData()}>
                        <PolarGrid stroke="#ffffff15" strokeWidth={1} />
                        <PolarAngleAxis dataKey="department" tick={{ fontSize: 9, fill: '#ffffff80' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} tick={{ fontSize: 8, fill: '#ffffff60' }} axisLine={false} />
                        <Radar
                          name="Negative"
                          dataKey="negative"
                          stroke="#EF4444"
                          fill="#EF4444"
                          fillOpacity={0.3}
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#EF4444' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Department Statistics */}
                <div className="grid grid-cols-2 gap-3 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl p-4 border border-white/10">
                  {Object.entries(departmentStats).map(([dept, stats]) => {
                    const total = stats.positive + stats.negative;
                    const positivePercentage = total > 0 ? (stats.positive / total) * 100 : 0;
                    
                    return (
                      <div key={dept} className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white truncate">{dept}</span>
                          <span className="text-xs text-gray-300">{total}</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${positivePercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-400">{stats.positive}</span>
                          <span className="text-red-400">{stats.negative}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Customer Side  */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Customer Portal</h2>
              </div>
              <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                <span className="text-blue-400 text-sm font-medium">Interactive</span>
              </div>
            </div>
            
            <div className="flex-grow space-y-6">
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Share your experience
                </label>
                <div className="relative">
                  <textarea
                    className="w-full h-40 p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-white text-base placeholder-gray-400 transition-all"
                    placeholder="Tell us about your experience..."
                    value={typewriterText}
                    readOnly
                  />
                  {currentStep === 'typing' && (
                    <div className="absolute bottom-4 right-4">
                      <div className="w-1 h-6 bg-blue-500 animate-pulse rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 text-lg shadow-lg ${
                  currentStep !== 'typing' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/30'
                }`}
              >
                {currentStep === 'typing' ? (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                ) : currentStep === 'submitting' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Successfully Submitted
                  </>
                )}
              </motion.button>

              {/* Review History */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Review History</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {dummyReviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-l-4 transition-all ${
                        index === currentReviewIndex 
                          ? 'bg-blue-500/20 border-blue-500 shadow-lg' 
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3">{review.text}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  review.sentiment === 'positive' && i < 4 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-500'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {review.department}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          review.sentiment === 'positive' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {review.sentiment}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>


        </div>

        {/* Transfer Animation */}
        <div className="relative h-20 flex justify-center items-center -mt-10">
          <AnimatePresence>
            {showTransfer && (
              <motion.div
                initial={{ x: '35vw', opacity: 0, scale: 0.8 }}
                animate={{ x: '-35vw', opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl border border-white/30">
                  <ArrowLeft className="w-5 h-5 animate-pulse" />
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span className="font-semibold">Processing</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisDemo;