import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState('#ff0000')

  const onClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (!tab?.id) return

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [color],
      func: (selectedColor: string) => {
        document.body.style.backgroundColor = selectedColor
      },
    })
  }

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1>My Extension</h1>

      <div className="card">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.currentTarget.value)}
        />

        <button onClick={onClick}>
          Click me
        </button>
        <p>Choose background Color and click on the button to apply it.</p>
      </div>
    </>
  )
}

export default App