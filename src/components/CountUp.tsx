import React, { useEffect, useState } from 'react'
import ReactCountUp from 'react-countup'
import usePreviousValue from 'beautiful-react-hooks/usePreviousValue'

interface CountUpProps {
  countFrom?: number | string
  countTo: number | string
  decimals?: number | string
  duration?: number
}

export function CountUp(props: CountUpProps) {
  const { countTo, decimals, duration, countFrom } = props

  let [value, setValue] = useState(countFrom)
  let prev = usePreviousValue(value)
  useEffect(() => {
    setValue(countTo)
  }, [countTo])

  let decimalsToUse = countTo > 10000 ? 0 : decimals

  return (
    <ReactCountUp
      start={Number(prev)}
      end={Number(value)}
      duration={duration}
      separator={','}
      decimals={Number(decimalsToUse)}
    />
  )
}

CountUp.defaultProps = {
  countFrom: 0,
  decimals: 2,
  duration: 1.4
}
