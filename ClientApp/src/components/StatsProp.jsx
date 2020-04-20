import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'

const StatsProp = props => {
  const [sleep, setSleep] = useState({})
  //   const sleepId = props.match.params.SleepCounterId

  const displayQuality = async () => {
    const response = await axios.get(`/api/Sleep/` + 70)
    console.log(response.data)
    setSleep(response.data)
  }
  return (
    <div>
      <h1>{sleep.QualityRating}</h1>
    </div>
  )
}

export default StatsProp
