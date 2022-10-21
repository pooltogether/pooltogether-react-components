import React from 'react'
import { i18nTranslate } from '../../types'

export const SimpleTimeDisplay = (props: {
  seconds: number
  minutes: number
  hours: number
  days: number
  t: i18nTranslate
}) => {
  const { seconds, minutes, days, hours, t } = props

  if (
    (seconds === null || seconds === undefined) &&
    (minutes === null || minutes === undefined) &&
    (hours === null || hours === undefined) &&
    (days === null || days === undefined)
  ) {
    return null
  }

  const dayString = getTimeString(t, 'day', days)
  const hoursString = getTimeString(t, 'hour', hours)
  const minutesString = getTimeString(t, 'minute', minutes)
  const secondsString = getTimeString(t, 'second', seconds)

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

const getTimeString = (t: i18nTranslate, unit: string, amount: number) => {
  if (!!t) {
    return `${amount} ${t(UNIT_TO_KEY[unit], { count: amount.toString() })}`
  }

  return `${amount} ${unit}${amount === 1 ? '' : 's'}`
}

const UNIT_TO_KEY = Object.freeze({
  second: 'lowercaseSecond',
  minute: 'lowercaseMinute',
  hour: 'lowercaseHour',
  day: 'lowercaseDay'
})
