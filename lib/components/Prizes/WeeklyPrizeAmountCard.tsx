import React from 'react'
import { usePooltogetherTotalPrizes } from '@pooltogether/hooks'
import { numberWithCommas } from '@pooltogether/utilities'

import { ThemedClipSpinner } from '../Loading/ThemedClipSpinner'

const AWARD_DAY = 'Friday'

export const WeeklyPrizeAmountCard = (props) => {
  const { t } = props

  return (
    <div className='relative bg-prize-amount flex flex-col justify-between text-center pt-10 sm:pt-8'>
      <div className='lightning-bolts' />

      <div className='sm:pb-10'>
        <h1 className='text-4xl xs:text-6xl -mt-6 sm:-mt-0 font-semibold'>{weeklyPrizeAmount()}</h1>
        <div className='uppercase font-semibold text-default text-xxs xs:text-lg -mt-2'>
          {t?.('inWeeklyPrizes', 'In weekly prizes') || 'In weekly prizes'}
        </div>
      </div>
      <div className='uppercase font-semibold text-green mb-12 text-xxs xs:text-lg w-1/2 mx-auto'>
        {t?.('awardedEveryXDay', {
          day: AWARD_DAY
        }) || `Awarded every ${AWARD_DAY}!`}
      </div>
    </div>
  )
}

export const weeklyPrizeAmount = () => {
  const totalPrizes = usePooltogetherTotalPrizes()
  console.log({ totalPrizes })

  const formatNumbers = (num) => {
    if (num > 1000000) {
      return `$${numberWithCommas(num / 1000000, { precision: 2 })} ${'million'}`
    } else if (num > 10000) {
      return `$${numberWithCommas(num, { precision: 0 })}`
    } else {
      return `$${numberWithCommas(num, { precision: 2 })}`
    }
  }

  // Check if data has loaded
  if (totalPrizes === null) {
    return <ThemedClipSpinner />
  }

  const totalPrizeFormatted = formatNumbers(totalPrizes)

  return totalPrizeFormatted
}
