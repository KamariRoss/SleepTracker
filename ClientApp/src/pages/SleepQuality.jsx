import React from 'react'
import { Link } from 'react-router-dom'

const SleepQuality = () => {
  return (
    <div class="sleepQualityPage">
      <h1 class="sleepQualityTitle">How was your sleep quality</h1>
      <section class="sleepQualityButton">
        <Link to="/">
          <button class="simleyFace"> Test</button>
          <button class="simleyFace"> Test</button>
          <button class="simleyFace"> Test</button>
        </Link>
      </section>
    </div>
  )
}

export default SleepQuality
