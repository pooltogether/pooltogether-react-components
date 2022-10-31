import { sToMs } from '@pooltogether/utilities'
import { useEffect, useState } from 'react'

export const useCountdown = (targetEpochTimestampSeconds: number) => {
  const countDownDate = new Date(
    !!targetEpochTimestampSeconds ? sToMs(targetEpochTimestampSeconds) : undefined
  ).getTime()

  const [countDownEpochTimestampMs, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDownEpochTimestampMs)
}

const getReturnValues = (countDownEpochTimestampMs: number) => {
  if (isNaN(countDownEpochTimestampMs)) {
    return { days: null, hours: null, minutes: null, seconds: null }
  }
  // calculate time left
  const days = Math.floor(countDownEpochTimestampMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDownEpochTimestampMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDownEpochTimestampMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDownEpochTimestampMs % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}
