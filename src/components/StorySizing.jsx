import { useState } from 'react'

const storyPointsData = {
  1: {
    complexity: 'None - Quick fix, clear actions / design adjustments to be done',
    slipRisk: 'Very low',
    example: 'Office hour, design consult, px-papercuts',
    notes: 'A quick design adjustment that can be done during design consult or office hours. Easy to get done during the sprint.'
  },
  2: {
    complexity: 'Low - Some design gaps to consider, clear plan of action for design',
    slipRisk: 'Low',
    example: 'Low-fi or Hi-fi of a couple screens (part of a user flow), PRD review',
    notes: 'Need to adjust or add some screens to an existing user flow and can do it within a week. Fairly easily done during the sprint.'
  },
  3: {
    complexity: 'Medium - Scope is manageable, need to consider some design options',
    slipRisk: 'Some',
    example: 'Low-fi or Hi-fi of a full end-to-end user flow design',
    notes: 'Need to adjust an end-to-end user flow and think through some design options and share to get feedback. Possible to accomplish within the 2 week sprint, with a small possibility of carrying over.'
  },
  5: {
    complexity: 'High - Familiar domain, need to understand scope and define design direction',
    slipRisk: 'Medium/High',
    example: 'Design discovery or specific research plan',
    notes: 'Need to research the scope, discuss with stakeholders to define direction. Familiar with product domain and stakeholders so can be accomplished within the 2 week sprint. May carry over.'
  },
  8: {
    complexity: 'High - Unknown/new domain, need to understand scope and define design direction',
    slipRisk: 'High',
    example: 'Design discovery or specific research plan (new product or domain)',
    notes: 'Need to research the scope, discuss with stakeholders to define direction. Unfamiliar product domain and stakeholders. It\'s possible this could be completed within the 2 week sprint, but has a higher chance of carrying over.'
  },
  13: {
    complexity: 'Need to break into several stories',
    slipRisk: 'High',
    example: 'Initial discovery ticket that needs to be re-scoped and divided',
    notes: 'Certain that can not be done within one sprint. This story should be broken down into smaller stories.'
  }
}

function StorySizing({ onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendation, setRecommendation] = useState(null)

  const questions = [
    {
      id: 'complexity',
      question: 'How would you describe the complexity of this story?',
      options: [
        { value: 1, label: 'None - Quick fix or clear design adjustment' },
        { value: 2, label: 'Low - Some design gaps, clear plan of action' },
        { value: 3, label: 'Medium - Manageable scope, need to consider design options' },
        { value: 4, label: 'High - Need to understand scope and define direction (familiar domain)' },
        { value: 5, label: 'High - Need to understand scope and define direction (new/unknown domain)' },
        { value: 6, label: 'Very High - Needs to be broken into several stories' }
      ]
    },
    {
      id: 'scope',
      question: 'What is the scope of work?',
      options: [
        { value: 1, label: 'Quick adjustment or consultation' },
        { value: 2, label: 'A couple of screens (part of a user flow)' },
        { value: 3, label: 'Full end-to-end user flow' },
        { value: 4, label: 'Design discovery or research plan' },
        { value: 5, label: 'Large discovery requiring multiple stories' }
      ]
    },
    {
      id: 'familiarity',
      question: 'How familiar are you with this product domain and stakeholders?',
      options: [
        { value: 1, label: 'Very familiar - I know exactly what needs to be done' },
        { value: 2, label: 'Familiar - I have good context and clear direction' },
        { value: 3, label: 'Somewhat familiar - I need some clarification' },
        { value: 4, label: 'Unfamiliar - New domain or stakeholders for me' },
        { value: 5, label: 'Completely new - Requires significant learning' }
      ]
    },
    {
      id: 'uncertainty',
      question: 'How much uncertainty or unknowns are there?',
      options: [
        { value: 1, label: 'None - Everything is clear and defined' },
        { value: 2, label: 'Low - Minor details to figure out' },
        { value: 3, label: 'Medium - Some design exploration needed' },
        { value: 4, label: 'High - Significant research or discovery required' },
        { value: 5, label: 'Very High - Major unknowns that need investigation' }
      ]
    },
    {
      id: 'estimate',
      question: 'How long do you think this story will take to complete?',
      type: 'text',
      placeholder: 'e.g., 2 hours, 1 day, 3 days, 1 week'
    }
  ]

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateRecommendation(newAnswers)
    }
  }

  const calculateRecommendation = (finalAnswers) => {
    // Calculate average score from all numeric answers
    const scores = [finalAnswers.complexity, finalAnswers.scope, finalAnswers.familiarity, finalAnswers.uncertainty]
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    
    let points
    if (avgScore <= 1.5) points = 1
    else if (avgScore <= 2.5) points = 2
    else if (avgScore <= 3.5) points = 3
    else if (avgScore <= 4.5) points = 5
    else if (avgScore <= 5.5) points = 8
    else points = 13

    setRecommendation({
      points,
      details: storyPointsData[points],
      userEstimate: finalAnswers.estimate
    })
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendation(null)
  }

  if (recommendation) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-cloudflare-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-cloudflare-gray-200">
            <h2 className="text-2xl font-bold text-cloudflare-gray-900">Story Point Recommendation</h2>
            <button onClick={onReset} className="text-cloudflare-gray-600 hover:text-cloudflare-gray-900 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start Over
            </button>
          </div>
          
          <div className="p-8">
            <div className="bg-gradient-to-br from-cloudflare-teal to-cloudflare-blue-light rounded-xl p-8 text-center text-white mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">Story Points</p>
              <p className="text-6xl font-bold mb-1">{recommendation.points}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-cloudflare-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Complexity:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.complexity}</p>
              </div>
              
              <div className="bg-cloudflare-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Slip Risk:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.slipRisk}</p>
              </div>
              
              <div className="bg-cloudflare-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Example:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.example}</p>
              </div>
              
              <div className="bg-cloudflare-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Typical Duration:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.points === 1 ? '1-2 hours' : recommendation.points === 2 ? '1-2 days' : recommendation.points === 3 ? '2-3 days' : recommendation.points === 5 ? '3-5 days' : recommendation.points === 8 ? '1-2 weeks' : '2+ weeks'}</p>
              </div>
              
              {recommendation.userEstimate && (
                <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-400">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-yellow-900 mb-1">Your Estimate: {recommendation.userEstimate}</h4>
                      <p className="text-yellow-800 text-sm">Your estimate differs from the typical range. Consider if there are additional complexities or efficiencies that might affect the story points.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {recommendation.points === 13 && (
              <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Action Required</h4>
                    <p className="text-red-800">This story is too large for a single sprint. Please break it down into smaller, more manageable stories before adding it to a sprint.</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200 mb-6">
              <h4 className="font-bold text-cloudflare-gray-900 mb-2">Notes:</h4>
              <p className="text-cloudflare-gray-800 leading-relaxed mb-3">{recommendation.details.notes}</p>
              <p className="text-cloudflare-gray-800 leading-relaxed"><strong>Remember:</strong> Points are for planning, not commitment. They help create a consistent, shared understanding of effort within your team. Consistency within your team is the #1 goal.</p>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-cloudflare-teal to-cloudflare-blue-light text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all"
              onClick={handleRestart}
            >
              Size Another Item
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-sm border border-cloudflare-gray-200 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-cloudflare-teal text-lg font-semibold">Question {currentQuestion + 1} of {questions.length} • Story Sizing</h2>
            <button onClick={onReset} className="text-cloudflare-gray-600 hover:text-cloudflare-gray-900 text-sm font-medium">Reset</button>
          </div>
          <div className="h-2 bg-cloudflare-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cloudflare-teal via-cloudflare-blue-light to-cloudflare-blue transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-cloudflare-gray-900 mb-6">{question.question}</h3>
          
          {question.type === 'text' ? (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-4 border-2 border-cloudflare-gray-300 rounded-lg text-base focus:outline-none focus:border-cloudflare-orange transition-colors"
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && answers[question.id]) {
                    handleAnswer(question.id, answers[question.id])
                  }
                }}
              />
              <button 
                className="w-full bg-gradient-to-r from-cloudflare-teal to-cloudflare-blue-light text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleAnswer(question.id, answers[question.id] || '')}
                disabled={!answers[question.id]}
              >
                Submit Answer →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                    answers[question.id] === option.value 
                      ? 'border-cloudflare-orange bg-orange-50' 
                      : 'border-cloudflare-gray-200 hover:border-cloudflare-gray-400 bg-white'
                  }`}
                  onClick={() => handleAnswer(question.id, option.value)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 ${
                      answers[question.id] === option.value
                        ? 'border-cloudflare-orange bg-cloudflare-orange'
                        : 'border-cloudflare-gray-300'
                    }`}>
                      {answers[question.id] === option.value && (
                        <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-cloudflare-gray-900 font-medium leading-relaxed">{option.label}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-cloudflare-gray-200">
          {currentQuestion > 0 ? (
            <button 
              className="text-cloudflare-gray-600 hover:text-cloudflare-gray-900 font-medium flex items-center gap-2"
              onClick={handleBack}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Previous Question
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StorySizing