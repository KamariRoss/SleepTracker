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

    if (resp.status === 201) {
      // do something something else
      setWasSuccessfullyCreated({
        shouldRedirect: true,
        newSleepInformation: resp.data,
      })
    } else {
      return <Redirect to={`/*/`} />
    }
  }
  if (wasSuccessfullyCreated.shouldRedirect === true) {
    return (
      <Redirect
        to={`/activate/${wasSuccessfullyCreated.newSleepInformation.id}`}
      />
    )
  } else {
    return (
      <div class="buttonContainer">
        <button class="sleepButton" name="startTime" onClick={startTimer}>
          Start Sleep Tracker
        </button>
      </div>
    )
  }
}
