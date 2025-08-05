import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaCaiProvider } from './providers'
import { FaCaiDemo } from './components'

function App() {
  const [count, setCount] = useState(0)
  const [showFaCaiDemo, setShowFaCaiDemo] = useState(false)

  return (
    <FaCaiProvider initialBalance={1000}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-8 mb-8">
              <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
                <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
                <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
              </a>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Jira to Copilot Automation
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Built with Vite + React + TypeScript + Tailwind CSS
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mr-4"
              >
                count is {count}
              </button>
              <button 
                onClick={() => setShowFaCaiDemo(!showFaCaiDemo)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {showFaCaiDemo ? 'Hide' : 'Show'} FaCai Provider Demo
              </button>
              <p className="mt-4 text-gray-500">
                Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
              </p>
            </div>
            
            <p className="text-sm text-gray-500 mb-8">
              Click on the Vite and React logos to learn more
            </p>
          </div>

          {showFaCaiDemo && (
            <div className="mb-8">
              <FaCaiDemo />
            </div>
          )}
        </div>
      </div>
    </FaCaiProvider>
  )
}

export default App
