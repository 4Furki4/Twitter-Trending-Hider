import React, { useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = React.useState(false)
  useEffect(() => {
    async function getTrends() {
      const { status } = await chrome.storage.local.get('status')
      setStatus(status)
    }
    getTrends()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>Twitter Trends Hider</p>
        <button id='btn'>
          {status ? 'Hide' : 'Show'}
        </button>
      </header>
    </div>
  )
}

export default App
