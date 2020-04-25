import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'
import moment from 'moment'

const StatsAvg = () => {
  const [sleeps, setSleeps] = useState([])
  console.log(setSleeps)
  const fetchSleeps = async () => {
    // get ALL the sleeps, well that is an Array
    const response = await axios.get(`/api/Sleep/thisweek`)
    const allSleeps = response.data
    // Set the sleeps variable to the array of all the sleeps we received
    setSleeps(allSleeps)
  }

  const computeAvgQuality = () => {
    const total = sleeps.reduce(function(a, b) {
      return a + b.qualityRating
    }, 0)
    const avg = total / sleeps.length

    return avg
  }
  const computeAvgHours = () => {
    const total = sleeps.reduce(function(a, b) {
      return a + b.hoursSlept
    }, 0)
    const avg = total / sleeps.length

    return avg
  }
  const computeAvgTimeSlept = () => {
    const total = sleeps.reduce(function(a, b) {
      return a + b.timeStart
    }, 0)
    const avg = total / sleeps.length

    return avg
  }

  useEffect(() => {
    fetchSleeps()
  }, [])

  //given the array of hours create an average for past 7 days
  //given the array of quality create an average for past 7 days
  //given the array of bed times create an average for past 7 days
  //given the array of Wake Up create an average for past 7 days

  //given the array of hours create an average for past total
  //given the array of quality create an average for past total
  //given the array of bed times create an average for past total
  //given the array of Wake Up create an average for past total

  return (
    <section className="avg">
      <section className="avgTable">
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Average hours</h4>
          </section>
          <section className="avgSectionTotal">
            <p>
              The average quality you slept are{' '}
              {computeAvgQuality(sleeps.qualityRating).toFixed(0)} hours
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
              The average bed times you slept are{' '}
              {computeAvgTimeSlept(sleeps.timeStart)} hours
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
