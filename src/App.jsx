import { useState } from 'react'
import FlowSelector from './components/FlowSelector'
import EpicSizing from './components/EpicSizing'
import StorySizing from './components/StorySizing'

function App() {
  const [selectedFlow, setSelectedFlow] = useState(null)

  const handleReset = () => {
    setSelectedFlow(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-cloudflare-gray-50">
      <header className="text-center py-16 px-8 bg-white border-b-4 border-cloudflare-orange shadow-sm">
        <h1 className="text-5xl font-bold mb-3 text-cloudflare-gray-900">Design Sizing Tool</h1>
        <p className="text-xl text-cloudflare-gray-600">What would you like to size?</p>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-8">
        {!selectedFlow && (
          <FlowSelector onSelectFlow={setSelectedFlow} />
        )}
        
        {selectedFlow === 'epic' && (
          <EpicSizing onReset={handleReset} />
        )}
        
        {selectedFlow === 'story' && (
          <StorySizing onReset={handleReset} />
        )}
      </main>
    </div>
  )
}

export default App
