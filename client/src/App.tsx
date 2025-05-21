import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket from 'react-use-websocket'
import type { WebSocketLike } from 'react-use-websocket/dist/lib/types'

const WEB_SOCKET_URL='ws://localhost:8080'

function App() {
  const webSocketRef = useRef<WebSocketLike>(null);
  const [count, setCount] = useState(0)
  const [player, setPlayer] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState<string[]>([])

  console.log(currentPlayers)

  const { getWebSocket, readyState, sendMessage } = useWebSocket(WEB_SOCKET_URL, {
    onOpen: () => {
      console.log('WebSocket connected');
      webSocketRef.current = getWebSocket();
    },
    onClose: () => {
      console.log('WebSocket disconnected');
        },
    onMessage: (e) => {
      console.log('e', e)
      setCurrentPlayers(e.data.split(','))
    }
  });

  console.log(readyState)
  
  // Lifecycle cleanup
  useEffect(() => {
    return () => {
      if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
        webSocketRef.current.close();
      }
    };
  }, []);


  const handleSendMessage = () => {
    sendMessage(player)
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
      <input type="text" onChange={(e) => setPlayer(e.target.value)}/>
      <button onClick={handleSendMessage}>Send Message</button>
      {currentPlayers.map((player) => <div>{player}</div>)}
      {/* <div>{currentPlayers}</div> */}
    </>
  )
}

export default App
