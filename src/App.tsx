import React, { useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [hidden, setHidden] = React.useState(false)
  useEffect(() => {
    async function getTrends() {
      const { hidden } = await chrome.storage.local.get('hidden') as { hidden: boolean }
      setHidden(hidden)
    }
    getTrends()
  }, [hidden])
  const handleClick = useCallback(async () => {
    const { response } = await chrome.runtime.sendMessage({ action: 'toggle', hidden: !hidden }) as { response: boolean }
    setHidden(response)
  }, [hidden])
  return (
    <div className="App">
      <header className="App-header">
        <p>Twitter Trends Hider</p>
        <button onClick={handleClick} id='btn'>
          {hidden ? 'Show' : 'Hide'}
        </button>
      </header>
    </div>
  )
}

export default App
