import React from 'react'
import classnames from 'classnames'

import { Chip } from './Containers/Chip'

const SECONDS_PER_DAY = 86400
const SECONDS_PER_WEEK = 604800

export const PrizeFrequencyChip = (props) => {
  const { prizePeriodSeconds, t, className } = props

  const isDaily = prizePeriodSeconds.toNumber() === SECONDS_PER_DAY
  const isWeekly = prizePeriodSeconds.toNumber() === SECONDS_PER_WEEK

  if (!isDaily && !isWeekly) {
    return null
  }

  return (
    <Chip
      bgClasses={classnames({
        'bg-accent-grey-4': isDaily,
        'bg-accent-grey-1': isWeekly
      })}
      textClasses={classnames({
        'text-highlight-6': isDaily,
        'text-green': isWeekly
      })}
      text={getPrizeFrequencyText(t, prizePeriodSeconds)}
      className={className}
    />
  )
}

const getPrizeFrequencyText = (t, prizePeriodSeconds) => {
  const isDaily = prizePeriodSeconds.toNumber() === SECONDS_PER_DAY
  const isWeekly = prizePeriodSeconds.toNumber() === SECONDS_PER_WEEK

  if (isDaily) {
    return t?.('dailyPrize') || 'Daily Prize'
  } else if (isWeekly) {
    return t?.('prizeValue') || 'Weekly Prize'
  }
}
