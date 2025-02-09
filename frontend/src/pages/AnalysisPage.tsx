import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';

interface Recommendation {
  category: string;
  score: number;
  suggestions: string[];
  priority: 'high' | 'medium' | 'low';
}

export function AnalysisPage() {
  const [analysisStage, setAnalysisStage] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const navigate = useNavigate();

  const stages = [
    'Analyzing profile content...',
    'Identifying improvement areas...',
    'Generating AI suggestions...',
    'Preparing recommendations...',
  ];

  const recommendations: Recommendation[] = [
    {
      category: 'Professional Summary',
      score: 7,
      suggestions: [
        'Add more industry-specific keywords',
        'Highlight quantifiable achievements',
        'Include your career objectives'
      ],
      priority: 'high'
    },
    {
      category: 'Work Experience',
      score: 8,
      suggestions: [
        'Use more action verbs',
        'Include metrics and results',
        'Add relevant projects'
      ],
      priority: 'medium'
    },
    {
      category: 'Skills & Endorsements',
      score: 6,
      suggestions: [
        'Add emerging technologies in your field',
        'Reorganize skills by relevance',
        'Remove outdated skills'
      ],
      priority: 'high'
    },
    {
      category: 'Education & Certifications',
      score: 9,
      suggestions: [
        'Add relevant coursework',
        'List recent certifications first',
        'Include academic achievements'
      ],
      priority: 'low'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        clearInterval(timer);
        setIsAnalysisComplete(true);
        return prev;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ to: '/upload' })}
        className="mb-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
      >
        <ArrowLeft className="icon-sm" />
        <span>Back to Upload</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {!isAnalysisComplete ? (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <Loader2 className="icon-xl text-primary-600 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900">
                Analyzing Your LinkedIn Profile
              </h2>

              <div className="w-full max-w-md space-y-4">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 ${
                      index > analysisStage ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {index < analysisStage ? (
                      <CheckCircle2 className="icon-sm text-green-500" />
                    ) : index === analysisStage ? (
                      <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Analysis Results</h2>
                <div className="flex items-center space-x-4">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Download className="icon-sm" />
                    <span>Download Report</span>
                  </button>
                  <button className="btn-secondary flex items-center space-x-2">
                    <Share2 className="icon-sm" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Overall Score', value: '7.5/10', icon: Star },
                  { label: 'Profile Views', value: '+147%', icon: TrendingUp },
                  { label: 'Improvement Areas', value: '4', icon: AlertTriangle },
                  { label: 'Optimization Score', value: '75%', icon: CheckCircle2 }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <stat.icon className="icon-sm" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-xl font-semibold text-gray-900">{rec.category}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Score:</span>
                        <span className="text-lg font-bold text-gray-900">{rec.score}/10</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {rec.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="icon-sm text-green-500 mt-1" />
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Next Steps</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="icon-sm text-primary-600 mt-1" />
                  <span className="text-primary-800">Implement the high-priority recommendations first</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="icon-sm text-primary-600 mt-1" />
                  <span className="text-primary-800">Update your LinkedIn profile with the suggested changes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="icon-sm text-primary-600 mt-1" />
                  <span className="text-primary-800">Re-upload your profile in 2 weeks to track improvements</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}