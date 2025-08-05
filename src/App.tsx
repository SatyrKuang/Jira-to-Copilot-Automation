import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { providerManager } from './providers'
import { ProviderCard } from './components/ProviderCard'

function App() {
  const [count, setCount] = useState(0)
  const facaiProvider = providerManager.getProvider('1234526537475')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={reactLogo} className="h-16 w-16 animate-spin-slow" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Jira to Copilot Automation
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Built with Vite + React + TypeScript + Tailwind CSS
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Provider Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Active Providers
            </h2>
            {facaiProvider && <ProviderCard provider={facaiProvider} />}
          </div>

          {/* Demo Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Demo Counter</h3>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              count is {count}
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 text-center mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
