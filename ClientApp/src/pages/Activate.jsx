import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// display
//
const Activate = props => {
  const stopTimer = async () => {
    console.log('fetching')
    axios
      .get(`/api/Sleep/${props.match.params.SleepCounterId}`)
      .then(getData => {
        console.log(getData.data)
      })
  }

  return (
    <div className="activatePage">
      <h1 className="activateTitle">
        Sleep in Progress for sleep number{props.match.params.SleepCounterId}
      </h1>
      <h3></h3>
      <h3 className="activateTime">Alarm 6:00a.m.</h3>
      <h3 className="activateTime"></h3>
      <Link to="/quality">
        <button className="stopButton" onClick={stopTimer}>
          <h2 className="activateStopButton">Stop</h2>
        </button>
      </Link>
    </div>
  )
}
export default Activate
