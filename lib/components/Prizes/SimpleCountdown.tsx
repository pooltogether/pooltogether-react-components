import { useTimeCountdown } from '@pooltogether/hooks'
import React from 'react'

interface SimpleCountDownProps {
  seconds: number
  t?: (key: string) => string
}

export const SimpleCountDown = (props: SimpleCountDownProps) => {
  const { seconds: initialSecondsLeft, t } = props
  const { days, hours, minutes, seconds } = useTimeCountdown(initialSecondsLeft)
  const dayString = getTimeString(t, 'day', days)
  const hoursString = getTimeString(t, 'hour', hours)
  const minutesString = getTimeString(t, 'minute', minutes)
  const secondsString = getTimeString(t, 'second', seconds)

  console.log(initialSecondsLeft, days, hours, minutes, seconds)

  if (days > 0) {
    if (hours > 0) {
      return <>{`${dayString} ${hoursString}`}</>
    } else {
      return <>{`${dayString} ${minutesString}`}</>
    }
  }

  if (hours > 0) {
    return <>{`${hoursString} ${minutesString}`}</>
  }

  if (minutes > 0) {
    return <>{`${minutesString}`}</>
  } else {
    return <>{secondsString}</>
  }
}

const getTimeString = (t, unit, amount) =>
  `${amount} ${
    t ? t(unit, { count: amount }) : amount > 0 ? `${unit}${amount === 1 ? '' : 's'}` : ''
  }`
