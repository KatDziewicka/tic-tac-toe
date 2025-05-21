import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const ws = useRef<WebSocket>(null);
  const [count, setCount] = useState(0)

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onmessage = (e) => console.log('Message:', e.data);
    ws.current.onclose = () => console.log('WebSocket disconnected');

    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSendMessage = () => {
    ws.current?.send('Hello server!');
  };
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleSendMessage}>Send Message</button>
    </>
  )
}

export default App
