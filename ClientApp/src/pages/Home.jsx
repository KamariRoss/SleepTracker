import React, { useState } from 'react'
import axios from 'axios'

export function Home() {
  const [sleeping, setSleeping] = useState({})
  const startTimer = () => {
    // const rawTimeData = Date.now()
    axios.post('/api/Sleep').then(response => {
      console.log(response.data)
    })
  }
  const saveTimerApi = () => {}
  return (
    <div class="buttonContainer">
      <button class="sleepButton" onClick={startTimer}>
        Start Sleep Tracker
      </button>
    </div>
  )
}
