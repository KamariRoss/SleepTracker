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
  //   useEffect(() => {
  //     const total = sleeps.reduce((acc, item) => acc + parseInt(item.distance), 0)
  //     const averageDistance = (total / sleeps.length).toFixed(2)
  //     setStats({ total, averageDistance })
  //   }, [sleeps])

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
            <p>The average quality you slept are 8 hours</p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Average Quality</h4>
          </section>
          <section className="avgSectionTotal">
            <p>The average hours you slept are 8 hours</p>
          </section>
        </section>
        <section className="avgSection">
          <section className="avgSectionTitle">
            <h4>Bed Times</h4>
          </section>
          <section className="avgSectionTotal">
            <p>The average bed times you slept are 8 hours</p>
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
