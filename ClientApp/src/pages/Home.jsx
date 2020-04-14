import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export function Home() {
  const [sleep, setSleep] = useState({})
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newSleepInformation: {},
  })
  array.forEach(element => {})
  const startTimer = async () => {
    const resp = axios.post('/api/Sleep', sleep).then(response => {
      console.log(response.data)
    })
    if (resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        shouldRedirect: true,
        newSleepInformation: resp.data,
      })
    } else {
      // do something else here
    }
  }
  if (wasSuccessfullyCreated.shouldRedirect) {
    return (
      <Redirect
        to={{
          pathname: `/SleepCounter/${wasSuccessfullyCreated.newSleepInformation.id}`,
          state: { sleepCounter: wasSuccessfullyCreated.newSleepInformation },
        }}
      />
    )
  } else {
    return (
      <div className="buttonContainer">
        <button className="sleepButton" onClick={startTimer} p>
          Start Sleep Tracker
        </button>
      </div>
    )
  }
}
