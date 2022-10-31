import classNames from 'classnames'
import React from 'react'

export const TimeDisplay = (props: {
  seconds: number
  minutes: number
  hours: number
  days: number
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
  hideSeconds?: boolean
  hideMinutes?: boolean
  hideHours?: boolean
  hideDays?: boolean
}) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    noColors,
    className,
    colonYOffset,
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

  const textClassName = noColors
    ? undefined
    : getTimeColorClassName({ seconds, minutes, hours, days })

  if (
    (seconds === null || seconds === undefined) &&
    (minutes === null || minutes === undefined) &&
    (hours === null || hours === undefined) &&
    (days === null || days === undefined)
  ) {
    return null
  }

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
      <Colon className={textClassName} yOffset={colonYOffset} />
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
      <Colon className={textClassName} yOffset={colonYOffset} />
      {!hideSeconds && (
        <TimeUnit
          unit='sec'
          amount={seconds}
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

const getTimeColorClassName = (time: { seconds; minutes; hours; days }) => {
  const { days, hours, minutes } = time
  if (days <= 0 && hours <= 0 && minutes <= 60) {
    return 'text-pt-red'
  } else if (days <= 0 && hours <= 8) {
    return 'text-orange'
  } else {
    return 'text-gradient-magenta'
  }
}

TimeDisplay.defaultProps = {
  hideColors: false,
  timeClassName: 'text-sm xs:text-xs sm:text-base',
  unitsClassName: 'text-xxxs',
  getTimeColorClassName
}

const Colon = (props: { className?: string; yOffset: number }) => (
  <span
    style={{ paddingLeft: 3, paddingRight: 2, top: props.yOffset || 0 }}
    className={classNames(props.className, 'relative font-bold')}
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
          'uppercase text-center font-bold opacity-60',
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
  backgroundColorClassName: 'bg-pt-purple-darkest bg-opacity-10 dark:bg-white dark:bg-opacity-10',
  unitsColorClassName:
    'text-pt-purple-darkest text-opacity-50 dark:text-white dark:text-opacity-50',
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
      `text-center font-bold rounded-sm px-2 py-1`,
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
