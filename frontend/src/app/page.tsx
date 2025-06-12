'use client'

import { useState } from "react"


export default function Home() {
  const [message, setMessage] = useState<string>()

  const handleClick= async () => {
    const response = await fetch("/api/Test")
    const data = await response.json()
    setMessage(data.message)
  }

  return (
    
    <>
    {message && <h1>{message}</h1>}
    <button onClick={handleClick}>Test button</button>
    </>
  )
}
