import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

// display
//
const Activate = props => {
  // console.log(props)
  const [sleep, setSleep] = useState({})

  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newSleepInformation: {},
  })

  const sleepId = props.match.params.SleepCounterId
  const displayTimer = async () => {
    const resp2 = await axios.get(`/api/Sleep/` + sleepId)
    // console.log(resp2.data)
    setSleep(resp2.data)
  }

  useEffect(() => {
    displayTimer()
  }, [])

  const stopTimer = async () => {
    const resp = await axios.put(`/api/Sleep/${sleepId}`)
    console.log(resp)

    if (resp.status === 200) {
      // do something something else
      setWasSuccessfullyCreated({
        shouldRedirect: true,
        newSleepInformation: resp.data,
      })
    }
  }

  if (wasSuccessfullyCreated.shouldRedirect) {
    return (
      <Redirect
        to={`/quality/${wasSuccessfullyCreated.newSleepInformation.id}`}
      />
    )
  } else {
    return (
      <div className="activatePage">
        <h1 className="activateTitle">
          Sleep in Progress for sleep number {props.match.params.SleepCounterId}
        </h1>
        <h3>
          Time went to bed {''}
          {sleep.timeStart}
        </h3>
        <h3 className="activateTime">Alarm 6:00a.m.</h3>
        <h3 className="activateTime"></h3>

        <button className="stopButton" onClick={stopTimer}>
          <h2 className="activateStopButton">Stop</h2>
        </button>
      </div>
    )
  }
}
export default Activate
