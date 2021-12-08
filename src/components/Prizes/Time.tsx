import { getTimeBreakdown } from '@pooltogether/utilities'

import classNames from 'classnames'
import React, { useMemo } from 'react'

const SECONDS_PER_DAY = 86400
const EIGHT_HOURS_IN_SECONDS = 28800

export interface TimeProps {
  seconds: number
  className?: string
  getTimeColorClassName?: (seconds: number) => string
  backgroundColorClassName?: string
  unitsColorClassName?: string
  noColors?: boolean
  hideDays?: boolean
  hideHours?: boolean
  hideMinutes?: boolean
  hideSeconds?: boolean
}

export const Time = (props: TimeProps) => {
  const {
    seconds,
    noColors,
    className,
    getTimeColorClassName,
    hideDays,
    hideHours,
    hideMinutes,
    hideSeconds,
    backgroundColorClassName,
    unitsColorClassName
  } = props
  const { days, hours, minutes, seconds: secs } = useMemo(() => getTimeBreakdown(seconds), [
    seconds
  ])
  const textClassName = noColors ? undefined : getTimeColorClassName(seconds)

  return (
    <div className={classNames(className, 'flex text-sm xs:text-xs sm:text-base')}>
      {!hideDays && (
        <TimeUnit
          unit='day'
          amount={days}
          textClassName={textClassName}
          className='mr-2'
          backgroundColorClassName={backgroundColorClassName}
          unitsColorClassName={unitsColorClassName}
        />
      )}
      {!hideHours && (
        <TimeUnit
          unit='hr'
          amount={hours}
          textClassName={textClassName}
          backgroundColorClassName={backgroundColorClassName}
          unitsColorClassName={unitsColorClassName}
        />
      )}
      <Colon className={textClassName} />
      {!hideMinutes && (
        <TimeUnit
          unit='min'
          amount={minutes}
          textClassName={textClassName}
          backgroundColorClassName={backgroundColorClassName}
          unitsColorClassName={unitsColorClassName}
        />
      )}
      <Colon className={textClassName} />
      {!hideSeconds && (
        <TimeUnit
          unit='sec'
          amount={secs}
          textClassName={textClassName}
          backgroundColorClassName={backgroundColorClassName}
          unitsColorClassName={unitsColorClassName}
        />
      )}
    </div>
  )
}

const getTimeColorClassName = (seconds: number) => {
  return seconds >= SECONDS_PER_DAY
    ? 'text-green'
    : seconds >= EIGHT_HOURS_IN_SECONDS
    ? 'text-orange'
    : 'text-red'
}

Time.defaultProps = {
  hideColors: false,
  getTimeColorClassName
}

const Colon = (props: { className?: string }) => (
  <span className={classNames(props.className, 'font-bold px-1')}>:</span>
)

const TimeUnit = (props: {
  amount: number
  unit: string
  className?: string
  exactDigits?: boolean
  textClassName?: string
  backgroundColorClassName?: string
  unitsColorClassName?: string
}) => {
  const {
    amount,
    unit,
    exactDigits,
    textClassName,
    className,
    backgroundColorClassName,
    unitsColorClassName
  } = props

  const amounts = String(amount).split('')
  if (!exactDigits && amounts.length === 1) {
    amounts.unshift('0')
  }

  return (
    <div className={classNames(className, 'flex flex-col space-y-1')}>
      <div className='flex space-x-px'>
        {amounts.map((amount, index) => (
          <TimeDigit
            backgroundColorClassName={backgroundColorClassName}
            key={`${unit}-${index}`}
            amount={amount}
            className={classNames(textClassName)}
          />
        ))}
      </div>
      <span
        className={classNames('uppercase text-xxxs text-center font-bold', unitsColorClassName)}
      >
        {unit}
      </span>
    </div>
  )
}

TimeUnit.defaultProps = {
  exactDigits: false,
  backgroundColorClassName: 'bg-tertiary',
  unitsColorClassName: 'text-tertiary'
}

const TimeDigit = (props: {
  amount: string
  className?: string
  backgroundColorClassName?: string
}) => (
  <div
    className={classNames(
      `font-bold rounded-sm px-2 py-0.5`,
      props.backgroundColorClassName,
      props.className
    )}
  >
    {props.amount}
  </div>
)

TimeDigit.defaultProps = {
  backgroundColorClassName: 'bg-tertiary'
}
