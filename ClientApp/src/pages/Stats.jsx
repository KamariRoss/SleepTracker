import React from 'react'
import StatsProp from '../components/StatsProp'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Stats = () => {
  return (
    <>
      <div>
        <h1>Your Weekly Progress</h1>
        <StatsProp />
        <section>This is the graph</section>
        <section>This is the stat averages</section>
      </div>
      <NavBar />
    </>
  )
}

export default Stats
