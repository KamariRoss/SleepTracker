import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'
import moment from 'moment'

const StatsAvg = () => {
  const [sleeps, setSleeps] = useState([])

  const fetchSleeps = async () => {
    // get ALL the sleeps, well that is an Array
    const response = await axios.get(`/api/Sleep/thisweek`)
    const allSleeps = response.data
    // Set the sleeps variable to the array of all the sleeps we received
    setSleeps(allSleeps)
  }

  const convertQualityRatingNumberToDescription = qualityRating => {
    // if the number is 0 the word is No Sleep
    if (qualityRating === 1) {
      return 'No Sleep'
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
  }

  const computeAvgQuality = () => {
    const total = sleeps.reduce(function(result, current) {
      return result + current.qualityRating
    }, 0)
    const avg = total / sleeps.length

    return avg
  }

  const computeAvgHours = () => {
    const total = sleeps.reduce(function(result, current) {
      return result + current.hoursSlept
    }, 0)
    const avg = total / sleeps.length

    return avg
  }

  const computeTypicalBedTime = () => {
    const totalMinutesGoneByBeforeBedForAllTheDays = sleeps.reduce(function(
      result,
      current
    ) {
      // Convert the timeStart string to a date
      const date = new Date(current.timeStart)

      // What hour of the day is this? (0-23)
      const hour = date.getHours()

      // What minute of the hour is this (0-59)
      const minute = date.getMinutes()

      // How many minutes have gone by so far? (0-3599)
      const minuteOfTheDay = hour * 60 + minute

      // Add up the number of minutes gone by in the day
      return result + minuteOfTheDay
    },
    0)
    const averageNumberOfMinutesGoneByBeforeBed = Math.floor(
      totalMinutesGoneByBeforeBedForAllTheDays / sleeps.length
    )

    // avg is the average hour + minute of the day we go to bed
    const averageHourBeforeBed = Math.floor(
      averageNumberOfMinutesGoneByBeforeBed / 60
    )
    const averageMinuteBeforeBed = averageNumberOfMinutesGoneByBeforeBed % 60

    const averageMinuteBeforeBedStrg = averageMinuteBeforeBed.toString()
    const zero = '0'
    if ((averageMinuteBeforeBedStrg.length = 1)) {
      zero.concat(averageMinuteBeforeBed)
    } else {
    }

    return [averageHourBeforeBed, averageMinuteBeforeBed]
  }

  useEffect(() => {
    fetchSleeps()
  }, [])

  // compute the typical hour and minute of bedtime
  // computeTypicalBedTime returns an array so we
  // save the hour and the minute.
  const [hourOfBedTime, minuteOfBedTime] = computeTypicalBedTime()

  console.log('hourOfBedTime', { hourOfBedTime }, 'minuteOfBedTime', {
    minuteOfBedTime,
  })
  return (
    <section className="avg">
      <section className="avgTable">
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Average hours</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              You have a quality sleep rating of{' '}
              {convertQualityRatingNumberToDescription(
                Math.floor(computeAvgQuality())
              )}{' '}
              with your average being {computeAvgQuality().toFixed(2)}/5
            </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Average Quality</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              The average hours you slept are{' '}
              {computeAvgHours(sleeps.hoursSlept).toFixed(0)} hours
            </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Bed Times</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              The average bed times you slept are {hourOfBedTime}:
              {minuteOfBedTime}
            </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Wake Up Times </h4>
          </section>
          <section className="avgSectionTotal">
            <p>The average Wake Up you slept are 8 hours</p>
          </section>
        </section>
      </section>
    </section>
  )
}

export default StatsAvg
