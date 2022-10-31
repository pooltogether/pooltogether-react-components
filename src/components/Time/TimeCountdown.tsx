import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import { TimeDisplay } from './TimeDisplay'

export const TimeCountdown = (props: {
  epochTimestampSeconds: number
  className?: string
  colonYOffset?: number
  getTimeColorClassName?: (time: {
    seconds: number
    minutes: number
    hours: number
    days: number
  }) => string
  backgroundColorClassName?: string
  unitsColorClassName?: string
  timeClassName?: string
  unitsClassName?: string
  noColors?: boolean
  hideDays?: boolean
  hideHours?: boolean
  hideMinutes?: boolean
  hideSeconds?: boolean
}) => {
  const { epochTimestampSeconds, ...remainingProps } = props
  const { days, hours, minutes, seconds } = useCountdown(epochTimestampSeconds)
  return (
    <TimeDisplay
      {...remainingProps}
      seconds={seconds}
      days={days}
      hours={hours}
      minutes={minutes}
    />
  )
}
