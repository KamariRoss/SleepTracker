import React from 'react'
import StatsProp from '../components/StatsProp'
import { Link } from 'react-router-dom'

const Stats = () => {
  return (
    <div>
      <section>
        {' '}
        <StatsProp />{' '}
      </section>
      <section>This is the graph</section>
      <section>This is text stats</section>
    </div>
  )
}

export default Stats
