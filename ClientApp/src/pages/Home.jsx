import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export function Home() {
  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    newSleepInformation: {},
  })
  const startTimer = async e => {
    const resp = await axios.post('/api/Sleep')
    console.log(resp.data)

    if (resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        shouldRedirect: true,
        newSleepInformation: resp.data,
      })
    } else {
    }
  }
  if (wasSuccessfullyCreated.shouldRedirect) {
    return (
      <Redirect
        to={`/activate/${wasSuccessfullyCreated.newSleepInformation.id}`}
      />
    )
  } else {
    return (
      <div className="buttonContainer">
        <button className="sleepButton" onClick={startTimer}>
          Start Sleep Tracker
        </button>
      </div>
    )
  }
}
