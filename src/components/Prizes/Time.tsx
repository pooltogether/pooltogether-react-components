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
  timeClassName?: string
  unitsClassName?: string
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
    timeClassName,
    unitsClassName,
    unitsColorClassName
  } = props
  const {
    days,
    hours,
    minutes,
    seconds: secs
  } = useMemo(() => getTimeBreakdown(seconds), [seconds])
  const textClassName = noColors ? undefined : getTimeColorClassName(seconds)

  return (
    <div className={classNames(className, 'flex')}>
      {!hideDays && (
        <TimeUnit
          unit='days'
          amount={days}
          textClassName={textClassName}
          className='mr-2 xs:mr-4'
          backgroundColorClassName={backgroundColorClassName}
          timeClassName={timeClassName}
          unitsClassName={unitsClassName}
          unitsColorClassName={unitsColorClassName}
        />
      )}
      {!hideHours && (
        <TimeUnit
          unit='hr'
          amount={hours}
          textClassName={textClassName}
          backgroundColorClassName={backgroundColorClassName}
          timeClassName={timeClassName}
          unitsClassName={unitsClassName}
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
          timeClassName={timeClassName}
          unitsClassName={unitsClassName}
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
          timeClassName={timeClassName}
          unitsClassName={unitsClassName}
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
  timeClassName: 'text-sm xs:text-xs sm:text-base',
  unitsClassName: 'text-xxxs',
  getTimeColorClassName
}

const Colon = (props: { className?: string }) => (
  <span
    style={{ paddingLeft: 3, paddingRight: 2 }}
    className={classNames(props.className, 'font-bold')}
  >
    :
  </span>
)

const TimeUnit = (props: {
  amount: number
  unit: string
  className?: string
  exactDigits?: boolean
  textClassName?: string
  backgroundColorClassName?: string
  timeClassName?: string
  unitsClassName?: string
  unitsColorClassName?: string
}) => {
  const {
    amount,
    unit,
    exactDigits,
    textClassName,
    className,
    backgroundColorClassName,
    timeClassName,
    unitsClassName,
    unitsColorClassName
  } = props

  const amounts = String(amount).split('')
  if (!exactDigits && amounts.length === 1) {
    amounts.unshift('0')
  }

  return (
    <div className={classNames(className, 'flex flex-col space-y-1')}>
      <div className='flex space-x-0.5'>
        {amounts.map((amount, index) => (
          <TimeDigit
            backgroundColorClassName={backgroundColorClassName}
            key={`${unit}-${index}`}
            amount={amount}
            className={classNames(textClassName, timeClassName)}
          />
        ))}
      </div>
      <span
        className={classNames(
          'uppercase text-center font-bold',
          unitsColorClassName,
          unitsClassName
        )}
      >
        {unit}
      </span>
    </div>
  )
}

TimeUnit.defaultProps = {
  exactDigits: false,
  backgroundColorClassName: 'bg-tertiary',
  unitsColorClassName: 'text-tertiary',
  unitsClassName: 'text-xxxs'
}

const TimeDigit = (props: {
  amount: string
  className?: string
  backgroundColorClassName?: string
}) => (
  <div
    style={{ minWidth: 26 }}
    className={classNames(
      `text-center font-bold rounded-sm px-2 py-0.5`,
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
