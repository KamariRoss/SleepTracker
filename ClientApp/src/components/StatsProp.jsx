import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'

const StatsProp = props => {
  const [sleeps, setSleeps] = useState([])

  const fetchSleeps = async () => {
    // get ALL the sleeps, well that is an Array
    const response = await axios.get(`/api/Sleep/thisweek`)

    const allSleeps = response.data

    // Set the sleeps variable to the array of all the sleeps we received
    setSleeps(allSleeps)
  }

  useEffect(() => {
    fetchSleeps()
  }, [])

  const convertQualityRatingNumberToDescription = qualityRating => {
    // if the number is 0 the word is No Sleep
    if (qualityRating === 0) {
      return 'No Sleep'
    }
    // if the number is 1 the word is Bad
    else if (qualityRating === 1) {
      return 'Bad'
    }
    // if the number is 2 the word is Okay
    else if (qualityRating === 2) {
      return 'Okay'
    }
    // if the number is 3 the word is Good
    else if (qualityRating === 3) {
      return 'Good'
    }
    // if the number is 4 the word is Excellent
    else if (qualityRating === 4) {
      return 'Excellent'
    }

    // PEDAC
  }

  // average sleep quality rating method

  return (
    <section className="displaySleepStats">
      {/* <h1>There are {sleeps.length} sleeps to look at</h1> */}
      <section className="sleepDayQuality">
        <h2>Monday</h2>
        <section className="displaySleepTextInfo">
          <section className="sleepDisplayListItems">
            <h3 className="titleName">Sleep Quality</h3>
            <h4 className="sleepData">3/5</h4>
            <h3 className="titleName">Hours Slept</h3>
            <h4 className="sleepData">5</h4>
          </section>
          <section className="sleepDisplayListItems">
            <h3 className="titleName">Bed Time</h3>
            <h4 className="sleepData">17:00pm</h4>
            <h3 className="titleName">Wake up Time</h3>
            <h4 className="sleepData">5:00am</h4>
          </section>
        </section>
      </section>

      {/* <ul>
        Use map to turn a list (array) of sleeps into a list of <li>
        {sleeps.map(sleep => (
          <li className="statspage">
            {convertQualityRatingNumberToDescription(sleep.qualityRating)}
          </li>
        ))}
        {sleeps.map(sleep => (
          <li className="statspage">{sleep.timeStart}</li>
        ))}
        {sleeps.map(sleep => (
          <li className="statspage">{sleep.timeEnd}</li>
        ))}
      </ul> */}
    </section>
  )
}

export default StatsProp
