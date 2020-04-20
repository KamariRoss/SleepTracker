import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../custom.scss'

const StatsProp = props => {
  const [quality, setQuality] = useState({})

  const displayQuality = async () => {
    const response = await axios.get(`/api/Sleep`)
    console.log(response.data)
    setQuality(response.data)
  }

  useEffect(() => {
    displayQuality()
  }, [])

  //   useEffect(() => {
  //     qualityId()
  //   }, [])

  return (
    <section>
      <h1>{quality.id}</h1>
    </section>
  )
}

export default StatsProp
