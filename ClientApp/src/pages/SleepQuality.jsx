import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SleepQuality = props => {
  // const [quality, setQuality] = useState(0)
  const sleepId = props.match.params.SleepCounterId

  const [wasSuccessfullyCreated, setWasSuccessfullyCreated] = useState({
    shouldRedirect: false,
    sleepInformation: {},
  })
  // const getSleepStats = async () => {
  //   const response = await axios.get(`/api/Sleep/${sleepId}`)
  //   console.log(response.data)
  // }

  // useEffect(() => {
  //   getSleepStats()
  // }, [])

  const setQuality = async qualityRating => {
    // Make an object that has the same keys as the SleepCounter CSharp Class in `SleepCounter.cs`
    const sleepCounter = {
      QualityRating: qualityRating,
    }

    const response = await axios.put(
      `/api/Sleep/${sleepId}/quality`,
      // This goes in the body of the PUT
      sleepCounter
    )
    console.log(response.data)
    if (response.status === 200) {
      // do something something else
      setWasSuccessfullyCreated({
        shouldRedirect: true,
        sleepInformation: response.data,
      })
    }
  }
  if (wasSuccessfullyCreated.shouldRedirect) {
    return <Redirect to="/" />
  } else {
    return (
      <div className="sleepQualityPage">
        <h1 className="sleepQualityTitle">How was your sleep quality?</h1>
        <section className="sleepQualityButton">
          <button className="simleyFace" onClick={event => setQuality(5)}>
            Excellent
          </button>
          <br />
          <button className="simleyFace" onClick={event => setQuality(4)}>
            Good
          </button>
          <br />
          <button className="simleyFace" onClick={event => setQuality(3)}>
            Okay
          </button>
          <br />
          <button className="simleyFace" onClick={event => setQuality(2)}>
            Bad
          </button>
          <br />
          <button className="simleyFace" onClick={event => setQuality(1)}>
            No Sleep
          </button>
        </section>
      </div>
    )
  }
}

export default SleepQuality
