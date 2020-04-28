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

    // function minuteConverter(minute) {
    //   // convert number to a string
    //   // check to see if the string has one number
    //   // if yes add 0 in the front of the number
    //   // return number with zero
    //   // else return number without zero
    //   const intToString = minute.toString()
    //   console.log(intToString)

    //   if (minute < 10) {
    //     return '0' + intToString
    //   } else {
    //     return intToString
    //   }
    // //
    // const averageMinute = averageMinuteBeforeBed

    const convertHoursAndMinutesToString = (hours, minutes) => {
      let hoursString
      // If it is midnight (0) or noon (12), then the hours are 12
      if (hours == 0 || hours == 12) {
        hoursString = '12'
      }
      // If it is 1am, 2am, ... 11am, the hours are just the hours
      else if (hours < 12) {
        hoursString = hours.toString()
      }
      // If it is 1pm (13) or 2pm (14) then the hours are the hours - 12
      else if (hours > 12) {
        hoursString = (hours - 12).toString()
      }
      let minutesString =
        minutes < 10 ? '0' + minutes.toString() : minutes.toString()
      let amOrPm = hours < 12 ? 'AM' : 'PM'
      return `${hoursString}:${minutesString} ${amOrPm}`
    }
    return [
      convertHoursAndMinutesToString(
        averageHourBeforeBed,
        averageMinuteBeforeBed
      ),
    ]
  }
  const computeTypicalWakeTime = () => {
    const totalMinutesGoneByBeforeBedForAllTheDays = sleeps.reduce(function(
      result,
      current
    ) {
      // Convert the timeStart string to a date
      const date = new Date(current.timeEnd)

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

    // function minuteConverter(minute) {
    //   // convert number to a string
    //   // check to see if the string has one number
    //   // if yes add 0 in the front of the number
    //   // return number with zero
    //   // else return number without zero
    //   const intToString = minute.toString()
    //   console.log(intToString)

    //   if (minute < 10) {
    //     return '0' + intToString
    //   } else {
    //     return intToString
    //   }
    // }
    // const averageMinute = averageMinuteBeforeBed

    const convertHoursAndMinutesToString = (hours, minutes) => {
      let hoursString
      // If it is midnight (0) or noon (12), then the hours are 12
      if (hours == 0 || hours == 12) {
        hoursString = '12'
      }
      // If it is 1am, 2am, ... 11am, the hours are just the hours
      else if (hours < 12) {
        hoursString = hours.toString()
      }
      // If it is 1pm (13) or 2pm (14) then the hours are the hours - 12
      else if (hours > 12) {
        hoursString = (hours - 12).toString()
      }
      let minutesString =
        minutes < 10 ? '0' + minutes.toString() : minutes.toString()
      let amOrPm = hours < 12 ? 'AM' : 'PM'
      return `${hoursString}:${minutesString} ${amOrPm}`
    }
    return [
      convertHoursAndMinutesToString(
        averageHourBeforeBed,
        averageMinuteBeforeBed
      ),
    ]
  }

  useEffect(() => {
    fetchSleeps()
  }, [])

  // compute the typical hour and minute of bedtime
  // computeTypicalBedTime returns an array so we
  // save the hour and the minute.

  const [hourOfBedTime, minuteOfBedTime] = computeTypicalBedTime()

  const [hourOfWakeTime, minuteOfWakeTime] = computeTypicalWakeTime()
  return (
    <section className="avg">
      <section className="avgTable">
        <h3 className="avgTitle">Weekly Averages</h3>

        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Quality</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              {convertQualityRatingNumberToDescription(
                Math.floor(computeAvgQuality())
              )}{' '}
              {computeAvgQuality().toFixed(2)}/5
            </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Hours</h4>
          </section>
          <section className="avgSectionTotal">
            <p>{computeAvgHours(sleeps.hoursSlept).toFixed(0)} </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Bed Time</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              {hourOfBedTime}
              {minuteOfBedTime}
            </p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Wake Up Time </h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              {hourOfWakeTime}
              {minuteOfWakeTime}
            </p>
          </section>
        </section>
      </section>
    </section>
  )
}

export default StatsAvg
