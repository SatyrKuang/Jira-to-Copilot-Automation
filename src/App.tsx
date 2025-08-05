import CreateNews from './components/CreateNews'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Jira to Copilot Automation
          </h1>
          <p className="text-lg text-gray-600">
            Multi-language News Creation System
          </p>
        </header>
        
        <CreateNews />
      </div>
    </div>
  )
}

export default App
