import React from 'react'
import classnames from 'classnames'

// Networks
import EthLogo from '../../assets/Exchanges/coinbase-icon.svg'

export enum ExchangeKey {
  coinbase = 'coinbase'
}

export const ExchangeIcon: React.FC<{
  exchange: ExchangeKey
  style?: React.CSSProperties
  sizeClassName?: string
  className?: string
  radiusClassName?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  const { sizeClassName, style, radiusClassName, className, exchange, onClick } = props

  const src = EXCHANGE_MAPPING[exchange]

  if (!src) {
    return (
      <div
        style={style}
        className={classnames(
          'inline-block',
          'bg-actually-black bg-opacity-20',
          className,
          radiusClassName,
          sizeClassName
        )}
      />
    )
  }

  return (
    <img
      style={style}
      src={src}
      className={classnames('inline-block', className, radiusClassName, sizeClassName)}
      onClick={onClick}
    />
  )
}

ExchangeIcon.defaultProps = {
  sizeClassName: 'w-5 h-5',
  radiusClassName: 'rounded-full'
}

export const EXCHANGE_MAPPING = Object.freeze({
  [ExchangeKey.coinbase]: EthLogo
})
