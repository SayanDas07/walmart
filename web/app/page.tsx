'use client';
import React, { SetStateAction, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import {
  Users,
  Settings,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  Workflow,
  MessageSquare,
  Lightbulb,
  Eye
} from 'lucide-react';
import { useEffect, useRef } from 'react'
import Link from 'next/link';



// Mock FeedbackForm Component
const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    score: '',
    message: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      onSubmit(formData);
      setFormData({ name: '', email: '', score: '', message: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Score
        </label>
        <select
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
        >
          <option value={5} className='text-black'>⭐⭐⭐⭐⭐ Excellent (5/5)</option>
          <option value={4} className='text-black'>⭐⭐⭐⭐☆ Good (4/5)</option>
          <option value={3} className='text-black'>⭐⭐⭐☆☆ Average (3/5)</option>
          <option value={2} className='text-black'>⭐⭐☆☆☆ Poor (2/5)</option>
          <option value={1} className='text-black'>⭐☆☆☆☆ Very Poor (1/5)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 resize-none"
          placeholder="Share your thoughts, suggestions, or report issues..."
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Submit Feedback</span>
      </button>
    </div>
  );
};

const ProfessionalAnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    // Network nodes for connection lines
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulse: number
      originalX: number
      originalY: number
    }> = []

    // Floating geometric shapes
    const geometricShapes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: 'triangle' | 'square' | 'hexagon' | 'circle'
      color: string
    }> = []

    // Data flow particles
    const dataFlowParticles: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      progress: number
      speed: number
      size: number
      opacity: number
      color: string
    }> = []

    // Grid lines for tech feel
    const gridLines: Array<{
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      animationOffset: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createElements()
    }

    const createElements = () => {
      // Create network nodes
      nodes.length = 0
      const nodeCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        nodes.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.2,
          color: ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24'][Math.floor(Math.random() * 4)],
          pulse: Math.random() * Math.PI * 2
        })
      }

      // Create geometric shapes
      geometricShapes.length = 0
      const shapeCount = Math.min(15, Math.floor(canvas.width / 150))
      const shapeTypes: Array<'triangle' | 'square' | 'hexagon' | 'circle'> = ['triangle', 'square', 'hexagon', 'circle']

      for (let i = 0; i < shapeCount; i++) {
        geometricShapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.1 + 0.05,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
        })
      }

      // Create data flow particles
      dataFlowParticles.length = 0
      for (let i = 0; i < 20; i++) {
        dataFlowParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          color: ['#60a5fa', '#a78bfa', '#34d399'][Math.floor(Math.random() * 3)]
        })
      }

      // Create grid lines
      gridLines.length = 0
      const gridSpacing = 80

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSpacing) {
        gridLines.push({
          x1: x,
          y1: 0,
          x2: x,
          y2: canvas.height,
          opacity: 0.03,
          animationOffset: Math.random() * Math.PI * 2
        })
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSpacing) {
        gridLines.push({
          x1: 0,
          y1: y,
          x2: canvas.width,
          y2: y,
          opacity: 0.03,
          animationOffset: Math.random() * Math.PI * 2
        })
      }
    }

    const drawGrid = () => {
      gridLines.forEach(line => {
        const opacity = line.opacity + Math.sin(time * 0.01 + line.animationOffset) * 0.01
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    const drawGeometricShape = (shape: typeof geometricShapes[0]) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)

      ctx.strokeStyle = `${shape.color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`
      ctx.lineWidth = 2
      ctx.beginPath()

      switch (shape.type) {
        case 'triangle':
          ctx.moveTo(0, -shape.size)
          ctx.lineTo(-shape.size * 0.866, shape.size * 0.5)
          ctx.lineTo(shape.size * 0.866, shape.size * 0.5)
          ctx.closePath()
          break
        case 'square':
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = Math.cos(angle) * shape.size
            const y = Math.sin(angle) * shape.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          break
        case 'circle':
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
          break
      }

      ctx.stroke()
      ctx.restore()
    }

    const drawDataFlowParticles = () => {
      dataFlowParticles.forEach(particle => {
        particle.progress += particle.speed

        if (particle.progress >= 1) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.targetX = Math.random() * canvas.width
          particle.targetY = Math.random() * canvas.height
          particle.progress = 0
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress

        // Draw trail
        const trailLength = 5
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, particle.progress - i * 0.1)
          const trailX = particle.x + (particle.targetX - particle.x) * trailProgress
          const trailY = particle.y + (particle.targetY - particle.y) * trailProgress
          const trailOpacity = particle.opacity * (1 - i / trailLength) * 0.5

          ctx.beginPath()
          ctx.arc(trailX, trailY, particle.size * (1 - i / trailLength), 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        }

        // Draw main particle
        ctx.beginPath()
        ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Add glow
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const drawNodes = () => {
      // Update node positions with subtle drift
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03

        // Gentle boundaries
        if (node.x < -20 || node.x > canvas.width + 20) node.vx *= -1
        if (node.y < -20 || node.y > canvas.height + 20) node.vy *= -1

        // Subtle return to original position
        node.vx += (node.originalX - node.x) * 0.0001
        node.vy += (node.originalY - node.y) * 0.0001

        // Draw node
        const pulseSize = node.size + Math.sin(node.pulse) * 0.5
        const pulseOpacity = node.opacity + Math.sin(node.pulse) * 0.1

        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}${Math.floor(pulseOpacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      })

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.1
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
            gradient.addColorStop(0, `${node.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(1, `${otherNode.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })
    }

    const animate = () => {
      time += 1

      // Professional gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0f172a')    // slate-900
      gradient.addColorStop(0.25, '#1e293b')  // slate-800
      gradient.addColorStop(0.5, '#334155')   // slate-700
      gradient.addColorStop(0.75, '#475569')  // slate-600
      gradient.addColorStop(1, '#64748b')     // slate-500

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle radial overlay
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      )
      radialGradient.addColorStop(0, `rgba(59, 130, 246, ${0.05 + Math.sin(time * 0.01) * 0.02})`)
      radialGradient.addColorStop(1, 'rgba(30, 41, 59, 0.1)')

      ctx.fillStyle = radialGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw all elements
      drawGrid()
      drawNodes()
      drawDataFlowParticles()

      // Update and draw geometric shapes
      geometricShapes.forEach(shape => {
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Boundary checks
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) shape.vx *= -1
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) shape.vy *= -1

        drawGeometricShape(shape)
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      {/* Additional professional CSS animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle floating orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl animate-rotate-slow"></div>
      </div>
    </>
  )
}

export default function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [expandedStep, setExpandedStep] = useState(null);

  const handleFeedbackSubmit = (newFeedback: any) => {
    const feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending',
      department: 'support',
      sentiment: 'neutral',
    };

    setFeedbacks(prev => [feedback, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleStep = (stepIndex: SetStateAction<null>) => {
    setExpandedStep(expandedStep === stepIndex ? null : stepIndex);
  };

  const userSteps = [
    {
      icon: MessageSquare,
      title: "Submit Your Review",
      description: "Share your thoughts and experiences with our service",
      details: [
        "Enter your feedback through our intuitive interface",
        "Upload files or paste text directly",
        "Select relevant categories for better processing",
        "Get instant confirmation of submission"
      ]
    }
  ];

  const adminSteps = [
    {
      icon: Brain,
      title: "Sentiment & Emotion Analysis",
      description: "Advanced AI processing of feedback content",
      details: [
        "Text preprocessing and normalization",
        "Model selection based on performance metrics",
        "Sentiment detection (positive, neutral, negative)",
        "Emotion identification with confidence scores"
      ]
    },
    {
      icon: Target,
      title: "Department Classification",
      description: "Smart routing to appropriate departments",
      details: [
        "Zero-shot classification using advanced AI",
        "Automatic department assignment",
        "Confidence threshold validation",
        "Fallback to general department for low confidence"
      ]
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Generate actionable business intelligence",
      details: [
        "Prompt creation for Gemini LLM",
        "Deep insight generation and analysis",
        "Summary report compilation",
        "Business decision support data"
      ]
    }
  ];

  const StepCard = ({ step, index, isExpanded, onToggle, type }) => (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/15 ${isExpanded ? 'border-blue-400/50 shadow-lg shadow-blue-500/20' : 'hover:border-white/30'
      }`}>
      <div
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => onToggle(index)}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${type === 'user' ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-emerald-500/20 border border-emerald-400/30'
            }`}>
            <step.icon className={`w-6 h-6 ${type === 'user' ? 'text-blue-400' : 'text-emerald-400'
              }`} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">{step.title}</h4>
            <p className="text-gray-300">{step.description}</p>
          </div>
        </div>
        <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
          }`} />
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-white/10">
          <div className="mt-4 space-y-3">
            {step.details.map((detail: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <ProfessionalAnimatedBackground />

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Customer Feedback Review System
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Your opinions shape our future. Share your feedback today!
              </p>
            </div>
            <Link href={'/workflow'}>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white rounded-lg hover:from-purple-600/80 hover:to-pink-600/80 transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20">
                <Workflow className="w-5 h-5" />
                <span>Show Workflow</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-8 bg-black/20 backdrop-blur-md rounded-t-xl">
          <button
            className={`px-8 py-4 text-lg font-medium transition-all duration-200 rounded-t-xl ${activeTab === 'submit'
              ? 'bg-white/10 border-b-2 border-blue-400 text-blue-400 shadow-sm'
              : 'text-gray-300 hover:text-blue-400 hover:bg-white/5'
              }`}
            onClick={() => setActiveTab('submit')}
          >
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Submit Feedback</span>
            </div>
          </button>
          <button
            className={`px-8 py-4 text-lg font-medium transition-all duration-200 rounded-t-xl ${activeTab === 'how-to-use'
              ? 'bg-white/10 border-b-2 border-blue-400 text-blue-400 shadow-sm'
              : 'text-gray-300 hover:text-blue-400 hover:bg-white/5'
              }`}
            onClick={() => setActiveTab('how-to-use')}
          >
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>How to Use</span>
            </div>
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border-l-4 border-emerald-400 text-emerald-400 rounded-r-xl shadow-lg animate-fade-in border border-emerald-400/30">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Thank you for your feedback!</p>
                <p className="text-sm text-emerald-300">We appreciate your input and will review it shortly.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'submit' && (
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
            </div>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        )}

        {activeTab === 'how-to-use' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Our System Works</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover how we transform your feedback into actionable insights using advanced AI technology
              </p>
            </div>

            {/* User Section */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">For Users</h3>
              </div>
              <div className="space-y-4">
                {userSteps.map((step, index) => (
                  <StepCard
                    key={index}
                    step={step}
                    index={`user-${index}`}
                    isExpanded={expandedStep === `user-${index}`}
                    onToggle={toggleStep}
                    type="user"
                  />
                ))}
              </div>
            </div>

            {/* Admin Section */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                  <Settings className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">For Admins: Feedback Processing</h3>
              </div>
              <div className="space-y-4">
                {adminSteps.map((step, index) => (
                  <StepCard
                    key={index}
                    step={step}
                    index={`admin-${index}`}
                    isExpanded={expandedStep === `admin-${index}`}
                    onToggle={toggleStep}
                    type="admin"
                  />
                ))}
              </div>
            </div>


          </div>
        )}

        {/* Admin Panel Link */}
        <div className="text-center mt-12">
          <a
            href="/admin"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg hover:from-blue-600/80 hover:to-indigo-600/80 transition-all duration-200 hover:shadow-xl transform hover:scale-105 border border-white/20"
          >
            <Settings className="w-5 h-5" />
            <span>Admin Panel</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-md text-white py-8 mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Customer Feedback Review System. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Styles */}
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