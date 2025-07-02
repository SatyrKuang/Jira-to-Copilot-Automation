import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
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
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Test Issue Resolved</h2>
          <p className="text-sm text-green-700">
            This addresses the test issue created for Copilot assignment demonstration.
          </p>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Built with Vite + React + TypeScript + Tailwind CSS
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-500">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-sm text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
