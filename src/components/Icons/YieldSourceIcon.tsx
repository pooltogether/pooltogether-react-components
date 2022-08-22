import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

// Yield Sources
import Aave from '../../assets/YieldSources/aave.svg'

export enum YieldSourceKey {
  aave = 'aave'
}

export const YIELD_SOURCE_MAPPING = Object.freeze({
  [YieldSourceKey.aave]: Aave
})

export const getYieldSourceNiceName = (yieldSourceKey: YieldSourceKey) => {
  switch (yieldSourceKey) {
    case YieldSourceKey.aave:
      return 'Aave'
    default:
      return 'Unknown'
  }
}

interface YieldSourceIconProps {
  yieldSource: YieldSourceKey
  sizeClassName?: string
  className?: string
}

export const YieldSourceIcon: React.FC<YieldSourceIconProps> = (props) => {
  const { sizeClassName, className, yieldSource } = props

  const src = YIELD_SOURCE_MAPPING[yieldSource]

  if (!src) {
    return (
      <FeatherIcon
        icon='dollar-sign'
        className={classnames('inline-block', className, sizeClassName)}
      />
    )
  }

  return <img src={src} className={classnames('inline-block', className, sizeClassName)} />
}

YieldSourceIcon.defaultProps = {
  sizeClassName: 'w-5 h-5'
}
