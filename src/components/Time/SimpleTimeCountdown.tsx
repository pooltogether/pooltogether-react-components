import React from 'react'
import { useTimeCountdown } from '../../hooks/useTimeCountdown'
import { i18nTranslate } from '../../types'
import { SimpleTimeDisplay } from './SimpleTimeDisplay'

export const SimpleTimeCountDown = (props: { seconds: number; t: i18nTranslate }) => {
  const { seconds: initialSecondsLeft, t } = props
  const { days, hours, minutes, seconds } = useTimeCountdown(initialSecondsLeft)
  return <SimpleTimeDisplay t={t} days={days} hours={hours} minutes={minutes} seconds={seconds} />
}
