import React from 'react'
import StatsProp from '../components/StatsProp'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Stats = () => {
  return (
    <>
      <div>
        <StatsProp />
        {/* <section>This is the graph</section>
        <section>This is the stat averages</section> */}
      </div>
      <NavBar />
    </>
  )
}

export default Stats
