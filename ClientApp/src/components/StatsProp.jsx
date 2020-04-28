import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'
import moment from 'moment'

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
    if (qualityRating === 1) {
      return 'Restless Sleep'
    }
    // if the number is 1 the word is Bad
    else if (qualityRating === 2) {
      return 'Bad'
    }
    // if the number is 2 the word is Okay
    else if (qualityRating === 3) {
      return 'Okay'
    }
    // if the number is 3 the word is Good
    else if (qualityRating === 4) {
      return 'Good'
    }
    // if the number is 4 the word is Excellent
    else if (qualityRating === 5) {
      return 'Excellent'
    }

    // PEDAC
  }

  // average sleep quality rating method

  return (
    <section className="displaySleepStats">
      {/* <h1>There are {sleeps.length} sleeps to look at</h1> */}
      <h1> Todays Date is {moment().format('LL')} </h1>
      <section className="row">
        {sleeps.map((sleep, index) => (
          <section className="sleepStatsDay">
            <section className="sleepStatsTitle">
              <h3 className="sleepStatsTitleDay">
                {/*Day {index + 1}*/}
                {moment(sleep.timeStart).format('L')}
              </h3>
              {'  '}
              <h3 className="sleepStatsTitleDayName">
                {moment(sleep.timeStart).format('dddd')}
              </h3>
            </section>
            <section className="displaySleepStatsTextInfo">
              <section className="sleepDisplayListItems">
                <section>
                  <h5 className="titleName">Sleep Quality</h5>
                  <p className="sleepData">{sleep.qualityRating}/5</p>
                </section>
                <section>
                  <h5 className="titleName">Hours Slept</h5>
                  <p className="sleepData">{sleep.hoursSlept.toFixed(0)}</p>
                </section>
              </section>
              <section className="sleepDisplayListItemsTwo">
                <section>
                  <h5 className="titleName">Bed Time</h5>
                  <p className="sleepData">
                    {moment(sleep.timeStart).format('LT')}
                  </p>
                </section>
                <section>
                  <h5 className="titleName">Wake up Time</h5>
                  <p className="sleepData">
                    {moment(sleep.timeEnd).format('LT')}
                  </p>
                </section>
              </section>
            </section>
            <section className="qualityRating">
              {' '}
              <h3>
                {convertQualityRatingNumberToDescription(sleep.qualityRating)}
              </h3>
            </section>
          </section>
        ))}
      </section>
      {/* <ul>
        Use map to turn a list (array) of sleeps into a list of
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
      <hr />{' '}
    </section>
  )
}

export default StatsProp
