import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Activate = () => {
  const stopTimer = async () => {
    console.log('fetching')
    axios.get('/api/Sleep/5').then(getData => {
      console.log(getData.data)
    })
  }

  return (
    <div class="activatePage">
      <h1 class="activateTitle">Sleep in Progress</h1>
      <h3 class="activateTime">Alarm 6:00a.m.</h3>
      <h3 class="activateTime"></h3>
      <Link to="/quality">
        <button class="stopButton" onClick={stopTimer}>
          <h2 class="activateStopButton">Stop</h2>
        </button>
      </Link>
    </div>
  )
}
export default Activate
