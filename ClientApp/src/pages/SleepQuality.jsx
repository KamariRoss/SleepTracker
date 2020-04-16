import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axious from 'axios'
import { Redirect } from 'react-router-dom'

const SleepQuality = props => {
  const sleepId = props.match.params.SleepCounterId
  const getSleepStats = async () => {
    const resp = await axious.get(`/api/Sleep/${sleepId}`)
    console.log(resp.data)
  }

  useEffect(() => {
    getSleepStats()
  }, [])

  const goodRating = async () => {
    const resp2 = await axious.put(`/api/Sleep/${sleepId}/quality`)
  }

  return (
    <div className="sleepQualityPage">
      <h1 className="sleepQualityTitle">How was your sleep quality?</h1>
      <section className="sleepQualityButton">
        <button className="simleyFace" onClick={goodRating}>
          {' '}
          Test
        </button>
        <button className="simleyFace" onClick={okayRating}>
          {' '}
          Test
        </button>
        <button className="simleyFace" onClick={badRating}>
          {' '}
          Test
        </button>
      </section>
    </div>
  )
}

export default SleepQuality
