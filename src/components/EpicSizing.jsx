import { useState } from 'react'

const epicSizeData = {
  'XS': {
    sprints: '~1 Sprint',
    scope: 'Very Low: A minor enhancement. 1 simple user flow. Uses 100% existing design components.',
    uncertainty: 'None: The problem and solution are crystal clear. No new research or usability testing is needed.',
    dependency: 'Low: Can be handled by 1 designer. Minimal alignment needed with PM/Eng.'
  },
  'S': {
    sprints: '1-2 Sprints',
    scope: 'Low: A small, well-defined feature. 1-2 new, straightforward user flows. Mostly existing components, maybe 1-2 new simple ones.',
    uncertainty: 'Low: Requirements are clear. May involve one round of usability testing on a clear prototype.',
    dependency: 'Low: Contained to one designer. Standard alignment with PM/Eng.'
  },
  'M': {
    sprints: '3-4 Sprints (About half a quarter)',
    scope: 'Medium: A standard, net-new feature. 2-4 user flows of average complexity. Requires some new components for the design system.',
    uncertainty: 'Medium: We understand the problem, but the solution needs discovery. Requires generative research or multiple rounds of usability testing.',
    dependency: 'Medium: Needs alignment across multiple designers or teams. Requires regular check-ins.'
  },
  'L': {
    sprints: '5-6 Sprints (A full quarter)',
    scope: 'High: A large, complex new feature or product area. 5+ complex or interconnected user flows. Requires many new, complex components.',
    uncertainty: 'High: The problem space is ambiguous. Requires significant discovery, research, and testing to define the solution.',
    dependency: 'High: High-touch collaboration. Requires dedicated alignment with multiple Eng teams, Legal, Marketing, etc.'
  },
  'XL': {
    sprints: '6+ Sprints (Multiple quarters)',
    scope: 'Very High: A massive, foundational project. A complete redesign of a core product area. A new product from 0 to 1.',
    uncertainty: 'Very High: High ambiguity in a new domain. Requires foundational research just to define the problem and strategy.',
    dependency: 'Critical: Involves the entire team or company. Requires senior leadership buy-in and steering committees.'
  }
}

function EpicSizing({ onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendation, setRecommendation] = useState(null)

  const questions = [
    {
      id: 'scope',
      question: 'How would you describe the scope and complexity of this Epic?',
      options: [
        { value: 1, label: 'Very Low - Minor enhancement, 1 simple user flow, existing components only' },
        { value: 2, label: 'Low - Small feature, 1-2 straightforward flows, mostly existing components' },
        { value: 3, label: 'Medium - Standard new feature, 2-4 flows, some new components needed' },
        { value: 4, label: 'High - Large complex feature, 5+ interconnected flows, many new components' },
        { value: 5, label: 'Very High - Massive project, complete redesign or new product from 0 to 1' }
      ]
    },
    {
      id: 'uncertainty',
      question: 'How much uncertainty or research is involved?',
      options: [
        { value: 1, label: 'None - Problem and solution are crystal clear, no research needed' },
        { value: 2, label: 'Low - Requirements clear, maybe one round of usability testing' },
        { value: 3, label: 'Medium - Solution needs discovery, multiple rounds of testing required' },
        { value: 4, label: 'High - Problem space is ambiguous, significant discovery needed' },
        { value: 5, label: 'Very High - High ambiguity in new domain, foundational research required' }
      ]
    },
    {
      id: 'dependency',
      question: 'What level of dependency and alignment is required?',
      options: [
        { value: 1, label: 'Low - 1 designer, minimal PM/Eng alignment' },
        { value: 2, label: 'Low - 1 designer, standard PM/Eng alignment' },
        { value: 3, label: 'Medium - Multiple designers/teams, regular check-ins needed' },
        { value: 4, label: 'High - Multiple teams (Eng, Legal, Marketing), dedicated alignment' },
        { value: 5, label: 'Critical - Entire team/company, senior leadership buy-in required' }
      ]
    },
    {
      id: 'estimate',
      question: 'How long do you think this Epic will take to complete?',
      type: 'text',
      placeholder: 'e.g., 2 sprints, 1 quarter, 3 months'
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
    const avgScore = (finalAnswers.scope + finalAnswers.uncertainty + finalAnswers.dependency) / 3
    
    let size
    if (avgScore <= 1.3) size = 'XS'
    else if (avgScore <= 2.3) size = 'S'
    else if (avgScore <= 3.3) size = 'M'
    else if (avgScore <= 4.3) size = 'L'
    else size = 'XL'

    setRecommendation({
      size,
      details: epicSizeData[size],
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
            <h2 className="text-2xl font-bold text-cloudflare-gray-900">Epic Size Recommendation</h2>
            <button onClick={onReset} className="text-cloudflare-gray-600 hover:text-cloudflare-gray-900 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start Over
            </button>
          </div>
          
          <div className="p-8">
            <div className="bg-gradient-to-br from-cloudflare-blue to-cloudflare-blue-light rounded-xl p-8 text-center text-white mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">T-Shirt Size</p>
              <p className="text-6xl font-bold mb-3">{recommendation.size}</p>
              <p className="text-lg opacity-90">{recommendation.details.sprints}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-cloudflare-gray-50 rounded-lg p-5 border-l-4 border-cloudflare-blue">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Scope / Complexity:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.scope}</p>
              </div>
              
              <div className="bg-cloudflare-gray-50 rounded-lg p-5 border-l-4 border-cloudflare-blue">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Uncertainty / Research:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.uncertainty}</p>
              </div>
              
              <div className="bg-cloudflare-gray-50 rounded-lg p-5 border-l-4 border-cloudflare-blue">
                <h4 className="font-bold text-cloudflare-gray-900 mb-2">Dependency / Alignment:</h4>
                <p className="text-cloudflare-gray-700 leading-relaxed">{recommendation.details.dependency}</p>
              </div>
              
              {recommendation.userEstimate && (
                <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-400">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-yellow-900 mb-1">Your Estimate: {recommendation.userEstimate}</h4>
                      <p className="text-yellow-800 text-sm">Your estimate differs from the typical range ({recommendation.details.sprints}). Consider if there are additional complexities or efficiencies that might affect the story points.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200 mb-6">
              <p className="text-cloudflare-gray-800 leading-relaxed"><strong>Remember:</strong> T-shirt sizing is for quick, relative effort estimation to help with roadmap planning and prioritization. The goal is not perfect time estimates, but consistent understanding across teams.</p>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-cloudflare-blue to-cloudflare-blue-light text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all"
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
            <h2 className="text-cloudflare-blue text-lg font-semibold">Question {currentQuestion + 1} of {questions.length} • Epic Sizing</h2>
            <button onClick={onReset} className="text-cloudflare-gray-600 hover:text-cloudflare-gray-900 text-sm font-medium">Reset</button>
          </div>
          <div className="h-2 bg-cloudflare-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cloudflare-blue via-cloudflare-blue-light to-cloudflare-teal transition-all duration-300" 
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
                className="w-full bg-gradient-to-r from-cloudflare-blue to-cloudflare-blue-light text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleAnswer(question.id, answers[question.id] || '')}
                disabled={!answers[question.id]}
              >
                {currentQuestion === questions.length - 1 ? 'Submit Answer →' : 'Submit Answer →'}
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

export default EpicSizing