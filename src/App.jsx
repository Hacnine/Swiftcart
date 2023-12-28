import { useState } from 'react'
import './App.css'
import Links from './Links'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Links/>
    </>
  )
}

export default App
